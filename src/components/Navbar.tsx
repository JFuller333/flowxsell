import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navBeforeTools = [
  { title: "Home", url: "/" },
  { title: "Services", url: "/services" },
  { title: "Blog", url: "/blog" },
  { title: "Shopify Plus", url: "/shopify-plus-development" },
];

const contactLink = { title: "Contact", url: "/contact" };

const toolLinks = [
  { title: "Shopify CRO Audit", url: "/shopify-audit" },
  { title: "Data Analysis", url: "/analytics" },
  { title: "Landing Page Generator", url: "/analytics/generate" },
  { title: "BMF Redesign", url: "/free-website-redesign" },
];

const toolsTriggerClass = (isSoft: boolean) =>
  cn(
    "inline-flex items-center gap-1 rounded-md px-0 py-0 text-sm font-semibold outline-none ring-offset-background transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    isSoft
      ? "text-[hsl(74,99%,49%)] hover:text-[hsl(74,99%,54%)]"
      : "text-primary hover:text-primary/85",
  );

type NavbarProps = {
  variant?: "default" | "soft";
};

export const Navbar = ({ variant = "default" }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const isSoft = variant === "soft";

  const linkClass = cn(
    "text-sm transition-colors",
    isSoft ? "text-white/65 hover:text-white" : "text-muted-foreground hover:text-foreground",
  );

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
          {navBeforeTools.map((link) => (
            <Link key={link.url} to={link.url} className={linkClass}>
              {link.title}
            </Link>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger className={toolsTriggerClass(isSoft)}>
              Tools
              <ChevronDown className="h-3.5 w-3.5 shrink-0 opacity-80" aria-hidden />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[14rem]">
              {toolLinks.map((t) => (
                <DropdownMenuItem key={t.url} asChild>
                  <Link to={t.url}>{t.title}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Link to={contactLink.url} className={linkClass}>
            {contactLink.title}
          </Link>
          <Button
            size="sm"
            className={cn(
              "group",
              isSoft &&
                "rounded-md bg-[hsl(74,99%,49%)] font-semibold text-black shadow-[0_0_18px_-4px_hsla(74,99%,49%,0.45)] hover:bg-[hsl(74,99%,54%)]",
            )}
            asChild
          >
            <Link to="/shopify-audit">
              Shopify Audit
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
          <div className="space-y-1 px-4 py-4">
            {navBeforeTools.map((link) => (
              <Link
                key={link.url}
                to={link.url}
                onClick={() => setIsOpen(false)}
                className={cn("block py-2 transition-colors", linkClass)}
              >
                {link.title}
              </Link>
            ))}
            <div
              className={cn(
                "border-t pt-3 mt-2",
                isSoft ? "border-white/10" : "border-border",
              )}
            >
              <div
                className={cn(
                  "mb-2 text-xs font-semibold uppercase tracking-wider",
                  isSoft ? "text-[hsl(74,99%,49%)]" : "text-primary",
                )}
              >
                Tools
              </div>
              <div className="space-y-1 pl-1">
                {toolLinks.map((t) => (
                  <Link
                    key={t.url}
                    to={t.url}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block border-l-2 py-2 pl-2 text-sm transition-colors",
                      linkClass,
                      isSoft ? "border-[hsla(74,99%,49%,0.35)]" : "border-primary/35",
                    )}
                  >
                    {t.title}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              to={contactLink.url}
              onClick={() => setIsOpen(false)}
              className={cn("block py-2 transition-colors", linkClass)}
            >
              {contactLink.title}
            </Link>
            <Button
              size="sm"
              className={cn(
                "group mt-4 w-full",
                isSoft &&
                  "rounded-md bg-[hsl(74,99%,49%)] font-semibold text-black shadow-[0_0_18px_-4px_hsla(74,99%,49%,0.45)] hover:bg-[hsl(74,99%,54%)]",
              )}
              asChild
            >
              <Link to="/shopify-audit" onClick={() => setIsOpen(false)}>
                Shopify Audit
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};
