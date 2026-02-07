import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, TrendingUp } from "lucide-react";
import flowosImage from "@/assets/flowos-framework.jpg";
import { Navbar } from "@/components/Navbar";

const CaseStudyChildrensBook = () => {
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
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                Children's Book Development
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                A 4-phase operating system for ecommerce founders: Audit, Align, Automate, XSell. Designed to transform fragmented growth into systematic scaling.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Strategy", "Ecommerce", "Physical Products"].map((tag) => (
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
                src={flowosImage} 
                alt="Children's Book Development"
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
              A children's book author wanted to expand beyond traditional publishing into a scalable 
              ecommerce business with physical products. The challenge? No operating system for product 
              development, inventory management, or systematic marketing.
            </p>
            <p>
              Every launch felt chaotic. No clear process from concept to fulfillment. Growth was reactive 
              instead of strategic, limiting the ability to scale the physical product line.
            </p>
          </div>
        </Card>
      </section>

      {/* Solution Section */}
      <section className="px-4 py-20 max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4">The Solution</h2>
          <p className="text-xl text-muted-foreground">
            A comprehensive 4-phase framework for systematic product development and scaling
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm p-8">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">01. Audit</h3>
            <p className="text-muted-foreground text-sm">
              Analyze current products, audience needs, and market gaps to identify scalable opportunities.
            </p>
          </Card>

          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm p-8">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">02. Align</h3>
            <p className="text-muted-foreground text-sm">
              Create a brand narrative that connects books to physical products with consistent messaging.
            </p>
          </Card>

          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm p-8">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">03. Automate</h3>
            <p className="text-muted-foreground text-sm">
              Build systems for inventory management, order fulfillment, and customer communication.
            </p>
          </Card>

          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm p-8">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">04. XSell</h3>
            <p className="text-muted-foreground text-sm">
              Create product bundles and cross-sell strategies that increase customer lifetime value.
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
              <div className="text-4xl font-bold text-primary mb-2">250%</div>
              <div className="text-muted-foreground">revenue growth in 12 months</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">12</div>
              <div className="text-muted-foreground">new physical products launched</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">4.2x</div>
              <div className="text-muted-foreground">increase in average order value</div>
            </div>
          </div>

          <div className="space-y-4 text-muted-foreground">
            <p>
              What started as a single children's book became a thriving physical product business. The 
              systematic approach enabled predictable launches, efficient operations, and strategic growth.
            </p>
            <p className="text-foreground font-medium">
              The framework transformed creative vision into a scalable, profitable ecommerce system.
            </p>
          </div>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 max-w-4xl mx-auto text-center">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold">Ready to scale your product business?</h2>
          <p className="text-xl text-muted-foreground">
            Let's audit your operations and build your custom framework.
          </p>
          <Button size="lg" variant="neon" className="mt-6">
            Start Your Audit
          </Button>
        </div>
      </section>
    </div>
  );
};

export default CaseStudyChildrensBook;
