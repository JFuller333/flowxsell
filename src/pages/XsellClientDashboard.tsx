import type { ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Check, ImageIcon } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getClientBySlug } from "@/data/xsellClientProjects";
import NotFound from "./NotFound";

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-mono text-primary tracking-wide mb-2">{children}</p>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="!text-xl md:!text-2xl font-bold normal-case tracking-tight mb-4">{children}</h2>;
}

const XsellClientDashboard = () => {
  const { slug } = useParams<{ slug: string }>();
  const client = slug ? getClientBySlug(slug) : undefined;

  if (!client) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="pt-20 md:pt-24 pb-24 px-4 md:px-6">
        <div className="container mx-auto max-w-3xl">
          <Button variant="ghost" size="sm" className="mb-6 -ml-2 gap-1 text-muted-foreground" asChild>
            <Link to="/xsell">
              <ArrowLeft className="w-4 h-4" />
              All PDP projects
            </Link>
          </Button>

          {/* 1. Header */}
          <header className="mb-12">
            <SectionLabel>CONTEXT</SectionLabel>
            <h1 className="!text-3xl md:!text-4xl font-bold normal-case tracking-tight mb-2">
              {client.clientName}
            </h1>
            <p className="text-muted-foreground">{client.projectName}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 text-sm">
              {client.sprintType && (
                <div className="rounded-lg border border-border/50 p-4 space-y-1 sm:col-span-2">
                  <p className="text-muted-foreground text-xs uppercase tracking-wide">Sprint type</p>
                  <p className="font-medium">{client.sprintType}</p>
                </div>
              )}
              <div className="rounded-lg border border-border/50 p-4 space-y-1">
                <p className="text-muted-foreground text-xs uppercase tracking-wide">Status</p>
                <p className="font-medium">{client.status}</p>
              </div>
              <div className="rounded-lg border border-border/50 p-4 space-y-1">
                <p className="text-muted-foreground text-xs uppercase tracking-wide">Start date</p>
                <p className="font-medium">{client.startDate}</p>
              </div>
              <div className="rounded-lg border border-border/50 p-4 space-y-1 sm:col-span-2">
                <p className="text-muted-foreground text-xs uppercase tracking-wide">Current sprint</p>
                <p className="font-medium">{client.currentSprintLabel}</p>
              </div>
              {client.primaryGoal && (
                <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 space-y-1 sm:col-span-2">
                  <p className="text-muted-foreground text-xs uppercase tracking-wide">Primary goal</p>
                  <p className="font-medium">{client.primaryGoal}</p>
                </div>
              )}
            </div>
          </header>

          <Separator className="mb-12 bg-border/60" />

          {/* 2. Flow Health Score */}
          <section className="mb-12">
            <SectionLabel>SNAPSHOT</SectionLabel>
            <SectionTitle>{client.uiLabels?.snapshotTitle ?? "Flow health score"}</SectionTitle>
            <Card className="border-border/50 bg-card/50">
              <CardContent className="pt-6 space-y-4">
                {client.flowScores.map((row) => (
                  <div key={row.label} className="flex items-center justify-between text-sm gap-4">
                    <span className="text-muted-foreground">{row.label}</span>
                    <span className="font-mono tabular-nums shrink-0">
                      {row.score} / {row.max}
                    </span>
                  </div>
                ))}
                <Separator />
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <span className="font-semibold">{client.uiLabels?.overallScoreLineLabel ?? "Overall flow score"}</span>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono tabular-nums">
                      {client.overallFlowScore} / {client.overallFlowMax}
                    </span>
                    <Badge variant="outline" className="border-destructive/50 text-destructive">
                      {client.overallFlowLabel}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* 3. Key Flow Breaks */}
          <section className="mb-12">
            <SectionLabel>DIAGNOSIS</SectionLabel>
            <SectionTitle>{client.uiLabels?.diagnosisTitle ?? "Key flow breaks"}</SectionTitle>
            <ul className="space-y-3 text-sm md:text-base">
              {client.flowBreaks.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-destructive shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 4. Sprint Plan */}
          <section className="mb-12">
            <SectionLabel>EXECUTION PLAN</SectionLabel>
            <SectionTitle>{client.uiLabels?.planTitle ?? "Sprint plan"}</SectionTitle>
            <div className="space-y-6">
              {client.sprintPlan.map((block) => (
                <Card key={block.stage} className="border-border/50 bg-card/40">
                  <CardHeader className="pb-2">
                    <CardTitle className="!text-base font-semibold">{block.stage}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {block.items.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="text-primary">—</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 5. Progress Tracker */}
          <section className="mb-12">
            <SectionLabel>SYSTEM</SectionLabel>
            <SectionTitle>{client.uiLabels?.progressTitle ?? "Progress tracker"}</SectionTitle>
            <Card className="border-border/50 bg-card/50 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-border/50">
                    <TableHead>Area</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right w-[120px]">Progress</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {client.progress.map((row) => (
                    <TableRow key={row.area} className="border-border/50">
                      <TableCell className="font-medium">{row.area}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            row.status === "Complete"
                              ? "default"
                              : row.status === "In Progress"
                                ? "secondary"
                                : "outline"
                          }
                          className="font-normal"
                        >
                          {row.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="font-mono text-sm tabular-nums">{row.progress}%</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="p-4 space-y-4 border-t border-border/50">
                {client.progress.map((row) => (
                  <div key={`bar-${row.area}`}>
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>{row.area}</span>
                      <span>{row.progress}%</span>
                    </div>
                    <Progress value={row.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </Card>
          </section>

          {/* 6. Implementation Log */}
          <section className="mb-12">
            <SectionLabel>PROOF OF WORK</SectionLabel>
            <SectionTitle>Implementation log</SectionTitle>
            <div className="space-y-6">
              {client.implementationLog.map((entry) => (
                <div key={entry.date}>
                  <p className="text-sm font-mono text-primary mb-2">[{entry.date}]</p>
                  <ul className="space-y-2">
                    {entry.items.map((line) => (
                      <li key={line} className="flex gap-2 text-sm">
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* 7. Before / After */}
          <section className="mb-12">
            <SectionLabel>VISUAL PROOF</SectionLabel>
            <SectionTitle>{client.uiLabels?.visualProofTitle ?? "Before / after"}</SectionTitle>
            <div className="grid md:grid-cols-2 gap-4">
              {(["Before", "After"] as const).map((label) => {
                const copy =
                  label === "Before"
                    ? client.visualProofCopy?.before
                    : client.visualProofCopy?.after;
                return (
                  <div
                    key={label}
                    className="rounded-lg border border-dashed border-border/70 bg-muted/20 min-h-[140px] flex flex-col items-stretch justify-center gap-2 p-4 md:p-5"
                  >
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <ImageIcon className="w-5 h-5 shrink-0" />
                      <p className="text-sm font-medium text-foreground">{label}</p>
                    </div>
                    {copy ? (
                      <p className="text-sm text-muted-foreground leading-relaxed">{copy}</p>
                    ) : (
                      <p className="text-xs text-muted-foreground">Drop screenshot or embed when ready</p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* 8. Expected Impact */}
          <section className="mb-12">
            <SectionLabel>BUSINESS</SectionLabel>
            <SectionTitle>{client.uiLabels?.impactTitle ?? "Expected impact"}</SectionTitle>
            <ul className="space-y-2 text-sm md:text-base">
              {client.expectedImpact.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {client.targetLift && (
              <p className="mt-4 text-sm text-muted-foreground border-l-2 border-primary/40 pl-3">
                {client.targetLift}
              </p>
            )}
          </section>

          {/* 9. Notes */}
          {client.notes && client.notes.length > 0 && (
            <section>
              <SectionLabel>ADVISORY</SectionLabel>
              <SectionTitle>Notes & recommendations</SectionTitle>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {client.notes.map((note) => (
                  <li key={note} className="flex gap-2">
                    <span className="text-foreground/50">•</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default XsellClientDashboard;
