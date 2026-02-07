import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ParticleBackground } from "@/components/ParticleBackground";
import { Navbar } from "@/components/Navbar";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      toast.success("Message sent! I'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center px-4 pt-24 md:pt-20 pb-12 overflow-hidden">
        <ParticleBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-block mb-4">
            <span className="text-sm font-mono text-primary uppercase tracking-[0.3em] px-4 py-2 border border-primary/30 rounded-full">
              Get In Touch
            </span>
          </div>
          
          <h1 className="neon-text-glow text-3xl sm:text-4xl md:text-5xl lg:text-6xl">Contact</h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to build systems that scale? Let's talk about your project.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="px-4 py-24">
        <div className="max-w-2xl mx-auto">
          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            
            <form onSubmit={handleSubmit} className="relative space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Name</label>
                  <Input
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-background/50 border-primary/20 focus:border-primary"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-background/50 border-primary/20 focus:border-primary"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Subject</label>
                <Input
                  type="text"
                  placeholder="What's this about?"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="bg-background/50 border-primary/20 focus:border-primary"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Message</label>
                <Textarea
                  placeholder="Tell me about your project, challenges, or questions..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={6}
                  className="bg-background/50 border-primary/20 focus:border-primary resize-none"
                />
              </div>
              
              <Button type="submit" size="lg" className="w-full group">
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Alternative Contact */}
      <section className="px-4 py-16">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/30">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          
          <p className="text-muted-foreground">
            Prefer email? Reach out directly at{" "}
            <a 
              href="mailto:hello@flowxsell.com" 
              className="text-primary hover:underline"
            >
              hello@flowxsell.com
            </a>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-primary/10 px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              © 2025 FlowXsell. <span className="text-primary">Built for founders, by a founder.</span>
            </div>
            <div className="text-xs text-muted-foreground font-mono">
              This isn't a funnel, it's a system.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
