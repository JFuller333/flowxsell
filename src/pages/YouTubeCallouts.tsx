import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThumbsUp, Bell, Share2, MessageCircle, Play, ArrowRight, Star, Zap, CheckCircle2, ListChecks, Download } from "lucide-react";
import { useState } from "react";
import { toPng } from "html-to-image";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";

const YouTubeCallouts = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  // Custom text states
  const [lowerThirdName, setLowerThirdName] = useState("John Doe");
  const [lowerThirdTitle, setLowerThirdTitle] = useState("Founder & Creator");
  
  const [topLeftTitle, setTopLeftTitle] = useState("Important Point!");
  const [topLeftText, setTopLeftText] = useState("Key insight or message here");
  
  const [centerTitle, setCenterTitle] = useState("Pro Tip");
  const [centerText, setCenterText] = useState("Expert advice goes here");
  
  const [sideNoteTitle, setSideNoteTitle] = useState("Quick Insight");
  const [sideNoteText, setSideNoteText] = useState("Additional context or explanation");
  
  const [bottomTitle, setBottomTitle] = useState("Key Takeaway");
  const [bottomText, setBottomText] = useState("Summary or action item");
  
  const [topicsList, setTopicsList] = useState(["Introduction", "Main Concept", "Key Benefits", "How It Works", "Real Examples", "Summary"]);
  const [agendaList, setAgendaList] = useState(["Getting Started", "Core Features", "Advanced Tips", "Common Mistakes", "Best Practices"]);
  
  const [badgeText, setBadgeText] = useState("New!");
  const [attentionText, setAttentionText] = useState("Attention!");

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

  const handleVideoDownload = async (elementId: string, fileName: string, duration: number = 5000) => {
    const element = document.getElementById(elementId);
    if (!element) return;

    try {
      toast.info(`Recording ${duration / 1000} seconds of animation...`);
      
      // @ts-ignore - HTML2Canvas types
      const canvas = document.createElement('canvas');
      const rect = element.getBoundingClientRect();
      canvas.width = rect.width * 2;
      canvas.height = rect.height * 2;
      
      const stream = canvas.captureStream(30); // 30 FPS
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp9',
        videoBitsPerSecond: 5000000
      });
      
      const chunks: Blob[] = [];
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `${fileName}.webm`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
        toast.success("Video downloaded successfully!");
      };
      
      // Capture frames
      mediaRecorder.start();
      const ctx = canvas.getContext('2d');
      
      const captureFrame = () => {
        if (ctx && element instanceof HTMLElement) {
          // Draw element to canvas
          const elementCanvas = document.createElement('canvas');
          elementCanvas.width = rect.width * 2;
          elementCanvas.height = rect.height * 2;
          const elementCtx = elementCanvas.getContext('2d');
          
          if (elementCtx) {
            toPng(element, {
              quality: 1,
              pixelRatio: 2,
              backgroundColor: '#000000'
            }).then(dataUrl => {
              const img = new Image();
              img.onload = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
              };
              img.src = dataUrl;
            });
          }
        }
      };
      
      const frameInterval = setInterval(captureFrame, 1000 / 30); // 30 FPS
      
      setTimeout(() => {
        clearInterval(frameInterval);
        mediaRecorder.stop();
      }, duration);
      
    } catch (error) {
      console.error('Error recording video:', error);
      toast.error("Failed to record video. Your browser may not support this feature.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <section className="px-4 pt-24 md:pt-28 pb-8 md:pb-12 border-b border-primary/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold neon-text-glow">YouTube Callout Graphics</h1>
            <p className="text-muted-foreground text-lg">
              Animated callouts for your video content. Download as PNG (single frame) or Video (with animation).
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
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="lowerThirdName" className="text-sm text-muted-foreground mb-2">Name</Label>
              <Input 
                id="lowerThirdName"
                value={lowerThirdName}
                onChange={(e) => setLowerThirdName(e.target.value)}
                placeholder="Enter name"
                maxLength={50}
              />
            </div>
            <div>
              <Label htmlFor="lowerThirdTitle" className="text-sm text-muted-foreground mb-2">Title</Label>
              <Input 
                id="lowerThirdTitle"
                value={lowerThirdTitle}
                onChange={(e) => setLowerThirdTitle(e.target.value)}
                placeholder="Enter title"
                maxLength={50}
              />
            </div>
          </div>
          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm overflow-hidden">
            <div id="lower-third" className="bg-background p-8 relative overflow-hidden h-64">
              <div className="absolute bottom-8 left-8 animate-in slide-in-from-left duration-700 space-y-1">
                <div className="bg-primary px-6 py-2 neon-glow">
                  <h3 className="text-xl font-bold text-black uppercase tracking-wider">{lowerThirdName}</h3>
                </div>
                <div className="bg-card/90 backdrop-blur-sm px-6 py-1.5 border-l-4 border-primary">
                  <p className="text-sm text-muted-foreground uppercase tracking-wide">{lowerThirdTitle}</p>
                </div>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between border-t border-primary/20">
              <span className="text-sm text-muted-foreground">Lower Third Name Plate</span>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" onClick={() => handleDownload('lower-third', 'youtube-lower-third')}>
                  <Download className="w-4 h-4 mr-1" />
                  PNG
                </Button>
                <Button size="sm" variant="default" onClick={() => handleVideoDownload('lower-third', 'youtube-lower-third', 5000)}>
                  <Play className="w-4 h-4 mr-1" />
                  Video
                </Button>
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
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" onClick={() => handleDownload('subscribe-pulse', 'subscribe-pulse')}>
                    <Download className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="default" onClick={() => handleVideoDownload('subscribe-pulse', 'subscribe-pulse', 5000)}>
                    <Play className="w-3 h-3" />
                  </Button>
                </div>
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
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" onClick={() => handleDownload('subscribe-bounce', 'subscribe-bounce')}>
                    <Download className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="default" onClick={() => handleVideoDownload('subscribe-bounce', 'subscribe-bounce', 5000)}>
                    <Play className="w-3 h-3" />
                  </Button>
                </div>
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
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" onClick={() => handleDownload('subscribe-arrow', 'subscribe-arrow')}>
                    <Download className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="default" onClick={() => handleVideoDownload('subscribe-arrow', 'subscribe-arrow', 5000)}>
                    <Play className="w-3 h-3" />
                  </Button>
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
              <div className="p-2 flex items-center justify-center border-t border-primary/20 gap-2">
                <Button size="sm" variant="ghost" onClick={() => handleDownload('engagement-like', 'engagement-like')}>
                  <Download className="w-3 h-3" />
                </Button>
                <Button size="sm" variant="default" onClick={() => handleVideoDownload('engagement-like', 'engagement-like', 5000)}>
                  <Play className="w-3 h-3" />
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
              <div className="p-2 flex items-center justify-center border-t border-primary/20 gap-2">
                <Button size="sm" variant="ghost" onClick={() => handleDownload('engagement-comment', 'engagement-comment')}>
                  <Download className="w-3 h-3" />
                </Button>
                <Button size="sm" variant="default" onClick={() => handleVideoDownload('engagement-comment', 'engagement-comment', 5000)}>
                  <Play className="w-3 h-3" />
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
              <div className="p-2 flex items-center justify-center border-t border-primary/20 gap-2">
                <Button size="sm" variant="ghost" onClick={() => handleDownload('engagement-share', 'engagement-share')}>
                  <Download className="w-3 h-3" />
                </Button>
                <Button size="sm" variant="default" onClick={() => handleVideoDownload('engagement-share', 'engagement-share', 5000)}>
                  <Play className="w-3 h-3" />
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
              <div className="p-2 flex items-center justify-center border-t border-primary/20 gap-2">
                <Button size="sm" variant="ghost" onClick={() => handleDownload('engagement-watch', 'engagement-watch')}>
                  <Download className="w-3 h-3" />
                </Button>
                <Button size="sm" variant="default" onClick={() => handleVideoDownload('engagement-watch', 'engagement-watch', 5000)}>
                  <Play className="w-3 h-3" />
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
              <div className="p-4 space-y-2 border-b border-primary/20">
                <Input 
                  value={topLeftTitle}
                  onChange={(e) => setTopLeftTitle(e.target.value)}
                  placeholder="Title"
                  maxLength={30}
                  className="text-sm"
                />
                <Input 
                  value={topLeftText}
                  onChange={(e) => setTopLeftText(e.target.value)}
                  placeholder="Description"
                  maxLength={50}
                  className="text-sm"
                />
              </div>
              <div id="text-top-left" className="bg-background p-8 h-64 relative overflow-hidden">
                <div className="absolute top-8 left-8 animate-in slide-in-from-top duration-700">
                  <div className="relative bg-primary px-6 py-4 rounded-lg neon-glow max-w-xs">
                    <p className="text-black font-bold text-lg">{topLeftTitle}</p>
                    <p className="text-black/80 text-sm mt-1">{topLeftText}</p>
                    <div className="absolute -bottom-2 left-8 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-primary" />
                  </div>
                </div>
              </div>
              <div className="p-3 flex items-center justify-between border-t border-primary/20">
                <span className="text-xs text-muted-foreground">Top Left Bubble</span>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" onClick={() => handleDownload('text-top-left', 'text-top-left')}>
                    <Download className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="default" onClick={() => handleVideoDownload('text-top-left', 'text-top-left', 5000)}>
                    <Play className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Center Highlight */}
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm overflow-hidden">
              <div className="p-4 space-y-2 border-b border-primary/20">
                <Input 
                  value={centerTitle}
                  onChange={(e) => setCenterTitle(e.target.value)}
                  placeholder="Title"
                  maxLength={20}
                  className="text-sm"
                />
                <Input 
                  value={centerText}
                  onChange={(e) => setCenterText(e.target.value)}
                  placeholder="Description"
                  maxLength={40}
                  className="text-sm"
                />
              </div>
              <div id="text-center-highlight" className="bg-background p-8 h-64 relative overflow-hidden flex items-center justify-center">
                <div className="text-center animate-in zoom-in duration-500">
                  <div className="inline-block bg-card/90 backdrop-blur-sm border-2 border-primary px-8 py-6 rounded-lg neon-glow">
                    <Star className="w-12 h-12 text-primary mx-auto mb-3" />
                    <h3 className="text-2xl font-bold uppercase tracking-wider mb-2">{centerTitle}</h3>
                    <p className="text-muted-foreground text-sm">{centerText}</p>
                  </div>
                </div>
              </div>
              <div className="p-3 flex items-center justify-between border-t border-primary/20">
                <span className="text-xs text-muted-foreground">Center Highlight</span>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" onClick={() => handleDownload('text-center-highlight', 'text-center-highlight')}>
                    <Download className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="default" onClick={() => handleVideoDownload('text-center-highlight', 'text-center-highlight', 5000)}>
                    <Play className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Side Note */}
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm overflow-hidden">
              <div className="p-4 space-y-2 border-b border-primary/20">
                <Input 
                  value={sideNoteTitle}
                  onChange={(e) => setSideNoteTitle(e.target.value)}
                  placeholder="Title"
                  maxLength={25}
                  className="text-sm"
                />
                <Input 
                  value={sideNoteText}
                  onChange={(e) => setSideNoteText(e.target.value)}
                  placeholder="Description"
                  maxLength={50}
                  className="text-sm"
                />
              </div>
              <div id="text-side-note" className="bg-background p-8 h-64 relative overflow-hidden">
                <div className="absolute right-8 top-1/2 -translate-y-1/2 animate-in slide-in-from-right duration-700">
                  <div className="bg-card border-l-4 border-primary px-6 py-4 backdrop-blur-sm max-w-xs">
                    <div className="flex items-start gap-3">
                      <Zap className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold text-foreground mb-1">{sideNoteTitle}</p>
                        <p className="text-sm text-muted-foreground">{sideNoteText}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-3 flex items-center justify-between border-t border-primary/20">
                <span className="text-xs text-muted-foreground">Side Note</span>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" onClick={() => handleDownload('text-side-note', 'text-side-note')}>
                    <Download className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="default" onClick={() => handleVideoDownload('text-side-note', 'text-side-note', 5000)}>
                    <Play className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Bottom Banner */}
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm overflow-hidden">
              <div className="p-4 space-y-2 border-b border-primary/20">
                <Input 
                  value={bottomTitle}
                  onChange={(e) => setBottomTitle(e.target.value)}
                  placeholder="Title"
                  maxLength={25}
                  className="text-sm"
                />
                <Input 
                  value={bottomText}
                  onChange={(e) => setBottomText(e.target.value)}
                  placeholder="Description"
                  maxLength={40}
                  className="text-sm"
                />
              </div>
              <div id="text-bottom-banner" className="bg-background p-8 h-64 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 right-0 bg-primary/10 backdrop-blur-sm border-t-2 border-primary p-6 animate-in slide-in-from-bottom duration-700">
                  <div className="flex items-center justify-between max-w-2xl mx-auto">
                    <div>
                      <h4 className="font-bold text-lg uppercase tracking-wider">{bottomTitle}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{bottomText}</p>
                    </div>
                    <ArrowRight className="w-8 h-8 text-primary" />
                  </div>
                </div>
              </div>
              <div className="p-3 flex items-center justify-between border-t border-primary/20">
                <span className="text-xs text-muted-foreground">Bottom Banner</span>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" onClick={() => handleDownload('text-bottom-banner', 'text-bottom-banner')}>
                    <Download className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="default" onClick={() => handleVideoDownload('text-bottom-banner', 'text-bottom-banner', 5000)}>
                    <Play className="w-3 h-3" />
                  </Button>
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
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm overflow-hidden">
              <div className="p-4 space-y-2 border-b border-primary/20">
                <Label className="text-sm text-muted-foreground">Edit Topics</Label>
                {topicsList.map((topic, index) => (
                  <Input 
                    key={index}
                    value={topic}
                    onChange={(e) => {
                      const newTopics = [...topicsList];
                      newTopics[index] = e.target.value;
                      setTopicsList(newTopics);
                    }}
                    placeholder={`Topic ${index + 1}`}
                    maxLength={30}
                    className="text-sm"
                  />
                ))}
              </div>
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
                    {topicsList.map((topic, index) => (
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
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" onClick={() => handleDownload('sidebar-bullets', 'sidebar-bullets')}>
                    <Download className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="default" onClick={() => handleVideoDownload('sidebar-bullets', 'sidebar-bullets', 5000)}>
                    <Play className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Sidebar with Numbers */}
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm overflow-hidden">
              <div className="p-4 space-y-2 border-b border-primary/20">
                <Label className="text-sm text-muted-foreground">Edit Agenda Items</Label>
                {agendaList.map((item, index) => (
                  <Input 
                    key={index}
                    value={item}
                    onChange={(e) => {
                      const newAgenda = [...agendaList];
                      newAgenda[index] = e.target.value;
                      setAgendaList(newAgenda);
                    }}
                    placeholder={`Agenda ${index + 1}`}
                    maxLength={30}
                    className="text-sm"
                  />
                ))}
              </div>
              <div id="sidebar-numbers" className="bg-background p-8 h-96 relative overflow-hidden">
                <div className="absolute left-8 top-8 bottom-8 w-64">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold uppercase tracking-wider neon-text-glow mb-2">
                      Agenda
                    </h3>
                    <div className="w-16 h-1 bg-primary neon-glow" />
                  </div>
                  
                  <ul className="space-y-3">
                    {agendaList.map((topic, index) => (
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
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" onClick={() => handleDownload('sidebar-numbers', 'sidebar-numbers')}>
                    <Download className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="default" onClick={() => handleVideoDownload('sidebar-numbers', 'sidebar-numbers', 5000)}>
                    <Play className="w-3 h-3" />
                  </Button>
                </div>
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
              <div className="p-4 border-b border-primary/20">
                <Input 
                  value={badgeText}
                  onChange={(e) => setBadgeText(e.target.value)}
                  placeholder="Badge text"
                  maxLength={15}
                  className="text-sm"
                />
              </div>
              <div id="special-badge" className="bg-background p-8 h-48 flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-4 right-4 animate-pulse">
                  <div className="bg-primary text-black px-4 py-2 rounded-full font-bold text-sm uppercase tracking-widest neon-glow rotate-12">
                    {badgeText}
                  </div>
                </div>
                <p className="text-muted-foreground">Badge appears in corner</p>
              </div>
              <div className="p-3 flex items-center justify-between border-t border-primary/20">
                <span className="text-xs text-muted-foreground">New Badge</span>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" onClick={() => handleDownload('special-badge', 'special-badge')}>
                    <Download className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="default" onClick={() => handleVideoDownload('special-badge', 'special-badge', 5000)}>
                    <Play className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Attention Banner */}
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm overflow-hidden">
              <div className="p-4 border-b border-primary/20">
                <Input 
                  value={attentionText}
                  onChange={(e) => setAttentionText(e.target.value)}
                  placeholder="Attention text"
                  maxLength={20}
                  className="text-sm"
                />
              </div>
              <div id="special-attention" className="bg-background p-8 h-48 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 border-4 border-primary animate-pulse neon-glow" />
                <div className="text-center z-10">
                  <h3 className="text-3xl font-bold uppercase tracking-wider neon-text-glow mb-2">{attentionText}</h3>
                  <p className="text-muted-foreground">Important announcement</p>
                </div>
              </div>
              <div className="p-3 flex items-center justify-between border-t border-primary/20">
                <span className="text-xs text-muted-foreground">Attention Frame</span>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" onClick={() => handleDownload('special-attention', 'special-attention')}>
                    <Download className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="default" onClick={() => handleVideoDownload('special-attention', 'special-attention', 5000)}>
                    <Play className="w-3 h-3" />
                  </Button>
                </div>
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
              <h4 className="text-foreground font-semibold mb-2">How to Use:</h4>
              <ol className="space-y-2 ml-6">
                <li>1. Customize the text in the input fields above each callout</li>
                <li>2. Click the download button to save the graphic as PNG</li>
                <li>3. Import into your video editor (DaVinci Resolve, Premiere Pro, Final Cut, etc.)</li>
                <li>4. Place the PNG on an overlay track above your main footage</li>
              </ol>
            </div>
            
            <div className="pt-4">
              <h4 className="text-foreground font-semibold mb-2">Pro Tips:</h4>
              <ul className="space-y-2 ml-6">
                <li>• Edit text before downloading - changes appear in real-time</li>
                <li>• PNG files have transparent backgrounds for easy compositing</li>
                <li>• Animations won't be included - use keyframes in your editor for motion</li>
                <li>• Images are 2x resolution for crisp quality at 1080p</li>
              </ul>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default YouTubeCallouts;