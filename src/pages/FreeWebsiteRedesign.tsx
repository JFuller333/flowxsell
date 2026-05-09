import { Navbar } from "@/components/Navbar";
import { ParticleBackground } from "@/components/ParticleBackground";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Trash2, ImagePlus, Smartphone, Laptop, Loader2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "flowxsell-biz-cards-v1";
const MAX_STORED_CARDS = 40;
/** Long edge limit before JPEG compression (keeps localStorage usable). */
const MAX_IMAGE_EDGE_PX = 1600;
const JPEG_QUALITY = 0.82;

type StoredBusinessCard = {
  id: string;
  imageDataUrl: string;
  createdAt: string;
};

function loadCards(): StoredBusinessCard[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is StoredBusinessCard =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as StoredBusinessCard).id === "string" &&
        typeof (item as StoredBusinessCard).imageDataUrl === "string" &&
        typeof (item as StoredBusinessCard).createdAt === "string",
    );
  } catch {
    return [];
  }
}

function persistCards(cards: StoredBusinessCard[]): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
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

const FreeWebsiteRedesign = () => {
  const [cards, setCards] = useState<StoredBusinessCard[]>(() => []);
  const [hydrated, setHydrated] = useState(false);
  const [busy, setBusy] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const captureInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    document.title = "Free website redesign · Business card · FlowXsell";
  }, []);

  useEffect(() => {
    setCards(loadCards());
    setHydrated(true);
  }, []);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setCameraActive(false);
  }, []);

  useEffect(() => () => stopCamera(), [stopCamera]);

  const addFromBlob = async (blob: Blob) => {
    if (loadCards().length >= MAX_STORED_CARDS) {
      toast.error(`Maximum ${MAX_STORED_CARDS} cards. Remove one to add another.`);
      return;
    }
    setBusy(true);
    try {
      const imageDataUrl = await compressToJpegDataUrl(blob, MAX_IMAGE_EDGE_PX);
      const entry: StoredBusinessCard = {
        id: crypto.randomUUID(),
        imageDataUrl,
        createdAt: new Date().toISOString(),
      };
      setCards((prev) => {
        if (prev.length >= MAX_STORED_CARDS) {
          toast.error(`Maximum ${MAX_STORED_CARDS} cards. Remove one to add another.`);
          return prev;
        }
        const next = [entry, ...prev];
        if (!persistCards(next)) {
          toast.error("Could not save (storage full). Try removing older cards.");
          return prev;
        }
        toast.success("Card saved on this device.");
        return next;
      });
    } catch {
      toast.error("Could not read that image. Try another photo.");
    } finally {
      setBusy(false);
    }
  };

  const handleFilePick = async (list: FileList | null) => {
    const file = list?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    await addFromBlob(file);
  };

  const startCamera = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      toast.error("Camera isn’t supported in this browser. Use Take photo / Upload.");
      return;
    }
    setBusy(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });
      streamRef.current = stream;
      setCameraActive(true);
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
      async (blob) => {
        if (!blob) {
          toast.error("Capture failed. Try again.");
          return;
        }
        stopCamera();
        await addFromBlob(blob);
      },
      "image/jpeg",
      JPEG_QUALITY,
    );
  };

  const removeCard = (id: string) => {
    const next = cards.filter((c) => c.id !== id);
    if (!persistCards(next)) {
      toast.error("Could not update storage.");
      return;
    }
    setCards(next);
    toast.success("Removed.");
  };

  const clearAll = () => {
    if (!cards.length) return;
    if (!confirm("Remove all saved cards from this device?")) return;
    localStorage.removeItem(STORAGE_KEY);
    setCards([]);
    toast.success("All cards cleared.");
  };

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
          </div>
          <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-[2.85rem]">
            <span className="neon-text-glow text-primary">Free</span> website redesign for{" "}
            <span className="text-primary neon-text-glow">revenue optimization</span>
          </h1>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Snap or upload business cards—they’re saved here on your device so you can keep leads organized while you qualify
            the offer.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl space-y-8 px-4 pb-28">
        <Card className="overflow-hidden border-primary/25 bg-card/75 shadow-[0_0_44px_-24px_hsla(74,99%,49%,0.35)] backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl">Business card scanner</CardTitle>
            <CardDescription>
              Use your phone camera in the browser, upload a photo, or open a live camera on desktop.               Images are stored{" "}
              <span className="font-medium text-foreground/85">only in this browser</span>.
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
                onChange={(e) => {
                  void handleFilePick(e.target.files);
                  e.target.value = "";
                }}
              />
              <Button
                type="button"
                size="lg"
                disabled={busy}
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
                disabled={busy}
                className="gap-2"
                onClick={() => fileInputRef.current?.click()}
              >
                <ImagePlus className="h-5 w-5" />
                Upload image
              </Button>
              {!cameraActive ? (
                <Button type="button" size="lg" variant="outline" disabled={busy} className="gap-2" onClick={startCamera}>
                  <Camera className="h-5 w-5" />
                  <span className="hidden sm:inline">Live camera</span>
                  <span className="sm:hidden">Camera</span>
                </Button>
              ) : (
                <>
                  <Button type="button" size="lg" className="gap-2" onClick={captureFromVideo} disabled={busy}>
                    Capture frame
                  </Button>
                  <Button type="button" size="lg" variant="ghost" onClick={stopCamera}>
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
            <h2 className="text-lg font-semibold tracking-tight text-foreground md:text-xl">Saved on this page</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {hydrated ? (
                <>
                  {cards.length} card{cards.length === 1 ? "" : "s"} stored locally (max {MAX_STORED_CARDS}).
                </>
              ) : (
                "Loading…"
              )}
            </p>
          </div>
          {cards.length > 0 && (
            <Button type="button" variant="outline" size="sm" className="gap-2 self-start sm:self-auto" onClick={clearAll}>
              <Trash2 className="h-4 w-4" />
              Clear all
            </Button>
          )}
        </div>

        {cards.length === 0 && hydrated ? (
          <Card className="border-dashed border-primary/30 bg-muted/20 p-10 text-center">
            <p className="text-muted-foreground">No cards yet. Capture your first one above.</p>
          </Card>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2">
            {cards.map((c) => (
              <li key={c.id}>
                <Card className="overflow-hidden border-border/80 bg-card/60">
                  <div className="relative aspect-[1.75/1] bg-black/30">
                    <img src={c.imageDataUrl} alt="Saved business card" className="h-full w-full object-contain" />
                    <Button
                      type="button"
                      size="icon"
                      variant="secondary"
                      className="absolute right-2 top-2 h-9 w-9 rounded-full shadow-md"
                      onClick={() => removeCard(c.id)}
                      aria-label="Remove this card"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
        )}
      </section>
    </div>
  );
};

export default FreeWebsiteRedesign;
