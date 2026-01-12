import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-primary neon-text-glow">
          FlowXsell
        </Link>
        
        <div className="flex items-center gap-6">
          <Link 
            to="/services" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Services
          </Link>
          <Link 
            to="/contact" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Contact
          </Link>
          <Button size="sm" className="group" asChild>
            <Link to="/flowxsell-quiz">
              Take Quiz
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};
