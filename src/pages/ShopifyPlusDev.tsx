import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, Code2, Zap, Layers, GitBranch, Terminal, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import curlsmonthlyLogo from "@/assets/curlsmonthly-logo-original.webp";
import lrtLogo from "@/assets/lrt-logo.png";
import instaballoonsLogo from "@/assets/instaballoons-logo.svg";

const ShopifyPlusDev = () => {
  const navigate = useNavigate();

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
          <div className="text-center space-y-6 mb-12">
            <span className="text-sm font-mono text-primary uppercase tracking-[0.3em] px-4 py-2 border border-primary/30 rounded-full inline-block">
              Technical Services
            </span>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Shopify Plus Development
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Custom development for enterprise e-commerce. From headless storefronts to complex integrations, 
              we build scalable solutions that power high-volume stores.
            </p>
          </div>

          {/* Tech Stack Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-16">
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

      {/* Development Capabilities */}
      <section className="px-4 py-20 max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Development Capabilities</h2>
          <p className="text-xl text-muted-foreground">
            Full-stack Shopify Plus development services
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {capabilities.map((capability, index) => (
            <Card key={index} className="border-primary/20 bg-card/50 backdrop-blur-sm p-8">
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

      {/* Code Example Section */}
      <section className="px-4 py-20 max-w-7xl mx-auto">
        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm p-12">
          <div className="flex items-center gap-3 mb-6">
            <Terminal className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-bold">Modern Shopify Development</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="text-sm font-mono text-muted-foreground mb-2">Headless Storefront with Hydrogen</div>
              <div className="bg-background/50 border border-primary/20 rounded-lg p-6 overflow-x-auto">
                <pre className="text-sm font-mono text-primary">
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
              <div className="bg-background/50 border border-primary/20 rounded-lg p-6 overflow-x-auto">
                <pre className="text-sm font-mono text-primary">
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

      {/* Client Projects */}
      <section className="px-4 py-20 max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/30 mb-6">
            <Code2 className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-4xl font-bold mb-4">Technical Projects</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Custom Shopify Plus development delivered for growing brands
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {/* CurlsMonthly */}
          <AccordionItem value="client-1" className="border border-primary/20 rounded-lg bg-card/50 backdrop-blur-sm px-8 data-[state=open]:bg-primary/5">
            <AccordionTrigger className="hover:no-underline py-6">
              <div className="flex items-center justify-between w-full gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded-lg flex items-center justify-center flex-shrink-0 p-2">
                    <img src={curlsmonthlyLogo} alt="CurlsMonthly" className="w-full h-full object-contain" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold">CurlsMonthly</h3>
                    <p className="text-sm text-muted-foreground">Subscription box service</p>
                  </div>
                </div>
                <div className="flex gap-3 items-center pr-2">
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/30">
                    Shopify Plus
                  </span>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/30">
                    Liquid
                  </span>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/30">
                    JavaScript
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-6">
              <div className="space-y-6 ml-16">
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
          <AccordionItem value="client-2" className="border border-primary/20 rounded-lg bg-card/50 backdrop-blur-sm px-8 data-[state=open]:bg-primary/5">
            <AccordionTrigger className="hover:no-underline py-6">
              <div className="flex items-center justify-between w-full gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded-lg flex items-center justify-center flex-shrink-0 p-2">
                    <img src={lrtLogo} alt="Let's Rebuild Tuskegee" className="w-full h-full object-contain" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold">Let's Rebuild Tuskegee</h3>
                    <p className="text-sm text-muted-foreground">Community rebuilding initiative</p>
                  </div>
                </div>
                <div className="flex gap-3 items-center pr-2">
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/30">
                    React
                  </span>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/30">
                    Hydrogen
                  </span>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/30">
                    Storefront API
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-6">
              <div className="space-y-6 ml-16">
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

          {/* InstaBalloons */}
          <AccordionItem value="client-3" className="border border-primary/20 rounded-lg bg-card/50 backdrop-blur-sm px-8 data-[state=open]:bg-primary/5">
            <AccordionTrigger className="hover:no-underline py-6">
              <div className="flex items-center justify-between w-full gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded-lg flex items-center justify-center flex-shrink-0 p-2">
                    <img src={instaballoonsLogo} alt="InstaBalloons Wholesale" className="w-full h-full object-contain" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold">InstaBalloons Wholesale</h3>
                    <p className="text-sm text-muted-foreground">Party supplies wholesale</p>
                  </div>
                </div>
                <div className="flex gap-3 items-center pr-2">
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/30">
                    Shopify Plus
                  </span>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/30">
                    Liquid
                  </span>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/30">
                    JavaScript
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-6">
              <div className="space-y-6 ml-16">
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

      {/* CTA Section */}
      <section className="px-4 py-20 max-w-4xl mx-auto text-center">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold">Need custom Shopify development?</h2>
          <p className="text-xl text-muted-foreground">
            Let's build something scalable together.
          </p>
          <Button size="lg" variant="neon" className="group">
            Start a Project
            <ArrowLeft className="w-4 h-4 ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ShopifyPlusDev;
