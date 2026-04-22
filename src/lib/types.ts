import type { LucideIcon } from "lucide-react";

export interface NavItem {
  title: string;
  to: string;
  icon: LucideIcon;
}

export interface KPI {
  id: string;
  label: string;
  value: string;
  delta?: string;
  trend?: "up" | "down" | "neutral";
  hint?: string;
}

export type CampaignStatus = "active" | "paused" | "draft" | "alert";

export interface Campaign {
  id: string;
  brand: string;
  name: string;
  status: CampaignStatus;
  startDate: string;
  endDate: string;
  client: string;
  region?: string;
}

export type MentionSentiment = "positive" | "neutral" | "critical" | "trending";

export interface Mention {
  id: string;
  source: string;
  volume: string;
  engagement: string;
  sentiment: MentionSentiment;
  status: "verified" | "priority" | "review" | "real-time";
}

export interface SentimentSlice {
  name: "Positive" | "Neutral" | "Critical";
  value: number;
  color: string;
}

export interface SOVRow {
  brand: string;
  share: number;
  isSelf?: boolean;
}

export interface TrendPoint {
  label: string;
  value: number;
}

export interface CrisisRadarItem {
  id: string;
  level: "high" | "medium" | "low";
  title: string;
  summary: string;
}

export interface AgencyBrand {
  id: string;
  name: string;
  status: "active" | "alert" | "paused";
  metric: string;
  cover: string;
}

export interface Report {
  id: string;
  campaign: string;
  client: string;
  startDate: string;
  endDate: string;
  status: "report-sent" | "report-pending" | "in-progress" | "draft";
}

export interface ApiKey {
  id: string;
  name: string;
  permissions: string;
  status: "active" | "revoked";
  created: string;
  lastUsed: string;
}
