import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  ClipboardCopy,
  Clapperboard,
  Film,
  Loader2,
  Sparkles,
  ExternalLink,
  Trash2,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "flowxsell-motion-clips-v1";

const STYLE_PRESETS = [
  {
    id: "cinematic-fintech",
    label: "Cinematic Fintech Flow",
    blurb: "Dark luxury, shallow depth, slow camera, chartreuse accents, HUD-style typography.",
    prompt:
      "Cinematic motion graphics, fintech SaaS vibe: seamless camera drift through abstract data ribbons and soft glass panels. Near-black environment, subtle film grain, one acid-lime accent for key strokes and highlights. Premium, restrained, no clutter. Smooth easing, editorial pacing.",
  },
  {
    id: "logo-reveal",
    label: "Logo Reveal",
    blurb: "Short kinetic build, particles resolve into lockup.",
    prompt:
      "Minimal logo reveal: particles coalesce into a clean wordmark silhouette, neon rim light kiss, matte black stage, reflective floor, single spotlight sweep. 4–6 seconds narrative arc, confident hold at end.",
  },
  {
    id: "kinetic-type",
    label: "Kinetic Typography",
    blurb: "Bold lines, rhythmic cuts, synced to implied beat.",
    prompt:
      "Kinetic typography on black: oversized grotesk letterforms, tight tracking, rhythmic cuts synced to an implied electronic beat. High contrast monochrome with one electric chartreuse punctuation moment per phrase.",
  },
  {
    id: "abstract-flow",
    label: "Abstract Flow",
    blurb: "Organic meshes, ribbons, looping ambient loop.",
    prompt:
      "Abstract looping motion graphic: luminous ribbon flows through volumetric fog, slow parallax layers, hypnotic seamless loop suitable for backgrounds. Palette: charcoal, graphite mist, singular chartreuse filament.",
  },
] as const;

const FLOWXSELL_BRAND_SUFFIX =
  " Match FlowXsell brand: Space Grotesk–like proportions, neon chartreuse (~hsl 74 99% 49%) sparingly on black, subtle outer glow only on accents, geometric UI shapes, ecommerce operator / systems-thinking context without literal stock footage of people.";

type AspectKey = "16:9" | "9:16" | "1:1" | "4:5";

const ASPECT_CLASSES: Record<AspectKey, string> = {
  "16:9": "aspect-video",
  "9:16": "aspect-[9/16]",
  "1:1": "aspect-square",
  "4:5": "aspect-[4/5]",
};

type ClipJob = {
  id: string;
  createdAt: string;
  prompt: string;
  aspectRatio: AspectKey;
  durationSec: number;
  presetId: string | null;
  videoUrl: string | null;
  status: "draft" | "queued" | "ready" | "error";
  errorMessage?: string;
};

function uid() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

function loadJobs(): ClipJob[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ClipJob[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveJobs(jobs: ClipJob[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
}

function pickVideoUrl(data: unknown): string | null {
  if (!data || typeof data !== "object") return null;
  const o = data as Record<string, unknown>;
  const direct =
    typeof o.videoUrl === "string"
      ? o.videoUrl
      : typeof o.url === "string"
        ? o.url
        : typeof o.video === "string"
          ? o.video
          : null;
  if (direct) return direct;
  const clips = o.clips;
  if (Array.isArray(clips) && clips[0] && typeof clips[0] === "object") {
    const first = clips[0] as Record<string, unknown>;
    const u =
      typeof first.url === "string"
        ? first.url
        : typeof first.videoUrl === "string"
          ? first.videoUrl
          : null;
    if (u) return u;
  }
  return null;
}

const MotionGraphicsStudio = () => {
  const apiBase = import.meta.env.VITE_MOTION_GRAPHICS_API_URL as string | undefined;
  const hasApi = Boolean(apiBase?.trim());

  const [prompt, setPrompt] = useState(STYLE_PRESETS[0].prompt);
  const [selectedPresetId, setSelectedPresetId] = useState<string>(STYLE_PRESETS[0].id);
  const [aspectRatio, setAspectRatio] = useState<AspectKey>("16:9");
  const [durationSec, setDurationSec] = useState(8);
  const [brandLocked, setBrandLocked] = useState(true);
  const [jobs, setJobs] = useState<ClipJob[]>(() => loadJobs());
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    saveJobs(jobs);
  }, [jobs]);

  useEffect(() => {
    if (jobs.length === 0) return;
    if (!activeId || !jobs.some((j) => j.id === activeId)) setActiveId(jobs[0].id);
  }, [jobs, activeId]);

  const composedPrompt = useMemo(() => {
    const trimmed = prompt.trim();
    if (!trimmed) return "";
    const dur = `${durationSec} second`;
    const ar = `${aspectRatio} composition`;
    const base = `${trimmed}\n\nTechnical: ${dur}, ${ar}.`;
    return brandLocked ? `${base}${FLOWXSELL_BRAND_SUFFIX}` : base;
  }, [prompt, durationSec, aspectRatio, brandLocked]);

  const activeJob = jobs.find((j) => j.id === activeId) ?? jobs[0] ?? null;

  const appendJob = useCallback((job: ClipJob) => {
    setJobs((prev) => [job, ...prev]);
    setActiveId(job.id);
  }, []);

  const applyPreset = (id: string) => {
    setSelectedPresetId(id);
    const p = STYLE_PRESETS.find((x) => x.id === id);
    if (p) setPrompt(p.prompt);
  };

  const copyComposedPrompt = async () => {
    try {
      await navigator.clipboard.writeText(composedPrompt);
      toast.success("Full prompt copied");
    } catch {
      toast.error("Could not copy to clipboard");
    }
  };

  const clearHistory = () => {
    setJobs([]);
    setActiveId(null);
    localStorage.removeItem(STORAGE_KEY);
    toast.success("History cleared");
  };

  const handleGenerate = async () => {
    if (!composedPrompt.trim()) {
      toast.error("Add a prompt first");
      return;
    }

    const job: ClipJob = {
      id: uid(),
      createdAt: new Date().toISOString(),
      prompt: composedPrompt,
      aspectRatio,
      durationSec,
      presetId: selectedPresetId,
      videoUrl: null,
      status: hasApi ? "queued" : "draft",
    };
    appendJob(job);

    if (!hasApi) {
      toast.message("Draft saved — API not configured", {
        description: "Set VITE_MOTION_GRAPHICS_API_URL in .env and rebuild, or paste the prompt into your generator.",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`${apiBase!.replace(/\/$/, "")}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: composedPrompt,
          aspectRatio,
          durationSec,
          presetId: selectedPresetId,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg =
          typeof (data as { error?: string }).error === "string"
            ? (data as { error: string }).error
            : `Request failed (${res.status})`;
        throw new Error(msg);
      }

      const url = pickVideoUrl(data);
      setJobs((prev) =>
        prev.map((j) =>
          j.id === job.id
            ? {
                ...j,
                status: url ? "ready" : "error",
                videoUrl: url,
                errorMessage: url ? undefined : "Response had no video URL (expected videoUrl or url)",
              }
            : j,
        ),
      );
      if (url) toast.success("Clip URL received");
      else toast.error("No video URL in API response");
    } catch (e) {
      const message = e instanceof Error ? e.message : "Generation failed";
      setJobs((prev) =>
        prev.map((j) =>
          j.id === job.id ? { ...j, status: "error", errorMessage: message } : j,
        ),
      );
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-28 pb-16 px-4 max-w-6xl mx-auto">
        <header className="mb-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="border-primary/40 text-primary gap-1">
              <Sparkles className="h-3 w-3" />
              Motion studio
            </Badge>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-wider neon-text-glow">
            Motion graphics
          </h1>
          <p className="text-muted-foreground max-w-2xl text-sm md:text-base leading-relaxed">
            Compose prompts for short motion clips in a layout similar to tools like{" "}
            <a
              href="https://motionvid.ai"
              target="_blank"
              rel="noreferrer noopener"
              className="text-primary hover:underline inline-flex items-center gap-0.5"
            >
              MotionVid <ExternalLink className="h-3 w-3" />
            </a>
            . This page drafts prompts, keeps recent runs locally, and can POST to your own backend when
            you define <code className="text-xs text-primary/90">VITE_MOTION_GRAPHICS_API_URL</code>.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,340px)]">
          <div className="space-y-6">
            <Card className="border-primary/15 bg-card/80">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Clapperboard className="h-5 w-5 text-primary" />
                  Prompt
                </CardTitle>
                <CardDescription>
                  Start from a preset, then refine. Toggle FlowXsell brand cues to prepend style constraints.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex flex-wrap gap-2">
                  {STYLE_PRESETS.map((p) => (
                    <Button
                      key={p.id}
                      type="button"
                      size="sm"
                      variant={selectedPresetId === p.id ? "default" : "outline"}
                      className={cn(
                        selectedPresetId !== p.id && "border-primary/25 hover:border-primary/50",
                      )}
                      onClick={() => applyPreset(p.id)}
                    >
                      {p.label}
                    </Button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  {STYLE_PRESETS.find((p) => p.id === selectedPresetId)?.blurb}
                </p>

                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <Label htmlFor="mg-prompt">Scene / motion brief</Label>
                    <Button
                      type="button"
                      size="sm"
                      variant={brandLocked ? "default" : "outline"}
                      className="h-8 gap-1"
                      onClick={() => setBrandLocked((v) => !v)}
                    >
                      FlowXsell brand {brandLocked ? "on" : "off"}
                    </Button>
                  </div>
                  <Textarea
                    id="mg-prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={10}
                    className="resize-y bg-background/60 border-primary/15 font-mono text-sm leading-relaxed"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Aspect ratio</Label>
                    <Select
                      value={aspectRatio}
                      onValueChange={(v) => setAspectRatio(v as AspectKey)}
                    >
                      <SelectTrigger className="border-primary/15 bg-background/60">
                        <SelectValue placeholder="Aspect" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="16:9">16:9 (landscape)</SelectItem>
                        <SelectItem value="9:16">9:16 (vertical)</SelectItem>
                        <SelectItem value="1:1">1:1 (square)</SelectItem>
                        <SelectItem value="4:5">4:5 (social)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (seconds)</Label>
                    <Select
                      value={String(durationSec)}
                      onValueChange={(v) => setDurationSec(Number(v))}
                    >
                      <SelectTrigger id="duration" className="border-primary/15 bg-background/60">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[4, 6, 8, 10, 12, 15].map((n) => (
                          <SelectItem key={n} value={String(n)}>
                            {n}s
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator className="bg-primary/10" />

                <div className="flex flex-wrap gap-3">
                  <Button
                    type="button"
                    size="lg"
                    className="gap-2"
                    disabled={isSubmitting}
                    onClick={handleGenerate}
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Film className="h-4 w-4" />
                    )}
                    {hasApi ? "Generate clip" : "Save draft to history"}
                  </Button>
                  <Button type="button" variant="outline" size="lg" className="gap-2" onClick={copyComposedPrompt}>
                    <ClipboardCopy className="h-4 w-4" />
                    Copy final prompt
                  </Button>
                </div>

                {!hasApi ? (
                  <p className="text-xs text-muted-foreground rounded-md border border-primary/15 bg-secondary/40 p-3">
                    Backend hook: expose <span className="text-foreground font-mono text-[11px]">POST /generate</span>{" "}
                    on your URL that accepts JSON{" "}
                    <span className="text-foreground font-mono text-[11px]">
                      {"{"} prompt, aspectRatio, durationSec, presetId {"}"}
                    </span>
                    {" "}and returns JSON with <span className="font-mono text-[11px] text-foreground">videoUrl</span>{" "}
                    or <span className="font-mono text-[11px] text-foreground">url</span>. Set{" "}
                    <span className="font-mono text-[11px] text-primary">VITE_MOTION_GRAPHICS_API_URL</span> in{" "}
                    <span className="font-mono text-[11px]">flowxsell/.env</span>.
                  </p>
                ) : null}
              </CardContent>
            </Card>

            <Card className="border-primary/15 bg-card/60">
              <CardHeader className="flex-row items-center justify-between space-y-0 pb-3">
                <div>
                  <CardTitle className="text-base">Recent clips</CardTitle>
                  <CardDescription>Stored in this browser only.</CardDescription>
                </div>
                {jobs.length > 0 ? (
                  <Button type="button" variant="ghost" size="sm" className="text-muted-foreground gap-1" onClick={clearHistory}>
                    <Trash2 className="h-4 w-4" />
                    Clear
                  </Button>
                ) : null}
              </CardHeader>
              <CardContent className="max-h-[280px] overflow-y-auto space-y-2 pr-1">
                {jobs.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-6 text-center">
                    No drafts yet — generate one to populate this list.
                  </p>
                ) : (
                  jobs.map((j) => (
                    <button
                      key={j.id}
                      type="button"
                      onClick={() => setActiveId(j.id)}
                      className={cn(
                        "w-full text-left rounded-lg border px-3 py-2 transition-colors text-sm",
                        activeId === j.id || (!activeId && jobs[0]?.id === j.id)
                          ? "border-primary/50 bg-primary/10"
                          : "border-primary/15 bg-secondary/40 hover:bg-secondary/70",
                      )}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span className="font-medium line-clamp-1">
                          {STYLE_PRESETS.find((p) => p.id === j.presetId)?.label ?? "Custom"}
                        </span>
                        <Badge
                          variant="outline"
                          className={cn(
                            "shrink-0 text-[10px] uppercase tracking-wide",
                            j.status === "ready" && "border-primary/60 text-primary",
                            j.status === "error" && "border-destructive/60 text-destructive",
                          )}
                        >
                          {j.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2 font-mono">
                        {j.prompt.slice(0, 140)}
                        {j.prompt.length > 140 ? "…" : ""}
                      </p>
                    </button>
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          <aside className="lg:sticky lg:top-28 h-fit space-y-4">
            <Card className="overflow-hidden border-primary/20 shadow-[0_0_40px_-12px_hsla(var(--neon-glow),0.35)]">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Preview frame</CardTitle>
                <CardDescription>Approximate framing for your ratio.</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className={cn(
                    "relative mx-auto max-h-[min(52vh,480px)] w-full overflow-hidden rounded-md border border-primary/25 bg-black",
                    ASPECT_CLASSES[aspectRatio],
                  )}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,hsla(var(--primary),0.15),transparent_55%)]" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
                    {activeJob?.status === "ready" && activeJob.videoUrl ? (
                      <video
                        key={activeJob.videoUrl}
                        controls
                        className="absolute inset-0 h-full w-full object-contain bg-black"
                        src={activeJob.videoUrl}
                      />
                    ) : (
                      <>
                        <Film className="h-12 w-12 text-primary/80" />
                        <p className="text-xs text-muted-foreground max-w-[14rem]">
                          {activeJob?.status === "error"
                            ? activeJob.errorMessage ?? "Something went wrong"
                            : activeJob?.status === "queued"
                              ? "Waiting on your API…"
                              : "Generated video appears here after your backend returns a URL."}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/15">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Active prompt preview</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="text-[11px] leading-relaxed text-muted-foreground whitespace-pre-wrap break-words max-h-[220px] overflow-y-auto rounded-md bg-secondary/50 border border-primary/10 p-3 font-mono">
                  {composedPrompt || "—"}
                </pre>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default MotionGraphicsStudio;
