import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { toPng } from "html-to-image";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { jsPDF } from "jspdf";
import flowxsellLogo from "@/assets/flowxsell-logo.png";

const Resume = () => {
  const [isDownloadingResume, setIsDownloadingResume] = useState(false);

  const captureResumePng = async () => {
    const element = document.getElementById("one-page-resume");
    if (!element) return;

    try {
      return await toPng(element, {
        quality: 1,
        pixelRatio: 3,
        backgroundColor: "#000000",
      });
    } catch (error) {
      console.error("Error capturing resume:", error);
      return null;
    }
  };

  const handleResumeDownloadPng = async () => {
    setIsDownloadingResume(true);
    try {
      const dataUrl = await captureResumePng();
      if (!dataUrl) throw new Error("Failed to capture resume");

      const link = document.createElement("a");
      link.download = "Jazlyn_Fuller_Shopify_Development_Resume.png";
      link.href = dataUrl;
      link.click();

      toast.success("Resume downloaded (PNG)!");
    } catch (error) {
      console.error("Error downloading resume PNG:", error);
      toast.error("Download failed. Try again in a moment.");
    } finally {
      setIsDownloadingResume(false);
    }
  };

  const handleResumeDownloadPdf = async () => {
    setIsDownloadingResume(true);
    try {
      const dataUrl = await captureResumePng();
      if (!dataUrl) throw new Error("Failed to capture resume");

      const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "letter" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(dataUrl, "PNG", 0, 0, pageWidth, pageHeight, undefined, "FAST");
      pdf.save("Jazlyn_Fuller_Shopify_Development_Resume.pdf");

      toast.success("Resume downloaded (PDF)!");
    } catch (error) {
      console.error("Error downloading resume PDF:", error);
      toast.error("PDF download failed. Try the PNG option.");
    } finally {
      setIsDownloadingResume(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="px-4 pt-24 md:pt-28 pb-8 md:pb-12 border-b border-primary/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold neon-text-glow">Resume</h1>
            <p className="text-muted-foreground text-sm sm:text-lg">
              Recruiters: download my one‑page resume instantly as a PDF (or PNG) for easy sharing and printing.
            </p>
          </div>
        </div>
      </section>

      {/* Resume */}
      <section className="px-4 py-10 sm:py-16 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2">
              <span className="text-xs font-mono text-primary uppercase tracking-[0.3em] px-3 py-1.5 border border-primary/30 rounded-full">
                Downloadable
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Jazlyn Fuller – Shopify Development Resume</h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <Button
              onClick={handleResumeDownloadPdf}
              disabled={isDownloadingResume}
              className="w-full md:w-auto group"
            >
              <Download className="w-4 h-4 mr-2" />
              {isDownloadingResume ? "Preparing..." : "Download PDF"}
            </Button>
            <Button
              onClick={handleResumeDownloadPng}
              disabled={isDownloadingResume}
              variant="ghost"
              className="w-full md:w-auto border border-primary/20"
            >
              <Download className="w-4 h-4 mr-2" />
              PNG
            </Button>
          </div>
        </div>

        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm overflow-hidden">
          <div className="p-4 sm:p-6">
            <div className="mx-auto w-full max-w-[900px]">
              <div
                id="one-page-resume"
                className="aspect-[8.5/11] w-full rounded-lg overflow-hidden border border-primary/20 bg-black text-white relative"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
                <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary/10 rounded-full blur-[120px]" />
                <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-primary/10 rounded-full blur-[120px]" />

                <div className="relative h-full p-6 sm:p-10 flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-6 pb-5 border-b border-primary/20">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16 border border-primary/30">
                        <AvatarImage src="/jazlyn-headshot.jpg" alt="Jazlyn Fuller" />
                        <AvatarFallback className="bg-primary/10 text-primary font-bold">JF</AvatarFallback>
                      </Avatar>

                      <div className="min-w-0">
                        <div className="text-2xl sm:text-3xl font-bold neon-text-glow leading-tight">
                          Jazlyn Fuller
                        </div>
                        <div className="text-sm sm:text-base text-muted-foreground">
                          Shopify Developer &amp; E‑commerce Specialist
                        </div>
                        <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                          <span className="font-mono text-primary">flowxsell@gmail.com</span>
                          <span className="opacity-60">|</span>
                          <span className="font-mono">linkedin.com/in/jazlyn-fuller</span>
                          <span className="opacity-60">|</span>
                          <span className="font-mono">(323) 514-1461</span>
                        </div>
                      </div>
                    </div>

                    <div className="hidden sm:flex flex-col items-end gap-2">
                      <img
                        src={flowxsellLogo}
                        alt="FlowXsell"
                        className="h-14 w-auto object-contain drop-shadow-[0_0_12px_rgba(181,255,46,0.4)]"
                      />
                    </div>
                  </div>

                  {/* Body */}
                  <div className="flex-1 pt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {/* Left column */}
                    <div className="sm:col-span-1 space-y-5">
                      <div className="inline-flex">
                        <span className="text-[10px] font-mono text-primary uppercase tracking-[0.3em] px-3 py-1.5 border border-primary/30 rounded-full">
                          Shopify Plus Expert
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        Front‑end Shopify development specializing in high‑traffic storefront UX, B2B/wholesale flows,
                        subscriptions, and conversion‑focused PDP + cart experiences.
                      </p>
                      <div>
                        <div className="text-xs font-mono text-primary uppercase tracking-[0.3em] mb-2">
                          Core Skills
                        </div>
                        <ul className="space-y-1.5 text-xs text-muted-foreground">
                          <li>• Shopify Plus, Liquid, Theme architecture</li>
                          <li>• JavaScript, HTML/CSS, JSON</li>
                          <li>• Custom sections &amp; template systems</li>
                          <li>• Bundles, subscriptions, upsells</li>
                          <li>• B2B: wholesale pricing + account gating</li>
                          <li>• SEO + performance optimization</li>
                          <li>• GitHub workflows</li>
                        </ul>
                      </div>

                      <div className="rounded-lg border border-primary/20 bg-card/10 p-4">
                        <div className="text-xs font-mono text-primary uppercase tracking-[0.3em] mb-2">
                          Impact
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-primary neon-text-glow">$1.3M+</div>
                          <div className="text-[10px] text-muted-foreground">Online sales managed</div>
                        </div>
                      </div>

                      <div>
                        <div className="text-xs font-mono text-primary uppercase tracking-[0.3em] mb-2">
                          Technical Frameworks
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {[
                            "Liquid",
                            "JSON",
                            "HTML",
                            "CSS",
                            "React",
                            "Next.js",
                            "Hydrogen",
                            "Remix",
                            "Storefront API",
                            "GraphQL",
                            "Node.js",
                          ].map((item) => (
                            <span
                              key={item}
                              className="text-[10px] font-mono px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/30"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right column */}
                    <div className="sm:col-span-2 space-y-5">
                      <div>
                        <div className="text-xs font-mono text-primary uppercase tracking-[0.3em] mb-2">
                          Selected Technical Clients
                        </div>
                        <div className="grid gap-3">
                          <div className="rounded-lg border border-primary/20 bg-card/10 p-4">
                            <div className="flex items-center justify-between gap-3">
                              <div className="min-w-0">
                                <div className="font-semibold">TRU Supplements</div>
                                <div className="text-[10px] font-mono text-primary truncate">gettrusupps.com</div>
                              </div>
                              <span className="text-[10px] font-mono px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/30">
                                Custom Bundles
                              </span>
                            </div>
                            <ul className="mt-2 text-xs text-muted-foreground space-y-1">
                              <li>• Built a custom bundle feature + bundle-ready layouts</li>
                              <li>• Created reusable custom sections for rapid merchandising</li>
                              <li>• Redesigned sister company website (high-traffic performance focus)</li>
                              <li>• Launched Sculpt fitness challenge generating $100K in supplement sales &amp; $50K in program revenue</li>
                            </ul>
                          </div>

                          <div className="rounded-lg border border-primary/20 bg-card/10 p-4">
                            <div className="flex items-center justify-between gap-3">
                              <div className="min-w-0">
                                <div className="font-semibold">METPURE, INC.</div>
                                <div className="text-[10px] font-mono text-primary truncate">metpure.com</div>
                              </div>
                              <span className="text-[10px] font-mono px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/30">
                                B2B + Conversion Opt
                              </span>
                            </div>
                            <ul className="mt-2 text-xs text-muted-foreground space-y-1">
                              <li>• Wholesale discount rules + eligibility gating</li>
                              <li>• B2B account registration + approval-ready segmentation</li>
                              <li>• Scalable storefront maintenance across thousands of SKUs</li>
                              <li>• Managed and optimized 3,000+ product listings</li>
                            </ul>
                          </div>

                          <div className="rounded-lg border border-primary/20 bg-card/10 p-4">
                            <div className="flex items-center justify-between gap-3">
                              <div className="min-w-0">
                                <div className="font-semibold">Let’s Rebuild Tuskegee</div>
                                <div className="text-[10px] font-mono text-primary truncate">donate.rebuildtuskegee.org</div>
                              </div>
                              <span className="text-[10px] font-mono px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/30">
                                Headless Storefront
                              </span>
                            </div>
                            <ul className="mt-2 text-xs text-muted-foreground space-y-1">
                              <li>• End‑to‑end headless Shopify build (architecture → storefront → launch)</li>
                              <li>• Storefront API + GraphQL integration powering performant UX</li>
                              <li>• Modern React frameworks for scalable UI components</li>
                            </ul>
                          </div>

                          <div className="rounded-lg border border-primary/20 bg-card/10 p-4">
                            <div className="flex items-center justify-between gap-3">
                              <div className="min-w-0">
                                <div className="font-semibold">InstaBalloons Wholesale</div>
                                <div className="text-[10px] font-mono text-primary truncate">instaballoons.com</div>
                              </div>
                              <span className="text-[10px] font-mono px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/30">
                                Wholesale
                              </span>
                            </div>
                            <ul className="mt-2 text-xs text-muted-foreground space-y-1">
                              <li>• Bulk ordering workflows + customer-specific pricing</li>
                              <li>• Custom pricing tiers supporting wholesale operations</li>
                              <li>• Helped redesign navigation menu UX for improved product discovery</li>
                            </ul>
                          </div>

                          <div className="rounded-lg border border-primary/20 bg-card/10 p-4 relative">
                            <span className="absolute top-3 right-3 text-[10px] font-mono px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/30">
                              Subscription Portal
                            </span>
                            <div className="min-w-0 pr-28">
                              <div className="font-semibold">Curls Monthly</div>
                              <div className="text-[10px] font-mono text-primary truncate">curlsmonthly.com</div>
                            </div>
                            <ul className="mt-2 text-xs text-muted-foreground space-y-1">
                              <li>• ReCharge subscription migration + customer portal updates</li>
                              <li>• Custom subscription flow + product selection enhancements (Liquid + JavaScript)</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="pt-5 border-t border-primary/20 flex items-center justify-between text-[10px] text-muted-foreground font-mono">
                    <span>flowxsell.vercel.app</span>
                    <span className="text-primary">Building systems that flow.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default Resume;

