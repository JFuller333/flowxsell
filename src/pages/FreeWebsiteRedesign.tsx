import { Navbar } from "@/components/Navbar";
import { ParticleBackground } from "@/components/ParticleBackground";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Trash2, ImagePlus, Smartphone, Laptop, Loader2, SwitchCamera } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "flowxsell-biz-cards-v1";
const MAX_STORED_LOCAL = 40;
const MAX_IMAGE_EDGE_PX = 1600;
const JPEG_QUALITY = 0.82;

type DisplayCard = {
  id: string;
  createdAt: string;
  imageSrc: string;
};

type PersistedLegacy = {
  id: string;
  imageDataUrl?: string;
  imageSrc?: string;
  createdAt: string;
};

function loadLocalCards(): DisplayCard[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    const out: DisplayCard[] = [];
    for (const item of parsed) {
      if (typeof item !== "object" || item === null) continue;
      const p = item as PersistedLegacy;
      const src =
        typeof p.imageSrc === "string" && p.imageSrc.length > 0
          ? p.imageSrc
          : typeof p.imageDataUrl === "string" && p.imageDataUrl.length > 0
            ? p.imageDataUrl
            : null;
      if (typeof p.id !== "string" || typeof p.createdAt !== "string" || !src) continue;
      out.push({ id: p.id, createdAt: p.createdAt, imageSrc: src });
    }
    return out;
  } catch {
    return [];
  }
}

function persistLocalCards(cards: DisplayCard[]): boolean {
  try {
    const normalized = cards.map(({ id, createdAt, imageSrc }) => ({
      id,
      createdAt,
      imageSrc,
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    return true;
  } catch {
    return false;
  }
}

async function compressToJpegDataUrl(input: Blob | File, maxEdge: number): Promise<string> {
  const url = URL.createObjectURL(input);
  try {
    const img = new Image();
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("Could not load image"));
      img.src = url;
    });
    let w = img.naturalWidth || img.width;
    let h = img.naturalHeight || img.height;
    if (!w || !h) throw new Error("Invalid image dimensions");
    const scale = Math.min(1, maxEdge / Math.max(w, h));
    w = Math.round(w * scale);
    h = Math.round(h * scale);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas unavailable");
    ctx.drawImage(img, 0, 0, w, h);
    return canvas.toDataURL("image/jpeg", JPEG_QUALITY);
  } finally {
    URL.revokeObjectURL(url);
  }
}

async function fetchCloudEntries(): Promise<{ ok: boolean; configured: boolean; cards: DisplayCard[] }> {
  try {
    const res = await fetch("/api/raffle-entries");
    if (!res.ok) return { ok: false, configured: false, cards: [] };
    const data = (await res.json()) as {
      configured?: boolean;
      entries?: { id: string; createdAt: string; imageUrl: string }[];
    };
    if (data.configured !== true || !Array.isArray(data.entries)) {
      return { ok: true, configured: false, cards: [] };
    }
    return {
      ok: true,
      configured: true,
      cards: data.entries.map((e) => ({
        id: e.id,
        createdAt: e.createdAt,
        imageSrc: e.imageUrl,
      })),
    };
  } catch {
    return { ok: false, configured: false, cards: [] };
  }
}

const FreeWebsiteRedesign = () => {
  const [cloudMode, setCloudMode] = useState<boolean | null>(null);
  const [cards, setCards] = useState<DisplayCard[]>([]);
  const [busy, setBusy] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const captureInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [adminKey, setAdminKey] = useState<string | null>(null);

  useEffect(() => {
    document.title = "BMF Redesign · Business card raffle · FlowXsell";
  }, []);

  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      const fromUrl = url.searchParams.get("admin");
      if (fromUrl) {
        sessionStorage.setItem("flowxsell-raffle-admin", fromUrl);
        url.searchParams.delete("admin");
        window.history.replaceState({}, "", url.toString());
        setAdminKey(fromUrl);
        return;
      }
      const stored = sessionStorage.getItem("flowxsell-raffle-admin");
      if (stored) setAdminKey(stored);
    } catch {
      /* ignore */
    }
  }, []);

  const refreshGallery = useCallback(async () => {
    const remote = await fetchCloudEntries();
    if (remote.configured && remote.ok) {
      setCloudMode(true);
      setCards(remote.cards);
      return true;
    }
    setCloudMode(false);
    if (!remote.ok) {
      toast.error("Could not reach the raffle server. Showing entries saved only on this device.");
    }
    setCards(loadLocalCards());
    return false;
  }, []);

  useEffect(() => {
    void refreshGallery();
  }, [refreshGallery]);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  useEffect(() => () => stopCamera(), [stopCamera]);

  const addFromBlob = async (blob: Blob) => {
    if (busy) return;

    const imageDataUrl = await compressToJpegDataUrl(blob, MAX_IMAGE_EDGE_PX).catch(() => null);
    if (!imageDataUrl) {
      toast.error("Could not read that image. Try another photo.");
      return;
    }

    /* Resolve mode: prefer cloud once GET says configured */
    let useCloud = cloudMode === true;
    if (cloudMode === null) {
      const remote = await fetchCloudEntries();
      useCloud = remote.configured && remote.ok;
      setCloudMode(useCloud);
      if (!useCloud) setCards(loadLocalCards());
      else setCards(remote.cards);
    }

    setBusy(true);
    try {
      if (useCloud) {
        const res = await fetch("/api/raffle-upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageBase64: imageDataUrl }),
        });
        let message = "Could not upload.";
        try {
          const payload = (await res.json()) as { error?: string };
          if (!res.ok && payload.error) message = payload.error;
        } catch {
          /* keep default message */
        }
        if (!res.ok) {
          toast.error(message);
          return;
        }
        toast.success("Card added — everyone on the site will see your entry in this gallery.");
        await refreshGallery();
        return;
      }

      /* Local fallback */
      if (loadLocalCards().length >= MAX_STORED_LOCAL) {
        toast.error(`Maximum ${MAX_STORED_LOCAL} cards locally. Remove one to add another.`);
        return;
      }

      const entry: DisplayCard = {
        id: crypto.randomUUID(),
        imageSrc: imageDataUrl,
        createdAt: new Date().toISOString(),
      };
      setCards((prev) => {
        if (prev.length >= MAX_STORED_LOCAL) {
          toast.error(`Maximum ${MAX_STORED_LOCAL} cards locally. Remove one to add another.`);
          return prev;
        }
        const next = [entry, ...prev];
        if (!persistLocalCards(next)) {
          toast.error("Could not save (storage full). Try removing older cards.");
          return prev;
        }
        toast.success("Card saved on this device.");
        return next;
      });
    } finally {
      setBusy(false);
    }
  };

  const handleFilePick = async (list: FileList | null) => {
    const file = list?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    await addFromBlob(file);
  };

  const [cameraActive, setCameraActive] = useState(false);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>("");

  const startCamera = async (deviceId?: string) => {
    if (!navigator.mediaDevices?.getUserMedia) {
      toast.error("Camera isn’t supported in this browser. Use Take photo / Upload.");
      return;
    }
    setBusy(true);
    try {
      stopCamera();
      const stream = await navigator.mediaDevices.getUserMedia({
        video: deviceId
          ? { deviceId: { exact: deviceId } }
          : { facingMode: { ideal: "environment" } },
        audio: false,
      });
      streamRef.current = stream;
      setCameraActive(true);

      try {
        const all = await navigator.mediaDevices.enumerateDevices();
        const cams = all.filter((d) => d.kind === "videoinput");
        setDevices(cams);
        const activeId = stream.getVideoTracks()[0]?.getSettings().deviceId;
        setSelectedDeviceId(deviceId ?? activeId ?? "");
      } catch {
        /* enumeration optional */
      }

      requestAnimationFrame(() => {
        const v = videoRef.current;
        if (v) {
          v.srcObject = stream;
          void v.play().catch(() => {});
        }
      });
    } catch {
      toast.error("Could not open camera. Check permissions or use upload.");
      stopCamera();
    } finally {
      setBusy(false);
    }
  };

  const switchCamera = async (deviceId: string) => {
    if (!deviceId || deviceId === selectedDeviceId) return;
    await startCamera(deviceId);
  };

  const captureFromVideo = async () => {
    const video = videoRef.current;
    if (!video || video.readyState < 2) return;
    const w = video.videoWidth;
    const h = video.videoHeight;
    if (!w || !h) return;
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, w, h);
    canvas.toBlob(
      async (b) => {
        if (!b) {
          toast.error("Capture failed. Try again.");
          return;
        }
        setCameraActive(false);
        stopCamera();
        await addFromBlob(b);
      },
      "image/jpeg",
      JPEG_QUALITY,
    );
  };

  const removeCardLocal = (id: string) => {
    const next = cards.filter((c) => c.id !== id);
    if (!persistLocalCards(next)) {
      toast.error("Could not update storage.");
      return;
    }
    setCards(next);
    toast.success("Removed.");
  };

  const removeCardCloud = async (id: string) => {
    if (!adminKey) return;
    if (!confirm("Remove this entry from the public raffle gallery?")) return;
    setBusy(true);
    try {
      const res = await fetch("/api/raffle-delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Raffle-Admin": adminKey,
        },
        body: JSON.stringify({ id }),
      });
      if (res.status === 401) {
        sessionStorage.removeItem("flowxsell-raffle-admin");
        setAdminKey(null);
        toast.error("Admin key rejected. Open the page again with ?admin=<key>.");
        return;
      }
      if (!res.ok) {
        let msg = "Could not remove entry.";
        try {
          const payload = (await res.json()) as { error?: string };
          if (payload.error) msg = payload.error;
        } catch {
          /* keep default */
        }
        toast.error(msg);
        return;
      }
      toast.success("Removed from raffle.");
      await refreshGallery();
    } catch {
      toast.error("Network error while removing entry.");
    } finally {
      setBusy(false);
    }
  };

  const clearLocal = () => {
    if (!cards.length) return;
    if (!confirm("Remove all cards saved on this device?")) return;
    localStorage.removeItem(STORAGE_KEY);
    setCards([]);
    toast.success("Cleared locally.");
  };

  const showLocalCleanup = cloudMode === false && cards.length > 0;

  const gallerySubtitle =
    cloudMode === null
      ? "Checking where entries are saved…"
      : cloudMode
        ? "Public gallery — same list for every visitor."
        : `On this device only (max ${MAX_STORED_LOCAL} cards).`;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative flex min-h-[52vh] items-center justify-center overflow-hidden px-4 pb-14 pt-24 md:pb-16 md:pt-20">
        <ParticleBackground />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/8 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto max-w-3xl space-y-5 text-center">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Limited time raffle</p>
            <div className="flex justify-center">
              <img
                src="/black-market-flea-logo.png"
                alt="Black Market Flea"
                className="h-auto w-full max-w-[280px] rounded-lg shadow-lg ring-1 ring-black/20 sm:max-w-[320px]"
                loading="eager"
                decoding="async"
              />
            </div>
            <div className="flex justify-center pt-1">
              <p
                className="inline-flex items-baseline gap-2 rounded-full border border-primary/30 bg-background/85 px-4 py-1.5 text-sm shadow-sm backdrop-blur-sm"
                aria-live="polite"
              >
                {cloudMode === null ? (
                  <span className="text-muted-foreground">…</span>
                ) : (
                  <>
                    <span className="text-lg font-semibold tabular-nums leading-none text-primary">{cards.length}</span>
                    <span className="text-muted-foreground">
                      {cloudMode ? "Currently In Raffle" : "on this device (not shared yet)"}
                    </span>
                  </>
                )}
              </p>
            </div>
          </div>
          <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-[2.85rem]">
            <span className="neon-text-glow text-primary">BMF</span> website redesign for{" "}
            <span className="text-primary neon-text-glow">revenue optimization</span>
          </h1>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {cloudMode === true
              ? "Snap or upload business cards—they’re posted to this page so everyone who visits can see who’s entered the raffle."
              : cloudMode === false
                ? "Snap or upload business cards—they’re saved on this device unless the live site database is configured (see setup below)."
                : "Snap or upload business cards to join the raffle — we’ll show where they appear in a moment."}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl space-y-8 px-4 pb-28">
        <Card className="overflow-hidden border-primary/25 bg-card/75 shadow-[0_0_44px_-24px_hsla(74,99%,49%,0.35)] backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl">Business card scanner</CardTitle>
            <CardDescription>
              Use your phone camera in the browser, upload a photo, or open a live camera on desktop.{" "}
              {cloudMode === true ? (
                <span>
                  Entries are uploaded to the raffle gallery (<span className="font-medium text-foreground/85">visible to visitors</span>).
                </span>
              ) : cloudMode === false ? (
                <span>
                  This browser is storing images <span className="font-medium text-foreground/85">locally only</span> until{" "}
                  <span className="font-medium text-foreground/85">Supabase</span> is wired on production (same URL paths as this
                  build).
                </span>
              ) : (
                <span>Connecting…</span>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <input
                ref={captureInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                disabled={busy || cloudMode === null}
                onChange={(e) => {
                  void handleFilePick(e.target.files);
                  e.target.value = "";
                }}
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                disabled={busy || cloudMode === null}
                onChange={(e) => {
                  void handleFilePick(e.target.files);
                  e.target.value = "";
                }}
              />
              <Button
                type="button"
                size="lg"
                disabled={busy || cloudMode === null}
                className="gap-2"
                onClick={() => captureInputRef.current?.click()}
              >
                {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : <Smartphone className="h-5 w-5" />}
                Take photo
              </Button>
              <Button
                type="button"
                size="lg"
                variant="secondary"
                disabled={busy || cloudMode === null}
                className="gap-2"
                onClick={() => fileInputRef.current?.click()}
              >
                <ImagePlus className="h-5 w-5" />
                Upload image
              </Button>
              {!cameraActive ? (
                <Button
                  type="button"
                  size="lg"
                  variant="outline"
                  disabled={busy || cloudMode === null}
                  className="gap-2"
                  onClick={() => void startCamera()}
                >
                  <Camera className="h-5 w-5" />
                  <span className="hidden sm:inline">Live camera</span>
                  <span className="sm:hidden">Camera</span>
                </Button>
              ) : (
                <>
                  <Button type="button" size="lg" className="gap-2" onClick={captureFromVideo} disabled={busy}>
                    Capture frame
                  </Button>
                  {devices.length > 1 ? (
                    <div className="flex items-center gap-2">
                      <SwitchCamera className="h-4 w-4 text-muted-foreground" aria-hidden />
                      <select
                        value={selectedDeviceId}
                        onChange={(e) => void switchCamera(e.target.value)}
                        disabled={busy}
                        aria-label="Choose camera"
                        className="h-11 rounded-md border border-input bg-background px-3 text-sm"
                      >
                        {devices.map((d, i) => (
                          <option key={d.deviceId} value={d.deviceId}>
                            {d.label || `Camera ${i + 1}`}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : null}
                  <Button type="button" size="lg" variant="ghost" onClick={() => { stopCamera(); setCameraActive(false); }}>
                    Stop camera
                  </Button>
                </>
              )}
            </div>

            <div
              className={cn(
                "overflow-hidden rounded-md border border-border bg-black/40",
                cameraActive ? "block" : "hidden",
              )}
            >
              <video ref={videoRef} className="aspect-video w-full object-cover" playsInline muted />
            </div>

            <div className="flex flex-wrap items-center gap-3 border-t border-border/60 pt-5 text-sm text-muted-foreground">
              <Laptop className="h-4 w-4 shrink-0" />
              <span>
                Tip: on phone, <strong className="text-foreground/90">Take photo</strong> opens the camera. On desktop, use{" "}
                <strong className="text-foreground/90">Live camera</strong> or <strong className="text-foreground/90">Upload</strong>
                .
              </span>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-foreground md:text-xl">
              {cloudMode === true ? "Raffle gallery" : "Saved entries"}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">{gallerySubtitle}</p>
          </div>
          {showLocalCleanup ? (
            <Button type="button" variant="outline" size="sm" className="gap-2 self-start sm:self-auto" onClick={clearLocal}>
              <Trash2 className="h-4 w-4" />
              Clear all local
            </Button>
          ) : null}
        </div>

        {cards.length === 0 && cloudMode !== null ? (
          <Card className="border-dashed border-primary/30 bg-muted/20 p-10 text-center">
            <p className="text-muted-foreground">{cloudMode ? "No entries yet. Be the first to enter." : "No cards saved on this device yet."}</p>
          </Card>
        ) : null}

        {cards.length > 0 ? (
          <ul className="grid gap-4 sm:grid-cols-2">
            {cards.map((c) => (
              <li key={c.id}>
                <Card className="overflow-hidden border-border/80 bg-card/60">
                  <div className="relative aspect-[1.75/1] bg-black/30">
                    <img src={c.imageSrc} alt="Business card entry" className="h-full w-full object-contain" />
                    {cloudMode === false ? (
                      <Button
                        type="button"
                        size="icon"
                        variant="secondary"
                        className="absolute right-2 top-2 h-9 w-9 rounded-full shadow-md"
                        onClick={() => removeCardLocal(c.id)}
                        aria-label="Remove this card"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    ) : adminKey ? (
                      <Button
                        type="button"
                        size="icon"
                        variant="destructive"
                        disabled={busy}
                        className="absolute right-2 top-2 h-9 w-9 rounded-full shadow-md"
                        onClick={() => void removeCardCloud(c.id)}
                        aria-label="Remove this entry from the public raffle"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    ) : null}
                  </div>
                  <CardContent className="py-3">
                    <p className="text-xs text-muted-foreground">
                      Added{" "}
                      {new Date(c.createdAt).toLocaleString(undefined, {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        ) : null}
      </section>
    </div>
  );
};

export default FreeWebsiteRedesign;
