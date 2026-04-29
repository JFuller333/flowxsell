import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/** Vite serves `public/` at BASE_URL (usually `/`). */
function publicAssetUrl(path: string) {
  if (path.startsWith("http")) return path;
  const base = import.meta.env.BASE_URL ?? "/";
  const trimmed = path.replace(/^\//, "");
  return base.endsWith("/") ? `${base}${trimmed}` : `${base}/${trimmed}`;
}

export function withVideoCacheBust(url: string, bust: string) {
  if (!bust) return url;
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}bust=${encodeURIComponent(bust)}`;
}

async function assetExists(url: string) {
  try {
    let res = await fetch(url, { method: "HEAD", cache: "no-store" });
    if (res.ok) return true;
    if (res.status === 405 || res.status === 501) {
      res = await fetch(url, { method: "GET", cache: "no-store", headers: { Range: "bytes=0-0" } });
      return res.ok;
    }
    return false;
  } catch {
    return false;
  }
}

type PreviewMode = "checking" | "poster" | "gif" | "video";

export function WebsiteDesignCardMedia({
  snapshot,
  gif,
  video,
  videoSources,
  bundledVideoUrl,
  bundledVideoCacheBust,
  name,
}: {
  snapshot: string;
  gif?: string;
  video?: string;
  videoSources?: string[];
  bundledVideoUrl?: string;
  bundledVideoCacheBust?: string;
  name: string;
}) {
  const [mode, setMode] = useState<PreviewMode>(() => (bundledVideoUrl ? "video" : "checking"));
  const [resolvedVideoUrl, setResolvedVideoUrl] = useState<string | undefined>(() => bundledVideoUrl);
  const videoRef = useRef<HTMLVideoElement>(null);

  const snapshotSrc = publicAssetUrl(snapshot);
  const gifSrc = gif ? publicAssetUrl(gif) : undefined;
  const videoCandidates = useMemo(() => {
    const paths = [...(videoSources ?? []), ...(video ? [video] : [])];
    const unique = [...new Set(paths.filter(Boolean))];
    return unique.map((p) => publicAssetUrl(p));
  }, [video, videoSources]);

  useEffect(() => {
    if (bundledVideoUrl) {
      setResolvedVideoUrl(bundledVideoUrl);
      setMode("video");
      return;
    }

    let cancelled = false;

    const pick = async () => {
      setResolvedVideoUrl(undefined);
      if (gifSrc && (await assetExists(gifSrc))) {
        if (!cancelled) setMode("gif");
        return;
      }
      for (const url of videoCandidates) {
        if (await assetExists(url)) {
          if (!cancelled) {
            setResolvedVideoUrl(url);
            setMode("video");
          }
          return;
        }
      }
      if (!cancelled) setMode("poster");
    };

    void pick();
    return () => {
      cancelled = true;
    };
  }, [bundledVideoUrl, gifSrc, videoCandidates]);

  const tryPlay = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    void el.play().catch(() => {
      /* Muted autoplay usually succeeds; poster stays visible if blocked. */
    });
  }, []);

  useEffect(() => {
    if (mode !== "video") return;
    tryPlay();
  }, [mode, bundledVideoUrl, tryPlay]);

  const mediaClass =
    "h-full w-full object-cover object-top transition-transform duration-500 hover:scale-105";

  if (mode === "checking") {
    return (
      <div
        className={`${mediaClass} bg-muted animate-pulse`}
        aria-label={`Loading ${name} preview`}
      />
    );
  }

  if (mode === "gif" && gifSrc) {
    return (
      <img
        src={gifSrc}
        alt={`${name} animated preview`}
        loading="lazy"
        className={mediaClass}
      />
    );
  }

  if (mode === "video" && resolvedVideoUrl) {
    const videoPlaySrc = bundledVideoUrl
      ? withVideoCacheBust(resolvedVideoUrl, bundledVideoCacheBust ?? "1")
      : resolvedVideoUrl;
    return (
      <video
        ref={videoRef}
        key={`${resolvedVideoUrl}-${bundledVideoCacheBust ?? ""}`}
        src={videoPlaySrc}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className={mediaClass}
        onLoadedData={tryPlay}
      />
    );
  }

  return (
    <img
      src={snapshotSrc}
      alt={`${name} website snapshot`}
      loading="lazy"
      referrerPolicy="no-referrer"
      className={mediaClass}
    />
  );
}
