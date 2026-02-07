import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Navbar } from "@/components/Navbar";

const PowerPointBackgrounds = () => {
  const handleDownload = (slideNumber: number) => {
    // In a real implementation, this would trigger a download
    console.log(`Downloading slide ${slideNumber}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <section className="px-4 pt-24 md:pt-28 pb-8 md:pb-12 border-b border-primary/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold neon-text-glow">PowerPoint Backgrounds</h1>
            <p className="text-muted-foreground text-lg">
              10 professionally designed slides in the FlowXsell aesthetic. 
              Right-click and save each slide for your presentations.
            </p>
          </div>
        </div>
      </section>

      {/* Slides Grid */}
      <section className="px-4 py-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Slide 1: Title Slide */}
          <Card className="group relative overflow-hidden border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary transition-all duration-300">
            <div className="aspect-video bg-background relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
              <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
              
              <div className="relative h-full flex flex-col items-center justify-center text-center px-12 space-y-6">
                <div className="inline-block">
                  <span className="text-xs font-mono text-primary uppercase tracking-[0.3em] px-3 py-1.5 border border-primary/30 rounded-full">
                    Presentation Title
                  </span>
                </div>
                <h2 className="text-4xl font-bold neon-text-glow uppercase tracking-wider">Your Title Here</h2>
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
                <div className="text-center space-y-4">
                  <span className="text-sm font-mono text-primary uppercase tracking-[0.3em]">Phase 01</span>
                  <h3 className="text-5xl font-bold uppercase tracking-wider">Section Title</h3>
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
              
              <div className="relative h-full p-12 flex flex-col">
                <h3 className="text-3xl font-bold mb-8 border-b border-primary/20 pb-4">Content Title</h3>
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
              
              <div className="relative h-full p-12">
                <h3 className="text-3xl font-bold mb-8">Two Column Layout</h3>
                <div className="grid grid-cols-2 gap-8 h-[calc(100%-5rem)]">
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
              
              <div className="relative h-full flex items-center justify-center px-16">
                <div className="text-center space-y-6">
                  <div className="text-6xl text-primary/30 font-serif">"</div>
                  <p className="text-2xl font-medium leading-relaxed">
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
              
              <div className="relative h-full p-12">
                <h3 className="text-3xl font-bold mb-10 text-center">Key Metrics</h3>
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center space-y-2 p-6 border border-primary/20 rounded-lg bg-card/30">
                    <div className="text-4xl font-bold text-primary neon-text-glow">87%</div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Metric One</p>
                  </div>
                  <div className="text-center space-y-2 p-6 border border-primary/20 rounded-lg bg-card/30">
                    <div className="text-4xl font-bold text-primary neon-text-glow">2.4x</div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Metric Two</p>
                  </div>
                  <div className="text-center space-y-2 p-6 border border-primary/20 rounded-lg bg-card/30">
                    <div className="text-4xl font-bold text-primary neon-text-glow">$1M+</div>
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
              
              <div className="relative h-full p-12">
                <h3 className="text-3xl font-bold mb-10">Process Timeline</h3>
                <div className="flex items-center justify-between relative">
                  {[1, 2, 3, 4].map((step) => (
                    <div key={step} className="flex flex-col items-center space-y-3 z-10">
                      <div className="w-12 h-12 rounded-full border-2 border-primary bg-background flex items-center justify-center neon-glow">
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
              <div className="relative h-full grid grid-cols-2">
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 border-r border-primary/20 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <div className="w-32 h-32 mx-auto rounded-lg border-2 border-primary/30 bg-card/50" />
                    <p className="text-xs text-muted-foreground">Image / Chart Area</p>
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center space-y-4">
                  <h3 className="text-2xl font-bold">Content Title</h3>
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
              
              <div className="relative h-full flex items-center justify-center px-16">
                <div className="text-center space-y-6">
                  <div className="inline-block p-4 rounded-lg border border-primary/30 bg-background/50 backdrop-blur-sm">
                    <div className="w-16 h-16 bg-primary/20 rounded" />
                  </div>
                  <h3 className="text-4xl font-bold uppercase tracking-wider">Bold Statement</h3>
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
              
              <div className="relative h-full flex flex-col items-center justify-center space-y-8">
                <h2 className="text-5xl font-bold uppercase tracking-wider neon-text-glow">Thank You</h2>
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
      <section className="px-4 py-16 max-w-4xl mx-auto">
        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm p-8">
          <h3 className="text-2xl font-bold mb-4">How to Use These Backgrounds</h3>
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
