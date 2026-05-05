export type ProgressStatus = "In Progress" | "Pending" | "Complete";

export interface FlowScoreRow {
  label: string;
  score: number;
  max: number;
}

export interface SprintPlanBlock {
  stage: string;
  items: string[];
}

export interface ProgressRow {
  area: string;
  status: ProgressStatus;
  progress: number;
}

export interface ImplementationLogEntry {
  date: string;
  items: string[];
}

export interface ClientDashboardUiLabels {
  snapshotTitle?: string;
  overallScoreLineLabel?: string;
  diagnosisTitle?: string;
  planTitle?: string;
  progressTitle?: string;
  visualProofTitle?: string;
  impactTitle?: string;
}

export interface VisualProofCopy {
  before: string;
  after: string;
}

export interface ClientPdpDashboard {
  slug: string;
  clientName: string;
  projectName: string;
  sprintType?: string;
  status: string;
  startDate: string;
  currentSprintLabel: string;
  primaryGoal?: string;
  flowScores: FlowScoreRow[];
  overallFlowScore: number;
  overallFlowMax: number;
  overallFlowLabel: string;
  flowBreaks: string[];
  sprintPlan: SprintPlanBlock[];
  progress: ProgressRow[];
  implementationLog: ImplementationLogEntry[];
  expectedImpact: string[];
  targetLift?: string;
  notes?: string[];
  uiLabels?: ClientDashboardUiLabels;
  visualProofCopy?: VisualProofCopy;
}

export const xsellClientProjects: ClientPdpDashboard[] = [
  {
    slug: "metpure",
    clientName: "Metpure",
    projectName: "PDP Flow Optimization Sprint",
    status: "In Progress",
    startDate: "April 10",
    currentSprintLabel: "PDP — above-the-fold & trust",
    primaryGoal: "Increase conversion rate",
    flowScores: [
      { label: "PDP", score: 2, max: 4 },
      { label: "Cart", score: 1.5, max: 4 },
      { label: "Checkout", score: 2, max: 4 },
    ],
    overallFlowScore: 1.8,
    overallFlowMax: 4,
    overallFlowLabel: "Disrupted",
    flowBreaks: [
      "Weak PDP clarity above the fold",
      "Trust introduced too late",
      "Cart creates confusion",
      "Checkout adds friction",
    ],
    sprintPlan: [
      {
        stage: "PDP Sprint",
        items: [
          "Restructure above-the-fold",
          "Improve product clarity",
          "Add trust signals",
        ],
      },
      {
        stage: "Cart Sprint",
        items: ["Simplify UX", "Strengthen CTA"],
      },
      {
        stage: "Checkout Sprint",
        items: ["Reduce steps", "Reinforce trust"],
      },
    ],
    progress: [
      { area: "PDP", status: "In Progress", progress: 60 },
      { area: "Cart", status: "Pending", progress: 0 },
      { area: "Checkout", status: "Pending", progress: 0 },
    ],
    implementationLog: [
      {
        date: "April 10",
        items: [
          "Updated PDP headline structure",
          "Added review section above fold",
        ],
      },
      {
        date: "April 11",
        items: ["Simplified cart layout (draft)"],
      },
    ],
    expectedImpact: [
      "Increase add-to-cart rate",
      "Reduce drop-off in cart",
      "Improve checkout completion",
    ],
    targetLift: "+20–30% CVR lift (target range)",
    notes: [
      "Recommend adding a subscription option post-sprint",
      "Consider bundling for AOV increase",
    ],
  },
  {
    slug: "tru-supps",
    clientName: "TRU Supplements",
    projectName: "Transformation Bundle Sprint",
    sprintType: "AOV Boost Sprint",
    status: "In Progress",
    startDate: "April 10",
    currentSprintLabel: "Bundle Creation & Offer Structuring",
    primaryGoal: "Increase average order value",
    flowScores: [
      { label: "Bundle Fit", score: 2, max: 4 },
      { label: "Offer Value", score: 1.5, max: 4 },
      { label: "Bundle Visibility", score: 1, max: 4 },
      { label: "Decision Simplicity", score: 2, max: 4 },
    ],
    overallFlowScore: 1.6,
    overallFlowMax: 4,
    overallFlowLabel: "Disrupted",
    flowBreaks: [
      'No structured "Transformation Bundle" (products sold individually)',
      "No pricing incentive to buy multiple products",
      "Bundle not visible on PDP",
      'No clear "routine" positioning for customer',
    ],
    sprintPlan: [
      {
        stage: "Bundle Creation",
        items: [
          "Define Transformation Stack (2–3 core products)",
          "Group products based on outcome (e.g. performance, recovery, etc.)",
        ],
      },
      {
        stage: "Offer Structuring",
        items: [
          "Create bundle pricing (10–20% savings)",
          'Position as "Complete Transformation System"',
        ],
      },
      {
        stage: "PDP Integration",
        items: ["Add bundle option near CTA", "Highlight savings + outcome"],
      },
      {
        stage: "Cart Upsell",
        items: [
          'Add "Upgrade to Transformation Bundle"',
          "Reinforce value at checkout",
        ],
      },
    ],
    progress: [
      { area: "Bundle Creation", status: "In Progress", progress: 60 },
      { area: "Offer Structuring", status: "Pending", progress: 0 },
      { area: "PDP Integration", status: "Pending", progress: 0 },
      { area: "Cart Upsell", status: "Pending", progress: 0 },
    ],
    implementationLog: [
      {
        date: "April 10",
        items: [
          "Identified core product pairing for Transformation Bundle",
          "Defined initial bundle structure",
        ],
      },
      {
        date: "April 11",
        items: ["Drafted bundle pricing model", 'Created naming direction ("Transformation Stack")'],
      },
    ],
    expectedImpact: [
      "Increase AOV by 20–40%",
      "Increase multi-product purchases",
      "Improve perceived value of offer",
    ],
    notes: [
      "Strong opportunity to expand into multiple bundles (Beginner / Advanced)",
      "Consider adding routine-based messaging across PDP",
      "Future opportunity: subscription layer (once volume supports it)",
    ],
    uiLabels: {
      snapshotTitle: "Flow Score",
      overallScoreLineLabel: "Overall Flow Score",
      diagnosisTitle: "Key system breaks",
      planTitle: "Sprint modules",
      progressTitle: "Execution tracker",
      visualProofTitle: "Before / after",
      impactTitle: "Expected outcome",
    },
    visualProofCopy: {
      before: "Single product purchase only",
      after: "Transformation Bundle option added (pending)",
    },
  },
  {
    slug: "lrt",
    clientName: "Let's Rebuild Tuskegee",
    projectName: "System Sync Sprint",
    sprintType: "System Sync Sprint",
    status: "In Progress",
    startDate: "April 10",
    currentSprintLabel: "Shopify ↔ Supabase Data Integration",
    primaryGoal: "Ensure donation data syncs accurately between frontend and backend systems",
    flowScores: [
      { label: "Data Sync", score: 1.5, max: 4 },
      { label: "Event Tracking", score: 2, max: 4 },
      { label: "Integration Stability", score: 1, max: 4 },
      { label: "Automation Readiness", score: 1.5, max: 4 },
    ],
    overallFlowScore: 1.5,
    overallFlowMax: 4,
    overallFlowLabel: "Disrupted",
    flowBreaks: [
      "Shopify data not consistently syncing to Supabase",
      "API response handling incomplete (missing structured data mapping)",
      "Webhook reliability issues (events not always captured)",
      "No centralized validation of incoming data",
    ],
    sprintPlan: [
      {
        stage: "Data Sync Fix",
        items: [
          "Map Shopify data structure → Supabase schema",
          "Normalize incoming data (orders, donors, transactions)",
        ],
      },
      {
        stage: "API Handling",
        items: [
          "Clean API request/response logic",
          "Ensure consistent JSON parsing and storage",
        ],
      },
      {
        stage: "Webhook Stabilization",
        items: [
          "Set up reliable webhook listeners",
          "Add retry/error handling logic",
        ],
      },
      {
        stage: "Data Validation Layer",
        items: [
          "Implement checks before storing data",
          "Prevent incomplete or broken records",
        ],
      },
    ],
    progress: [
      { area: "Data Sync Fix", status: "In Progress", progress: 50 },
      { area: "API Handling", status: "In Progress", progress: 40 },
      { area: "Webhook Stabilization", status: "Pending", progress: 0 },
      { area: "Data Validation", status: "Pending", progress: 0 },
    ],
    implementationLog: [
      {
        date: "April 10",
        items: [
          "Reviewed Shopify data flow into Supabase",
          "Identified missing fields + inconsistent structure",
        ],
      },
      {
        date: "April 11",
        items: [
          "Began restructuring API response handling",
          "Mapped initial data schema for transactions",
        ],
      },
    ],
    expectedImpact: [
      "Accurate donation tracking",
      "Reliable backend data for reporting",
      "Stable system for scaling donations",
      "Reduced risk of data loss",
    ],
    notes: [
      "Implement logging layer for debugging API failures",
      "Add monitoring for webhook success/failure rates",
      "Future opportunity: donor dashboard powered by clean data",
      "Consider securing API endpoints + access controls as system scales",
    ],
    uiLabels: {
      snapshotTitle: "Flow Score",
      overallScoreLineLabel: "Overall Flow Score",
      diagnosisTitle: "Key system breaks",
      planTitle: "Sprint modules",
      progressTitle: "Execution tracker",
      visualProofTitle: "Before / after",
      impactTitle: "Expected outcome",
    },
    visualProofCopy: {
      before: "Data inconsistently stored / missing fields",
      after: "Structured data flow (in progress — to be logged)",
    },
  },
];

export function getClientBySlug(slug: string): ClientPdpDashboard | undefined {
  return xsellClientProjects.find((c) => c.slug === slug);
}
