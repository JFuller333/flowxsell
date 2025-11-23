import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThumbsUp, Bell, Share2, MessageCircle, Play, ArrowRight, Star, Zap, CheckCircle2, ListChecks, Download } from "lucide-react";
import { useState } from "react";
import { toPng } from "html-to-image";
import { toast } from "sonner";

const YouTubeCallouts = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleDownload = async (elementId: string, fileName: string) => {
    const element = document.getElementById(elementId);
    if (!element) return;

    try {
      const dataUrl = await toPng(element, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: '#000000'
      });
      
      const link = document.createElement('a');
      link.download = `${fileName}.png`;
      link.href = dataUrl;
      link.click();
      
      toast.success("Downloaded successfully!");
    } catch (error) {
      console.error('Error downloading:', error);
      toast.error("Failed to download. Try right-clicking and saving the image.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="px-4 py-12 border-b border-primary/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold neon-text-glow">YouTube Callout Graphics</h1>
            <p className="text-muted-foreground text-lg">
              Animated callouts for your video content. Click download buttons to save as PNG files.
            </p>
          </div>
        </div>
      </section>

      {/* Callouts Grid */}
      <section className="px-4 py-16 max-w-7xl mx-auto space-y-16">
        
        {/* Lower Third - Name/Title */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">Lower Third</h2>
            <Badge variant="outline" className="text-primary border-primary/30">Animated</Badge>
          </div>
          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm overflow-hidden">
            <div id="lower-third" className="bg-background p-8 relative overflow-hidden h-64">
              <div className="absolute bottom-8 left-8 animate-in slide-in-from-left duration-700 space-y-1">
                <div className="bg-primary px-6 py-2 neon-glow">
                  <h3 className="text-xl font-bold text-black uppercase tracking-wider">John Doe</h3>
                </div>
                <div className="bg-card/90 backdrop-blur-sm px-6 py-1.5 border-l-4 border-primary">
                  <p className="text-sm text-muted-foreground uppercase tracking-wide">Founder & Creator</p>
                </div>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between border-t border-primary/20">
              <span className="text-sm text-muted-foreground">Lower Third Name Plate</span>
              <Button size="sm" variant="ghost" onClick={() => handleDownload('lower-third', 'youtube-lower-third')}>
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>

        {/* Subscribe Button Animations */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">Subscribe Callouts</h2>
            <Badge variant="outline" className="text-primary border-primary/30">3 Variants</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Pulse Subscribe */}
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm overflow-hidden">
              <div id="subscribe-pulse" className="bg-background p-8 flex items-center justify-center h-48 relative overflow-hidden">
                <div className="text-center space-y-3 animate-pulse">
                  <div className="inline-flex items-center gap-3 bg-primary px-8 py-4 rounded-full neon-glow">
                    <Bell className="w-6 h-6 text-black" />
                    <span className="text-xl font-bold text-black uppercase tracking-wider">Subscribe</span>
                  </div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">Click the bell!</p>
                </div>
              </div>
              <div className="p-3 flex items-center justify-between border-t border-primary/20">
                <span className="text-xs text-muted-foreground">Pulse</span>
                <Button size="sm" variant="ghost" onClick={() => handleDownload('subscribe-pulse', 'subscribe-pulse')}>
                  <Download className="w-3 h-3" />
                </Button>
              </div>
            </Card>

            {/* Bounce Subscribe */}
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm overflow-hidden">
              <div 
                id="subscribe-bounce"
                className="bg-background p-8 flex items-center justify-center h-48 relative overflow-hidden"
                onMouseEnter={() => setHoveredCard(1)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="text-center space-y-3 transition-transform hover:scale-110 duration-300">
                  <div className={`inline-flex items-center gap-3 bg-card border-2 border-primary px-8 py-4 rounded-lg ${hoveredCard === 1 ? 'neon-glow' : ''}`}>
                    <Bell className="w-6 h-6 text-primary" />
                    <span className="text-xl font-bold text-primary uppercase tracking-wider">Subscribe</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
              <div className="p-3 flex items-center justify-between border-t border-primary/20">
                <span className="text-xs text-muted-foreground">Bounce</span>
                <Button size="sm" variant="ghost" onClick={() => handleDownload('subscribe-bounce', 'subscribe-bounce')}>
                  <Download className="w-3 h-3" />
                </Button>
              </div>
            </Card>

            {/* Arrow Subscribe */}
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm overflow-hidden">
              <div id="subscribe-arrow" className="bg-background p-8 flex items-center justify-center h-48 relative overflow-hidden">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center gap-3 bg-primary px-8 py-4 rounded-lg neon-glow">
                    <Bell className="w-6 h-6 text-black" />
                    <span className="text-xl font-bold text-black uppercase tracking-wider">Subscribe</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <ArrowRight className="w-8 h-8 text-primary animate-bounce" />
                  </div>
                </div>
              </div>
              <div className="p-3 flex items-center justify-between border-t border-primary/20">
                <span className="text-xs text-muted-foreground">Arrow</span>
                <Button size="sm" variant="ghost" onClick={() => handleDownload('subscribe-arrow', 'subscribe-arrow')}>
                  <Download className="w-3 h-3" />
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Social Engagement Callouts */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">Engagement Callouts</h2>
            <Badge variant="outline" className="text-primary border-primary/30">Interactive</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            {/* Like */}
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm overflow-hidden">
              <div 
                id="engagement-like"
                className="bg-background p-6 flex flex-col items-center justify-center h-40 cursor-pointer"
                onMouseEnter={() => setHoveredCard(2)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={`p-4 rounded-full bg-primary/10 border border-primary/30 mb-3 transition-all duration-300 ${hoveredCard === 2 ? 'neon-glow scale-110' : ''}`}>
                  <ThumbsUp className="w-8 h-8 text-primary" />
                </div>
                <span className="text-lg font-bold uppercase tracking-wider">Like</span>
              </div>
              <div className="p-2 flex items-center justify-center border-t border-primary/20">
                <Button size="sm" variant="ghost" onClick={() => handleDownload('engagement-like', 'engagement-like')}>
                  <Download className="w-3 h-3" />
                </Button>
              </div>
            </Card>

            {/* Comment */}
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm overflow-hidden">
              <div 
                id="engagement-comment"
                className="bg-background p-6 flex flex-col items-center justify-center h-40 cursor-pointer"
                onMouseEnter={() => setHoveredCard(3)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={`p-4 rounded-full bg-primary/10 border border-primary/30 mb-3 transition-all duration-300 ${hoveredCard === 3 ? 'neon-glow scale-110' : ''}`}>
                  <MessageCircle className="w-8 h-8 text-primary" />
                </div>
                <span className="text-lg font-bold uppercase tracking-wider">Comment</span>
              </div>
              <div className="p-2 flex items-center justify-center border-t border-primary/20">
                <Button size="sm" variant="ghost" onClick={() => handleDownload('engagement-comment', 'engagement-comment')}>
                  <Download className="w-3 h-3" />
                </Button>
              </div>
            </Card>

            {/* Share */}
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm overflow-hidden">
              <div 
                id="engagement-share"
                className="bg-background p-6 flex flex-col items-center justify-center h-40 cursor-pointer"
                onMouseEnter={() => setHoveredCard(4)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={`p-4 rounded-full bg-primary/10 border border-primary/30 mb-3 transition-all duration-300 ${hoveredCard === 4 ? 'neon-glow scale-110' : ''}`}>
                  <Share2 className="w-8 h-8 text-primary" />
                </div>
                <span className="text-lg font-bold uppercase tracking-wider">Share</span>
              </div>
              <div className="p-2 flex items-center justify-center border-t border-primary/20">
                <Button size="sm" variant="ghost" onClick={() => handleDownload('engagement-share', 'engagement-share')}>
                  <Download className="w-3 h-3" />
                </Button>
              </div>
            </Card>

            {/* Watch */}
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm overflow-hidden">
              <div 
                id="engagement-watch"
                className="bg-background p-6 flex flex-col items-center justify-center h-40 cursor-pointer"
                onMouseEnter={() => setHoveredCard(5)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={`p-4 rounded-full bg-primary/10 border border-primary/30 mb-3 transition-all duration-300 ${hoveredCard === 5 ? 'neon-glow scale-110' : ''}`}>
                  <Play className="w-8 h-8 text-primary" />
                </div>
                <span className="text-lg font-bold uppercase tracking-wider">Watch</span>
              </div>
              <div className="p-2 flex items-center justify-center border-t border-primary/20">
                <Button size="sm" variant="ghost" onClick={() => handleDownload('engagement-watch', 'engagement-watch')}>
                  <Download className="w-3 h-3" />
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Text Callout Bubbles */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">Text Callouts</h2>
            <Badge variant="outline" className="text-primary border-primary/30">Speech Bubbles</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Top Left Callout */}
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm overflow-hidden">
              <div id="text-top-left" className="bg-background p-8 h-64 relative overflow-hidden">
                <div className="absolute top-8 left-8 animate-in slide-in-from-top duration-700">
                  <div className="relative bg-primary px-6 py-4 rounded-lg neon-glow max-w-xs">
                    <p className="text-black font-bold text-lg">Important Point!</p>
                    <p className="text-black/80 text-sm mt-1">Key insight or message here</p>
                    <div className="absolute -bottom-2 left-8 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-primary" />
                  </div>
                </div>
              </div>
              <div className="p-3 flex items-center justify-between border-t border-primary/20">
                <span className="text-xs text-muted-foreground">Top Left Bubble</span>
                <Button size="sm" variant="ghost" onClick={() => handleDownload('text-top-left', 'text-top-left')}>
                  <Download className="w-3 h-3" />
                </Button>
              </div>
            </Card>

            {/* Center Highlight */}
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm overflow-hidden">
              <div id="text-center-highlight" className="bg-background p-8 h-64 relative overflow-hidden flex items-center justify-center">
                <div className="text-center animate-in zoom-in duration-500">
                  <div className="inline-block bg-card/90 backdrop-blur-sm border-2 border-primary px-8 py-6 rounded-lg neon-glow">
                    <Star className="w-12 h-12 text-primary mx-auto mb-3" />
                    <h3 className="text-2xl font-bold uppercase tracking-wider mb-2">Pro Tip</h3>
                    <p className="text-muted-foreground text-sm">Expert advice goes here</p>
                  </div>
                </div>
              </div>
              <div className="p-3 flex items-center justify-between border-t border-primary/20">
                <span className="text-xs text-muted-foreground">Center Highlight</span>
                <Button size="sm" variant="ghost" onClick={() => handleDownload('text-center-highlight', 'text-center-highlight')}>
                  <Download className="w-3 h-3" />
                </Button>
              </div>
            </Card>

            {/* Side Note */}
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm overflow-hidden">
              <div id="text-side-note" className="bg-background p-8 h-64 relative overflow-hidden">
                <div className="absolute right-8 top-1/2 -translate-y-1/2 animate-in slide-in-from-right duration-700">
                  <div className="bg-card border-l-4 border-primary px-6 py-4 backdrop-blur-sm max-w-xs">
                    <div className="flex items-start gap-3">
                      <Zap className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold text-foreground mb-1">Quick Insight</p>
                        <p className="text-sm text-muted-foreground">Additional context or explanation</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-3 flex items-center justify-between border-t border-primary/20">
                <span className="text-xs text-muted-foreground">Side Note</span>
                <Button size="sm" variant="ghost" onClick={() => handleDownload('text-side-note', 'text-side-note')}>
                  <Download className="w-3 h-3" />
                </Button>
              </div>
            </Card>

            {/* Bottom Banner */}
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm overflow-hidden">
              <div id="text-bottom-banner" className="bg-background p-8 h-64 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 right-0 bg-primary/10 backdrop-blur-sm border-t-2 border-primary p-6 animate-in slide-in-from-bottom duration-700">
                  <div className="flex items-center justify-between max-w-2xl mx-auto">
                    <div>
                      <h4 className="font-bold text-lg uppercase tracking-wider">Key Takeaway</h4>
                      <p className="text-sm text-muted-foreground mt-1">Summary or action item</p>
                    </div>
                    <ArrowRight className="w-8 h-8 text-primary" />
                  </div>
                </div>
              </div>
              <div className="p-3 flex items-center justify-between border-t border-primary/20">
                <span className="text-xs text-muted-foreground">Bottom Banner</span>
                <Button size="sm" variant="ghost" onClick={() => handleDownload('text-bottom-banner', 'text-bottom-banner')}>
                  <Download className="w-3 h-3" />
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Topic Sidebar Callouts */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">Topic Sidebar</h2>
            <Badge variant="outline" className="text-primary border-primary/30">Animated List</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Sidebar with Bullet Points */}
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm overflow-hidden">
              <div id="sidebar-bullets" className="bg-background p-8 h-96 relative overflow-hidden">
                <div className="absolute left-8 top-8 bottom-8 w-64">
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <ListChecks className="w-6 h-6 text-primary" />
                      <h3 className="text-xl font-bold uppercase tracking-wider text-primary neon-text-glow">
                        Topics
                      </h3>
                    </div>
                    <div className="w-16 h-1 bg-primary neon-glow" />
                  </div>
                  
                  <ul className="space-y-3">
                    {["Introduction", "Main Concept", "Key Benefits", "How It Works", "Real Examples", "Summary"].map((topic, index) => (
                      <li 
                        key={index}
                        className="flex items-start gap-3 animate-in slide-in-from-left"
                        style={{ 
                          animationDelay: `${index * 150}ms`,
                          animationDuration: '500ms',
                          animationFillMode: 'backwards'
                        }}
                      >
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5 drop-shadow-[0_0_6px_rgba(181,255,46,0.5)]" />
                        <span className="text-foreground text-sm leading-relaxed">
                          {topic}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="p-3 flex items-center justify-between border-t border-primary/20">
                <span className="text-xs text-muted-foreground">Bullet List</span>
                <Button size="sm" variant="ghost" onClick={() => handleDownload('sidebar-bullets', 'sidebar-bullets')}>
                  <Download className="w-3 h-3" />
                </Button>
              </div>
            </Card>

            {/* Sidebar with Numbers */}
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm overflow-hidden">
              <div id="sidebar-numbers" className="bg-background p-8 h-96 relative overflow-hidden">
                <div className="absolute left-8 top-8 bottom-8 w-64">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold uppercase tracking-wider neon-text-glow mb-2">
                      Agenda
                    </h3>
                    <div className="w-16 h-1 bg-primary neon-glow" />
                  </div>
                  
                  <ul className="space-y-3">
                    {["Getting Started", "Core Features", "Advanced Tips", "Common Mistakes", "Best Practices"].map((topic, index) => (
                      <li 
                        key={index}
                        className="flex items-start gap-4 animate-in slide-in-from-left"
                        style={{ 
                          animationDelay: `${index * 150}ms`,
                          animationDuration: '500ms',
                          animationFillMode: 'backwards'
                        }}
                      >
                        <div className="w-8 h-8 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center flex-shrink-0 neon-glow">
                          <span className="text-primary font-bold text-sm">{index + 1}</span>
                        </div>
                        <span className="text-foreground text-sm leading-relaxed pt-1">
                          {topic}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="p-3 flex items-center justify-between border-t border-primary/20">
                <span className="text-xs text-muted-foreground">Numbered List</span>
                <Button size="sm" variant="ghost" onClick={() => handleDownload('sidebar-numbers', 'sidebar-numbers')}>
                  <Download className="w-3 h-3" />
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Special Effects */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">Special Effects</h2>
            <Badge variant="outline" className="text-primary border-primary/30">Attention Grabbers</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* New Badge */}
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm overflow-hidden">
              <div id="special-badge" className="bg-background p-8 h-48 flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-4 right-4 animate-pulse">
                  <div className="bg-primary text-black px-4 py-2 rounded-full font-bold text-sm uppercase tracking-widest neon-glow rotate-12">
                    New!
                  </div>
                </div>
                <p className="text-muted-foreground">Badge appears in corner</p>
              </div>
              <div className="p-3 flex items-center justify-between border-t border-primary/20">
                <span className="text-xs text-muted-foreground">New Badge</span>
                <Button size="sm" variant="ghost" onClick={() => handleDownload('special-badge', 'special-badge')}>
                  <Download className="w-3 h-3" />
                </Button>
              </div>
            </Card>

            {/* Attention Banner */}
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm overflow-hidden">
              <div id="special-attention" className="bg-background p-8 h-48 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 border-4 border-primary animate-pulse neon-glow" />
                <div className="text-center z-10">
                  <h3 className="text-3xl font-bold uppercase tracking-wider neon-text-glow mb-2">Attention!</h3>
                  <p className="text-muted-foreground">Important announcement</p>
                </div>
              </div>
              <div className="p-3 flex items-center justify-between border-t border-primary/20">
                <span className="text-xs text-muted-foreground">Attention Frame</span>
                <Button size="sm" variant="ghost" onClick={() => handleDownload('special-attention', 'special-attention')}>
                  <Download className="w-3 h-3" />
                </Button>
              </div>
            </Card>
          </div>
        </div>

      </section>

      {/* Instructions */}
      <section className="px-4 py-16 max-w-4xl mx-auto">
        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm p-8">
          <h3 className="text-2xl font-bold mb-4">How to Use These Graphics</h3>
          <div className="space-y-4 text-muted-foreground">
            <div>
              <h4 className="text-foreground font-semibold mb-2">Download Method:</h4>
              <ol className="space-y-2 ml-6">
                <li>1. Click the download button on any callout graphic</li>
                <li>2. The PNG file will be saved to your downloads folder</li>
                <li>3. Import into your video editor (DaVinci Resolve, Premiere Pro, Final Cut, etc.)</li>
                <li>4. Place the PNG on an overlay track above your main footage</li>
              </ol>
            </div>
            
            <div className="pt-4">
              <h4 className="text-foreground font-semibold mb-2">Pro Tips:</h4>
              <ul className="space-y-2 ml-6">
                <li>• PNG files have transparent backgrounds for easy compositing</li>
                <li>• Animations won't be included - use keyframes in your editor for motion</li>
                <li>• Images are 2x resolution for crisp quality at 1080p</li>
                <li>• Customize text and colors in your video editor to match your brand</li>
              </ul>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default YouTubeCallouts;