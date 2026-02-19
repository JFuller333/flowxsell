import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Code2, Zap, Layers, GitBranch, Terminal, CheckCircle2, ArrowRight } from "lucide-react";
import curlsmonthlyLogo from "@/assets/curlsmonthly-logo-original.webp";
import lrtLogo from "@/assets/lrt-logo.png";
import instaballoonsLogo from "@/assets/instaballoons-logo.svg";
import truLogo from "@/assets/tru-logo-original.png";
import metpureLogo from "@/assets/metpure-logo-original.svg";
import { Navbar } from "@/components/Navbar";

const ShopifyPlusDev = () => {

  const techStack = [
    { name: "Shopify Plus", icon: Layers, description: "Enterprise e-commerce platform" },
    { name: "Liquid", icon: Code2, description: "Shopify's templating language" },
    { name: "React", icon: GitBranch, description: "Component-based UI" },
    { name: "Next.js", icon: Zap, description: "React framework for production" },
    { name: "Hydrogen", icon: Terminal, description: "Shopify's React framework" },
    { name: "Remix", icon: Code2, description: "Full-stack web framework" },
  ];

  const capabilities = [
    {
      title: "Headless Development",
      description: "Decouple frontend from Shopify backend for maximum flexibility. Build blazing-fast storefronts with modern frameworks while leveraging Shopify's powerful commerce engine.",
      technologies: ["Hydrogen", "Remix", "Next.js", "Storefront API", "GraphQL"]
    },
    {
      title: "Custom Storefront Development",
      description: "Headless commerce solutions using React, Hydrogen, and Storefront API for lightning-fast, custom shopping experiences.",
      technologies: ["React", "Hydrogen", "Next.js", "Storefront API"]
    },
    {
      title: "Theme Customization",
      description: "Deep Liquid templating expertise to build pixel-perfect, conversion-optimized themes that match your brand.",
      technologies: ["Liquid", "JavaScript", "HTML/CSS", "Theme Kit"]
    },
    {
      title: "App Development",
      description: "Build custom Shopify apps with Node.js and GraphQL to extend platform capabilities and automate workflows.",
      technologies: ["Node.js", "GraphQL", "Polaris", "App Bridge"]
    },
    {
      title: "API Integrations",
      description: "Connect Shopify to your entire tech stack - ERPs, CRMs, fulfillment systems, and marketing platforms.",
      technologies: ["REST API", "GraphQL", "Webhooks", "OAuth"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative px-4 pt-24 md:pt-28 pb-12 md:pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center space-y-6 mb-12">
            <span className="text-sm font-mono text-primary uppercase tracking-[0.3em] px-4 py-2 border border-primary/30 rounded-full inline-block">
              Technical Services
            </span>
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Shopify Plus Development
            </h1>
            <p className="text-base sm:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Custom development for enterprise e-commerce. From headless storefronts to complex integrations, 
              we build scalable solutions that power high-volume stores.
            </p>
          </div>

          {/* Tech Stack Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mt-10 sm:mt-16">
            {techStack.map((tech, index) => (
              <Card 
                key={index}
                className="border-primary/20 bg-card/50 backdrop-blur-sm p-6 hover:border-primary/40 transition-all duration-300 hover:scale-105"
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <tech.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-bold text-sm">{tech.name}</div>
                    <div className="text-xs text-muted-foreground mt-1">{tech.description}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Projects */}
      <section className="px-4 py-20 max-w-7xl mx-auto">
        <div className="mb-8 sm:mb-12 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/10 border border-primary/30 mb-4 sm:mb-6">
            <Code2 className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold mb-4">Technical Projects</h2>
          <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
            Custom Shopify Plus development delivered for growing brands
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {/* CurlsMonthly */}
          <AccordionItem value="client-1" className="border border-primary/20 rounded-lg bg-card/50 backdrop-blur-sm px-4 md:px-8 data-[state=open]:bg-primary/5">
            <AccordionTrigger className="hover:no-underline py-4 md:py-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-3 md:gap-6">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-lg flex items-center justify-center flex-shrink-0 p-1 md:p-2">
                    <img src={curlsmonthlyLogo} alt="CurlsMonthly" className="w-full h-full object-contain" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-base md:text-xl font-bold">CurlsMonthly</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">Subscription box service</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 md:gap-3 items-center md:pr-2">
                  <span className="text-xs font-mono px-2 md:px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/30">
                    Shopify Plus
                  </span>
                  <span className="text-xs font-mono px-2 md:px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/30">
                    Liquid
                  </span>
                  <span className="text-xs font-mono px-2 md:px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/30">
                    JavaScript
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-6">
              <div className="space-y-6 ml-0 md:ml-16">
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-primary">Technical Challenge</h4>
                  <p className="text-muted-foreground">
                    Required custom subscription flow with flexible purchase options and seamless cart experience for recurring orders.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-2 text-primary">Development Solution</h4>
                  <p className="text-muted-foreground mb-3">
                    Built custom Liquid templates with JavaScript enhancements for subscription management, 
                    dynamic cart updates, and conversion-optimized product pages.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3 text-primary">Technologies & Features</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="p-4 rounded-lg bg-background/50 border border-primary/10">
                      <div className="text-sm font-semibold text-primary mb-2">Languages</div>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">Liquid</span>
                        <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">JavaScript</span>
                        <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">HTML/CSS</span>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-background/50 border border-primary/10">
                      <div className="text-sm font-semibold text-primary mb-2">Features Built</div>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Custom subscription flow</li>
                        <li>• Product page enhancements</li>
                        <li>• Cart functionality upgrades</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Let's Rebuild Tuskegee */}
          <AccordionItem value="client-2" className="border border-primary/20 rounded-lg bg-card/50 backdrop-blur-sm px-4 md:px-8 data-[state=open]:bg-primary/5">
            <AccordionTrigger className="hover:no-underline py-4 md:py-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-3 md:gap-6">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-lg flex items-center justify-center flex-shrink-0 p-1 md:p-2">
                    <img src={lrtLogo} alt="Let's Rebuild Tuskegee" className="w-full h-full object-contain" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-base md:text-xl font-bold">Let's Rebuild Tuskegee</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">Community rebuilding initiative</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 md:gap-3 items-center md:pr-2">
                  <span className="text-xs font-mono px-2 md:px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/30">
                    React
                  </span>
                  <span className="text-xs font-mono px-2 md:px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/30">
                    Hydrogen
                  </span>
                  <span className="text-xs font-mono px-2 md:px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/30">
                    Storefront API
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-6">
              <div className="space-y-6 ml-0 md:ml-16">
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-primary">Technical Challenge</h4>
                  <p className="text-muted-foreground">
                    Needed a modern, performant storefront with donation features and custom integrations for community engagement.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-2 text-primary">Development Solution</h4>
                  <p className="text-muted-foreground mb-3">
                    Developed headless commerce solution using React frameworks and Storefront API, 
                    with custom donation platform features and seamless API integrations.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3 text-primary">Technologies & Features</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="p-4 rounded-lg bg-background/50 border border-primary/10">
                      <div className="text-sm font-semibold text-primary mb-2">Languages</div>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">React</span>
                        <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">Next.js</span>
                        <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">Hydrogen</span>
                        <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">Remix</span>
                        <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">Storefront API</span>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-background/50 border border-primary/10">
                      <div className="text-sm font-semibold text-primary mb-2">Features Built</div>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Custom app development</li>
                        <li>• API integrations</li>
                        <li>• Donation platform features</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* TRU Supplements */}
          <AccordionItem value="client-4" className="border border-primary/20 rounded-lg bg-card/50 backdrop-blur-sm px-4 md:px-8 data-[state=open]:bg-primary/5">
            <AccordionTrigger className="hover:no-underline py-4 md:py-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-3 md:gap-6">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-lg flex items-center justify-center flex-shrink-0 p-1 md:p-2">
                    <img src={truLogo} alt="TRU Supplements" className="w-full h-full object-contain" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-base md:text-xl font-bold">TRU Supplements</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">Supplements & wellness storefront</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 md:gap-3 items-center md:pr-2">
                  <span className="text-xs font-mono px-2 md:px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/30">
                    Shopify Plus
                  </span>
                  <span className="text-xs font-mono px-2 md:px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/30">
                    Liquid
                  </span>
                  <span className="text-xs font-mono px-2 md:px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/30">
                    JavaScript
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-6">
              <div className="space-y-6 ml-0 md:ml-16">
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-primary">Technical Challenge</h4>
                  <p className="text-muted-foreground">
                    Needed a conversion-focused supplements storefront at scale (two sites totaling 1.3M+ users), with custom bundle building, modular sections, and a redesigned sister-company experience—all while maintaining fast mobile performance.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-2 text-primary">Development Solution</h4>
                  <p className="text-muted-foreground mb-3">
                    Created a custom bundle feature with tailored Liquid + JavaScript logic, built reusable custom sections for rapid merchandising updates, and redesigned the sister company’s website—optimizing PDP and cart flows for upsells without adding checkout friction.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3 text-primary">Technologies & Features</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="p-4 rounded-lg bg-background/50 border border-primary/10">
                      <div className="text-sm font-semibold text-primary mb-2">Languages</div>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">Liquid</span>
                        <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">JavaScript</span>
                        <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">HTML/CSS</span>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-background/50 border border-primary/10">
                      <div className="text-sm font-semibold text-primary mb-2">Features Built</div>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Custom bundle feature</li>
                        <li>• Custom Liquid sections</li>
                        <li>• Sister-company site redesign</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Metpue Inc */}
          <AccordionItem value="client-5" className="border border-primary/20 rounded-lg bg-card/50 backdrop-blur-sm px-4 md:px-8 data-[state=open]:bg-primary/5">
            <AccordionTrigger className="hover:no-underline py-4 md:py-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-3 md:gap-6">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-lg flex items-center justify-center flex-shrink-0 p-1 md:p-2">
                    <img src={metpureLogo} alt="Metpue Inc" className="w-full h-full object-contain" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-base md:text-xl font-bold">Metpue Inc</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">B2B wholesale purchasing</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 md:gap-3 items-center md:pr-2">
                  <span className="text-xs font-mono px-2 md:px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/30">
                    Shopify Plus
                  </span>
                  <span className="text-xs font-mono px-2 md:px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/30">
                    Liquid
                  </span>
                  <span className="text-xs font-mono px-2 md:px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/30">
                    JavaScript
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-6">
              <div className="space-y-6 ml-0 md:ml-16">
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-primary">Technical Challenge</h4>
                  <p className="text-muted-foreground">
                    Needed a wholesale discount experience that only applies to approved B2B customers, plus a frictionless account registration and signup flow that captures business details for vetting.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-2 text-primary">Development Solution</h4>
                  <p className="text-muted-foreground mb-3">
                    Built a gated B2B signup experience with custom registration fields and an approval-ready customer tagging workflow, then wired pricing visibility and cart behavior to wholesale eligibility.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3 text-primary">Technologies & Features</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="p-4 rounded-lg bg-background/50 border border-primary/10">
                      <div className="text-sm font-semibold text-primary mb-2">Languages</div>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">Liquid</span>
                        <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">JavaScript</span>
                        <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">HTML/CSS</span>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-background/50 border border-primary/10">
                      <div className="text-sm font-semibold text-primary mb-2">Features Built</div>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• B2B account registration + signup flow</li>
                        <li>• Approval-ready customer tagging & segmentation</li>
                        <li>• Wholesale discount rules & eligibility gating</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* InstaBalloons */}
          <AccordionItem value="client-3" className="border border-primary/20 rounded-lg bg-card/50 backdrop-blur-sm px-4 md:px-8 data-[state=open]:bg-primary/5">
            <AccordionTrigger className="hover:no-underline py-4 md:py-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-3 md:gap-6">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-lg bg-white/95 border border-primary/10 flex items-center justify-center flex-shrink-0 p-1 md:p-2">
                    <img src={instaballoonsLogo} alt="InstaBalloons Wholesale" className="w-full h-full object-contain" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-base md:text-xl font-bold">InstaBalloons Wholesale</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">Party supplies wholesale</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 md:gap-3 items-center md:pr-2">
                  <span className="text-xs font-mono px-2 md:px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/30">
                    Shopify Plus
                  </span>
                  <span className="text-xs font-mono px-2 md:px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/30">
                    Liquid
                  </span>
                  <span className="text-xs font-mono px-2 md:px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/30">
                    JavaScript
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-6">
              <div className="space-y-6 ml-0 md:ml-16">
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-primary">Technical Challenge</h4>
                  <p className="text-muted-foreground">
                    Required sophisticated B2B wholesale portal with bulk ordering system and custom pricing tiers.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-2 text-primary">Development Solution</h4>
                  <p className="text-muted-foreground mb-3">
                    Built custom B2B portal using Liquid and JavaScript, implementing bulk ordering workflows,
                    customer-specific pricing, and streamlined wholesale operations.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3 text-primary">Technologies & Features</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="p-4 rounded-lg bg-background/50 border border-primary/10">
                      <div className="text-sm font-semibold text-primary mb-2">Languages</div>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">Liquid</span>
                        <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">JavaScript</span>
                        <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">HTML/CSS</span>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-background/50 border border-primary/10">
                      <div className="text-sm font-semibold text-primary mb-2">Features Built</div>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• B2B wholesale portal</li>
                        <li>• Bulk ordering system</li>
                        <li>• Custom pricing tiers</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Development Capabilities */}
      <section className="px-4 py-20 max-w-7xl mx-auto">
        <div className="mb-8 sm:mb-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Development Capabilities</h2>
          <p className="text-base sm:text-xl text-muted-foreground">
            Full-stack Shopify Plus development services
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          {capabilities.map((capability, index) => (
            <Card key={index} className="border-primary/20 bg-card/50 backdrop-blur-sm p-4 sm:p-6 md:p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{capability.title}</h3>
                  <p className="text-muted-foreground mb-4">{capability.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {capability.technologies.map((tech, i) => (
                      <span 
                        key={i}
                        className="text-xs font-mono px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Developed */}
      <section className="relative px-4 py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="mb-10 sm:mb-16 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/10 border border-primary/30 mb-4 sm:mb-6">
              <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold mb-4">Features Developed</h2>
            <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
              Production-ready solutions built for real businesses
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <Card className="relative border-primary/20 bg-background/95 backdrop-blur-sm p-4 sm:p-6 md:p-8 hover:scale-105 transition-all duration-300">
                <Code2 className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">Custom Subscription Logic</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Built flexible subscription flows with dynamic pricing, skip/pause functionality, and custom billing cycles using Liquid and JavaScript.
                </p>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-primary/10">
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-primary/10 text-primary">Liquid</span>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-primary/10 text-primary">JavaScript</span>
                </div>
              </Card>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <Card className="relative border-primary/20 bg-background/95 backdrop-blur-sm p-4 sm:p-6 md:p-8 hover:scale-105 transition-all duration-300">
                <Zap className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">Headless Cart System</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Developed custom cart experience with Storefront API, real-time updates, and optimistic UI for instant feedback using React and GraphQL.
                </p>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-primary/10">
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-primary/10 text-primary">React</span>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-primary/10 text-primary">GraphQL</span>
                </div>
              </Card>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <Card className="relative border-primary/20 bg-background/95 backdrop-blur-sm p-4 sm:p-6 md:p-8 hover:scale-105 transition-all duration-300">
                <Layers className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">B2B Wholesale Portal</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Created tiered pricing system with bulk ordering, customer-specific catalogs, and custom checkout flows for wholesale operations.
                </p>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-primary/10">
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-primary/10 text-primary">Liquid</span>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-primary/10 text-primary">Theme Kit</span>
                </div>
              </Card>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <Card className="relative border-primary/20 bg-background/95 backdrop-blur-sm p-4 sm:p-6 md:p-8 hover:scale-105 transition-all duration-300">
                <GitBranch className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">Dynamic Product Bundles</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Implemented intelligent bundling with cross-sell recommendations, dynamic pricing rules, and inventory synchronization across bundle items.
                </p>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-primary/10">
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-primary/10 text-primary">JavaScript</span>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-primary/10 text-primary">Liquid</span>
                </div>
              </Card>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <Card className="relative border-primary/20 bg-background/95 backdrop-blur-sm p-4 sm:p-6 md:p-8 hover:scale-105 transition-all duration-300">
                <Terminal className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">Custom App Integrations</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Built Shopify apps with Node.js connecting to external APIs, webhooks for real-time sync, and custom admin interfaces with Polaris.
                </p>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-primary/10">
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-primary/10 text-primary">Node.js</span>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-primary/10 text-primary">Polaris</span>
                </div>
              </Card>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <Card className="relative border-primary/20 bg-background/95 backdrop-blur-sm p-4 sm:p-6 md:p-8 hover:scale-105 transition-all duration-300">
                <CheckCircle2 className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">Performance Optimization</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Optimized store performance with lazy loading, code splitting, image optimization, and critical CSS extraction achieving 90+ Lighthouse scores.
                </p>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-primary/10">
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-primary/10 text-primary">Hydrogen</span>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-primary/10 text-primary">Remix</span>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Code Example Section */}
      <section className="px-4 py-20 max-w-7xl mx-auto">
        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm p-4 sm:p-6 md:p-12">
          <div className="flex flex-wrap items-center gap-3 mb-4 sm:mb-6">
            <Terminal className="w-6 h-6 text-primary flex-shrink-0" />
            <h2 className="text-xl sm:text-3xl font-bold">Modern Shopify Development</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="text-sm font-mono text-muted-foreground mb-2">Headless Storefront with Hydrogen</div>
              <div className="bg-background/50 border border-primary/20 rounded-lg p-3 md:p-6 overflow-x-auto">
                <pre className="text-xs md:text-sm font-mono text-primary whitespace-pre-wrap break-words md:whitespace-pre">
{`// Product Query with Storefront API
const PRODUCT_QUERY = \`
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      description
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            availableForSale
          }
        }
      }
    }
  }
\`;`}
                </pre>
              </div>
            </div>

            <div>
              <div className="text-sm font-mono text-muted-foreground mb-2">Custom Liquid Components</div>
              <div className="bg-background/50 border border-primary/20 rounded-lg p-3 md:p-6 overflow-x-auto">
                <pre className="text-xs md:text-sm font-mono text-primary whitespace-pre-wrap break-words md:whitespace-pre">
{`{% # Custom Product Card %}
{% liquid
  assign product_url = product.url | within: collection
  assign image = product.featured_media.preview_image
%}

<div class="product-card" data-product-id="{{ product.id }}">
  <a href="{{ product_url }}">
    <img src="{{ image | image_url: width: 600 }}" 
         alt="{{ image.alt }}">
    <h3>{{ product.title }}</h3>
    <span>{{ product.price | money }}</span>
  </a>
</div>`}
                </pre>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-12 sm:py-20 max-w-4xl mx-auto text-center">
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Need custom Shopify development?</h2>
          <p className="text-base sm:text-xl text-muted-foreground">
            Let's build something scalable together.
          </p>
          <Button size="lg" variant="neon" className="group">
            Start a Project
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ShopifyPlusDev;
