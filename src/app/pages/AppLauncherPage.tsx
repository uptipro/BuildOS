import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import {
  Building2,
  DollarSign,
  ShoppingCart,
  Users,
  UserCircle,
  Settings,
  Store,
  Search,
  Bell,
  X,
  ChevronRight,
  ChevronDown,
  ArrowUpRight,
  Layers,
} from "lucide-react";
import { useAuthUser } from "../utils/useAuthUser";
import { fetchProjects } from "../api/projects";
import { getTasks } from "../api/tasks";
import { getApprovals } from "../api/approvals";
import { fetchBudgets } from "../api/budgets";
import { fetchExpenses } from "../api/expenses";
import { fetchPayments } from "../api/payments";
import { fetchIncome } from "../api/income";
import { fetchEmployees } from "../api/employees";
import { fetchLeaveRequests } from "../api/leave-requests";
import { getJobRoles } from "../api/job-roles";
import { getPurchaseRequests, getSentRFQs } from "../api/procurement-requests";
import { fetchPurchaseOrders } from "../api/purchase-orders";
import { fetchSuppliers } from "../api/suppliers";
import { getMaterials, getStores, getMaterialRequests } from "../api/materials";
import { fetchClaims } from "../api/claims";
import { getActivityHistory } from "../api/activity-history";
import {
  getAdminSystemSummary,
  getAdminActivityLog,
  getUsers,
  getAppRoles,
} from "../api/admin-extras";
import { fetchAppCatalog, type AppCatalogItem } from "../api/app-catalog";

// ─── Types ────────────────────────────────────────────────────────────────────

type HoverVariant = "stats" | "activity" | "pulse";
interface Metric {
  label: string;
  value: string;
  trend?: "up" | "down" | "neutral";
  delta?: string;
}
interface DetailItem {
  label: string;
  value: string;
  sub: string;
}

interface AppDef {
  id: string;
  name: string;
  full: string;
  tagline: string;
  icon: React.ElementType;
  href: string;
  cardBg: string;
  border: string;
  stripe: string;
  accent: string;
  accentDim: string;
  textPrimary: string;
  textSecondary: string;
  cols: number;
  rows: number;
  metrics: Metric[];
  blurb: string;
  details: DetailItem[];
  recentActivity: string[];
}

const ICON_MAP: Record<string, React.ElementType> = {
  Building2,
  DollarSign,
  ShoppingCart,
  Users,
  UserCircle,
  Settings,
  Store,
};

function mapCatalogItem(item: AppCatalogItem): AppDef {
  const icon = ICON_MAP[item.icon] ?? Layers;
  return {
    ...item,
    icon,
    metrics: [],
    blurb: "",
    details: [],
    recentActivity: [],
  };
}

// ─── Formatting helpers ───────────────────────────────────────────────────────

const currency = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

function formatCurrency(amount: number) {
  return currency.format(Number.isFinite(amount) ? amount : 0);
}

function average(values: number[]) {
  if (!values.length) return 0;
  return values.reduce((acc, v) => acc + v, 0) / values.length;
}

function lower(value: string | undefined | null) {
  return (value ?? "").toLowerCase();
}

function isPendingStatus(status: string | undefined) {
  const s = lower(status).replace(/\s+/g, "");
  return ["pending", "underreview", "open", "requested", "submitted"].includes(
    s,
  );
}

function isClosedStatus(status: string | undefined) {
  const s = lower(status).replace(/\s+/g, "");
  return ["done", "completed", "closed", "resolved", "paid"].includes(s);
}

function toActivityLine(item: {
  action?: string;
  description?: string;
  module?: string;
  createdAt?: string;
}) {
  const action = item.description || item.action || "Updated";
  const module = item.module ? ` (${item.module})` : "";
  return `${action}${module}`;
}

function pickRecent(lines: string[], limit = 3) {
  return lines.filter(Boolean).slice(0, limit);
}

async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch {
    return fallback;
  }
}

// ─── API composition ──────────────────────────────────────────────────────────

async function buildAppsFromApi(authName?: string): Promise<AppDef[]> {
  const [
    catalog,
    projects,
    tasks,
    approvals,
    budgets,
    expenses,
    payments,
    incomes,
    employees,
    leaveRequests,
    jobRoles,
    purchaseRequests,
    sentRfqs,
    purchaseOrders,
    suppliers,
    materials,
    stores,
    materialRequests,
    claims,
    activity,
    adminSummary,
    adminActivity,
    users,
    roles,
  ] = await Promise.all([
    safe(() => fetchAppCatalog(), []),
    safe(() => fetchProjects(), []),
    safe(() => getTasks(), []),
    safe(() => getApprovals(), []),
    safe(() => fetchBudgets(), []),
    safe(() => fetchExpenses(), []),
    safe(() => fetchPayments(), []),
    safe(() => fetchIncome(), []),
    safe(() => fetchEmployees(), []),
    safe(() => fetchLeaveRequests(), []),
    safe(() => getJobRoles(), []),
    safe(() => getPurchaseRequests(), []),
    safe(() => getSentRFQs(), []),
    safe(() => fetchPurchaseOrders(), []),
    safe(() => fetchSuppliers(), []),
    safe(() => getMaterials(), []),
    safe(() => getStores(), []),
    safe(() => getMaterialRequests(), []),
    safe(() => fetchClaims(), []),
    safe(() => getActivityHistory(), []),
    safe(() => getAdminSystemSummary(), null),
    safe(() => getAdminActivityLog(), []),
    safe(() => getUsers(), []),
    safe(() => getAppRoles(), []),
  ]);

  const activityBy = (keys: string[]) =>
    activity
      .filter((a) => keys.some((k) => lower(a.module).includes(k)))
      .map(toActivityLine);

  const constructionProjects = projects;
  const constructionTasks = tasks.filter((t) =>
    lower((t as { projectName?: string }).projectName).includes("project"),
  );
  const projectProgressAvg = Math.round(
    average(
      constructionProjects
        .map((p) => Number((p as { progress?: number }).progress ?? 0))
        .filter((v) => Number.isFinite(v)),
    ),
  );
  const constructionPendingApprovals = approvals.filter((a) =>
    isPendingStatus((a as { status?: string }).status),
  ).length;

  const totalBudget = budgets.reduce(
    (acc, b) => acc + Number((b as { totalBudget?: number }).totalBudget ?? 0),
    0,
  );
  const totalSpent = budgets.reduce(
    (acc, b) => acc + Number((b as { spent?: number }).spent ?? 0),
    0,
  );
  const budgetUsedPct =
    totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0;
  const pendingPayments = payments.filter(
    (p) => !isClosedStatus((p as { status?: string }).status),
  );
  const totalExpenseValue = expenses.reduce(
    (acc, e) => acc + Number((e as { amount?: number }).amount ?? 0),
    0,
  );
  const totalIncomeValue = incomes.reduce(
    (acc, i) => acc + Number((i as { amount?: number }).amount ?? 0),
    0,
  );

  const pendingLeave = leaveRequests.filter((r) =>
    isPendingStatus((r as { status?: string }).status),
  ).length;

  const pendingPos = purchaseOrders.filter(
    (po) => !isClosedStatus((po as { status?: string }).status),
  ).length;
  const avgSupplierRating = Math.round(
    average(
      suppliers
        .map((s) => Number((s as { rating?: number }).rating ?? 0))
        .filter((n) => Number.isFinite(n) && n > 0),
    ),
  );

  const lowStock = materials.filter(
    (m) =>
      Number((m as { availableQty?: number }).availableQty ?? 0) <=
      Number((m as { reorderLevel?: number }).reorderLevel ?? 0),
  ).length;

  const authNameLower = lower(authName);
  const myClaims = claims.filter((c) =>
    authNameLower
      ? lower((c as { employee?: string }).employee).includes(authNameLower)
      : true,
  );
  const myLeaves = leaveRequests.filter((r) =>
    authNameLower
      ? lower((r as { employee?: string }).employee).includes(authNameLower)
      : true,
  );

  const dynamicById: Record<
    string,
    Pick<AppDef, "metrics" | "blurb" | "details" | "recentActivity">
  > = {
    construction: {
      metrics: [
        {
          label: "Active Projects",
          value: String(constructionProjects.length),
          trend: "neutral",
          delta: "live",
        },
        {
          label: "Open Tasks",
          value: String(
            constructionTasks.filter(
              (t) => !isClosedStatus((t as { status?: string }).status),
            ).length,
          ),
          trend: "neutral",
          delta: "live",
        },
        {
          label: "Avg Progress",
          value: `${projectProgressAvg}%`,
          trend: "up",
          delta: "live",
        },
        {
          label: "Pending Approvals",
          value: String(constructionPendingApprovals),
          trend: "neutral",
          delta: "live",
        },
      ],
      blurb: `${constructionProjects.length} projects currently tracked with ${constructionPendingApprovals} pending approvals.`,
      details: [
        {
          label: "Projects",
          value: String(constructionProjects.length),
          sub: "From projects API",
        },
        {
          label: "Tasks",
          value: String(constructionTasks.length),
          sub: "From tasks API",
        },
        {
          label: "Avg Progress",
          value: `${projectProgressAvg}%`,
          sub: "Computed from project progress",
        },
        {
          label: "Approvals",
          value: String(constructionPendingApprovals),
          sub: "Pending approval records",
        },
      ],
      recentActivity: pickRecent([
        ...activityBy(["construction", "project"]),
        ...constructionProjects
          .slice(0, 3)
          .map(
            (p) =>
              `${(p as { name?: string }).name ?? "Project"} status ${(p as { status?: string }).status ?? "updated"}`,
          ),
      ]),
    },
    finance: {
      metrics: [
        {
          label: "Budget Used",
          value: `${budgetUsedPct}%`,
          trend: "neutral",
          delta: `${formatCurrency(totalBudget - totalSpent)} left`,
        },
        {
          label: "Pending Payments",
          value: String(pendingPayments.length),
          trend: "neutral",
          delta: formatCurrency(
            pendingPayments.reduce(
              (acc, p) => acc + Number((p as { amount?: number }).amount ?? 0),
              0,
            ),
          ),
        },
        {
          label: "Income",
          value: formatCurrency(totalIncomeValue),
          trend: "neutral",
          delta: "live total",
        },
      ],
      blurb: `${budgets.length} budgets, ${expenses.length} expenses, ${payments.length} payments loaded from API.`,
      details: [
        {
          label: "Total Budget",
          value: formatCurrency(totalBudget),
          sub: `${budgets.length} budget records`,
        },
        {
          label: "Total Spent",
          value: formatCurrency(totalSpent),
          sub: `${budgetUsedPct}% utilisation`,
        },
        {
          label: "Expenses",
          value: formatCurrency(totalExpenseValue),
          sub: `${expenses.length} expense records`,
        },
        {
          label: "Income",
          value: formatCurrency(totalIncomeValue),
          sub: `${incomes.length} income records`,
        },
      ],
      recentActivity: pickRecent([
        ...activityBy(["finance", "payment", "expense", "budget"]),
        ...pendingPayments
          .slice(0, 3)
          .map(
            (p) =>
              `Payment ${(p as { reference?: string }).reference ?? (p as { id?: string }).id ?? ""} is ${(p as { status?: string }).status ?? "pending"}`,
          ),
      ]),
    },
    hr: {
      metrics: [
        {
          label: "Headcount",
          value: String(employees.length),
          trend: "neutral",
          delta: "live",
        },
        {
          label: "Leave Requests",
          value: String(leaveRequests.length),
          trend: "neutral",
          delta: `${pendingLeave} pending`,
        },
        {
          label: "Open Roles",
          value: String(jobRoles.length),
          trend: "neutral",
          delta: "live",
        },
      ],
      blurb: `${employees.length} employees and ${leaveRequests.length} leave requests synced from HR endpoints.`,
      details: [
        {
          label: "Employees",
          value: String(employees.length),
          sub: "From employees API",
        },
        {
          label: "Leave Requests",
          value: String(leaveRequests.length),
          sub: `${pendingLeave} pending`,
        },
        {
          label: "Job Roles",
          value: String(jobRoles.length),
          sub: "From job-roles API",
        },
        {
          label: "Claims",
          value: String(claims.length),
          sub: "From claims API",
        },
      ],
      recentActivity: pickRecent([
        ...activityBy(["hr", "employee", "leave"]),
        ...employees
          .slice(0, 3)
          .map((e) =>
            `${(e as { firstName?: string; lastName?: string }).firstName ?? ""} ${(e as { lastName?: string }).lastName ?? ""}`.trim(),
          )
          .filter(Boolean),
      ]),
    },
    procurement: {
      metrics: [
        {
          label: "Open RFQs",
          value: String(sentRfqs.length),
          trend: "neutral",
          delta: "live",
        },
        {
          label: "Pending POs",
          value: String(pendingPos),
          trend: "neutral",
          delta: String(purchaseOrders.length),
        },
        {
          label: "Supplier Rtg",
          value: `${avgSupplierRating || 0}%`,
          trend: "neutral",
          delta: `${suppliers.length} suppliers`,
        },
      ],
      blurb: `${purchaseRequests.length} requests and ${purchaseOrders.length} purchase orders currently available.`,
      details: [
        {
          label: "Purchase Requests",
          value: String(purchaseRequests.length),
          sub: "From purchase-requests API",
        },
        {
          label: "Sent RFQs",
          value: String(sentRfqs.length),
          sub: "From sent-rfqs API",
        },
        {
          label: "Purchase Orders",
          value: String(purchaseOrders.length),
          sub: `${pendingPos} open`,
        },
        {
          label: "Suppliers",
          value: String(suppliers.length),
          sub: "From suppliers API",
        },
      ],
      recentActivity: pickRecent([
        ...activityBy(["procurement", "rfq", "purchase"]),
        ...purchaseRequests
          .slice(0, 3)
          .map(
            (r) =>
              `${(r as { prRef?: string }).prRef ?? "Request"} ${(r as { status?: string }).status ?? "updated"}`,
          ),
      ]),
    },
    storefront: {
      metrics: [
        {
          label: "Total SKUs",
          value: String(materials.length),
          trend: "neutral",
          delta: `${lowStock} low stock`,
        },
        {
          label: "Stores",
          value: String(stores.length),
          trend: "neutral",
          delta: "live",
        },
        {
          label: "Material Requests",
          value: String(materialRequests.length),
          trend: "neutral",
          delta: "live",
        },
      ],
      blurb: `${materials.length} materials across ${stores.length} stores with ${lowStock} low-stock items.`,
      details: [
        {
          label: "Materials",
          value: String(materials.length),
          sub: "From materials API",
        },
        {
          label: "Stores",
          value: String(stores.length),
          sub: "From stores API",
        },
        {
          label: "Low Stock",
          value: String(lowStock),
          sub: "availableQty <= reorderLevel",
        },
        {
          label: "Requests",
          value: String(materialRequests.length),
          sub: "From material-requests API",
        },
      ],
      recentActivity: pickRecent([
        ...activityBy(["store", "material", "inventory"]),
        ...materials
          .slice(0, 3)
          .map(
            (m) =>
              `${(m as { name?: string }).name ?? "Material"} ${(m as { availableQty?: number }).availableQty ?? 0} available`,
          ),
      ]),
    },
    ess: {
      metrics: [
        {
          label: "My Claims",
          value: String(myClaims.length),
          trend: "neutral",
          delta: "live",
        },
        {
          label: "My Leave Requests",
          value: String(myLeaves.length),
          trend: "neutral",
          delta: `${myLeaves.filter((r) => isPendingStatus((r as { status?: string }).status)).length} pending`,
        },
        {
          label: "My Activity",
          value: String(
            activity.filter((a) =>
              authNameLower ? lower(a.userName).includes(authNameLower) : false,
            ).length,
          ),
          trend: "neutral",
          delta: "live",
        },
      ],
      blurb: `${myClaims.length} claims and ${myLeaves.length} leave requests available for your profile.`,
      details: [
        {
          label: "Claims",
          value: String(myClaims.length),
          sub: "Matched by logged-in user",
        },
        {
          label: "Leave Requests",
          value: String(myLeaves.length),
          sub: "Matched by logged-in user",
        },
        {
          label: "Pending Leaves",
          value: String(
            myLeaves.filter((r) =>
              isPendingStatus((r as { status?: string }).status),
            ).length,
          ),
          sub: "Awaiting approval",
        },
        {
          label: "Activity Records",
          value: String(
            activity.filter((a) =>
              authNameLower ? lower(a.userName).includes(authNameLower) : false,
            ).length,
          ),
          sub: "From activity-history",
        },
      ],
      recentActivity: pickRecent([
        ...activity
          .filter((a) =>
            authNameLower ? lower(a.userName).includes(authNameLower) : false,
          )
          .map(toActivityLine),
        ...myLeaves
          .slice(0, 3)
          .map(
            (r) =>
              `Leave ${(r as { refId?: string }).refId ?? "request"} ${(r as { status?: string }).status ?? "updated"}`,
          ),
      ]),
    },
    admin: {
      metrics: [
        {
          label: "Total Users",
          value: String(adminSummary?.users ?? users.length),
          trend: "neutral",
          delta: "live",
        },
        {
          label: "System Health",
          value: (adminSummary?.health?.status || "unknown").toUpperCase(),
          trend: "neutral",
          delta: "live",
        },
        {
          label: "Pending Approvals",
          value: String(adminSummary?.pendingApprovals ?? 0),
          trend: "neutral",
          delta: "live",
        },
      ],
      blurb: `${users.length} users and ${roles.length} roles currently configured in administration.`,
      details: [
        {
          label: "Users",
          value: String(adminSummary?.users ?? users.length),
          sub: "From users/admin summary",
        },
        {
          label: "Roles",
          value: String(adminSummary?.roles ?? roles.length),
          sub: "From app-roles",
        },
        {
          label: "Active Sessions",
          value: String(adminSummary?.activeSessions ?? 0),
          sub: "From admin system summary",
        },
        {
          label: "Pending Approvals",
          value: String(adminSummary?.pendingApprovals ?? 0),
          sub: "From admin system summary",
        },
      ],
      recentActivity: pickRecent([
        ...adminActivity
          .map((a) => `${a.actor} ${a.action} ${a.subject}`.trim())
          .filter(Boolean),
        ...activityBy(["admin", "role", "user"]),
      ]),
    },
  };

  return catalog.map((item) => {
    const meta = mapCatalogItem(item);
    return {
      ...meta,
      ...(dynamicById[meta.id] ?? {
        metrics: [],
        blurb: "",
        details: [],
        recentActivity: [],
      }),
    };
  });
}

// ─── Grid helpers ─────────────────────────────────────────────────────────────

const colSpan: Record<number, string> = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
};
const rowSpan: Record<number, string> = {
  1: "row-span-1",
  2: "row-span-2",
  3: "row-span-3",
};

// ─── Animated counter ─────────────────────────────────────────────────────────

function Counter({ to, duration = 0.8 }: { to: number; duration?: number }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const pct = Math.min((ts - start) / (duration * 1000), 1);
      setDisplay(Math.floor(pct * to));
      if (pct < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [to, duration]);
  return <>{display}</>;
}

// ─── Sparkline ────────────────────────────────────────────────────────────────

function Sparkline({
  color,
  values = [3, 5, 4, 8, 6, 9, 7, 11, 10, 13],
}: {
  color: string;
  values?: number[];
}) {
  const max = Math.max(...values);
  const w = 80,
    h = 24;
  const pts = values
    .map(
      (v, i) =>
        `${(i / (values.length - 1)) * w},${h - (v / max) * (h - 4) - 2}`,
    )
    .join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <polyline
        points={pts}
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={w}
        cy={h - (values[values.length - 1] / max) * (h - 4) - 2}
        r="2.5"
        fill={color}
      />
    </svg>
  );
}

// ─── Trend badge ──────────────────────────────────────────────────────────────

function TrendBadge({
  trend,
  delta,
}: {
  trend: Metric["trend"];
  delta?: string;
}) {
  const arrow = trend === "up" ? "↑" : trend === "down" ? "↓" : "→";
  const color =
    trend === "up" ? "#15803d" : trend === "down" ? "#b91c1c" : "#64748b";
  return (
    <span style={{ color }} className="text-[10px] font-semibold">
      {arrow} {delta}
    </span>
  );
}

// ─── Hover variant A — Stats grid ─────────────────────────────────────────────

function HoverStats({ app, isLarge }: { app: AppDef; isLarge: boolean }) {
  return (
    <motion.div
      className="absolute inset-0 p-4 flex flex-col gap-2.5"
      style={{ background: app.cardBg }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    >
      <div className="flex items-center gap-2">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ background: app.accentDim }}
        >
          <app.icon style={{ color: app.accent }} className="w-3.5 h-3.5" />
        </div>
        <span style={{ color: app.textPrimary }} className="text-xs font-bold">
          {app.name}
        </span>
      </div>
      <div
        className={`grid gap-2 flex-1 ${isLarge ? "grid-cols-2" : "grid-cols-1"}`}
      >
        {app.metrics.slice(0, isLarge ? 4 : 2).map((m, i) => (
          <motion.div
            key={m.label}
            className="rounded-xl p-2.5 flex flex-col gap-1"
            style={{
              background: app.accentDim,
              border: `1px solid ${app.border}`,
            }}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
          >
            <div
              style={{ color: app.accent }}
              className="text-lg font-black leading-none"
            >
              {m.value}
            </div>
            <div
              style={{ color: app.textSecondary }}
              className="text-[9px] leading-tight"
            >
              {m.label}
            </div>
            <TrendBadge trend={m.trend} delta={m.delta} />
          </motion.div>
        ))}
      </div>
      {isLarge && (
        <div className="pt-2">
          <Sparkline color={app.accent} />
        </div>
      )}
    </motion.div>
  );
}

// ─── Hover variant B — Activity feed ──────────────────────────────────────────

function HoverActivity({ app, isLarge }: { app: AppDef; isLarge: boolean }) {
  return (
    <motion.div
      className="absolute inset-0 p-4 flex flex-col gap-2"
      style={{ background: app.cardBg }}
      initial={{ opacity: 0, x: 14 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 14 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <div className="flex items-center gap-2 mb-1">
        <app.icon style={{ color: app.accent }} className="w-4 h-4" />
        <span
          style={{ color: app.textSecondary }}
          className="text-[10px] font-semibold uppercase tracking-widest"
        >
          Live Activity
        </span>
      </div>
      <div className="flex flex-col gap-2 flex-1">
        {app.recentActivity.map((item, i) => (
          <motion.div
            key={i}
            className="flex items-start gap-2"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
              style={{ background: app.stripe }}
            />
            <p
              style={{ color: app.textPrimary }}
              className="text-[11px] leading-snug"
            >
              {item}
            </p>
          </motion.div>
        ))}
      </div>
      {isLarge && (
        <div
          className="flex gap-2 pt-2 mt-auto"
          style={{ borderTop: `1px solid ${app.border}` }}
        >
          {app.metrics.slice(0, 3).map((m) => (
            <div
              key={m.label}
              className="flex-1 rounded-lg px-2 py-1.5"
              style={{ background: app.accentDim }}
            >
              <div style={{ color: app.accent }} className="text-sm font-black">
                {m.value}
              </div>
              <div style={{ color: app.textSecondary }} className="text-[9px]">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ─── Hover variant C — Pulse metric ───────────────────────────────────────────

function HoverPulse({ app, isLarge }: { app: AppDef; isLarge: boolean }) {
  const primary = app.metrics[0];
  const numVal = parseInt((primary?.value ?? "0").replace(/[^0-9]/g, ""));
  const isNumeric = !isNaN(numVal) && numVal > 0;
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4"
      style={{ background: app.cardBg }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="rounded-2xl w-14 h-14 flex items-center justify-center"
        style={{ background: app.accentDim, border: `2px solid ${app.border}` }}
        initial={{ scale: 0.5, rotate: -15 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
      >
        <app.icon style={{ color: app.accent }} className="w-7 h-7" />
      </motion.div>
      <motion.div
        style={{ color: app.accent }}
        className="text-4xl font-black tracking-tight"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {isNumeric ? <Counter to={numVal} /> : primary?.value}
      </motion.div>
      <motion.p
        style={{ color: app.textSecondary }}
        className="text-[11px] text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.18 }}
      >
        {primary?.label}
      </motion.p>
      <TrendBadge trend={primary?.trend} delta={primary?.delta} />
      {isLarge && (
        <motion.p
          style={{ color: app.textSecondary }}
          className="text-[11px] text-center max-w-[200px] leading-relaxed opacity-70 mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.24 }}
        >
          {app.blurb}
        </motion.p>
      )}
    </motion.div>
  );
}

// ─── Bento Card ───────────────────────────────────────────────────────────────

function BentoCard({
  app,
  onOpen,
}: {
  app: AppDef;
  onOpen: (a: AppDef) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const variantRef = useRef<HoverVariant>("stats");
  const cycleRef = useRef(0);
  const variants: HoverVariant[] = ["stats", "activity", "pulse"];
  const isLarge = app.cols >= 2 || app.rows >= 2;

  return (
    <motion.div
      className={`${colSpan[app.cols]} ${rowSpan[app.rows]} relative rounded-2xl overflow-hidden cursor-pointer`}
      style={{
        background: app.cardBg,
        border: `1.5px solid ${app.border}`,
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      }}
      onMouseEnter={() => {
        variantRef.current = variants[cycleRef.current % 3] as HoverVariant;
        cycleRef.current++;
        setHovered(true);
      }}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(app)}
      whileHover={{
        scale: 1.012,
        boxShadow: `0 8px 32px ${app.stripe}28, 0 1px 6px rgba(0,0,0,0.08)`,
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {/* Top accent stripe */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{ background: app.stripe }}
      />

      {/* Large ambient icon on big cards */}
      {isLarge && (
        <app.icon
          className="absolute bottom-3 right-3 w-28 h-28 pointer-events-none"
          style={{ color: app.stripe, opacity: 0.07 }}
        />
      )}

      {/* Default face */}
      <motion.div
        className="absolute inset-0 pt-5 p-4 flex flex-col"
        animate={{ opacity: hovered ? 0 : 1, y: hovered ? -6 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-start justify-between">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: app.accentDim }}
          >
            <app.icon
              style={{ color: app.accent }}
              className="w-[18px] h-[18px]"
            />
          </div>
          <ArrowUpRight
            className="w-4 h-4 opacity-25"
            style={{ color: app.accent }}
          />
        </div>
        <div className="mt-2.5">
          <h2
            style={{ color: app.textPrimary }}
            className="text-sm font-bold leading-tight"
          >
            {app.name}
          </h2>
          <p
            style={{ color: app.textSecondary }}
            className="text-[10px] mt-0.5 opacity-70"
          >
            {app.tagline}
          </p>
        </div>
        {isLarge && (
          <p
            style={{ color: app.textSecondary }}
            className="text-xs mt-1.5 leading-relaxed opacity-60 max-w-xs"
          >
            {app.blurb}
          </p>
        )}
        <div className="mt-auto flex flex-wrap gap-1.5">
          {app.metrics.slice(0, isLarge ? 3 : 2).map((m) => (
            <div
              key={m.label}
              className="rounded-full px-2.5 py-1 text-[10px] font-semibold flex items-center gap-1"
              style={{ background: app.accentDim, color: app.textSecondary }}
            >
              <span style={{ color: app.accent }}>{m.value}</span>
              <span className="opacity-60">{m.label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Hover content */}
      <AnimatePresence mode="wait">
        {hovered &&
          (variantRef.current === "stats" ? (
            <HoverStats key="s" app={app} isLarge={isLarge} />
          ) : variantRef.current === "activity" ? (
            <HoverActivity key="a" app={app} isLarge={isLarge} />
          ) : (
            <HoverPulse key="p" app={app} isLarge={isLarge} />
          ))}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Detail Overlay ───────────────────────────────────────────────────────────

function DetailOverlay({ app, onClose }: { app: AppDef; onClose: () => void }) {
  const navigate = useNavigate();
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        className="relative w-full max-w-lg z-10 rounded-2xl overflow-hidden bg-white shadow-2xl"
        style={{ border: `1.5px solid ${app.border}` }}
        initial={{ scale: 0.94, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 280, damping: 24 }}
      >
        {/* Accent stripe */}
        <div className="h-1" style={{ background: app.stripe }} />

        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-4 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3.5">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: app.accentDim }}
            >
              <app.icon style={{ color: app.accent }} className="w-5 h-5" />
            </div>
            <div>
              <h2
                style={{ color: app.textPrimary }}
                className="text-base font-bold"
              >
                {app.full}
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">{app.blurb}</p>
            </div>
          </div>
          <button
            className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Detail grid */}
        <div className="grid grid-cols-2 gap-3 px-6 py-4">
          {app.details.map((d, i) => (
            <motion.div
              key={d.label}
              className="rounded-xl p-3.5 border border-gray-100"
              style={{ background: app.accentDim }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <div style={{ color: app.accent }} className="text-xl font-black">
                {d.value}
              </div>
              <div
                style={{ color: app.textPrimary }}
                className="text-xs font-semibold mt-0.5"
              >
                {d.label}
              </div>
              <div className="text-[11px] text-gray-400 mt-1">{d.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Activity */}
        <div className="px-6 pb-4">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-2.5">
            Recent Activity
          </p>
          <div className="space-y-2">
            {app.recentActivity.map((item, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-2.5"
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.12 + i * 0.06 }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                  style={{ background: app.stripe }}
                />
                <p className="text-xs text-gray-500 leading-relaxed">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="px-6 pb-5 flex gap-3">
          <button
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
            onClick={onClose}
          >
            ← Back
          </button>
          <button
            className="flex-1 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:brightness-95 transition-all text-white"
            style={{ background: app.accent }}
            onClick={() => navigate(app.href)}
          >
            Enter {app.name} <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── App Dropdown ────────────────────────────────────────────────────────────

function AppDropdown({
  onOpen,
  apps,
}: {
  onOpen: (a: AppDef) => void;
  apps: AppDef[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 h-8 px-3 rounded-lg border border-gray-200 bg-gray-50 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:border-gray-300 transition-colors"
      >
        <Layers className="w-3.5 h-3.5 text-gray-400" />
        Applications
        <ChevronDown
          className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute left-0 top-full mt-1.5 w-72 bg-white rounded-xl border border-gray-200 shadow-xl z-50 overflow-hidden"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <div className="px-3 py-2 border-b border-gray-100">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                All Applications
              </p>
            </div>
            <div className="py-1 max-h-80 overflow-y-auto">
              {apps.map((app) => (
                <button
                  key={app.id}
                  className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 transition-colors text-left"
                  onClick={() => {
                    setOpen(false);
                    onOpen(app);
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: app.accentDim }}
                  >
                    <app.icon
                      className="w-4 h-4"
                      style={{ color: app.accent }}
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 leading-tight">
                      {app.name}
                    </p>
                    <p className="text-[10px] text-gray-400 truncate">
                      {app.tagline}
                    </p>
                  </div>
                  <div
                    className="ml-auto w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: app.stripe }}
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Top Nav ──────────────────────────────────────────────────────────────────

function TopNav({
  searchQuery,
  onSearch,
  onOpen,
  apps,
}: {
  searchQuery: string;
  onSearch: (v: string) => void;
  onOpen: (a: AppDef) => void;
  apps: AppDef[];
}) {
  const { initials } = useAuthUser();

  return (
    <div className="shrink-0 h-14 bg-white border-b border-gray-200 px-5 flex items-center gap-4 z-20">
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
          <Building2 className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="text-sm font-semibold text-gray-900">BuildOS</span>
      </div>
      <div className="w-px h-5 bg-gray-200" />
      <AppDropdown onOpen={onOpen} apps={apps} />
      <div className="w-px h-5 bg-gray-200" />
      <div className="flex items-center gap-2 px-3 h-8 rounded-lg bg-gray-50 border border-gray-200 w-52">
        <Search className="w-3.5 h-3.5 text-gray-400 shrink-0" />
        <input
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search apps…"
          className="flex-1 bg-transparent text-sm text-gray-700 placeholder:text-gray-400 outline-none"
        />
      </div>
      <div className="flex-1" />
      <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
        <Bell className="w-4 h-4" />
      </button>
      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-semibold">
        {initials || "?"}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function AppLauncherPage() {
  const [activeApp, setActiveApp] = useState<AppDef | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [apps, setApps] = useState<AppDef[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const { name } = useAuthUser();

  useEffect(() => {
    let alive = true;

    async function load() {
      setLoading(true);
      setLoadError(null);
      try {
        const nextApps = await buildAppsFromApi(name);
        if (!alive) return;
        setApps(nextApps);
      } catch {
        if (!alive) return;
        setLoadError("Unable to load launcher data.");
      } finally {
        if (alive) setLoading(false);
      }
    }

    void load();

    return () => {
      alive = false;
    };
  }, [name]);

  const filtered = apps.filter(
    (a) =>
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.tagline.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex flex-col h-screen bg-gray-100 overflow-hidden">
      <TopNav
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
        onOpen={setActiveApp}
        apps={apps}
      />
      <div className="flex-1 min-h-0 p-4">
        {loading ? (
          <div className="h-full grid grid-cols-4 grid-rows-3 gap-3">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-gray-200 bg-white/70 animate-pulse"
              />
            ))}
          </div>
        ) : loadError ? (
          <div className="h-full rounded-2xl border border-red-200 bg-red-50 text-red-700 p-6 text-sm font-medium">
            {loadError}
          </div>
        ) : (
          <div className="h-full grid grid-cols-4 grid-rows-3 gap-3">
            {filtered.map((app) => (
              <BentoCard key={app.id} app={app} onOpen={setActiveApp} />
            ))}
          </div>
        )}
      </div>
      <AnimatePresence>
        {activeApp && (
          <DetailOverlay app={activeApp} onClose={() => setActiveApp(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
