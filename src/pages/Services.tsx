import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";

type TierCard = {
  label: string;
  anchorPrice: string;
  priceIntro: string;
  title: string;
  vibe: string;
  youGet: [string, string, string];
};

/** Horizontal stroke — soft lime, quiet glow */
function TierMetaRule() {
  return (
    <div
      className="h-px w-full shrink-0 bg-gradient-to-r from-transparent from-[8%] via-[hsla(74,99%,49%,0.52)] via-50% to-transparent to-[92%] shadow-[0_0_24px_-10px_hsla(74,99%,49%,0.2)]"
      aria-hidden
    />
  );
}

/** Single lime vertical rule between desktop columns */
function TierColumnDivider() {
  return (
    <div
      className="hidden shrink-0 md:flex md:w-8 md:flex-col md:items-center md:justify-center md:self-stretch md:py-6"
      aria-hidden
    >
      <span className="h-[19rem] w-px shrink-0 bg-gradient-to-b from-transparent from-[8%] via-[hsla(74,99%,49%,0.52)] via-50% to-transparent to-[92%] shadow-[0_0_24px_-10px_hsla(74,99%,49%,0.2)]" />
    </div>
  );
}

const tiers: TierCard[] = [
  {
    label: "Starting",
    anchorPrice: "$500",
    priceIntro: "Starting at",
    title: "Figure it out together",
    vibe: "New to selling online—we map the basics in plain words.",
    youGet: [
      "Starter plan: offer · channel · sequencing",
      "$150–500 calls, jargon-free",
      "Short next-steps only",
    ],
  },
  {
    label: "Growing",
    anchorPrice: "$2,500",
    priceIntro: "Starting at",
    title: "Make sales steadier",
    vibe: "You’ve got fans—product revenue just won’t behave.",
    youGet: [
      "Offers · pricing · checkout tuned",
      "Clearer buyer path",
      "Shippable wins ($2K–4K tier)",
    ],
  },
  {
    label: "Scaling",
    anchorPrice: "$5,000",
    priceIntro: "Starting at",
    title: "Systems that hold volume",
    vibe: "Big revenue, messy stack—checkout, APIs, workflows.",
    youGet: [
      "Map: checkout · APIs · data · owners",
      "Architecture that survives volume—not hacks",
      "Plain specs—or hands-on build if engaged",
    ],
  },
];

function TierCardView({ tier, stepIndex }: { tier: TierCard; stepIndex: number }) {
  return (
    <article className="flex min-h-0 flex-1 flex-col px-1 pb-14 pt-2 md:px-5 md:pb-4 md:pt-2">
      <section aria-label={`${tier.label}, tier ${stepIndex}`} className="mb-7">
        <div className="flex items-center pb-4 md:pb-5">
          <div
            className="h-px min-w-0 flex-1 bg-gradient-to-r from-transparent from-[0%] via-[hsla(74,99%,49%,0.28)] via-70% to-[hsla(74,99%,49%,0.45)] to-[100%] shadow-[0_0_24px_-10px_hsla(74,99%,49%,0.2)]"
            aria-hidden
          />
          <span
            className="relative z-10 shrink-0 bg-black px-3 text-center text-[12px] font-semibold tabular-nums tracking-wide text-primary md:px-4 md:text-[13px]"
            aria-hidden
          >
            {stepIndex}
          </span>
          <div
            className="h-px min-w-0 flex-1 bg-gradient-to-l from-transparent from-[0%] via-[hsla(74,99%,49%,0.28)] via-70% to-[hsla(74,99%,49%,0.45)] to-[100%] shadow-[0_0_24px_-10px_hsla(74,99%,49%,0.2)]"
            aria-hidden
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-2.5 py-6 text-center md:gap-3 md:py-7">
          <span
            className="inline-flex items-center justify-center rounded-none border-[0.5px] border-primary/35 bg-[hsla(74,99%,49%,0.06)] px-3 py-1.5 text-[11px] font-bold leading-none tracking-[0.04em] text-primary neon-text-glow shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] md:px-3.5 md:py-2 md:text-[12px]"
          >
            {tier.label}
          </span>
          <p className="m-0 max-w-[min(100%,18rem)] text-center text-[14px] font-medium leading-snug text-[#ebeae8] md:text-[15px]">{tier.title}</p>
        </div>
        <TierMetaRule />
      </section>
      <p className="mb-1 text-center text-[14px] font-medium leading-snug text-[#e8e8e4] md:mb-1.5 md:text-[15px]">
        {tier.priceIntro}
      </p>
      <h2
        id={`tier-heading-${tier.label}`}
        className="text-center text-[1.85rem] font-bold tabular-nums leading-[1.1] tracking-tight text-primary neon-text-glow md:text-[2rem]"
      >
        {tier.anchorPrice}
      </h2>
      <p className="mt-3.5 text-[15px] leading-[1.7] text-white/[0.58]">&ldquo;{tier.vibe}&rdquo;</p>
      <p className="mt-9 text-[12px] font-medium tracking-[0.12em] text-white/50">What you get</p>
      <ul className="mt-3 flex flex-1 flex-col gap-3.5 text-[15px] leading-relaxed text-[#ebeae8]">
        {tier.youGet.map((line, i) => (
          <li key={`${tier.label}-${i}`} className="flex gap-3">
            <span className="mt-[0.45rem] h-1 w-1 shrink-0 bg-[hsl(74,99%,49%)]" aria-hidden />
            <span>{line}</span>
          </li>
        ))}
      </ul>
      <div className="mt-9 md:mt-10">
        <Button
          className="w-full rounded-none bg-[hsl(74,99%,49%)] text-[15px] font-semibold text-black transition-colors hover:bg-[hsl(74,99%,54%)]"
          asChild
        >
          <Link to="/contact">Book a call</Link>
        </Button>
      </div>
    </article>
  );
}

const Services = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#ebe9e4] via-[#e6e8e1] to-[#dce3d6] text-[#1a1a18]">
      <div
        className="pointer-events-none absolute -left-24 top-28 h-80 w-80 rounded-full bg-[hsla(74,55%,62%,0.42)] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 top-[36%] h-[22rem] w-[22rem] rounded-full bg-[hsla(74,45%,72%,0.38)] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[hsla(74,40%,68%,0.28)] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[hsla(0,0%,8%,0.06)] to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-20 h-px w-[min(72%,30rem)] -translate-x-1/2 bg-gradient-to-r from-transparent via-[hsla(74,99%,49%,0.28)] to-transparent"
        aria-hidden
      />

      <Navbar />

      <main className="relative z-10 pb-24 pt-28 md:pb-32 md:pt-32">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <header className="mx-auto mb-14 max-w-2xl text-center md:mb-16">
            <p className="mb-3 text-[12px] font-medium tracking-wide text-[hsl(74,38%,34%)]">Services</p>
            <h1 className="font-serif text-[2.125rem] font-medium leading-[1.14] tracking-tight text-[#121211] md:text-5xl md:leading-[1.1]">
              Hi—pick what feels closest
            </h1>
            <p className="mx-auto mt-5 max-w-md text-[15px] leading-[1.65] text-[#4d4b46]">
              Three rough stages. Selling online confused you? Same.{" "}
              <Link
                to="/contact"
                className="font-semibold underline decoration-[hsla(74,99%,49%,0.55)] decoration-2 underline-offset-[5px] transition-colors hover:decoration-[hsl(74,99%,49%)]"
                style={{ color: "hsl(74, 38%, 28%)" }}
              >
                Or just write me.
              </Link>
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button
                asChild
                variant="outline"
                className="rounded-md border-[hsla(74,99%,49%,0.45)] bg-white/90 px-5 font-medium text-[#1a1a18] shadow-[0_0_20px_-8px_hsla(74,99%,49%,0.35)] hover:border-[hsl(74,99%,49%)] hover:bg-white"
              >
                <Link to="/flowxsell-quiz">5-min quiz</Link>
              </Button>
            </div>
          </header>
        </div>

        <section
          aria-label="Service tiers"
          className="relative mt-2 border-y border-white/[0.08] bg-black text-[#f7f6f4] before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_120%_80%_at_50%_0%,hsla(74,35%,18%,0.12),transparent_55%)] before:content-['']"
        >
          <div className="relative z-10 mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
            <div className="mx-auto flex flex-col gap-y-16 md:flex-row md:items-stretch md:justify-center md:gap-y-0">
              {tiers.flatMap((tier, index) =>
                index < tiers.length - 1
                  ? [
                      <TierCardView key={tier.label} tier={tier} stepIndex={index + 1} />,
                      <TierColumnDivider key={`divider-after-${tier.label}`} />,
                    ]
                  : [<TierCardView key={tier.label} tier={tier} stepIndex={index + 1} />],
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-[hsla(74,99%,49%,0.12)] bg-[hsla(0,0%,100%,0.35)] px-6 py-10 backdrop-blur-[2px]">
        <p className="text-center text-xs text-[#5c5a54]">&copy; {new Date().getFullYear()} FlowXsell</p>
      </footer>
    </div>
  );
};

export default Services;
