import { Navbar } from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const results = [
  {
    title: "Metpure: $1.06M in tracked Shopify sales",
    metricValue: "$1,060,829.76",
    metricLabel: "Total Sales",
    image: "/results/metpure-3yr-sales.png",
    alt: "Shopify analytics dashboard showing Metpure total sales over time and sales channel breakdown.",
    description:
      "A three-year Shopify analytics view showing seven-figure store revenue, 167,072 sessions, 2,313 orders, and a clear sales-channel breakdown. This result highlights the kind of business intelligence FlowXsell uses to understand where revenue is coming from and where the buyer path can improve.",
  },
  {
    title: "TRU Supplements: sales up 19%",
    metricValue: "$643,852.16",
    metricLabel: "Gross Sales",
    image: "/results/tru-supps-sales-up-19.png",
    alt: "Shopify analytics dashboard showing TRU Supplements gross sales up 19 percent.",
    description:
      "A Shopify analytics snapshot showing gross sales up 19%, total sales up 11%, orders up 15%, and a 63.81% returning customer rate. This result shows momentum across revenue, order volume, and customer retention after the store had enough data to optimize around.",
  },
];

const Results = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        <section className="border-b border-primary/10 px-4 pb-8 pt-24 md:pb-12 md:pt-28">
          <div className="mx-auto max-w-4xl text-center">
          <p className="mb-3 text-xs font-mono font-semibold uppercase tracking-[0.2em] text-primary sm:text-sm sm:tracking-[0.3em]">
            FlowXsell Results
          </p>
          <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Shopify results and revenue proof
          </h1>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
            Screenshots from ecommerce analytics work showing the kind of sales, retention, and channel data FlowXsell
            uses to diagnose growth opportunities.
          </p>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 px-4 py-8 md:py-12" aria-label="Client results">
          {results.map((result) => (
            <Card
              key={result.title}
              className="overflow-hidden border-primary/20 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/40"
            >
              <CardContent className="grid gap-0 p-0 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="bg-muted/30 p-3 md:p-4">
                  <img
                    src={result.image}
                    alt={result.alt}
                    className="h-full min-h-[18rem] w-full rounded-lg object-cover object-left-top"
                  />
                </div>
                <div className="flex flex-col justify-center p-6 md:p-8">
                  <Badge
                    variant="outline"
                    className="mb-5 flex w-fit gap-2 rounded-none border-transparent bg-primary/10 px-4 py-2 text-sm font-bold md:text-base"
                  >
                    <span className="font-mono tabular-nums tracking-tight text-primary">{result.metricValue}</span>
                    <span className="text-foreground">{result.metricLabel}</span>
                  </Badge>
                  <h2 className="text-2xl font-bold leading-tight md:text-3xl">{result.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">{result.description}</p>
                  <Button className="mt-7 w-fit bg-primary font-semibold text-black hover:bg-primary/90" asChild>
                    <a href="https://calendly.com/flowxsell/30min" target="_blank" rel="noopener noreferrer">
                      Book a call
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Results;
