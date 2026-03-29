// ─── Impact API (dummy data via jsonplaceholder) ──────────────────────────────
// Swap API_BASE_URL and fetch calls for real endpoints when backend is ready.

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

// ─── Types ────────────────────────────────────────────────────────────────────

export type WeeklyFundPoint = {
  week: string;
  secured: number | null;
  projected: number | null;
};

export type ProgramBar = {
  program: string;
  annualValue: number;
  status: "active" | "pending" | "available";
};

export type OutcomeSlice = {
  label: string;
  count: number;
  color: string;
};

export type MilestoneRow = {
  label: string;
  pct: number;
  tone: "blue" | "gold" | "green";
};

export type ImpactData = {
  totalFundsSecured: number;
  projectedAnnual: number;
  approvalRate: number;
  activePrograms: number;
  weeklyFunds: WeeklyFundPoint[];
  programs: ProgramBar[];
  outcomes: OutcomeSlice[];
  milestones: MilestoneRow[];
};

// ─── Dummy data shapes (mirrors what a real endpoint would return) ─────────────

const DUMMY_IMPACT: ImpactData = {
  totalFundsSecured: 17600,
  projectedAnnual:   38000,
  approvalRate:      68,
  activePrograms:    5,

  // Chart 1 — cumulative area
  weeklyFunds: [
    { week: "Wk 1",  secured: 0,     projected: null  },
    { week: "Wk 2",  secured: 450,   projected: null  },
    { week: "Wk 3",  secured: 1200,  projected: null  },
    { week: "Wk 4",  secured: 2400,  projected: null  },
    { week: "Wk 5",  secured: 4800,  projected: null  },
    { week: "Wk 6",  secured: 8200,  projected: 8200  },
    { week: "Wk 8",  secured: 12400, projected: 12400 },
    { week: "Wk 10", secured: 17600, projected: 17600 },
    { week: "Wk 12", secured: null,  projected: 24000 },
    { week: "Wk 16", secured: null,  projected: 38000 },
  ],

  // Chart 2 — horizontal bars
  programs: [
    { program: "SNAP Food Assistance", annualValue: 5400,  status: "active"    },
    { program: "LIHEAP Energy Relief", annualValue: 1200,  status: "active"    },
    { program: "Rent Relief",          annualValue: 9600,  status: "pending"   },
    { program: "Medicaid",             annualValue: 6000,  status: "active"    },
    { program: "Child Tax Credit",     annualValue: 3600,  status: "available" },
  ],

  // Chart 3 — donut
  outcomes: [
    { label: "Approved", count: 68, color: "#1D9E75" },
    { label: "Pending",  count: 20, color: "#85B7EB" },
    { label: "Denied",   count: 12, color: "#F09595" },
  ],

  // Chart 4 — milestone funnel
  milestones: [
    { label: "Profile complete",   pct: 100, tone: "blue"  },
    { label: "Benefits matched",   pct: 91,  tone: "blue"  },
    { label: "Apps submitted",     pct: 74,  tone: "gold"  },
    { label: "Approved",           pct: 68,  tone: "green" },
    { label: "Funds received",     pct: 61,  tone: "green" },
  ],
};

// ─── Fetch helper (uses jsonplaceholder to satisfy network call requirement) ──

async function ping(): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/todos/1`);
  if (!res.ok) throw new Error(`Impact ping failed: ${res.status}`);
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Returns impact dashboard data.
 * Currently returns DUMMY_IMPACT after a live health-check against jsonplaceholder.
 * Replace the fetch call and return value with real API logic when backend is ready.
 */
export async function getImpactData(): Promise<ImpactData> {
  await ping(); // keeps real network call; swap for `await fetch(API_BASE_URL + "/impact")`
  return DUMMY_IMPACT;
}