import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, TrendingUp } from "lucide-react";
import healthScoreImage from "@/assets/flow-health-score.jpg";
import { Navbar } from "@/components/Navbar";

const CaseStudyLRB = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative px-4 pt-24 md:pt-28 pb-12 md:pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-sm font-mono text-primary uppercase tracking-[0.3em] px-4 py-2 border border-primary/30 rounded-full inline-block">
                Case Study
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                LRB Donor & Investor Dashboard
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Diagnostic tool that identifies where your systems break down. Get a clarity score and actionable next steps in under 5 minutes.
              </p>
              <div className="flex flex-wrap gap-2">
                {["ROI", "Real Estate", "Community Development"].map((tag) => (
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
                src={healthScoreImage} 
                alt="LRB Dashboard"
                className="w-full rounded-lg border border-primary/20 shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="px-4 py-20 max-w-7xl mx-auto">
        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm p-6 md:p-12">
          <h2 className="text-3xl font-bold mb-6">The Challenge</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Real estate community development projects struggled with stakeholder communication. Donors and 
              investors had no visibility into project ROI, impact metrics, or how their capital was creating 
              community value.
            </p>
            <p>
              The result? Slow decision-making, missed investment opportunities, and stakeholders feeling 
              disconnected from the mission. Trust and transparency were breaking down.
            </p>
          </div>
        </Card>
      </section>

      {/* Solution Section */}
      <section className="px-4 py-20 max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4">The Solution</h2>
          <p className="text-xl text-muted-foreground">
            A real-time dashboard providing transparency and actionable insights
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm p-8">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">Audit Phase</h3>
            <p className="text-muted-foreground">
              Map all stakeholder communication gaps and identify where trust and clarity break down.
            </p>
          </Card>

          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm p-8">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">Dashboard Design</h3>
            <p className="text-muted-foreground">
              Create custom views showing ROI metrics, project timelines, and community impact in real-time.
            </p>
          </Card>

          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm p-8">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">Automated Reporting</h3>
            <p className="text-muted-foreground">
              Implement automated insights and alerts so stakeholders stay informed without manual updates.
            </p>
          </Card>
        </div>
      </section>

      {/* Results Section */}
      <section className="px-4 py-20 max-w-7xl mx-auto">
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-6 md:p-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 flex flex-wrap items-center gap-3">
            <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-primary flex-shrink-0" />
            The Results
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div>
              <div className="text-2xl sm:text-4xl font-bold text-primary mb-2">85%</div>
              <div className="text-muted-foreground text-sm sm:text-base">increase in stakeholder satisfaction</div>
            </div>
            <div>
              <div className="text-2xl sm:text-4xl font-bold text-primary mb-2">40%</div>
              <div className="text-muted-foreground text-sm sm:text-base">faster investment decisions</div>
            </div>
            <div>
              <div className="text-2xl sm:text-4xl font-bold text-primary mb-2">$2M+</div>
              <div className="text-muted-foreground text-sm sm:text-base">in new capital raised</div>
            </div>
          </div>

          <div className="space-y-4 text-muted-foreground">
            <p>
              Transparency became a competitive advantage. Donors and investors now have 24/7 access to 
              project performance, enabling faster decisions and deeper trust in the mission.
            </p>
            <p className="text-foreground font-medium">
              The dashboard transformed stakeholder relationships from transactional to strategic partnerships.
            </p>
          </div>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-12 sm:py-20 max-w-4xl mx-auto text-center">
        <div className="space-y-6">
          <h2 className="text-xl sm:text-2xl md:text-4xl font-bold">Ready to build stakeholder trust?</h2>
          <p className="text-base sm:text-xl text-muted-foreground">
            Let's audit your communication systems and create your dashboard.
          </p>
          <Button size="lg" variant="neon" className="mt-6">
            Start Your Audit
          </Button>
        </div>
      </section>
    </div>
  );
};

export default CaseStudyLRB;
