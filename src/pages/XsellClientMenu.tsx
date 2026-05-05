import { Link } from "react-router-dom";
import { ArrowRight, LayoutDashboard } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { xsellClientProjects } from "@/data/xsellClientProjects";

const XsellClientMenu = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="pt-24 md:pt-28 pb-10 px-4 md:px-6">
        <div className="container mx-auto max-w-3xl">
          <p className="text-xs font-mono text-primary mb-3 tracking-wide">FLOWXSELL · XSELL</p>
          <h1 className="!text-3xl md:!text-4xl font-bold mb-3 normal-case tracking-tight">
            Client PDP projects
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Open a client to see their name, current sprint, and the full dashboard: score, breaks, plan,
            progress, log, and impact.
          </p>
        </div>
      </section>

      <section className="pb-20 px-4 md:px-6">
        <div className="container mx-auto max-w-3xl space-y-4">
          {xsellClientProjects.map((client) => (
            <Link
              key={client.slug}
              to={`/xsell/${client.slug}`}
              className="group block rounded-lg border border-border/50 bg-card/40 p-5 md:p-6 hover:border-primary/40 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="flex gap-3">
                  <div className="mt-0.5 rounded-md border border-primary/20 bg-primary/5 p-2 text-primary">
                    <LayoutDashboard className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold">{client.clientName}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{client.projectName}</p>
                    <p className="text-sm text-foreground/90 mt-2">
                      <span className="text-muted-foreground">Current sprint: </span>
                      {client.currentSprintLabel}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-start sm:items-end gap-2 shrink-0">
                  <Badge variant="secondary" className="font-normal">
                    {client.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">Started {client.startDate}</span>
                  <span className="inline-flex items-center gap-1 text-sm text-primary group-hover:gap-2 transition-all">
                    Open PDP page
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default XsellClientMenu;
