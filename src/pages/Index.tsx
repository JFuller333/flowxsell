import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FrameworkCard } from "@/components/FrameworkCard";
import { ProjectCard } from "@/components/ProjectCard";
import { Search, Target, Cog, TrendingUp, ArrowRight, Mail } from "lucide-react";
import flowosImage from "@/assets/flowos-framework.jpg";
import healthScoreImage from "@/assets/flow-health-score.jpg";
import campaignImage from "@/assets/campaign-architecture.jpg";
import techStackImage from "@/assets/tech-stack-optimizer.jpg";
import { useState } from "react";
import { toast } from "sonner";

const Index = () => {
  const [email, setEmail] = useState("");

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Thanks! You'll receive the FlowOS playbook soon.");
      setEmail("");
    }
  };

  const frameworks = [
    {
      phase: "Phase 01",
      title: "Audit",
      description: "Flow Disrupter Quiz + Flow Health Score. Diagnostic entrypoint to identify where your system breaks.",
      icon: Search,
    },
    {
      phase: "Phase 02",
      title: "Align",
      description: "Repositioning strategy across the customer journey. Emotional clarity and storytelling alignment.",
      icon: Target,
    },
    {
      phase: "Phase 03",
      title: "Automate",
      description: "Systems that connect Shopify, Marketing, & Analytics. Emphasize calm tech stacks.",
      icon: Cog,
    },
    {
      phase: "Phase 04",
      title: "XSell",
      description: "Optimization loops and sales multiplication. Scalable leverage tools.",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-block mb-4">
            <span className="text-sm font-mono text-primary uppercase tracking-[0.3em] px-4 py-2 border border-primary/30 rounded-full">
              Strategic Framework
            </span>
          </div>
          
          <h1 className="neon-text-glow">
            FlowOS
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A clarity companion for solo ecommerce founders. When your systems flow, your sales grow.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button 
              size="lg" 
              className="group"
              onClick={() => document.getElementById('framework')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Understand the Flow Framework
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="neon"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Systems & Projects Section */}
      <section className="px-4 py-24 max-w-7xl mx-auto border-t border-primary/10">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            SYSTEMS & PROJECTS
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Tools and frameworks built to help founders scale with clarity and structure.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <ProjectCard
            title="FlowOS Framework"
            description="A 4-phase operating system for ecommerce founders: Audit, Align, Automate, XSell. Designed to transform fragmented growth into systematic scaling."
            tags={["Strategy", "Ecommerce", "Operations"]}
            image={flowosImage}
          />
          <ProjectCard
            title="Flow Health Score"
            description="Diagnostic tool that identifies where your systems break down. Get a clarity score and actionable next steps in under 5 minutes."
            tags={["Assessment", "Analytics", "Growth"]}
            image={healthScoreImage}
          />
          <ProjectCard
            title="Campaign Architecture System"
            description="Strategic framework for building scalable marketing campaigns that compound over time instead of burning budgets."
            tags={["Marketing", "Systems", "ROI"]}
            image={campaignImage}
          />
          <ProjectCard
            title="Tech Stack Optimizer"
            description="Curated integration maps for connecting Shopify, email, analytics, and automation tools without the tech debt."
            tags={["Integration", "Automation", "Shopify"]}
            image={techStackImage}
          />
        </div>
      </section>

      {/* Framework Section */}
      <section id="framework" className="px-4 py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="neon-text-glow">The Flow Framework</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Four phases to transform scattered effort into strategic growth
            </p>
            <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {frameworks.map((framework, index) => (
              <FrameworkCard key={index} {...framework} />
            ))}
          </div>
        </div>
      </section>

      {/* Why It Matters Section */}
      <section className="px-4 py-32 relative">
        <div className="max-w-4xl mx-auto">
          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            
            <div className="relative space-y-6">
              <h2 className="mb-8">Why It Matters</h2>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p className="text-xl text-foreground font-medium">
                  When your systems flow, your sales grow.
                </p>
                
                <p>
                  Most founders aren't failing because they lack effort—they're failing because their growth is fragmented.
                  Disconnected tools, inconsistent messaging, and no clear operating rhythm.
                </p>
                
                <p>
                  <span className="text-primary font-semibold">FlowOS</span> helps you shift from scattered to strategic:
                </p>
                
                <ul className="space-y-3 ml-6">
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1.5">→</span>
                    <span>You audit the noise.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1.5">→</span>
                    <span>You align your narrative.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1.5">→</span>
                    <span>You automate what's repeatable.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1.5">→</span>
                    <span>You XSell with intention.</span>
                  </li>
                </ul>
                
                <p className="text-foreground pt-4">
                  This system doesn't just grow your sales.<br />
                  It grows <em className="text-primary not-italic font-semibold">you</em> as a founder—more focused, more scalable, more in control.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Founder Note Section */}
      <section id="about" className="px-4 py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5" />
        
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
          <div className="inline-block mb-4">
            <span className="text-sm font-mono text-primary uppercase tracking-[0.3em] px-4 py-2 border border-primary/30 rounded-full">
              Founder Note
            </span>
          </div>
          
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              I've built and scaled systems for ecommerce founders who were drowning in complexity. 
              The ones who were working 80-hour weeks but couldn't see where the growth was coming from.
            </p>
            
            <p>
              What I learned: <span className="text-foreground font-medium">Your growth isn't broken—your system is.</span>
            </p>
            
            <p>
              FlowOS is the framework I use to restore clarity, build momentum, and help founders 
              scale without burning out. It's not about working harder. It's about working with intention.
            </p>
          </div>
          
          <div className="pt-8">
            <Button size="lg" variant="neon" className="group">
              Work with me
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Email Capture Section */}
      <section className="px-4 py-32 relative">
        <div className="max-w-2xl mx-auto">
          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm p-12 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            
            <div className="relative text-center space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/30 mb-4">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              
              <h3 className="text-3xl font-bold">Want the FlowOS playbook?</h3>
              
              <p className="text-muted-foreground">
                Get the full PDF and worksheet delivered weekly-ish.
              </p>
              
              <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-4">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 bg-background/50 border-primary/20 focus:border-primary"
                />
                <Button type="submit" size="lg">
                  Get Access
                </Button>
              </form>
              
              <p className="text-xs text-muted-foreground">
                No spam. Unsubscribe anytime. Clarity is your new compounding edge.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-primary/10 px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              © 2025 FlowOS. <span className="text-primary">Built for founders, by a founder.</span>
            </div>
            <div className="text-xs text-muted-foreground font-mono">
              This isn't a funnel—it's a system.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
