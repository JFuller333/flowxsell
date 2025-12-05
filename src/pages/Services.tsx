import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  ArrowLeft, 
  Zap, 
  Layers, 
  Settings, 
  Shield,
  ArrowRight,
  CheckCircle2,
  Gauge,
  Puzzle,
  Wrench
} from "lucide-react";

const Services = () => {
  const solutions = [
    {
      id: "headless",
      icon: Zap,
      flowType: "Conversion Flow",
      title: "FlowX Headless Storefront",
      tagline: "For brands that have outgrown traditional Shopify themes",
      description: "Your Conversion Flow score shows that your current Shopify theme or frontend structure is creating friction in the purchase journey.",
      symptoms: [
        "Slow load times",
        "Broken or confusing UX",
        "Checkout issues",
        "Missing trust signals",
        "Limited customization",
        "High bounce rate / low add-to-cart"
      ],
      benefits: [
        "Faster, modern, app-like shopping experience",
        "Custom-designed user journeys",
        "No theme limitations",
        "Improved conversion rates",
        "Fully custom codebase with API-driven architecture",
        "High-performance storefront on Vercel/Netlify/Hydrogen"
      ],
      color: "from-cyan-500 to-blue-600"
    },
    {
      id: "custom",
      icon: Layers,
      flowType: "Alignment Flow",
      title: "FlowX Custom App / Portal Development",
      tagline: "For businesses that need custom engineering, not more apps",
      description: "Your Alignment Flow score shows that your current Shopify setup does not match your business model.",
      symptoms: [
        "Features themes/apps cannot support",
        "Manual or disconnected internal processes",
        "Unique workflow requirements",
        "Managing special data (donors, investors, memberships)",
        "Need for portals or dashboards"
      ],
      benefits: [
        "Custom Shopify apps (backend or Remix)",
        "Donor/Membership/Investor portals",
        "Wholesale portals & automation engines",
        "Complex logic systems & API integrations",
        "Admin dashboards with role management",
        "Data pipelines & authentication systems"
      ],
      color: "from-violet-500 to-purple-600"
    },
    {
      id: "maintain",
      icon: Settings,
      flowType: "Retention Flow",
      title: "FlowX Maintain™",
      tagline: "Monthly technical retainer for system stability",
      description: "A low Retention Flow score means your systems are unstable. This is not a conversion problem — it's a system maintenance + long-term stability issue.",
      symptoms: [
        "Recurring bugs",
        "Automations breaking",
        "Subscription issues",
        "Data syncing failures",
        "Broken integrations",
        "Technical debt accumulation"
      ],
      benefits: [
        "Monthly technical engineering support",
        "Bug fixes & performance improvements",
        "API & webhook monitoring",
        "Audit of integrations",
        "Automated reporting",
        "Preventative maintenance"
      ],
      color: "from-emerald-500 to-teal-600"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto px-6 py-4">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Portfolio</span>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8">
            <Gauge className="w-4 h-4 text-primary" />
            <span className="text-sm font-mono text-primary">FlowXsell Solutions</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
            Your Flow Results Point to Your Solution
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Every business has three core flows: <span className="text-primary">Alignment</span>, <span className="text-primary">Conversion</span>, and <span className="text-primary">Retention</span>. Your lowest score reveals your Primary Flow Disrupter — the core system limiting growth.
          </p>

          <Link to="/flowxsell-quiz">
            <Button variant="neon" size="lg" className="gap-2">
              Take the Flow Health Quiz
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-8">
            {solutions.map((solution, index) => (
              <Card 
                key={solution.id}
                className="group relative overflow-hidden border-primary/20 bg-card/50 backdrop-blur-sm p-8 md:p-12 transition-all duration-500 hover:border-primary hover:shadow-[0_0_40px_hsla(var(--neon-glow),0.3)]"
              >
                {/* Background gradient */}
                <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-br ${solution.color} opacity-5 rounded-full blur-3xl transition-all duration-700 group-hover:opacity-10`} />
                
                <div className="relative">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                        <solution.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <span className="text-sm font-mono text-muted-foreground uppercase tracking-widest">
                          Low {solution.flowType} →
                        </span>
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-1">
                          {solution.title}
                        </h2>
                        <p className="text-primary font-medium mt-1">{solution.tagline}</p>
                      </div>
                    </div>
                    <span className="text-6xl font-bold text-lime-400/30 font-mono">
                      0{index + 1}
                    </span>
                  </div>

                  <p className="text-muted-foreground text-lg mb-8 max-w-3xl">
                    {solution.description}
                  </p>

                  {/* Two columns */}
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Symptoms */}
                    <div>
                      <h3 className="flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-destructive mb-4">
                        <Puzzle className="w-4 h-4" />
                        Common Symptoms
                      </h3>
                      <ul className="space-y-3">
                        {solution.symptoms.map((symptom, i) => (
                          <li key={i} className="flex items-start gap-3 text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-destructive/60 mt-2 flex-shrink-0" />
                            {symptom}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Benefits */}
                    <div>
                      <h3 className="flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-primary mb-4">
                        <Wrench className="w-4 h-4" />
                        What We Solve
                      </h3>
                      <ul className="space-y-3">
                        {solution.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start gap-3 text-muted-foreground">
                            <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FlowXSecure Upsell */}
      <section className="py-20 px-6 border-t border-border/50">
        <div className="container mx-auto max-w-4xl">
          <Card className="relative overflow-hidden border-amber-500/30 bg-gradient-to-br from-amber-500/5 to-orange-500/5 p-8 md:p-12">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
            
            <div className="relative text-center">
              <div className="inline-flex p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 mb-6">
                <Shield className="w-5 h-5 text-amber-500" />
              </div>
              
              <span className="block text-sm font-mono text-amber-500 uppercase tracking-widest mb-2">
                Universal Add-On
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                FlowXSecure™ Lite Audit
              </h2>
              
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
                Every serious brand should do this, no matter their quiz score. A comprehensive security review of your entire Shopify ecosystem.
              </p>

              <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
                {[
                  "Authentication flows",
                  "API & dependencies",
                  "Checkout security",
                  "Backend endpoints",
                  "CI/CD security",
                  "Risk scoring"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground bg-background/50 rounded-lg px-3 py-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-500" />
                    {item}
                  </div>
                ))}
              </div>

              <Button variant="outline" size="lg" className="border-amber-500/50 hover:border-amber-500 hover:bg-amber-500/10">
                Learn More About FlowXSecure
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Summary Table */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Quick Reference Guide
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 text-sm font-mono uppercase tracking-widest text-muted-foreground">Flow Disrupter</th>
                  <th className="text-left py-4 px-4 text-sm font-mono uppercase tracking-widest text-muted-foreground">Primary Issue</th>
                  <th className="text-left py-4 px-4 text-sm font-mono uppercase tracking-widest text-muted-foreground">Solution</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50 hover:bg-primary/5 transition-colors">
                  <td className="py-4 px-4 font-medium text-cyan-400">Low Conversion Flow</td>
                  <td className="py-4 px-4 text-muted-foreground">Friction in user journey, theme limitations</td>
                  <td className="py-4 px-4 font-semibold">FlowX Headless Storefront</td>
                </tr>
                <tr className="border-b border-border/50 hover:bg-primary/5 transition-colors">
                  <td className="py-4 px-4 font-medium text-violet-400">Low Alignment Flow</td>
                  <td className="py-4 px-4 text-muted-foreground">System + business model mismatch</td>
                  <td className="py-4 px-4 font-semibold">FlowX Custom App / Portal</td>
                </tr>
                <tr className="hover:bg-primary/5 transition-colors">
                  <td className="py-4 px-4 font-medium text-emerald-400">Low Retention Flow</td>
                  <td className="py-4 px-4 text-muted-foreground">System instability & technical breakage</td>
                  <td className="py-4 px-4 font-semibold">FlowX Maintain™ Retainer</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 border-t border-border/50">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Not Sure Which Solution You Need?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Take our Flow Health Quiz to discover your Primary Flow Disrupter and get a personalized recommendation.
          </p>
          <Link to="/flowxsell-quiz">
            <Button size="lg" className="gap-2">
              Start the Quiz
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border/50">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} FlowXsell. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Services;
