import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, CheckCircle2, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import techStackImage from "@/assets/tech-stack-optimizer.jpg";

const CaseStudyFlowXsell = () => {
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
                FlowXsell Ecommerce Framework
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Curated integration maps for connecting Shopify, email, analytics, and automation tools without the tech debt.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Ecommerce", "Automation", "Shopify"].map((tag) => (
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
                src={techStackImage} 
                alt="FlowXsell Framework"
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
              Ecommerce founders were drowning in disconnected tools. Shopify for sales, Klaviyo for email, 
              Google Analytics for tracking, Zapier for automation. Each tool worked in isolation, creating 
              data silos and manual busywork.
            </p>
            <p>
              The result? Missed opportunities, duplicate customer records, and founders spending 15+ hours 
              weekly on manual data tasks instead of growing their business.
            </p>
          </div>
        </Card>
      </section>

      {/* Solution Section */}
      <section className="px-4 py-20 max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4">The Solution</h2>
          <p className="text-xl text-muted-foreground">
            A systematic integration framework that connects your entire tech stack
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm p-8">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">Audit Phase</h3>
            <p className="text-muted-foreground">
              Map all existing tools and identify integration gaps causing data leaks and manual work.
            </p>
          </Card>

          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm p-8">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">Integration Mapping</h3>
            <p className="text-muted-foreground">
              Create a custom integration blueprint connecting Shopify, email platforms, analytics, and CRM.
            </p>
          </Card>

          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm p-8">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">Automation Setup</h3>
            <p className="text-muted-foreground">
              Implement clean automation workflows that eliminate manual data entry and reduce tech debt.
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
              <div className="text-4xl font-bold text-primary mb-2">15 hrs</div>
              <div className="text-muted-foreground">saved per week on manual tasks</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">98%</div>
              <div className="text-muted-foreground">data accuracy across platforms</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">3x</div>
              <div className="text-muted-foreground">faster campaign deployment</div>
            </div>
          </div>

          <div className="space-y-4 text-muted-foreground">
            <p>
              Founders now spend their time on strategy and growth instead of data cleanup. Customer 
              information flows seamlessly between systems, enabling personalized marketing at scale.
            </p>
            <p className="text-foreground font-medium">
              The framework doesn't just connect tools—it creates a growth engine that compounds over time.
            </p>
          </div>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 max-w-4xl mx-auto text-center">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold">Ready to optimize your tech stack?</h2>
          <p className="text-xl text-muted-foreground">
            Let's audit your systems and build your custom integration framework.
          </p>
          <Button size="lg" variant="neon" className="mt-6">
            Start Your Audit
          </Button>
        </div>
      </section>
    </div>
  );
};

export default CaseStudyFlowXsell;
