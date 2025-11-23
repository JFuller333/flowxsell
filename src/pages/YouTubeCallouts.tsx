import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, Bell, Share2, MessageCircle, Play, ArrowRight, Star, Zap, CheckCircle2, ListChecks } from "lucide-react";
import { useState } from "react";

const YouTubeCallouts = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="px-4 py-12 border-b border-primary/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold neon-text-glow">YouTube Callout Graphics</h1>
            <p className="text-muted-foreground text-lg">
              Animated callouts for your video content. Hover to preview animations, then record your screen to capture them.
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
          <Card className="border-primary/20 bg-background p-8 relative overflow-hidden h-64">
            <div className="absolute bottom-8 left-8 animate-in slide-in-from-left duration-700 space-y-1">
              <div className="bg-primary px-6 py-2 neon-glow">
                <h3 className="text-xl font-bold text-black uppercase tracking-wider">John Doe</h3>
              </div>
              <div className="bg-card/90 backdrop-blur-sm px-6 py-1.5 border-l-4 border-primary">
                <p className="text-sm text-muted-foreground uppercase tracking-wide">Founder & Creator</p>
              </div>
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
            <Card className="border-primary/20 bg-background p-8 flex items-center justify-center h-48 relative overflow-hidden">
              <div className="text-center space-y-3 animate-pulse">
                <div className="inline-flex items-center gap-3 bg-primary px-8 py-4 rounded-full neon-glow">
                  <Bell className="w-6 h-6 text-black" />
                  <span className="text-xl font-bold text-black uppercase tracking-wider">Subscribe</span>
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">Click the bell!</p>
              </div>
            </Card>

            {/* Bounce Subscribe */}
            <Card className="border-primary/20 bg-background p-8 flex items-center justify-center h-48 relative overflow-hidden">
              <div 
                className="text-center space-y-3 transition-transform hover:scale-110 duration-300"
                onMouseEnter={() => setHoveredCard(1)}
                onMouseLeave={() => setHoveredCard(null)}
              >
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
            </Card>

            {/* Arrow Subscribe */}
            <Card className="border-primary/20 bg-background p-8 flex items-center justify-center h-48 relative overflow-hidden">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-3 bg-primary px-8 py-4 rounded-lg neon-glow">
                  <Bell className="w-6 h-6 text-black" />
                  <span className="text-xl font-bold text-black uppercase tracking-wider">Subscribe</span>
                </div>
                <div className="flex items-center justify-center">
                  <ArrowRight className="w-8 h-8 text-primary animate-bounce" />
                </div>
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
            <Card 
              className="border-primary/20 bg-card/50 backdrop-blur-sm p-6 flex flex-col items-center justify-center h-40 hover:border-primary transition-all duration-300 cursor-pointer group"
              onMouseEnter={() => setHoveredCard(2)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className={`p-4 rounded-full bg-primary/10 border border-primary/30 mb-3 transition-all duration-300 ${hoveredCard === 2 ? 'neon-glow scale-110' : ''}`}>
                <ThumbsUp className="w-8 h-8 text-primary" />
              </div>
              <span className="text-lg font-bold uppercase tracking-wider">Like</span>
            </Card>

            {/* Comment */}
            <Card 
              className="border-primary/20 bg-card/50 backdrop-blur-sm p-6 flex flex-col items-center justify-center h-40 hover:border-primary transition-all duration-300 cursor-pointer group"
              onMouseEnter={() => setHoveredCard(3)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className={`p-4 rounded-full bg-primary/10 border border-primary/30 mb-3 transition-all duration-300 ${hoveredCard === 3 ? 'neon-glow scale-110' : ''}`}>
                <MessageCircle className="w-8 h-8 text-primary" />
              </div>
              <span className="text-lg font-bold uppercase tracking-wider">Comment</span>
            </Card>

            {/* Share */}
            <Card 
              className="border-primary/20 bg-card/50 backdrop-blur-sm p-6 flex flex-col items-center justify-center h-40 hover:border-primary transition-all duration-300 cursor-pointer group"
              onMouseEnter={() => setHoveredCard(4)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className={`p-4 rounded-full bg-primary/10 border border-primary/30 mb-3 transition-all duration-300 ${hoveredCard === 4 ? 'neon-glow scale-110' : ''}`}>
                <Share2 className="w-8 h-8 text-primary" />
              </div>
              <span className="text-lg font-bold uppercase tracking-wider">Share</span>
            </Card>

            {/* Watch */}
            <Card 
              className="border-primary/20 bg-card/50 backdrop-blur-sm p-6 flex flex-col items-center justify-center h-40 hover:border-primary transition-all duration-300 cursor-pointer group"
              onMouseEnter={() => setHoveredCard(5)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className={`p-4 rounded-full bg-primary/10 border border-primary/30 mb-3 transition-all duration-300 ${hoveredCard === 5 ? 'neon-glow scale-110' : ''}`}>
                <Play className="w-8 h-8 text-primary" />
              </div>
              <span className="text-lg font-bold uppercase tracking-wider">Watch</span>
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
            <Card className="border-primary/20 bg-background p-8 h-64 relative overflow-hidden">
              <div className="absolute top-8 left-8 animate-in slide-in-from-top duration-700">
                <div className="relative bg-primary px-6 py-4 rounded-lg neon-glow max-w-xs">
                  <p className="text-black font-bold text-lg">Important Point!</p>
                  <p className="text-black/80 text-sm mt-1">Key insight or message here</p>
                  <div className="absolute -bottom-2 left-8 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-primary" />
                </div>
              </div>
            </Card>

            {/* Center Highlight */}
            <Card className="border-primary/20 bg-background p-8 h-64 relative overflow-hidden flex items-center justify-center">
              <div className="text-center animate-in zoom-in duration-500">
                <div className="inline-block bg-card/90 backdrop-blur-sm border-2 border-primary px-8 py-6 rounded-lg neon-glow">
                  <Star className="w-12 h-12 text-primary mx-auto mb-3" />
                  <h3 className="text-2xl font-bold uppercase tracking-wider mb-2">Pro Tip</h3>
                  <p className="text-muted-foreground text-sm">Expert advice goes here</p>
                </div>
              </div>
            </Card>

            {/* Side Note */}
            <Card className="border-primary/20 bg-background p-8 h-64 relative overflow-hidden">
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
            </Card>

            {/* Bottom Banner */}
            <Card className="border-primary/20 bg-background p-8 h-64 relative overflow-hidden">
              <div className="absolute bottom-0 left-0 right-0 bg-primary/10 backdrop-blur-sm border-t-2 border-primary p-6 animate-in slide-in-from-bottom duration-700">
                <div className="flex items-center justify-between max-w-2xl mx-auto">
                  <div>
                    <h4 className="font-bold text-lg uppercase tracking-wider">Key Takeaway</h4>
                    <p className="text-sm text-muted-foreground mt-1">Summary or action item</p>
                  </div>
                  <ArrowRight className="w-8 h-8 text-primary" />
                </div>
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
            <Card className="border-primary/20 bg-background p-8 h-96 relative overflow-hidden">
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
            </Card>

            {/* Sidebar with Numbers */}
            <Card className="border-primary/20 bg-background p-8 h-96 relative overflow-hidden">
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
            </Card>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">Special Effects</h2>
            <Badge variant="outline" className="text-primary border-primary/30">Attention Grabbers</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* New Badge */}
            <Card className="border-primary/20 bg-background p-8 h-48 flex items-center justify-center relative overflow-hidden">
              <div className="absolute top-4 right-4 animate-pulse">
                <div className="bg-primary text-black px-4 py-2 rounded-full font-bold text-sm uppercase tracking-widest neon-glow rotate-12">
                  New!
                </div>
              </div>
              <p className="text-muted-foreground">Badge appears in corner</p>
            </Card>

            {/* Attention Banner */}
            <Card className="border-primary/20 bg-background p-8 h-48 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 border-4 border-primary animate-pulse neon-glow" />
              <div className="text-center z-10">
                <h3 className="text-3xl font-bold uppercase tracking-wider neon-text-glow mb-2">Attention!</h3>
                <p className="text-muted-foreground">Important announcement</p>
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
              <h4 className="text-foreground font-semibold mb-2">Recording Method:</h4>
              <ol className="space-y-2 ml-6">
                <li>1. Use screen recording software (OBS, QuickTime, etc.)</li>
                <li>2. Set recording area to just the graphic card</li>
                <li>3. Hover to trigger animations and record</li>
                <li>4. Import recording into your video editor with transparency/green screen</li>
              </ol>
            </div>
            
            <div className="pt-4">
              <h4 className="text-foreground font-semibold mb-2">Pro Tips:</h4>
              <ul className="space-y-2 ml-6">
                <li>• Record at 1920x1080 for best quality</li>
                <li>• Use 60fps for smooth animations</li>
                <li>• Consider using a green screen background for easier compositing</li>
                <li>• Refresh the page to restart animations</li>
              </ul>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default YouTubeCallouts;
