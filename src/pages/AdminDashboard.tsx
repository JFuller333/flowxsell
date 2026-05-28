import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Plus, RotateCcw, X } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Stage = "backlog" | "this-week" | "today" | "doing" | "done";

type KanbanCard = {
  id: string;
  goal: string;
  title: string;
  description: string;
  example?: string;
  priority: "Revenue" | "Job" | "Growth" | "Proof";
  stage: Stage;
};

const STORAGE_KEY = "flowxsell-admin-kanban-v1";
const priorities: KanbanCard["priority"][] = ["Revenue", "Job", "Growth", "Proof"];

const stages: { id: Stage; label: string; helper: string }[] = [
  { id: "backlog", label: "Backlog", helper: "Good ideas that wait until revenue work is done." },
  { id: "this-week", label: "This Week", helper: "The few moves that matter before Friday." },
  { id: "today", label: "Today", helper: "Start here before content or polish." },
  { id: "doing", label: "Doing", helper: "Active work. Keep this tight." },
  { id: "done", label: "Done", helper: "Shipped, sent, closed, or published." },
];

const targets = [
  { value: "$6-8K", label: "Monthly recurring revenue by day 90" },
  { value: "3-5", label: "FlowXsell retainer clients closed" },
  { value: "1", label: "100K role landed" },
  { value: "1", label: "Agency or event partnership active" },
  { value: "24", label: "Content pieces published, 2x/week" },
  { value: "10", label: "Case studies live on website and socials" },
];

const defaultCards: KanbanCard[] = [
  {
    id: "revenue-offer",
    goal: "$6-8K MRR",
    title: "Package the retainer offer",
    description: "Define the exact monthly promise, deliverables, price floor, and who it is for.",
    example: "Ex: $2,500/month CRO + BI retainer for Shopify stores doing $20K+/mo.",
    priority: "Revenue",
    stage: "today",
  },
  {
    id: "retainer-leads",
    goal: "3-5 retainer clients",
    title: "Build a warm lead list",
    description: "List 25 stores, founders, agencies, and past contacts who already understand ecommerce pain.",
    example: "Ex: 10 past contacts, 10 Shopify stores, 5 agency owners.",
    priority: "Revenue",
    stage: "this-week",
  },
  {
    id: "retainer-outreach",
    goal: "3-5 retainer clients",
    title: "Send revenue-first outreach",
    description: "Send 5 targeted messages per weekday with a clear audit, CRO, or analytics hook.",
    example: "Ex: I found 3 checkout leaks that may be costing you sales.",
    priority: "Revenue",
    stage: "today",
  },
  {
    id: "sales-calls",
    goal: "$6-8K MRR",
    title: "Book and close consults",
    description: "Push every qualified conversation toward a call, proposal, or paid audit next step.",
    example: "Ex: Turn a free audit reply into a $500 starting project.",
    priority: "Revenue",
    stage: "doing",
  },
  {
    id: "100k-role",
    goal: "100K role",
    title: "100K role application push",
    description: "Tailor resume, portfolio proof, and direct message around ecommerce growth systems.",
    example: "Ex: Send a short Loom explaining how you would improve their funnel.",
    priority: "Job",
    stage: "this-week",
  },
  {
    id: "partnership-list",
    goal: "1 partnership",
    title: "Shortlist partnership targets",
    description: "Pick agencies, event teams, and Shopify-adjacent operators who can send repeat business.",
    example: "Ex: Find one Shopify dev agency that needs CRO or analytics support.",
    priority: "Growth",
    stage: "backlog",
  },
  {
    id: "partnership-pitch",
    goal: "1 partnership",
    title: "Send partnership pitch",
    description: "Offer a clean referral or white-label CRO and analytics package with obvious next steps.",
    example: "Ex: I can be your backend CRO audit partner for ecommerce clients.",
    priority: "Growth",
    stage: "this-week",
  },
  {
    id: "content-calendar",
    goal: "24 content pieces",
    title: "Plan 12 weeks of revenue content",
    description: "Map 2 posts per week to audits, buyer path fixes, analytics insights, and case study proof.",
    example: "Ex: Tuesday audit teardown, Thursday BI or checkout lesson.",
    priority: "Growth",
    stage: "backlog",
  },
  {
    id: "weekly-content",
    goal: "24 content pieces",
    title: "Publish this week's 2 posts",
    description: "Only publish after the day's outreach, proposals, or job work is complete.",
    example: "Ex: One store teardown and one lesson from a client dashboard.",
    priority: "Growth",
    stage: "this-week",
  },
  {
    id: "case-study",
    goal: "10 case studies",
    title: "Ship website and social case studies",
    description: "Turn 10 clear client or brand wins into proof assets for the FlowXsell site and social channels.",
    example: "Ex: Before, leak found, fix shipped, result, next step.",
    priority: "Proof",
    stage: "today",
  },
];

const emptyCardInput = {
  goal: "",
  title: "",
  description: "",
  example: "",
  priority: "Revenue" as KanbanCard["priority"],
  stage: "backlog" as Stage,
};

function loadCards() {
  if (typeof window === "undefined") return defaultCards;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultCards;

    const savedCards = JSON.parse(raw) as KanbanCard[];
    return savedCards.map((card) => {
      const matchingDefault = defaultCards.find((defaultCard) => defaultCard.id === card.id);
      return matchingDefault ? { ...matchingDefault, stage: card.stage } : card;
    });
  } catch {
    return defaultCards;
  }
}

function priorityClass(priority: KanbanCard["priority"]) {
  if (priority === "Revenue") return "border-primary/60 bg-primary/10 text-primary";
  if (priority === "Job") return "border-sky-400/50 bg-sky-400/10 text-sky-200";
  if (priority === "Proof") return "border-amber-300/50 bg-amber-300/10 text-amber-100";
  return "border-white/20 bg-white/10 text-white/80";
}

export default function AdminDashboard() {
  const [cards, setCards] = useState<KanbanCard[]>(loadCards);
  const [newCard, setNewCard] = useState(emptyCardInput);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  }, [cards]);

  const completedCount = useMemo(() => cards.filter((card) => card.stage === "done").length, [cards]);
  const stageOrder = stages.map((stage) => stage.id);

  function moveCard(cardId: string, direction: -1 | 1) {
    setCards((current) =>
      current.map((card) => {
        if (card.id !== cardId) return card;

        const currentIndex = stageOrder.indexOf(card.stage);
        const nextStage = stageOrder[Math.min(Math.max(currentIndex + direction, 0), stageOrder.length - 1)];
        return { ...card, stage: nextStage };
      }),
    );
  }

  function deleteCard(cardId: string) {
    setCards((current) => current.filter((card) => card.id !== cardId));
  }

  function resetBoard() {
    setCards(defaultCards);
    setNewCard(emptyCardInput);
  }

  function addCard(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const title = newCard.title.trim();
    if (!title) return;

    const card: KanbanCard = {
      id: `custom-${Date.now()}`,
      goal: newCard.goal.trim() || "Custom goal",
      title,
      description: newCard.description.trim() || "Define the next concrete action for this card.",
      example: newCard.example.trim() || undefined,
      priority: newCard.priority,
      stage: newCard.stage,
    };

    setCards((current) => [...current, card]);
    setNewCard(emptyCardInput);
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <Navbar variant="soft" />

      <main className="px-4 pb-16 pt-28 md:px-6 md:pt-32">
        <div className="mx-auto max-w-7xl">
          <header className="mb-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary">Admin dashboard</p>
              <h1 className="max-w-3xl font-serif text-4xl font-medium tracking-tight md:text-6xl">
                90-day revenue kanban
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/62">
                Track the work that closes clients, lands the 100K role, and turns FlowXsell into a repeatable
                revenue engine.
              </p>
            </div>

            <Card className="border-primary/25 bg-primary/10 text-white shadow-[0_0_32px_-18px_hsla(74,99%,49%,0.8)]">
              <CardHeader>
                <CardTitle className="text-base text-primary">The one rule for 90 days</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-6 text-white/72">
                Revenue before reach. Every decision gets filtered through one question: does this close a client or land
                a job? If no, it goes to the backlog.
              </CardContent>
            </Card>
          </header>

          <section className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-6" aria-label="90-day targets">
            {targets.map((target) => (
              <Card key={target.label} className="border-white/10 bg-white/[0.04] text-white">
                <CardContent className="p-4">
                  <p className="text-2xl font-bold tabular-nums text-primary">{target.value}</p>
                  <p className="mt-2 text-xs leading-5 text-white/58">{target.label}</p>
                </CardContent>
              </Card>
            ))}
          </section>

          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-white/55">
              {completedCount} of {cards.length} work cards done. Use the arrows to move cards across the board.
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={resetBoard}
              className="border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset board
            </Button>
          </div>

          <Card className="mb-6 border-white/10 bg-white/[0.04] text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Plus className="h-4 w-4 text-primary" />
                Add a kanban card
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={addCard} className="grid gap-3 lg:grid-cols-12">
                <label className="grid gap-1.5 lg:col-span-3">
                  <span className="text-xs font-medium uppercase tracking-[0.14em] text-white/45">Goal</span>
                  <input
                    value={newCard.goal}
                    onChange={(event) => setNewCard((card) => ({ ...card, goal: event.target.value }))}
                    placeholder="Ex: 3-5 retainer clients"
                    className="h-10 rounded-md border border-white/10 bg-black/40 px-3 text-sm text-white placeholder:text-white/25 outline-none transition-colors focus:border-primary/60"
                  />
                </label>
                <label className="grid gap-1.5 lg:col-span-3">
                  <span className="text-xs font-medium uppercase tracking-[0.14em] text-white/45">Title</span>
                  <input
                    value={newCard.title}
                    onChange={(event) => setNewCard((card) => ({ ...card, title: event.target.value }))}
                    placeholder="Ex: Follow up with warm leads"
                    className="h-10 rounded-md border border-white/10 bg-black/40 px-3 text-sm text-white placeholder:text-white/25 outline-none transition-colors focus:border-primary/60"
                    required
                  />
                </label>
                <label className="grid gap-1.5 lg:col-span-3">
                  <span className="text-xs font-medium uppercase tracking-[0.14em] text-white/45">Priority</span>
                  <select
                    value={newCard.priority}
                    onChange={(event) =>
                      setNewCard((card) => ({ ...card, priority: event.target.value as KanbanCard["priority"] }))
                    }
                    className="h-10 rounded-md border border-white/10 bg-black/40 px-3 text-sm text-white outline-none transition-colors focus:border-primary/60"
                  >
                    {priorities.map((priority) => (
                      <option key={priority} value={priority}>
                        {priority}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-1.5 lg:col-span-3">
                  <span className="text-xs font-medium uppercase tracking-[0.14em] text-white/45">Start in</span>
                  <select
                    value={newCard.stage}
                    onChange={(event) => setNewCard((card) => ({ ...card, stage: event.target.value as Stage }))}
                    className="h-10 rounded-md border border-white/10 bg-black/40 px-3 text-sm text-white outline-none transition-colors focus:border-primary/60"
                  >
                    {stages.map((stage) => (
                      <option key={stage.id} value={stage.id}>
                        {stage.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-1.5 lg:col-span-6">
                  <span className="text-xs font-medium uppercase tracking-[0.14em] text-white/45">Description</span>
                  <textarea
                    value={newCard.description}
                    onChange={(event) => setNewCard((card) => ({ ...card, description: event.target.value }))}
                    placeholder="What needs to happen?"
                    className="min-h-24 rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm leading-6 text-white placeholder:text-white/25 outline-none transition-colors focus:border-primary/60"
                  />
                </label>
                <label className="grid gap-1.5 lg:col-span-6">
                  <span className="text-xs font-medium uppercase tracking-[0.14em] text-white/45">Example</span>
                  <textarea
                    value={newCard.example}
                    onChange={(event) => setNewCard((card) => ({ ...card, example: event.target.value }))}
                    placeholder="Ex: Send 5 messages to Shopify brands with checkout leaks."
                    className="min-h-24 rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm leading-6 text-white placeholder:text-white/25 outline-none transition-colors focus:border-primary/60"
                  />
                </label>
                <div className="flex justify-end lg:col-span-12">
                  <Button type="submit" className="bg-primary text-black hover:bg-primary/90">
                    <Plus className="mr-2 h-4 w-4" />
                    Add card
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <section className="grid gap-4 lg:grid-cols-5" aria-label="90-day kanban board">
            {stages.map((stage) => {
              const stageCards = cards.filter((card) => card.stage === stage.id);

              return (
                <div key={stage.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                  <div className="mb-3">
                    <div className="flex items-center justify-between gap-3">
                      <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-white/86">{stage.label}</h2>
                      <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/60">{stageCards.length}</span>
                    </div>
                    <p className="mt-2 min-h-10 text-xs leading-5 text-white/42">{stage.helper}</p>
                  </div>

                  <div className="space-y-3">
                    {stageCards.map((card) => (
                      <Card
                        key={card.id}
                        className="relative border-white/10 bg-[#101010] text-white shadow-xl shadow-black/20"
                      >
                        <CardContent className="p-4">
                          <button
                            type="button"
                            onClick={() => deleteCard(card.id)}
                            className="absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-full text-white/35 transition-colors hover:bg-white/10 hover:text-white"
                            aria-label={`Delete ${card.title}`}
                          >
                            <X className="h-4 w-4" />
                          </button>

                          <div className="mb-3 flex flex-wrap items-center gap-2 pr-8">
                            <Badge variant="outline" className={cn("rounded-full", priorityClass(card.priority))}>
                              {card.priority}
                            </Badge>
                            <span className="text-xs text-white/38">{card.goal}</span>
                          </div>
                          <h3 className="text-base font-semibold leading-snug">{card.title}</h3>
                          <p className="mt-2 text-sm leading-6 text-white/56">{card.description}</p>
                          {card.example ? (
                            <div className="mt-3 rounded-lg border border-primary/15 bg-primary/5 p-3 text-xs leading-5 text-white/58">
                              <span className="font-semibold text-primary">Ex: </span>
                              {card.example.replace(/^ex:\s*/i, "")}
                            </div>
                          ) : null}

                          <div className="mt-4 flex items-center justify-between gap-2">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => moveCard(card.id, -1)}
                              disabled={stage.id === "backlog"}
                              className="h-8 px-2 text-white/60 hover:bg-white/10 hover:text-white disabled:opacity-25"
                              aria-label={`Move ${card.title} left`}
                            >
                              <ArrowLeft className="h-4 w-4" />
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => moveCard(card.id, 1)}
                              disabled={stage.id === "done"}
                              className="h-8 px-2 text-white/60 hover:bg-white/10 hover:text-white disabled:opacity-25"
                              aria-label={`Move ${card.title} right`}
                            >
                              <ArrowRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </section>
        </div>
      </main>
    </div>
  );
}
