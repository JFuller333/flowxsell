import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Zap, 
  Layers, 
  Settings, 
  Shield,
  ArrowRight,
  Check
} from "lucide-react";

const Services = () => {
  const solutions = [
    {
      id: "headless",
      icon: Zap,
      flowType: "Conversion Flow",
      title: "Shopify Headless Storefront",
      tagline: "For brands that have outgrown traditional Shopify themes",
      symptoms: [
        "Slow load times & high bounce rates",
        "Theme limitations blocking growth",
        "Checkout friction & UX issues"
      ],
      benefits: [
        "Modern, app-like shopping experience",
        "Custom-designed user journeys",
        "High-performance architecture"
      ]
    },
    {
      id: "custom",
      icon: Layers,
      flowType: "Alignment Flow",
      title: "Shopify Custom App / Portal",
      tagline: "For businesses that need custom engineering, not more apps",
      symptoms: [
        "Features themes/apps cannot support",
        "Manual or disconnected processes",
        "Need for portals or dashboards"
      ],
      benefits: [
        "Custom Shopify apps & portals",
        "API integrations & automation",
        "Admin dashboards with role management"
      ]
    },
    {
      id: "maintain",
      icon: Settings,
      flowType: "Retention Flow",
      title: "Shopify Maintenance™",
      tagline: "Monthly technical retainer for system stability",
      symptoms: [
        "Recurring bugs & broken automations",
        "Data syncing failures",
        "Technical debt accumulation"
      ],
      benefits: [
        "Monthly engineering support",
        "API & webhook monitoring",
        "Preventative maintenance"
      ]
    },
    {
      id: "secure",
      icon: Shield,
      flowType: "All Flows",
      title: "Shopify Secure™ Audit",
      tagline: "Security review for serious brands",
      symptoms: [
        "Unknown security vulnerabilities",
        "Unaudited authentication flows",
        "Risk exposure in checkout & APIs"
      ],
      benefits: [
        "Full security assessment",
        "CI/CD & endpoint review",
        "Risk scoring & remediation"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border/30">
        <div className="container mx-auto px-6 py-4">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-16 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-sm font-mono text-primary mb-4 tracking-wide">FLOWXSELL SOLUTIONS</p>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Your Flow Results Point to Your Solution
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Your lowest score reveals your Primary Flow Disrupter — the core system limiting growth.
          </p>
          <Link to="/flowxsell-quiz">
            <Button variant="outline" size="sm" className="gap-2">
              Take the Quiz
              <ArrowRight className="w-3 h-3" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-5xl space-y-6">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <div 
                key={solution.id}
                className="border border-border/50 rounded-lg p-6 md:p-8 hover:border-border transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-primary" />
                    <span className="text-xs font-mono text-muted-foreground uppercase tracking-wide">
                      {solution.flowType === "All Flows" ? solution.flowType : `Low ${solution.flowType}`}
                    </span>
                  </div>
                  <span className="text-4xl font-bold text-lime-400/40 font-mono">
                    0{index + 1}
                  </span>
                </div>

                <h2 className="text-xl md:text-2xl font-bold mb-1">{solution.title}</h2>
                <p className="text-sm text-muted-foreground mb-6">{solution.tagline}</p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-xs font-mono text-muted-foreground mb-3 uppercase tracking-wide">Symptoms</p>
                    <ul className="space-y-2">
                      {solution.symptoms.map((item, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-mono text-primary mb-3 uppercase tracking-wide">What We Solve</p>
                    <ul className="space-y-2">
                      {solution.benefits.map((item, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <Check className="w-3 h-3 text-primary mt-1 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Button size="sm" className="bg-lime-400 text-black hover:bg-lime-300">
                  Let's Talk
                </Button>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 border-t border-border/30">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold mb-3">Not Sure Which Solution You Need?</h2>
          <p className="text-muted-foreground mb-6">
            Take our quiz to discover your Primary Flow Disrupter.
          </p>
          <Link to="/flowxsell-quiz">
            <Button className="gap-2">
              Start the Quiz
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-6 border-t border-border/30">
        <div className="container mx-auto text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} FlowXsell
        </div>
      </footer>
    </div>
  );
};

export default Services;
