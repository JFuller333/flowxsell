import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { toPng } from "html-to-image";
import { toast } from "sonner";
import { useState } from "react";
import { jsPDF } from "jspdf";
import flowxsellLogo from "@/assets/flowxsell-logo.png";
import fulltimeInvestmentsLogo from "@/assets/fulltime-investments-logo.png";
import { cn } from "@/lib/utils";

/** US standard business card: 3.5" × 2" */
const CARD_PREVIEW_CLASS =
  "w-full max-w-[420px] aspect-[3.5/2] rounded-lg overflow-hidden border border-primary/25 bg-black text-white relative";

const FTI_CARD_PREVIEW_CLASS =
  "w-full max-w-[420px] aspect-[3.5/2] rounded-lg overflow-hidden border border-[#8a7020]/40 bg-black text-white relative";

/** Letter ratio (8.5″ × 11″) — preview scales; export uses fixed px for sharp PDF. */
const FLYER_PREVIEW_CLASS =
  "w-full max-w-[560px] aspect-[8.5/11] rounded-lg overflow-hidden border border-neutral-200 bg-white text-neutral-900 shadow-sm relative";

const flowxsellFlyerOptions = [
  {
    option: "Option 1",
    title: "A basic website",
    detail: "Host on Wix or Shopify",
    price: "$500",
    benefits: [
      "Great for showcasing your salon suite and collecting inquiries",
      "Good for branding and simple online presence",
      "Delivery: 5 to 7 day turnaround",
    ],
  },
  {
    option: "Option 2",
    title: "A tenant management system",
    detail: "Custom hosted system",
    price: "$1,500",
    benefits: [
      "Great for managing tenants, maintenance requests, applications, and move outs in one place",
      "Good for staying organized without dealing with scattered texts or emails",
      "Delivery: 14 to 21 day turnaround",
    ],
  },
  {
    option: "Option 3",
    title: "A tenant management system + automation",
    detail: "Custom hosted system with automation",
    price: "$2,500",
    benefits: [
      "Great for automating requests, notifications, status updates, and follow ups",
      "Good for a more hands off experience as you grow",
      "Delivery: 21 to 30 day turnaround",
    ],
  },
] as const;

/** One-page flyer: white background, three packages + benefits (letter aspect for PDF). */
const FlowxsellWebsiteOptionsFlyer = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "relative flex h-full w-full flex-col overflow-hidden bg-white text-neutral-900",
      className,
    )}
  >
    <div className="relative z-10 flex shrink-0 flex-col items-center border-b border-neutral-200 bg-white px-8 pb-4 pt-6 text-center">
      <img
        src={flowxsellLogo}
        alt=""
        className="mb-2 h-9 w-auto object-contain"
      />
      <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary">FlowXsell</p>
      <h3 className="mt-1.5 text-[22px] font-bold uppercase leading-tight tracking-wide text-neutral-900">
        Website options
      </h3>
    </div>

    <div className="relative z-10 flex min-h-0 flex-1 flex-col justify-start gap-2.5 overflow-hidden px-8 py-4">
      {flowxsellFlyerOptions.map((row) => (
        <div
          key={row.option}
          className="flex shrink-0 flex-col gap-2 rounded-lg border border-neutral-200 bg-neutral-50/80 px-3.5 py-2.5"
        >
          <div className="flex flex-row items-start justify-between gap-3 border-b border-neutral-200 pb-2">
            <div className="flex min-w-0 flex-1 items-start gap-2">
              <span className="mt-0.5 shrink-0 rounded border border-primary/50 bg-primary/15 px-1.5 py-0.5 text-[9px] font-mono font-semibold uppercase tracking-wider text-neutral-900">
                {row.option}
              </span>
              <div className="min-w-0">
                <p className="text-[13px] font-semibold leading-tight text-neutral-900">{row.title}</p>
                {row.detail ? (
                  <p className="mt-0.5 text-[10px] leading-snug text-neutral-600">{row.detail}</p>
                ) : null}
              </div>
            </div>
            <p className="shrink-0 text-right text-[20px] font-bold tabular-nums leading-none text-primary">
              {row.price}
            </p>
          </div>
          <ul className="list-none space-y-1.5 pl-0.5">
            {row.benefits.map((line, i) => (
              <li key={`${row.option}-${i}`} className="flex gap-2 text-[9.5px] leading-snug text-neutral-600">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <div className="relative z-10 shrink-0 border-t border-neutral-200 px-8 py-2 text-center text-[9px] text-neutral-500">
      flowxsell@gmail.com · (323) 514-1461 · flowxsell.vercel.app
    </div>
  </div>
);

/** Logo + brand + contact on one 3.5″×2″ face (fixed px sizes so PDF capture matches preview). */
const FlowxsellBusinessCard = ({ className }: { className?: string }) => (
  <div className={cn("relative flex h-full w-full min-h-0 flex-row overflow-hidden bg-black text-white", className)}>
    <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-primary/5" />
    <div className="pointer-events-none absolute -top-10 -right-6 h-36 w-36 rounded-full bg-primary/15 blur-3xl" />

    <div className="relative z-10 flex h-full w-[40%] shrink-0 flex-col items-center justify-center gap-1.5 border-r border-primary/30 px-2 py-2 text-center">
      <img
        src={flowxsellLogo}
        alt=""
        className="h-12 w-auto object-contain drop-shadow-[0_0_12px_rgba(161,209,5,0.45)]"
      />
      <div className="text-[24px] font-bold leading-tight neon-text-glow">FlowXsell</div>
      <p className="max-w-[148px] text-[11px] font-mono uppercase leading-tight tracking-wide text-muted-foreground">
        Shopify Plus · Development · Systems
      </p>
    </div>

    <div className="relative z-10 flex min-h-0 min-w-0 flex-1 flex-col justify-center gap-1 px-2.5 py-2 text-left">
      <div className="text-[19px] font-bold leading-tight neon-text-glow">Jazlyn Fuller</div>
      <p className="text-[12px] leading-snug text-muted-foreground">
        Shopify Developer &amp; E‑commerce&nbsp;Specialist
      </p>
      <div className="mt-1 space-y-0.5 font-mono text-[11px] leading-snug text-muted-foreground">
        <p className="text-primary">flowxsell@gmail.com</p>
        <p>(323) 514-1461</p>
        <p className="break-words">linkedin.com/in/jazlyn-fuller</p>
        <p className="opacity-90">flowxsell.vercel.app</p>
      </div>
    </div>

    <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
  </div>
);

/** Logo + LLC line + tagline + contact on one 3.5″×2″ face (gold / black). */
const FulltimeInvestmentsBusinessCard = ({ className }: { className?: string }) => (
  <div className={cn("relative flex h-full w-full min-h-0 flex-row overflow-hidden bg-black", className)}>
    <div className="relative z-10 flex h-full min-h-0 w-[50%] shrink-0 flex-col border-r border-[#8a7020]/35 px-0 py-0.5">
      <div className="flex min-h-0 flex-1 items-center justify-center">
        <img
          src={fulltimeInvestmentsLogo}
          alt=""
          className="max-h-full max-w-full object-contain"
        />
      </div>
    </div>

    <div className="relative z-10 flex min-h-0 min-w-0 flex-1 flex-col justify-center gap-1 px-2 py-2 text-left">
      <p className="bg-gradient-to-b from-[#f4e4bc] via-[#d4af37] to-[#8a7020] bg-clip-text text-[10px] font-bold uppercase leading-tight tracking-[0.06em] text-transparent whitespace-nowrap">
        Fulltime&nbsp;Investments&nbsp;LLC
      </p>
      <div className="h-px w-[88%] max-w-[10rem] bg-gradient-to-r from-[#d4af37]/70 to-transparent" />
      <p className="max-w-[210px] text-[10px] font-semibold leading-snug tracking-[0.12em] text-[#c9a227]/95">
        Investor
      </p>
      <div className="mt-1 space-y-0.5 font-mono text-[10px] leading-snug text-[#d4af37]/90">
        <p>fulltimeinvestmentsllc@gmail.com</p>
        <p>(323) 514-1461</p>
        <p className="break-words opacity-95">www.fulltimeinvestments.com</p>
      </div>
    </div>
  </div>
);

/**
 * Rasterize a DOM node for PDFs. Far off-screen nodes often snapshot blank with html-to-image,
 * so we deep-clone into a short-lived on-screen node (just past the viewport) then remove it.
 */
const captureElementPng = async (
  elementId: string,
  pixelRatio: number = 3,
  backgroundColor: string = "#000000",
) => {
  const source = document.getElementById(elementId);
  if (!source) return null;

  const width = Math.ceil(source.offsetWidth);
  const height = Math.ceil(source.offsetHeight);
  if (width < 1 || height < 1) {
    console.error("Capture target has no layout size:", elementId, width, height);
    return null;
  }

  const clone = source.cloneNode(true) as HTMLElement;
  clone.removeAttribute("id");
  clone.setAttribute("aria-hidden", "true");

  const vw = typeof window !== "undefined" ? window.innerWidth : 0;
  Object.assign(clone.style, {
    position: "fixed",
    left: `${Math.max(vw, width) + 24}px`,
    top: "0",
    width: `${width}px`,
    height: `${height}px`,
    margin: "0",
    padding: "0",
    boxSizing: "border-box",
    zIndex: "2147483646",
    opacity: "1",
    pointerEvents: "none",
    transform: "none",
    backgroundColor,
  });

  document.body.appendChild(clone);

  try {
    await document.fonts.ready;
    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
    });
    await new Promise((r) => setTimeout(r, 80));

    return await toPng(clone, {
      quality: 1,
      pixelRatio,
      backgroundColor,
      width,
      height,
    });
  } catch (error) {
    console.error("Error capturing element:", elementId, error);
    return null;
  } finally {
    clone.remove();
  }
};

const PdfGeneration = () => {
  const [isDownloadingFlowxsell, setIsDownloadingFlowxsell] = useState(false);
  const [isDownloadingFlyer, setIsDownloadingFlyer] = useState(false);
  const [isDownloadingFti, setIsDownloadingFti] = useState(false);

  const handleBusinessCardsPdf = async () => {
    setIsDownloadingFlowxsell(true);
    try {
      const png = await captureElementPng("flowxsell-business-card-export");
      if (!png) throw new Error("Failed to capture business card");

      const w = 3.5;
      const h = 2;
      const pdf = new jsPDF({
        unit: "in",
        format: [w, h],
      });

      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      pdf.addImage(png, "PNG", 0, 0, pageW, pageH, undefined, "FAST");

      pdf.save("FlowXsell_Business_Card.pdf");
      toast.success("PDF downloaded — logo and contact on one card (3.5″ × 2″).");
    } catch (error) {
      console.error("Error generating business card PDF:", error);
      toast.error("PDF download failed. Try again in a moment.");
    } finally {
      setIsDownloadingFlowxsell(false);
    }
  };

  const handleFlowxsellFlyerPdf = async () => {
    setIsDownloadingFlyer(true);
    try {
      const png = await captureElementPng("flowxsell-flyer-export", 2, "#ffffff");
      if (!png) throw new Error("Failed to capture flyer");

      const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "letter" });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      pdf.addImage(png, "PNG", 0, 0, pageW, pageH, undefined, "FAST");

      pdf.save("FlowXsell_Website_Options_Flyer.pdf");
      toast.success("Flyer downloaded: US Letter, white background, one page.");
    } catch (error) {
      console.error("Error generating flyer PDF:", error);
      toast.error("PDF download failed. Try again in a moment.");
    } finally {
      setIsDownloadingFlyer(false);
    }
  };

  const handleFulltimeInvestmentsPdf = async () => {
    setIsDownloadingFti(true);
    try {
      const png = await captureElementPng("fti-business-card-export");
      if (!png) throw new Error("Failed to capture Fulltime Investments card");

      const w = 3.5;
      const h = 2;
      const pdf = new jsPDF({
        unit: "in",
        format: [w, h],
      });

      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      pdf.addImage(png, "PNG", 0, 0, pageW, pageH, undefined, "FAST");

      pdf.save("Fulltime_Investments_LLC_Business_Card.pdf");
      toast.success("PDF downloaded — logo and details on one side (3.5″ × 2″).");
    } catch (error) {
      console.error("Error generating FTI PDF:", error);
      toast.error("PDF download failed. Try again in a moment.");
    } finally {
      setIsDownloadingFti(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div
        id="flowxsell-business-card-export"
        className="pointer-events-none fixed top-0 z-0 h-[200px] w-[350px] overflow-hidden bg-black"
        style={{ left: "-10000px" }}
        aria-hidden
      >
        <FlowxsellBusinessCard className="h-full w-full" />
      </div>

      <div
        id="fti-business-card-export"
        className="pointer-events-none fixed top-0 z-0 h-[200px] w-[350px] overflow-hidden bg-black"
        style={{ left: "-10000px" }}
        aria-hidden
      >
        <FulltimeInvestmentsBusinessCard className="h-full w-full" />
      </div>

      <div
        id="flowxsell-flyer-export"
        className="pointer-events-none fixed top-0 z-0 h-[792px] w-[612px] overflow-hidden bg-white"
        style={{ left: "-10000px" }}
        aria-hidden
      >
        <FlowxsellWebsiteOptionsFlyer className="h-full w-full" />
      </div>

      <section className="px-4 pt-24 md:pt-28 pb-8 md:pb-12 border-b border-primary/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold neon-text-glow">PDF generation</h1>
            <p className="text-muted-foreground text-sm sm:text-lg max-w-2xl mx-auto">
              Business cards, a white FlowXsell options flyer (US Letter), and Fulltime Investments, all print-ready.
              Use 100% scale (no shrink-to-fit) where noted.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:py-16 max-w-7xl mx-auto border-b border-primary/10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
          <div className="space-y-2">
            <span className="text-xs font-mono text-primary uppercase tracking-[0.3em] px-3 py-1.5 border border-primary/30 rounded-full inline-block">
              Business card
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">FlowXsell</h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-xl">
              Preview matches the PDF: logo, FlowXsell, tagline, and contact info together on one side.
            </p>
          </div>

          <Button
            onClick={handleBusinessCardsPdf}
            disabled={isDownloadingFlowxsell}
            className="w-full lg:w-auto shrink-0 group"
          >
            <Download className="w-4 h-4 mr-2" />
            {isDownloadingFlowxsell ? "Preparing PDF…" : "Download PDF"}
          </Button>
        </div>

        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm p-4 sm:p-6 max-w-xl mx-auto">
          <p className="text-xs font-mono text-primary uppercase tracking-[0.2em] mb-3">Preview</p>
          <div className="flex justify-center">
            <FlowxsellBusinessCard className={CARD_PREVIEW_CLASS} />
          </div>
        </Card>
      </section>

      <section className="border-b border-primary/10 px-4 py-10 sm:py-16 max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <span className="inline-block rounded-full border border-primary/30 px-3 py-1.5 text-xs font-mono uppercase tracking-[0.3em] text-primary">
              Flyer
            </span>
            <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">FlowXsell website packages</h2>
            <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
              White US Letter flyer with three packages (basic site, tenant system, system + automation), benefits, and
              delivery windows. Preview matches the PDF.
            </p>
          </div>
          <Button
            onClick={handleFlowxsellFlyerPdf}
            disabled={isDownloadingFlyer}
            className="w-full shrink-0 group lg:w-auto"
          >
            <Download className="mr-2 h-4 w-4" />
            {isDownloadingFlyer ? "Preparing PDF…" : "Download flyer PDF"}
          </Button>
        </div>

        <Card className="mx-auto max-w-3xl border-primary/20 bg-card/50 p-4 sm:p-6">
          <p className="mb-3 text-xs font-mono uppercase tracking-[0.2em] text-primary">Preview</p>
          <div className="flex justify-center">
            <FlowxsellWebsiteOptionsFlyer className={FLYER_PREVIEW_CLASS} />
          </div>
        </Card>
      </section>

      <section className="px-4 py-10 sm:py-16 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-[0.3em] px-3 py-1.5 border border-[#8a7020]/50 rounded-full inline-block text-[#d4af37]">
              Fulltime Investments LLC
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">One-sided card</h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-xl">
              Logo on the left; company line, tagline, and contact on the right — all on a single 3.5″ × 2″ printable
              face. Preview matches the PDF.
            </p>
          </div>

          <Button
            onClick={handleFulltimeInvestmentsPdf}
            disabled={isDownloadingFti}
            variant="outline"
            className="w-full lg:w-auto shrink-0 border-[#8a7020]/50 text-[#d4af37] hover:bg-[#d4af37]/10 hover:text-[#f4e4bc]"
          >
            <Download className="w-4 h-4 mr-2" />
            {isDownloadingFti ? "Preparing PDF…" : "Download PDF"}
          </Button>
        </div>

        <Card className="mx-auto max-w-xl border-[#8a7020]/30 bg-card/50 p-4 sm:p-6">
          <p className="mb-3 text-xs font-mono uppercase tracking-[0.2em] text-[#d4af37]">Preview</p>
          <div className="flex justify-center">
            <FulltimeInvestmentsBusinessCard className={FTI_CARD_PREVIEW_CLASS} />
          </div>
        </Card>
      </section>
    </div>
  );
};

export default PdfGeneration;
