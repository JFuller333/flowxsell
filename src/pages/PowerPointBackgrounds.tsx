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

const PowerPointBackgrounds = () => {
  const [isDownloadingResume, setIsDownloadingResume] = useState(false);

  const handleDownload = (slideNumber: number) => {
    // In a real implementation, this would trigger a download
    console.log(`Downloading slide ${slideNumber}`);
  };

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
      link.download = "Jazlyn_Fuller_Technical_Resume.png";
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
      pdf.save("Jazlyn_Fuller_Technical_Resume.pdf");

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
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold neon-text-glow">PowerPoint Backgrounds</h1>
            <p className="text-muted-foreground text-sm sm:text-lg">
              10 professionally designed slides in the FlowXsell aesthetic. 
              Right-click and save each slide for your presentations.
            </p>
          </div>
        </div>
      </section>

      {/* One-page resume (downloadable) */}
      <section id="resume" className="px-4 py-10 sm:py-16 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2">
              <span className="text-xs font-mono text-primary uppercase tracking-[0.3em] px-3 py-1.5 border border-primary/30 rounded-full">
                Downloadable
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">One‑Page Technical Resume</h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
              Built in the same FlowXsell branding. Download as a 1‑page image (perfect for saving as PDF from Preview/Print).
            </p>
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
              {/* Letter ratio (8.5x11) for a true 1-page export */}
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
                        {/* If you add `public/jazlyn-headshot.jpg`, it will appear here */}
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
                        <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                          <div className="font-mono">(323) 514-1461</div>
                          <div className="font-mono text-primary">flowxsell@gmail.com</div>
                          <div className="font-mono">linkedin.com/in/jazlyn-fuller</div>
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
                    <span className="text-primary">This isn’t a funnel, it’s a system.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Slides Grid */}
      <section className="px-4 py-8 sm:py-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
          
          {/* Slide 1: Title Slide */}
          <Card className="group relative overflow-hidden border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary transition-all duration-300">
            <div className="aspect-video bg-background relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
              <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
              
              <div className="relative h-full flex flex-col items-center justify-center text-center px-4 sm:px-8 md:px-12 space-y-4 sm:space-y-6">
                <div className="inline-block">
                  <span className="text-[10px] sm:text-xs font-mono text-primary uppercase tracking-[0.2em] sm:tracking-[0.3em] px-2 py-1 sm:px-3 sm:py-1.5 border border-primary/30 rounded-full">
                    Presentation Title
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold neon-text-glow uppercase tracking-wider">Your Title Here</h2>
                <p className="text-muted-foreground text-sm">Subtitle or tagline</p>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Slide 1: Title Slide</span>
              <Button size="sm" variant="ghost" onClick={() => handleDownload(1)}>
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </Card>

          {/* Slide 2: Section Divider */}
          <Card className="group relative overflow-hidden border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary transition-all duration-300">
            <div className="aspect-video bg-background relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
              
              <div className="relative h-full flex items-center justify-center">
                <div className="text-center space-y-4 px-4">
                  <span className="text-xs sm:text-sm font-mono text-primary uppercase tracking-[0.3em]">Phase 01</span>
                  <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold uppercase tracking-wider">Section Title</h3>
                </div>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Slide 2: Section Divider</span>
              <Button size="sm" variant="ghost" onClick={() => handleDownload(2)}>
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </Card>

          {/* Slide 3: Content Slide */}
          <Card className="group relative overflow-hidden border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary transition-all duration-300">
            <div className="aspect-video bg-background relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
              
              <div className="relative h-full p-4 sm:p-6 md:p-12 flex flex-col">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-8 border-b border-primary/20 pb-4">Content Title</h3>
                <div className="space-y-4 flex-1">
                  <div className="flex items-start gap-3">
                    <span className="text-primary mt-1">→</span>
                    <span className="text-muted-foreground">Key point or bullet item</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary mt-1">→</span>
                    <span className="text-muted-foreground">Another important detail</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary mt-1">→</span>
                    <span className="text-muted-foreground">Supporting information</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Slide 3: Content Slide</span>
              <Button size="sm" variant="ghost" onClick={() => handleDownload(3)}>
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </Card>

          {/* Slide 4: Two Column Layout */}
          <Card className="group relative overflow-hidden border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary transition-all duration-300">
            <div className="aspect-video bg-background relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
              
              <div className="relative h-full p-4 sm:p-6 md:p-12">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-8">Two Column Layout</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 min-h-0">
                  <div className="border-r border-primary/20 pr-6">
                    <div className="space-y-3">
                      <div className="h-2 w-3/4 bg-primary/20 rounded" />
                      <div className="h-2 w-full bg-muted/20 rounded" />
                      <div className="h-2 w-5/6 bg-muted/20 rounded" />
                    </div>
                  </div>
                  <div className="pl-2">
                    <div className="space-y-3">
                      <div className="h-2 w-2/3 bg-primary/20 rounded" />
                      <div className="h-2 w-full bg-muted/20 rounded" />
                      <div className="h-2 w-4/5 bg-muted/20 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Slide 4: Two Column</span>
              <Button size="sm" variant="ghost" onClick={() => handleDownload(4)}>
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </Card>

          {/* Slide 5: Quote/Highlight Slide */}
          <Card className="group relative overflow-hidden border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary transition-all duration-300">
            <div className="aspect-video bg-background relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
              
              <div className="relative h-full flex items-center justify-center px-4 sm:px-8 md:px-16">
                <div className="text-center space-y-4 sm:space-y-6">
                  <div className="text-4xl sm:text-6xl text-primary/30 font-serif">"</div>
                  <p className="text-base sm:text-xl md:text-2xl font-medium leading-relaxed">
                    Your powerful quote or key message goes here
                  </p>
                  <div className="pt-4">
                    <p className="text-sm text-primary font-mono uppercase tracking-widest">— Source</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Slide 5: Quote Slide</span>
              <Button size="sm" variant="ghost" onClick={() => handleDownload(5)}>
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </Card>

          {/* Slide 6: Stats/Metrics */}
          <Card className="group relative overflow-hidden border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary transition-all duration-300">
            <div className="aspect-video bg-background relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
              
              <div className="relative h-full p-4 sm:p-6 md:p-12">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-10 text-center">Key Metrics</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
                  <div className="text-center space-y-2 p-4 sm:p-6 border border-primary/20 rounded-lg bg-card/30">
                    <div className="text-2xl sm:text-4xl font-bold text-primary neon-text-glow">87%</div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Metric One</p>
                  </div>
                  <div className="text-center space-y-2 p-4 sm:p-6 border border-primary/20 rounded-lg bg-card/30">
                    <div className="text-2xl sm:text-4xl font-bold text-primary neon-text-glow">2.4x</div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Metric Two</p>
                  </div>
                  <div className="text-center space-y-2 p-4 sm:p-6 border border-primary/20 rounded-lg bg-card/30">
                    <div className="text-2xl sm:text-4xl font-bold text-primary neon-text-glow">$1M+</div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Metric Three</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Slide 6: Stats/Metrics</span>
              <Button size="sm" variant="ghost" onClick={() => handleDownload(6)}>
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </Card>

          {/* Slide 7: Timeline/Process */}
          <Card className="group relative overflow-hidden border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary transition-all duration-300">
            <div className="aspect-video bg-background relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent top-1/2" />
              
              <div className="relative h-full p-4 sm:p-6 md:p-12">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-10">Process Timeline</h3>
                <div className="flex flex-wrap items-center justify-center sm:justify-between gap-4 sm:gap-0 relative">
                  {[1, 2, 3, 4].map((step) => (
                    <div key={step} className="flex flex-col items-center space-y-3 z-10">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-primary bg-background flex items-center justify-center neon-glow">
                        <span className="text-primary font-bold">{step}</span>
                      </div>
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">Step {step}</span>
                    </div>
                  ))}
                  <div className="absolute top-6 left-0 right-0 h-px bg-primary/30 -z-0" />
                </div>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Slide 7: Timeline</span>
              <Button size="sm" variant="ghost" onClick={() => handleDownload(7)}>
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </Card>

          {/* Slide 8: Image Left, Text Right */}
          <Card className="group relative overflow-hidden border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary transition-all duration-300">
            <div className="aspect-video bg-background relative overflow-hidden">
              <div className="relative h-full grid grid-cols-1 sm:grid-cols-2">
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 sm:border-r border-primary/20 flex items-center justify-center p-4">
                  <div className="text-center space-y-2">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-lg border-2 border-primary/30 bg-card/50" />
                    <p className="text-xs text-muted-foreground">Image / Chart Area</p>
                  </div>
                </div>
                <div className="p-4 sm:p-6 md:p-8 flex flex-col justify-center space-y-4">
                  <h3 className="text-xl sm:text-2xl font-bold">Content Title</h3>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="h-2 w-full bg-muted/20 rounded" />
                    <div className="h-2 w-5/6 bg-muted/20 rounded" />
                    <div className="h-2 w-4/5 bg-muted/20 rounded" />
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Slide 8: Image + Text</span>
              <Button size="sm" variant="ghost" onClick={() => handleDownload(8)}>
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </Card>

          {/* Slide 9: Full Bleed Accent */}
          <Card className="group relative overflow-hidden border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary transition-all duration-300">
            <div className="aspect-video bg-background relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/10" />
              <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary/20 rounded-full blur-[150px]" />
              
              <div className="relative h-full flex items-center justify-center px-4 sm:px-8 md:px-16">
                <div className="text-center space-y-4 sm:space-y-6">
                  <div className="inline-block p-3 sm:p-4 rounded-lg border border-primary/30 bg-background/50 backdrop-blur-sm">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/20 rounded" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-wider">Bold Statement</h3>
                  <p className="text-muted-foreground">Supporting detail or subtitle</p>
                </div>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Slide 9: Full Accent</span>
              <Button size="sm" variant="ghost" onClick={() => handleDownload(9)}>
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </Card>

          {/* Slide 10: Thank You / Contact */}
          <Card className="group relative overflow-hidden border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary transition-all duration-300">
            <div className="aspect-video bg-background relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
              
              <div className="relative h-full flex flex-col items-center justify-center space-y-6 sm:space-y-8 px-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-wider neon-text-glow">Thank You</h2>
                <div className="space-y-2 text-center">
                  <p className="text-sm text-muted-foreground">Your Name</p>
                  <p className="text-sm text-primary font-mono">contact@email.com</p>
                  <p className="text-sm text-muted-foreground">website.com</p>
                </div>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Slide 10: Thank You</span>
              <Button size="sm" variant="ghost" onClick={() => handleDownload(10)}>
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </Card>

        </div>
      </section>

      {/* Instructions */}
      <section className="px-4 py-8 sm:py-16 max-w-4xl mx-auto">
        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm p-4 sm:p-6 md:p-8">
          <h3 className="text-xl sm:text-2xl font-bold mb-4">How to Use These Backgrounds</h3>
          <div className="space-y-3 text-muted-foreground">
            <p>1. <strong className="text-foreground">Right-click</strong> on any slide preview above and select "Save Image As..."</p>
            <p>2. <strong className="text-foreground">Import</strong> the image into PowerPoint as a background</p>
            <p>3. <strong className="text-foreground">Add your content</strong> on top using the same color scheme:</p>
            <ul className="ml-8 space-y-2 mt-4">
              <li>• Font: Space Grotesk (or similar sans-serif)</li>
              <li>• Primary Text: White (#F5F5F5)</li>
              <li>• Accent Color: Neon Yellow-Green (#CEFC03)</li>
              <li>• Secondary Text: Medium Gray (#999999)</li>
            </ul>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default PowerPointBackgrounds;
