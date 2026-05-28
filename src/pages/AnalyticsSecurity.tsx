import { ExternalLink, ShieldCheck } from "lucide-react";
import { AnalyticsSidebar } from "@/components/analytics/AnalyticsSidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const checklist = [
  {
    title: "Secrets & API keys",
    why: "Agent-built code sometimes logs or exposes keys that 'just worked' in dev.",
    doText: "Search repo/history for sk-, Bearer, OPENAI*, ANTHROPIC*, AIza*. Never expose keys to the browser via NEXT_PUBLIC_.",
  },
  {
    title: "Production build & errors",
    why: "Debug modes and verbose errors teach attackers your stack and paths.",
    doText: "Turn off verbose errors to users in prod; avoid shipping source maps that leak paths.",
  },
  {
    title: "Authentication on mutations",
    why: "Every API route or action that changes data must enforce a real session or API key.",
    doText: "Review each handler: unauthenticated POST/PUT/PATCH = red flag.",
  },
  {
    title: "Authorization (IDOR)",
    why: "Logged-in does not mean allowed. Users must not load each other's records.",
    doText: "Test with two sandbox accounts. Swap IDs in URLs/API calls.",
  },
  {
    title: "Rate limits on AI/agent endpoints",
    why: "Unbounded prompts = bill shock and DOS.",
    doText: "Per-user/IP limits, timeouts, max body size on any LLM or tool route.",
  },
  {
    title: "Input validation & XSS",
    why: "User or model output pasted into HTML is a classic XSS path.",
    doText: "Validate schema; beware dangerouslySetInnerHTML; sanitize rich text.",
  },
  {
    title: "Security headers & HTTPS",
    why: "Headers reduce whole classes of browser attacks. This page scans some.",
    doText: "HSTS, CSP (start report-only), frame protection, sane cookies Secure/HttpOnly/SameSite.",
  },
  {
    title: "Third-party scripts",
    why: "AI pages collect tags; each origin is extended trust.",
    doText: "Remove unused snippets; inventory what still loads. Your scan table helps.",
  },
  {
    title: "Dependency CVEs",
    why: "Known exploits in transitive deps bite fast at scale.",
    doText: "Run npm audit / Dependabot on every deploy; patch critical immediately.",
  },
  {
    title: "Logs without leaking secrets",
    why: "You can't respond to incidents you can't detect, but logs should not hoard PII or tokens.",
    doText: "Alert on error spikes; redact prompts/keys from logs.",
  },
];

const owaspUrl = "https://owasp.org/www-project-top-ten/";

export default function AnalyticsSecurity() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground md:flex-row">
      <AnalyticsSidebar />
      <main className="flex-1 px-6 py-8 md:px-10 md:py-10">
        <div className="mx-auto max-w-4xl">
          <header className="mb-8">
            <Badge variant="outline" className="mb-4 rounded-none border-primary/30 bg-primary/5 text-primary">
              Founder checklist
            </Badge>
            <h1 className="text-3xl font-semibold tracking-tight">FX+ SECURITY Check</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              A quick post-launch review for agent-built apps. Start at the top, expand one item at a time, and fix the
              highest-risk gaps before more features ship.
            </p>
          </header>

          <div className="mb-6 grid gap-3 sm:grid-cols-3">
            <Card className="border-border bg-card/50 shadow-none">
              <CardContent className="p-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Scope</p>
                <p className="mt-2 text-sm font-medium">Repo, cloud, APIs, and process</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card/50 shadow-none">
              <CardContent className="p-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Priority</p>
                <p className="mt-2 text-sm font-medium">Secrets, auth, rate limits first</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card/50 shadow-none">
              <CardContent className="p-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Standard</p>
                <p className="mt-2 text-sm font-medium">OWASP-informed checklist</p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-border bg-card/50 shadow-none">
            <CardContent className="p-0">
              <div className="flex items-center gap-3 border-b border-border px-5 py-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-none bg-primary/10 text-primary">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Top 10 after agent code ships</p>
                  <p className="text-xs text-muted-foreground">
                    The Site scan tab covers some of #7-8. You still own the rest.
                  </p>
                </div>
              </div>

              <Accordion type="single" collapsible className="px-5">
                {checklist.map((item, index) => (
                  <AccordionItem key={item.title} value={item.title} className="border-border">
                    <AccordionTrigger className="gap-4 py-5 text-left hover:no-underline">
                      <div className="flex min-w-0 items-center gap-4">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-none bg-primary/10 font-mono text-sm font-semibold tabular-nums text-primary">
                          {index + 1}
                        </span>
                        <span className="text-sm font-semibold text-foreground">{item.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-12">
                      <div className="grid gap-4 pb-2 md:grid-cols-2">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Why</p>
                          <p className="mt-2 text-sm leading-6 text-foreground/80">{item.why}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Do</p>
                          <p className="mt-2 text-sm leading-6 text-foreground/80">{item.doText}</p>
                        </div>
                      </div>
                      <Button variant="link" className="h-auto px-0 text-xs font-semibold text-primary" asChild>
                        <a href={owaspUrl} target="_blank" rel="noopener noreferrer">
                          Learn more
                          <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                        </a>
                      </Button>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
