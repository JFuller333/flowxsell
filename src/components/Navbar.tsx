import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { title: "Home", url: "/" },
  { title: "Services", url: "/services" },
  { title: "Shopify Plus", url: "/shopify-plus-development" },
  { title: "Contact", url: "/contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-primary neon-text-glow">
          FlowXsell
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link 
              key={link.url}
              to={link.url} 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.title}
            </Link>
          ))}
          <Button size="sm" className="group" asChild>
            <Link to="/flowxsell-quiz">
              Take Quiz
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-b border-primary/10">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.url}
                to={link.url}
                onClick={() => setIsOpen(false)}
                className="block py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.title}
              </Link>
            ))}
            <Button size="sm" className="w-full group mt-4" asChild>
              <Link to="/flowxsell-quiz" onClick={() => setIsOpen(false)}>
                Take Quiz
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};
