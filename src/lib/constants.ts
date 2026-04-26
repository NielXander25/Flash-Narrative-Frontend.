import {
  LayoutGrid,
  Activity,
  FileBarChart,
  KeyRound,
  Settings,
} from "lucide-react";
import type {
  NavItem,
  KPI,
  Campaign,
  Mention,
  SentimentSlice,
  SOVRow,
  TrendPoint,
  CrisisRadarItem,
  AgencyBrand,
  Report,
  ApiKey,
} from "./types";

// ---- Navigation (Create Campaign is intentionally NOT a sidebar item) ----
export const NAV_ITEMS: NavItem[] = [
  { title: "Command Center", href: "/dashboard", icon: LayoutGrid },
  { title: "Intelligence Dashboard", href: "/dashboard/intelligence", icon: Activity },
  { title: "Reports", href: "/dashboard/reports", icon: FileBarChart },
  { title: "API Management", href: "/dashboard/api", icon: KeyRound },
  { title: "Settings", href: "/dashboard/settings", icon: Settings },
];

export const APP = {
  name: "Flash Narrative",
  tagline: "Enterprise PR Intelligence",
  workspace: "Global HQ",
  tier: "Tier 1 Access",
} as const;

// ---- Command Center KPIs ----
export const COMMAND_KPIS: KPI[] = [
  { id: "active", label: "Active Campaigns", value: "12", hint: "12/15 active" },
  { id: "crisis", label: "Crisis Radar", value: "Zenith Bank Alert", hint: "Immediate attention required" },
  { id: "mentions", label: "Total Mentions", value: "48,291", hint: "Global, 24h aggregated" },
  { id: "tokens", label: "Intelligence Tokens", value: "842,109", hint: "Upgrade soon" },
];

// ---- Intelligence Dashboard KPIs (4 cards incl. Total Reach) ----
export const INTEL_KPIS: KPI[] = [
  { id: "mis", label: "Media Impact Score (MIS)", value: "847", delta: "+12%", trend: "up" },
  { id: "sentiment", label: "Positive Sentiment Index", value: "63.4%", delta: "+3%", trend: "up" },
  { id: "sov", label: "Share of Voice (SOV)", value: "34.2%", delta: "+5%", trend: "up" },
  { id: "reach", label: "Total Reach", value: "12.4M", delta: "+8.6%", trend: "up" },
];

export const SENTIMENT_DATA: SentimentSlice[] = [
  { name: "Positive", value: 72, color: "var(--success)" },
  { name: "Neutral", value: 18, color: "var(--muted-foreground)" },
  { name: "Critical", value: 10, color: "var(--destructive)" },
];

export const SOV_DATA: SOVRow[] = [
  { brand: "Zenith Bank", share: 34.2, isSelf: true },
  { brand: "Competitor Alpha", share: 28.5 },
  { brand: "Competitor Beta", share: 21.4 },
  { brand: "Others", share: 15.9 },
];

export const TREND_DATA: TrendPoint[] = [
  { label: "Mon", value: 320 },
  { label: "Tue", value: 480 },
  { label: "Wed", value: 720 },
  { label: "Thu", value: 540 },
  { label: "Fri", value: 880 },
  { label: "Sat", value: 620 },
  { label: "Sun", value: 760 },
];

export const MENTIONS: Mention[] = [
  { id: "1", source: "Bloomberg News", volume: "1.2k", engagement: "12.4k", sentiment: "positive", status: "verified" },
  { id: "2", source: "Financial Times", volume: "840", engagement: "8.9k", sentiment: "neutral", status: "verified" },
  { id: "3", source: "The Guardian", volume: "420", engagement: "3.1k", sentiment: "critical", status: "priority" },
  { id: "4", source: "Reuters Global", volume: "2.1k", engagement: "45.2k", sentiment: "positive", status: "verified" },
  { id: "5", source: "Twitter / X Trends", volume: "15.4k", engagement: "240k", sentiment: "trending", status: "real-time" },
];

export const CRISIS_RADAR: CrisisRadarItem[] = [
  {
    id: "c1",
    level: "high",
    title: "Zenith Bank: Liquidity Speculation",
    summary: "Surge in social mentions regarding digital channel downtime. Narrative risk score elevated.",
  },
  {
    id: "c2",
    level: "medium",
    title: "MTN: Infrastructure Vandalism",
    summary: "Localized service disruption in Lagos detected. Media sentiment skewing to regional outlets.",
  },
  {
    id: "c3",
    level: "low",
    title: "Dangote: Policy Dialogue",
    summary: "Constructive engagement reframing official throughput. Narrative stable.",
  },
];

export const AGENCY_BRANDS: AgencyBrand[] = [
  { id: "b1", name: "Zenith Bank", status: "alert", metric: "+8.2% mentions", cover: "from-amber-700/40 to-amber-900/60" },
  { id: "b2", name: "GTBank", status: "active", metric: "+4.1% mentions", cover: "from-emerald-700/30 to-emerald-900/60" },
  { id: "b3", name: "Dangote Group", status: "active", metric: "Stable", cover: "from-stone-700/40 to-stone-900/60" },
  { id: "b4", name: "MTN Nigeria", status: "alert", metric: "+12.4% mentions", cover: "from-rose-700/30 to-rose-900/60" },
];

export const CAMPAIGNS: Campaign[] = [
  { id: "cp1", brand: "Zenith Bank", name: "Q2 Reputation", client: "Zenith Bank", status: "active", startDate: "01 APR 2026", endDate: "31 MAR 2026", region: "EMEA" },
  { id: "cp2", brand: "GTBank", name: "Product Launch", client: "GTBank", status: "paused", startDate: "15 FEB 2026", endDate: "15 MAR 2026" },
  { id: "cp3", brand: "Dangote", name: "Brand Monitor", client: "Dangote", status: "active", startDate: "01 MAR 2026", endDate: "Ongoing" },
  { id: "cp4", brand: "MTN", name: "Crisis Response", client: "MTN Nigeria", status: "draft", startDate: "10 MAR 2026", endDate: "Ongoing" },
];

export const REPORTS: Report[] = [
  { id: "r1", campaign: "Zenith Bank Q2 Reputation", client: "Zenith Bank", startDate: "01 APR 2026", endDate: "31 MAR 2026", status: "report-sent" },
  { id: "r2", campaign: "GTBank Product Launch", client: "GTBank", startDate: "15 FEB 2026", endDate: "15 MAR 2026", status: "report-pending" },
  { id: "r3", campaign: "Dangote Brand Monitor", client: "Dangote", startDate: "01 MAR 2026", endDate: "Ongoing", status: "in-progress" },
  { id: "r4", campaign: "MTN Crisis Response", client: "MTN Nigeria", startDate: "10 MAR 2026", endDate: "Ongoing", status: "draft" },
];

export const API_KEYS: ApiKey[] = [
  { id: "k1", name: "Intelligence_Main_Live", permissions: "Read-only / Sentiment view", status: "active", created: "Oct 12, 2023", lastUsed: "2 mins ago" },
  { id: "k2", name: "Market_Sentiment_API", permissions: "Full access", status: "active", created: "Nov 04, 2023", lastUsed: "14 hours ago" },
];

export const INDUSTRY_SECTORS = [
  "Finance",
  "Tech",
  "FMCG",
  "Telecommunications",
  "Energy & Utilities",
  "Government & Public Sector",
  "Aerospace & Defense",
] as const;

// Suggested competitors by industry (Smart Feature in Step 1)
export const SUGGESTED_COMPETITORS: Record<string, string[]> = {
  Finance: ["GTBank", "Access Bank", "Zenith Bank", "UBA", "First Bank"],
  Tech: ["Google", "Microsoft", "Meta", "Amazon", "Apple"],
  FMCG: ["Nestlé", "Unilever", "P&G", "Dangote", "PZ Cussons"],
  Telecommunications: ["MTN", "Airtel", "Glo", "9mobile"],
  "Energy & Utilities": ["Shell", "TotalEnergies", "Chevron", "Seplat"],
  "Government & Public Sector": ["CBN", "NCC", "FIRS"],
  "Aerospace & Defense": ["Boeing", "Airbus", "Lockheed Martin"],
};

// Backend API endpoint (override via NEXT_PUBLIC_API_BASE)
export const API_BASE: string =
  process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8000/api/v1";

export const SCHEDULE_INTERVALS = [
  { value: "minute", label: "Every Minute", interval_value: 1 },
  { value: "minute_5", label: "Every 5 Minutes", interval_value: 5 },
  { value: "hour", label: "Every Hour", interval_value: 1 },
  { value: "day", label: "Every Day", interval_value: 1 },
] as const;
