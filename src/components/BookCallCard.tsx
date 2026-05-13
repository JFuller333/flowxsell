import { type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const JAZLYN_LINKEDIN_URL = "https://www.linkedin.com/in/jazlyn-fuller/";

/**
 * Connection stack, three Unsplash portraits (commonly used inclusive / professional stock)
 * plus two RandomUser headshots for extra Black representation. Host your own under `public/` anytime.
 */
const CONNECTION_PREVIEW_PHOTOS = [
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=96&h=96&q=85&crop=faces",
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=96&h=96&q=85&crop=faces",
  "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=96&h=96&q=85&crop=faces",
  "https://randomuser.me/api/portraits/women/68.jpg",
  "https://randomuser.me/api/portraits/men/91.jpg",
] as const;

/** LinkedIn-style “in” mark (official blue), not generic social icon. */
function LinkedInLogoMark({ className }: { className?: string }) {
  return (
    <svg
      className={cn("shrink-0", className)}
      width={20}
      height={20}
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        fill="#0A66C2"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    </svg>
  );
}

function LinkedInConnectionPreview({ profileUrl }: { profileUrl: string }) {
  return (
    <div className="mt-5 flex w-full flex-col items-center gap-3 border-t border-border/60 pt-5">
      <a
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Jazlyn Fuller on LinkedIn (opens in a new tab)"
        className="inline-flex items-center gap-2.5 text-sm font-semibold transition-colors hover:opacity-90"
      >
        <LinkedInLogoMark className="h-[22px] w-[22px]" />
        <span className="text-foreground underline-offset-4 hover:underline">LinkedIn</span>
      </a>
      <div className="flex items-center gap-4">
        <div className="flex shrink-0 items-center pl-1" aria-hidden>
          {CONNECTION_PREVIEW_PHOTOS.map((src, i) => (
            <span
              key={src}
              className={cn(
                "relative inline-block overflow-hidden rounded-full border-2 border-card bg-muted shadow-md ring-1 ring-border/60 md:h-10 md:w-10",
                i > 0 && "-ml-2.5",
                "h-9 w-9",
              )}
              style={{ zIndex: i + 1 }}
            >
              <img
                src={src}
                alt=""
                width={40}
                height={40}
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </span>
          ))}
        </div>
        <div className="min-w-0 text-left">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Connections</p>
          <p className="text-sm font-semibold tabular-nums text-foreground md:text-base">
            500+ <span className="font-normal text-muted-foreground">on LinkedIn</span>
          </p>
        </div>
      </div>
    </div>
  );
}

type BookCallCardProps = {
  calendlyUrl: string;
  highlightTitle: string;
  personName: string;
  personTitle: string;
  bookButtonLabel: string;
  bookButtonIcon?: ReactNode;
  /** For analytics on the Calendly URL */
  trackingContext: string;
  className?: string;
  /** Renders LinkedIn link + connection preview; omit on pages where it does not apply. */
  linkedInUrl?: string;
};

function buildCalendlyHref(base: string, context: string): string {
  try {
    const u = new URL(base);
    u.searchParams.set("utm_source", "flowxsell-site");
    u.searchParams.set("utm_medium", "book");
    u.searchParams.set("utm_campaign", context);
    return u.toString();
  } catch {
    const join = base.includes("?") ? "&" : "?";
    return `${base}${join}utm_source=flowxsell-site&utm_medium=book&utm_campaign=${encodeURIComponent(context)}`;
  }
}

/** Lead capture: one clear book action, no pricing or payment UI. */
export function BookCallCard({
  calendlyUrl,
  highlightTitle,
  personName,
  personTitle,
  bookButtonLabel,
  bookButtonIcon,
  trackingContext,
  className,
  linkedInUrl,
}: BookCallCardProps) {
  const href = buildCalendlyHref(calendlyUrl, trackingContext);

  return (
    <Card
      className={cn(
        "border-2 border-primary/35 bg-card/90 p-8 text-center shadow-[0_0_44px_-14px_hsla(74,99%,49%,0.4)] backdrop-blur-sm md:p-10",
        className,
      )}
    >
      <div className="rounded-md border border-primary/40 bg-primary/[0.1] px-5 py-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] md:px-7 md:py-6">
        <p className="text-xl font-bold leading-tight tracking-tight text-primary neon-text-glow md:text-2xl lg:text-[1.65rem]">
          {highlightTitle}
        </p>
      </div>
      <p className="mt-7 text-lg font-semibold text-foreground md:text-xl">{personName}</p>
      <p className="mt-1 max-w-[20rem] text-pretty text-sm leading-snug text-muted-foreground md:max-w-none md:text-base">
        {personTitle}
      </p>
      {linkedInUrl ? <LinkedInConnectionPreview profileUrl={linkedInUrl} /> : null}
      <Button
        className="mt-8 w-full items-center justify-center gap-2 rounded-md bg-primary py-7 text-base font-semibold text-primary-foreground shadow-[0_0_28px_-8px_hsla(74,99%,49%,0.5)] transition-colors hover:bg-[hsl(74,99%,54%)] md:py-8 md:text-lg"
        asChild
      >
        <a href={href} target="_blank" rel="noopener noreferrer">
          {bookButtonIcon}
          {bookButtonLabel}
        </a>
      </Button>
    </Card>
  );
}
