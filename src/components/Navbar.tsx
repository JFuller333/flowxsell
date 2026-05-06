import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { title: "Home", url: "/" },
  { title: "Services", url: "/services" },
  { title: "Blog", url: "/blog" },
  { title: "Shopify Plus", url: "/shopify-plus-development" },
  { title: "Resume", url: "/resume" },
  { title: "Contact", url: "/contact" },
];

type NavbarProps = {
  variant?: "default" | "soft";
};

export const Navbar = ({ variant = "default" }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const isSoft = variant === "soft";

  return (
    <nav
      className={cn(
        "fixed left-0 right-0 top-0 z-50 backdrop-blur-md",
        isSoft
          ? "border-b border-[hsla(74,99%,49%,0.22)] bg-[rgba(8,8,8,0.82)]"
          : "border-b border-primary/10 bg-background/95",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link
          to="/"
          className={cn(
            "text-xl font-bold transition-colors",
            isSoft
              ? "text-[hsl(74,99%,49%)] [text-shadow:0_0_18px_hsla(74,99%,49%,0.25)] hover:[text-shadow:0_0_22px_hsla(74,99%,49%,0.35)]"
              : "text-primary neon-text-glow",
          )}
        >
          FlowXsell
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.url}
              to={link.url}
              className={cn(
                "text-sm transition-colors",
                isSoft ? "text-white/65 hover:text-white" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {link.title}
            </Link>
          ))}
          <Button
            size="sm"
            className={cn(
              "group",
              isSoft &&
                "rounded-md bg-[hsl(74,99%,49%)] font-semibold text-black shadow-[0_0_18px_-4px_hsla(74,99%,49%,0.45)] hover:bg-[hsl(74,99%,54%)]",
            )}
            asChild
          >
            <Link to="/flowxsell-quiz">
              Take Quiz
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "p-2 transition-colors md:hidden",
            isSoft ? "text-white/80 hover:text-[hsl(74,99%,49%)]" : "text-foreground hover:text-primary",
          )}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isOpen && (
        <div
          className={cn(
            "border-b md:hidden",
            isSoft ? "border-[hsla(74,99%,49%,0.2)] bg-[#0c0c0c]" : "border-primary/10 bg-background",
          )}
        >
          <div className="space-y-3 px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.url}
                to={link.url}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block py-2 transition-colors",
                  isSoft ? "text-white/70 hover:text-white" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {link.title}
              </Link>
            ))}
            <Button
              size="sm"
              className={cn(
                "group mt-4 w-full",
                isSoft &&
                  "rounded-md bg-[hsl(74,99%,49%)] font-semibold text-black shadow-[0_0_18px_-4px_hsla(74,99%,49%,0.45)] hover:bg-[hsl(74,99%,54%)]",
              )}
              asChild
            >
              <Link to="/flowxsell-quiz" onClick={() => setIsOpen(false)}>
                Take Quiz
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};
