import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, CheckCircle2, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import campaignImage from "@/assets/campaign-architecture.jpg";

const CaseStudyAFL = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Button>
      </div>

      {/* Hero Section */}
      <section className="relative px-4 py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-sm font-mono text-primary uppercase tracking-[0.3em] px-4 py-2 border border-primary/30 rounded-full inline-block">
                Case Study
              </span>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                AFL Mastery Framework
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Strategic framework for building scalable marketing campaigns that compound over time instead of burning budgets.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Wealth", "Health", "Balance", "Purpose"].map((tag) => (
                  <span 
                    key={tag}
                    className="text-xs font-mono px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={campaignImage} 
                alt="AFL Mastery Framework"
                className="w-full rounded-lg border border-primary/20 shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="px-4 py-20 max-w-7xl mx-auto">
        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm p-12">
          <h2 className="text-3xl font-bold mb-6">The Challenge</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Founders were stuck in the campaign hamster wheel. Launch an ad, get some sales, watch the ROAS 
              decay, repeat. Every month started from zero. Marketing felt like renting attention instead of 
              building assets.
            </p>
            <p>
              The root problem? Campaigns were treated as isolated tactics instead of compounding systems. 
              No framework for turning short-term wins into long-term leverage across wealth, health, balance, and purpose.
            </p>
          </div>
        </Card>
      </section>

      {/* Solution Section */}
      <section className="px-4 py-20 max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4">The Solution</h2>
          <p className="text-xl text-muted-foreground">
            A holistic framework that transforms campaigns into compounding assets
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm p-8">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">Audit Phase</h3>
            <p className="text-muted-foreground">
              Analyze past campaigns to identify what creates lasting value vs. temporary spikes in the four life pillars.
            </p>
          </Card>

          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm p-8">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">Campaign Architecture</h3>
            <p className="text-muted-foreground">
              Design campaigns that build brand equity, owned audiences, and repeatable systems aligned with purpose.
            </p>
          </Card>

          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm p-8">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">Compound Loops</h3>
            <p className="text-muted-foreground">
              Create feedback loops where each campaign feeds the next, building momentum in wealth, health, and balance.
            </p>
          </Card>
        </div>
      </section>

      {/* Results Section */}
      <section className="px-4 py-20 max-w-7xl mx-auto">
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-12">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-primary" />
            The Results
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">47%</div>
              <div className="text-muted-foreground">improvement in campaign ROI</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">2.5x</div>
              <div className="text-muted-foreground">growth in owned audience</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">60%</div>
              <div className="text-muted-foreground">reduction in ad spend waste</div>
            </div>
          </div>

          <div className="space-y-4 text-muted-foreground">
            <p>
              Marketing became an asset-building engine instead of a cost center. Each campaign now strengthens 
              the next through improved targeting, stronger brand recall, and deeper customer relationships.
            </p>
            <p className="text-foreground font-medium">
              The framework creates sustainable growth aligned with founder wellbeing and purpose.
            </p>
          </div>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 max-w-4xl mx-auto text-center">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold">Ready to build compounding campaigns?</h2>
          <p className="text-xl text-muted-foreground">
            Let's audit your marketing and create your AFL framework.
          </p>
          <Button size="lg" variant="neon" className="mt-6">
            Start Your Audit
          </Button>
        </div>
      </section>
    </div>
  );
};

export default CaseStudyAFL;
