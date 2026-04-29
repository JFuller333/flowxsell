import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FrameworkCard } from "@/components/FrameworkCard";
import { ParticleBackground } from "@/components/ParticleBackground";
import { Navbar } from "@/components/Navbar";
import { WebsiteDesignCardMedia } from "@/components/WebsiteDesignCardMedia";
import abwfsWebsiteVideoUrl from "@/videos/ABWFS_Website.mp4?url";
import aflWebsiteVideoUrl from "@/videos/AFL_Website.mp4?url";
import massyAriasWebsiteVideoUrl from "@/videos/MassyArias_Website.mp4?url";
import aflCampaignImage from "@/assets/campaign-architecture.jpg";
import { Search, Target, Cog, TrendingUp, ArrowRight, Calendar, ExternalLink, Instagram } from "lucide-react";
const Index = () => {
  const frameworks = [{
    phase: "Phase 01",
    title: "Audit",
    description: "Flow Disrupter Quiz + Flow Health Score. Diagnostic entrypoint to identify where your system breaks.",
    icon: Search
  }, {
    phase: "Phase 02",
    title: "Align",
    description: "Repositioning strategy across the customer journey. Emotional clarity and storytelling alignment.",
    icon: Target
  }, {
    phase: "Phase 03",
    title: "Automate",
    description: "Systems that connect Shopify, Marketing, & Analytics. Emphasize calm tech stacks.",
    icon: Cog
  }, {
    phase: "Phase 04",
    title: "XSell",
    description: "Optimization loops and sales multiplication. Scalable leverage tools.",
    icon: TrendingUp
  }];
  const myProjects = [{
    name: "Massy Arias",
    url: "https://www.massyarias.com/",
    niche: "Health + Wellness",
    summary: "Personal-brand platform combining programs, content, and conversion flows for digital offers.",
    snapshot: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fwww.massyarias.com%2F?w=1200",
    bundledVideoUrl: massyAriasWebsiteVideoUrl,
    bundledVideoCacheBust: "2026-04-29-1",
    instagram: {
      followersLabel: "3.1 Mill",
      href: "https://www.instagram.com/massyarias/"
    }
  }, {
    name: "A.Bright Wellness Fashion Studio",
    url: "https://www.abwfs.com/",
    niche: "Wellness + Fashion",
    summary: "Collection-first shopping experience blending wellness storytelling with fashion commerce.",
    snapshot: "/website-snapshots/abwfs-snapshot.png",
    bundledVideoUrl: abwfsWebsiteVideoUrl,
    bundledVideoCacheBust: "2026-04-29-2"
  }, {
    name: "Stacked w/ Style Products & Oils",
    url: "https://stackedwithstyleproducts.com/",
    niche: "Health + Beauty",
    summary: "Product-driven Shopify storefront with strong visual merchandising and testimonial-led trust.",
    snapshot: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fstackedwithstyleproducts.com%2F?w=1200"
  }, {
    name: "AFL Mastery Framework",
    url: "/case-study/afl",
    niche: "Wealth · Health · Balance · Purpose",
    summary: "Strategic framework for building scalable marketing campaigns that compound over time instead of burning budgets.",
    snapshot: aflCampaignImage,
    bundledVideoUrl: aflWebsiteVideoUrl,
    bundledVideoCacheBust: "2026-04-29-1"
  }];
  return <div className="min-h-[100svh] bg-background">
      <Navbar />
      {/* Hero Section */}
      <section className="relative min-h-[100svh] flex items-center justify-center px-4 py-20 overflow-hidden">
        <ParticleBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-block mb-4">
            <span className="text-xs sm:text-sm font-mono text-primary uppercase tracking-[0.2em] sm:tracking-[0.3em] px-3 py-1.5 sm:px-4 sm:py-2 border border-primary/30 rounded-full">
              Strategic Framework
            </span>
          </div>
          
          <h1 className="neon-text-glow text-3xl sm:text-5xl md:text-7xl break-words">FlowXsell</h1>
          
          <p className="text-base sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-0">
            I help entrepreneurs and start-up companies improve and run technical systems behind their business—When your
            systems flow, your sales grow.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button size="lg" className="group" onClick={() => document.getElementById('framework')?.scrollIntoView({
            behavior: 'smooth'
          })}>
              Understand the Flow Framework
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="neon" onClick={() => document.getElementById('about')?.scrollIntoView({
            behavior: 'smooth'
          })}>
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Previous "SYSTEMS & PROJECTS" grid (ProjectCard x4) replaced by My Projects below. Shopify + technical work remains on /shopify-plus-development. */}

      {/* My Projects */}
      <section className="px-4 py-24 max-w-7xl mx-auto border-t border-primary/10">
        <div className="mb-12 sm:mb-16 text-center">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight px-2">
            My Projects
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-2">
            Website design and motion previews for health, wellness, beauty, and fashion brands. Deeper Shopify Plus builds and technical case studies are on the Shopify development page.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          {myProjects.map((project) => {
            const isExternal = project.url.startsWith("http");
            const linkProps = isExternal
              ? { target: "_blank" as const, rel: "noopener noreferrer" as const }
              : {};
            return (
            <Card key={project.url} className="overflow-hidden border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary transition-colors">
              <div className="relative aspect-video w-full overflow-hidden border-b border-primary/10 bg-background">
                <WebsiteDesignCardMedia
                  snapshot={project.snapshot}
                  name={project.name}
                  bundledVideoUrl={"bundledVideoUrl" in project ? project.bundledVideoUrl : undefined}
                  bundledVideoCacheBust={
                    "bundledVideoCacheBust" in project ? project.bundledVideoCacheBust : undefined
                  }
                />
              </div>
              <div className="space-y-4 p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex flex-wrap items-center gap-x-2 gap-y-1">
                    <h3 className="text-lg sm:text-xl font-semibold leading-tight">{project.name}</h3>
                    {"instagram" in project && project.instagram ? (
                      <a
                        href={project.instagram.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors shrink-0"
                        aria-label={`${project.name} on Instagram, ${project.instagram.followersLabel} followers`}
                      >
                        <Instagram className="w-4 h-4 shrink-0 text-primary" aria-hidden />
                        <span className="font-medium tabular-nums">({project.instagram.followersLabel})</span>
                      </a>
                    ) : null}
                  </div>
                  <a
                    href={project.url}
                    {...linkProps}
                    className="text-muted-foreground hover:text-primary transition-colors shrink-0"
                    aria-label={isExternal ? `Open ${project.name} in a new tab` : `Open ${project.name}`}
                  >
                    {isExternal ? <ExternalLink className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                  </a>
                </div>
                <p className="text-xs font-mono uppercase tracking-wider text-primary">{project.niche}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{project.summary}</p>
                <a href={project.url} {...linkProps} className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                  View site
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </Card>
            );
          })}
        </div>
        <div className="text-center">
          <Button size="lg" variant="neon" className="group" asChild>
            <a href="/shopify-plus-development">
              Shopify development &amp; technical projects
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>
      </section>

      {/* Framework Section */}
      <section id="framework" className="px-4 py-16 sm:py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-16 space-y-4">
            <h2 className="neon-text-glow text-2xl sm:text-3xl md:text-4xl">The Xsell Framework</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Four phases to transform scattered effort into strategic growth
            </p>
            <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {frameworks.map((framework, index) => <FrameworkCard key={index} {...framework} />)}
          </div>
        </div>
      </section>

      {/* Why It Matters Section */}
      <section className="px-4 py-16 sm:py-24 md:py-32 relative">
        <div className="max-w-4xl mx-auto">
          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm p-4 sm:p-6 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            
            <div className="relative space-y-6">
              <h2 className="mb-6 sm:mb-8 text-xl sm:text-2xl md:text-3xl font-bold">Why It Matters</h2>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p className="text-xl text-foreground font-medium">
                  When your systems flow, your sales grow.
                </p>
                
                <p>
                  Most founders aren't failing because they lack effort—they're failing because their growth is fragmented.
                  Disconnected tools, inconsistent messaging, and no clear operating rhythm.
                </p>
                
                <p>
                  <span className="text-primary font-semibold">FlowXsell</span> helps you shift from scattered to strategic:
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
      <section id="about" className="px-4 py-16 sm:py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5" />
        
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6 sm:space-y-8">
          <div className="inline-block mb-4">
            <span className="text-xs sm:text-sm font-mono text-primary uppercase tracking-[0.2em] sm:tracking-[0.3em] px-3 py-1.5 sm:px-4 sm:py-2 border border-primary/30 rounded-full">
              Founder Note
            </span>
          </div>
          
          <div className="space-y-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
            <p>
              I've built and scaled systems for ecommerce founders who were drowning in complexity. 
              The ones who were working 80-hour weeks but couldn't see where the growth was coming from.
            </p>
            
            <p>
              What I learned: <span className="text-foreground font-medium">Your growth isn't broken—your system is.</span>
            </p>
            
            <p>
              FlowXsell is the framework I use to restore clarity, build momentum, and help founders 
              scale without burning out. It's not about working harder. It's about working with intention.
            </p>
          </div>
          
          <div className="pt-8">
            <Button size="lg" variant="neon" className="group" asChild>
              <a href="/flowxsell-quiz">
                Take FlowXsell Quiz
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Book a call */}
      <section className="px-4 py-16 sm:py-24 md:py-32 relative">
        <div className="max-w-2xl mx-auto">
          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm p-4 sm:p-6 md:p-12 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            
            <div className="relative text-center space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/30 mb-4">
                <Calendar className="w-8 h-8 text-primary" />
              </div>
              
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">Book a call.</h3>
              
              <p className="text-muted-foreground">
                Pick a 30-minute slot and we&apos;ll talk through your store, systems, and what to fix first.
              </p>
              
              <div className="pt-2">
                <Button size="lg" variant="neon" className="group" asChild>
                  <a
                    href="https://calendly.com/flowxsell/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Schedule on Calendly
                    <ExternalLink className="w-4 h-4 ml-2 opacity-80 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-primary/10 px-4 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div className="text-sm text-muted-foreground">
              © 2025 FlowXsell. <span className="text-primary">Built for founders, by a founder.</span>
            </div>
            <div className="text-xs text-muted-foreground font-mono">
              This isn't a funnel, it's a system.
            </div>
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;