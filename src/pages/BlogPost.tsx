import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

type BodyBlock = { type: "h2"; text: string } | { type: "p"; text: string };

const posts: Record<
  string,
  {
    title: string;
    subtitle: string;
    category: string;
    date: string;
    readTime: string;
    image: string;
    excerpt: string;
    body: BodyBlock[];
  }
> = {
  "custom-community-donation-platform-shopify": {
    title: "Building a Custom Community Donation Platform on Shopify",
    subtitle: "A Case Study in Digital & Physical Community Development",
    category: "Case Study",
    date: "Feb 10, 2026",
    readTime: "12 min read",
    image: "/blog-lrt-hero.png",
    excerpt:
      "A case study in digital & physical community development: how we built a transparent, project-based donation platform for Let's Rebuild Tuskegee.",
    body: [
      { type: "h2", text: "Meet the Client: Let's Rebuild Tuskegee" },
      {
        type: "p",
        text: "This project was built for Let's Rebuild Tuskegee, a nonprofit organization I co-founded in 2017 alongside investor and commercial contractor Aleeyah Sanders.",
      },
      {
        type: "p",
        text: "We started Let's Rebuild Tuskegee with a clear purpose: to help protect Tuskegee from potential gentrification while actively revitalizing the community—specifically addressing long-standing blight in historically significant neighborhoods.",
      },
      {
        type: "p",
        text: "Aleeyah is a Construction Science graduate of Tuskegee University with over 10 years of commercial construction management experience and now holds her commercial general contractor's license. I'm a multidisciplinary social science graduate with a minor in business who currently works in the tech field, with over 10 years of experience in web development, e-commerce, and cybersecurity.",
      },
      {
        type: "p",
        text: "From 2017 through early 2020, we actively operated the nonprofit. However, due to the pandemic, rising construction costs, and regulatory hurdles around permits and local approvals, we were forced to pause operations.",
      },
      {
        type: "p",
        text: "Five years later, we reconnected—this time with deeper experience, stronger capabilities, and clearer execution power.",
      },
      {
        type: "p",
        text: "After securing our first lot, we made the decision to move forward with new construction housing in the historic Greenwood community.",
      },
      {
        type: "p",
        text: "As a registered 501(c)(3), we also recognized a unique opportunity: to re-engage Tuskegee alumni and the broader community by creating transparent, project-based ways for people to participate in community development—not just donate blindly, but follow progress and impact in real time.",
      },
      { type: "h2", text: "What Challenge Were We Facing?" },
      {
        type: "p",
        text: "One of the biggest challenges we experienced—both in the past and now—was transparency and control.",
      },
      {
        type: "p",
        text: "We needed: a clear way to show project progress, a transparent donation flow, direct control over how funds were raised and managed, and a platform we fully owned, not one we were dependent on.",
      },
      {
        type: "p",
        text: "While we had used traditional donation methods before (donation buttons, third-party platforms, university-adjacent giving), none of them allowed supporters to clearly see what they were funding, where the money was going, or how the project was progressing.",
      },
      { type: "h2", text: "What Was the Root Problem?" },
      {
        type: "p",
        text: "The root issue went beyond our organization.",
      },
      {
        type: "p",
        text: "We believe many alumni and supporters want to give back to Tuskegee—but often don't have a clear, trusted, or specific way to do so. When donating to large institutions, supporters don't always know how or where their funds are allocated.",
      },
      {
        type: "p",
        text: "We wanted to flip that experience.",
      },
      {
        type: "p",
        text: "Our goal was to allow supporters to: donate to specific projects, track milestones and progress, and understand exactly how their contribution is being used.",
      },
      {
        type: "p",
        text: "One feature we felt strongly about was transparency around risk. We built terms and refund logic directly into the platform so that if a project were ever delayed or discontinued, donors could choose to receive a refund or reallocate their funds to another community project.",
      },
      {
        type: "p",
        text: "That level of accountability was non-negotiable.",
      },
      { type: "h2", text: "Why Build Our Own Platform?" },
      {
        type: "p",
        text: "We considered several options.",
      },
      {
        type: "p",
        text: "We already use industry platforms such as Fidelity's investment platform and GoFundMe-style donation tools. We also had basic donation buttons on our website.",
      },
      {
        type: "p",
        text: "But none of those options gave us: full control over features, flexibility to iterate based on community feedback, ownership over the experience, and the ability to build custom functionality over time.",
      },
      {
        type: "p",
        text: "As a developer, I see platforms as digital land—and when you own the land, you can build anything you want.",
      },
      {
        type: "p",
        text: "Just as Aleeyah and I build in the physical world, we also have the skills to build in the digital one. This platform was an extension of that philosophy.",
      },
      { type: "h2", text: "How the Platform Was Built" },
      {
        type: "p",
        text: "This project was developed in 2026, and AI played a major role in accelerating the build process.",
      },
      {
        type: "p",
        text: "Core tools used: Shopify as the CMS and commerce backbone, Lovable to design and prototype the custom UI, Cursor to assist with code generation and refactoring, Hydrogen to implement a Shopify headless storefront, and Oxygen to improve Shopify communication and navigation performance.",
      },
      {
        type: "p",
        text: "Lovable's framework uses Vite and React, so one of the more time-intensive steps was converting that framework into a Hydrogen-compatible setup for Shopify headless. That conversion was the longest part of the process.",
      },
      {
        type: "p",
        text: "Even so, the results were surprising.",
      },
      {
        type: "p",
        text: "The core concept—from idea to a live, functional platform—was built in under one week. Refinements and enhancements took additional weeks, but the foundational system came together incredibly fast compared to traditional development timelines.",
      },
      { type: "h2", text: "What Changed After the Work Was Complete?" },
      {
        type: "p",
        text: "Two major things stood out.",
      },
      {
        type: "p",
        text: "First, this project showed me the real power of AI-assisted development. What would have traditionally taken six months could now be done in a fraction of the time—without sacrificing quality.",
      },
      {
        type: "p",
        text: "Second, the impact goes beyond our organization.",
      },
      {
        type: "p",
        text: "This platform doesn't just help Let's Rebuild Tuskegee—it gives the community access to funding pathways that didn't previously exist. Alumni and supporters can now participate directly in meaningful, transparent development projects that shape the future of Tuskegee.",
      },
      {
        type: "p",
        text: "That changes what's possible at a community level.",
      },
      { type: "h2", text: "Key Takeaway" },
      {
        type: "p",
        text: "I'll be honest—the biggest lesson from this project is that if you know how to strategically use modern tools, you can build almost anything.",
      },
      {
        type: "p",
        text: "Between AI platforms, open frameworks, and accessible systems, the information is already out there. Execution is the real differentiator.",
      },
      {
        type: "p",
        text: "This project showed me how to build a scalable system that can take this nonprofit to the next level—while also reinforcing a broader truth: in today's environment, the only real limitation is whether you decide to act.",
      },
      { type: "h2", text: "A Message from the FlowXsell Team" },
      {
        type: "p",
        text: "This project reflects exactly why FlowXsell exists.",
      },
      {
        type: "p",
        text: "We help founders and organizations build scalable technical systems, not just websites—using a systems-first approach grounded in real business needs. Through the FlowXsell framework, we design and develop custom Shopify solutions that support growth, transparency, and long-term impact.",
      },
      {
        type: "p",
        text: "We're proud to support projects like this and to continue building alongside teams using thoughtful, flexible technology to create meaningful change.",
      },
    ],
  },
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? posts[slug] : null;

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 px-4 py-16 text-center">
          <p className="text-muted-foreground mb-4">Post not found.</p>
          <Link to="/blog" className="text-primary hover:underline inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <article className="pt-24 md:pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 mb-6">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to blog
          </Link>
        </div>

        <header className="max-w-3xl mx-auto px-4 mb-8">
          <span className="text-xs font-mono text-primary uppercase tracking-wider">
            {post.category}
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2 mb-2">{post.title}</h1>
          {post.subtitle && (
            <p className="text-muted-foreground text-lg sm:text-xl mb-4">{post.subtitle}</p>
          )}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 mb-8 md:mb-12">
          <div className="relative aspect-video md:aspect-[21/9] rounded-lg overflow-hidden border border-primary/20">
            <img
              src={post.image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4">
          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm p-6 sm:p-8 md:p-10">
            <div className="prose prose-invert prose-sm sm:prose-base max-w-none">
              <p className="text-muted-foreground text-lg border-l-2 border-primary pl-4 mb-8">
                {post.excerpt}
              </p>
              <div className="space-y-6">
                {post.body.map((block, i) =>
                  block.type === "h2" ? (
                    <h2
                      key={i}
                      className="text-xl sm:text-2xl font-bold text-foreground mt-10 mb-4 first:mt-0"
                    >
                      {block.text}
                    </h2>
                  ) : (
                    <p key={i} className="text-foreground/90 leading-relaxed">
                      {block.text}
                    </p>
                  )
                )}
              </div>
            </div>
          </Card>
        </div>

        <div className="max-w-3xl mx-auto px-4 mt-12 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to blog
          </Link>
        </div>
      </article>

      <footer className="border-t border-primary/10 px-4 py-8 mt-12">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          © 2025 FlowXsell. <span className="text-primary">Built for founders, by a founder.</span>
        </div>
      </footer>
    </div>
  );
};

export default BlogPost;
