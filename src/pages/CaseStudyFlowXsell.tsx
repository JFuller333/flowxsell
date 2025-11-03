import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, CheckCircle2, TrendingUp, Building2, Quote } from "lucide-react";
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

      {/* Client Success Stories & Results Section */}
      <section className="px-4 py-20 max-w-7xl mx-auto">
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-12 mb-12">
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

        {/* Client Stories */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/30 mb-6">
            <Building2 className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-3xl font-bold mb-4">Real Client Implementations</h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore how 3 different businesses transformed their operations with FlowXsell.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {/* Client 1 */}
          <AccordionItem value="client-1" className="border border-primary/20 rounded-lg bg-card/50 backdrop-blur-sm px-8 data-[state=open]:bg-primary/5">
            <AccordionTrigger className="hover:no-underline py-6">
              <div className="flex items-center justify-between w-full gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold text-primary">1</span>
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold">Client Name - Industry</h3>
                    <p className="text-sm text-muted-foreground">Brief tagline or specialty</p>
                  </div>
                </div>
                <div className="flex gap-6 items-center pr-2">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">00%</div>
                    <div className="text-xs text-muted-foreground whitespace-nowrap">Metric 1</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">0x</div>
                    <div className="text-xs text-muted-foreground whitespace-nowrap">Metric 2</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">$00k</div>
                    <div className="text-xs text-muted-foreground whitespace-nowrap">Metric 3</div>
                  </div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-6">
              <div className="space-y-6 ml-16">
                {/* Challenge */}
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-primary">The Challenge</h4>
                  <p className="text-muted-foreground">
                    Specific challenge this client was facing. What was broken in their system? What pain points were they experiencing?
                  </p>
                </div>

                {/* Solution */}
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-primary">The Solution</h4>
                  <p className="text-muted-foreground mb-3">
                    How you implemented FlowXsell for this specific client. What tools did you connect? What automations did you build?
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/30">
                      Shopify
                    </span>
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/30">
                      Klaviyo
                    </span>
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/30">
                      Tool 3
                    </span>
                  </div>
                </div>

                {/* Results */}
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-primary">The Results</h4>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-4 rounded-lg bg-background/50">
                      <div className="text-2xl font-bold text-primary mb-1">00%</div>
                      <div className="text-xs text-muted-foreground">Metric 1</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-background/50">
                      <div className="text-2xl font-bold text-primary mb-1">0x</div>
                      <div className="text-xs text-muted-foreground">Metric 2</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-background/50">
                      <div className="text-2xl font-bold text-primary mb-1">$00k</div>
                      <div className="text-xs text-muted-foreground">Metric 3</div>
                    </div>
                  </div>
                </div>

                {/* Optional Testimonial */}
                <div className="border-l-2 border-primary/30 pl-4 py-2">
                  <Quote className="w-5 h-5 text-primary mb-2" />
                  <p className="text-muted-foreground italic">
                    "Add client testimonial quote here if available."
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">— Client Name, Title</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Client 2 */}
          <AccordionItem value="client-2" className="border border-primary/20 rounded-lg bg-card/50 backdrop-blur-sm px-8 data-[state=open]:bg-primary/5">
            <AccordionTrigger className="hover:no-underline py-6">
              <div className="flex items-center justify-between w-full gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold text-primary">2</span>
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold">Client Name - Industry</h3>
                    <p className="text-sm text-muted-foreground">Brief tagline or specialty</p>
                  </div>
                </div>
                <div className="flex gap-6 items-center pr-2">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">00%</div>
                    <div className="text-xs text-muted-foreground whitespace-nowrap">Metric 1</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">0x</div>
                    <div className="text-xs text-muted-foreground whitespace-nowrap">Metric 2</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">$00k</div>
                    <div className="text-xs text-muted-foreground whitespace-nowrap">Metric 3</div>
                  </div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-6">
              <div className="space-y-6 ml-16">
                {/* Challenge */}
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-primary">The Challenge</h4>
                  <p className="text-muted-foreground">
                    Specific challenge this client was facing. What was broken in their system? What pain points were they experiencing?
                  </p>
                </div>

                {/* Solution */}
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-primary">The Solution</h4>
                  <p className="text-muted-foreground mb-3">
                    How you implemented FlowXsell for this specific client. What tools did you connect? What automations did you build?
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/30">
                      Tool 1
                    </span>
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/30">
                      Tool 2
                    </span>
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/30">
                      Tool 3
                    </span>
                  </div>
                </div>

                {/* Results */}
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-primary">The Results</h4>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-4 rounded-lg bg-background/50">
                      <div className="text-2xl font-bold text-primary mb-1">00%</div>
                      <div className="text-xs text-muted-foreground">Metric 1</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-background/50">
                      <div className="text-2xl font-bold text-primary mb-1">0x</div>
                      <div className="text-xs text-muted-foreground">Metric 2</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-background/50">
                      <div className="text-2xl font-bold text-primary mb-1">$00k</div>
                      <div className="text-xs text-muted-foreground">Metric 3</div>
                    </div>
                  </div>
                </div>

                {/* Optional Testimonial */}
                <div className="border-l-2 border-primary/30 pl-4 py-2">
                  <Quote className="w-5 h-5 text-primary mb-2" />
                  <p className="text-muted-foreground italic">
                    "Add client testimonial quote here if available."
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">— Client Name, Title</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Client 3 */}
          <AccordionItem value="client-3" className="border border-primary/20 rounded-lg bg-card/50 backdrop-blur-sm px-8 data-[state=open]:bg-primary/5">
            <AccordionTrigger className="hover:no-underline py-6">
              <div className="flex items-center justify-between w-full gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold text-primary">3</span>
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold">Client Name - Industry</h3>
                    <p className="text-sm text-muted-foreground">Brief tagline or specialty</p>
                  </div>
                </div>
                <div className="flex gap-6 items-center pr-2">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">00%</div>
                    <div className="text-xs text-muted-foreground whitespace-nowrap">Metric 1</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">0x</div>
                    <div className="text-xs text-muted-foreground whitespace-nowrap">Metric 2</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">$00k</div>
                    <div className="text-xs text-muted-foreground whitespace-nowrap">Metric 3</div>
                  </div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-6">
              <div className="space-y-6 ml-16">
                {/* Challenge */}
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-primary">The Challenge</h4>
                  <p className="text-muted-foreground">
                    Specific challenge this client was facing. What was broken in their system? What pain points were they experiencing?
                  </p>
                </div>

                {/* Solution */}
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-primary">The Solution</h4>
                  <p className="text-muted-foreground mb-3">
                    How you implemented FlowXsell for this specific client. What tools did you connect? What automations did you build?
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/30">
                      Tool 1
                    </span>
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/30">
                      Tool 2
                    </span>
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/30">
                      Tool 3
                    </span>
                  </div>
                </div>

                {/* Results */}
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-primary">The Results</h4>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-4 rounded-lg bg-background/50">
                      <div className="text-2xl font-bold text-primary mb-1">00%</div>
                      <div className="text-xs text-muted-foreground">Metric 1</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-background/50">
                      <div className="text-2xl font-bold text-primary mb-1">0x</div>
                      <div className="text-xs text-muted-foreground">Metric 2</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-background/50">
                      <div className="text-2xl font-bold text-primary mb-1">$00k</div>
                      <div className="text-xs text-muted-foreground">Metric 3</div>
                    </div>
                  </div>
                </div>

                {/* Optional Testimonial */}
                <div className="border-l-2 border-primary/30 pl-4 py-2">
                  <Quote className="w-5 h-5 text-primary mb-2" />
                  <p className="text-muted-foreground italic">
                    "Add client testimonial quote here if available."
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">— Client Name, Title</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
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
