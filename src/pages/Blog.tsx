import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { ArrowRight, Calendar, Clock } from "lucide-react";
const post = {
  slug: "custom-community-donation-platform-shopify",
  title: "Building a Custom Community Donation Platform on Shopify",
  excerpt:
    "A case study in digital & physical community development: how we built a transparent, project-based donation platform for Let's Rebuild Tuskegee.",
  category: "Case Study",
  date: "Feb 10, 2026",
  readTime: "12 min read",
  image: "/blog-lrt-hero.png",
};

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 md:pt-28 pb-8 md:pb-12 px-4 border-b border-primary/10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs sm:text-sm font-mono text-primary uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3">
            FlowXsell Blog
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Insights for Founders Who Scale
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Strategy, systems, and Shopify. Practical guides to fix your flow and grow your sales.
          </p>
        </div>
      </section>

      {/* Single Post */}
      <section className="px-4 py-8 md:py-12 max-w-7xl mx-auto">
        <Link to={`/blog/${post.slug}`} className="block group">
          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm overflow-hidden hover:border-primary/40 transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="relative aspect-video lg:aspect-auto lg:min-h-[320px] bg-muted/30">
                <img
                  src={post.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="text-xs font-mono px-3 py-1.5 rounded-full bg-primary text-primary-foreground uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-center">
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="text-muted-foreground text-base sm:text-lg mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center gap-2 text-primary font-medium text-sm">
                  Read article
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Card>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-primary/10 px-4 py-8 sm:py-12 mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div className="text-sm text-muted-foreground">
              © 2025 FlowXsell. <span className="text-primary">Built for founders, by a founder.</span>
            </div>
            <div className="text-xs text-muted-foreground font-mono">
              This isn’t a funnel, it’s a system.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Blog;
