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

// ---- Campaign Wizard ----
export type CampaignSource = "news_and_web" | "social_pulse";
export type AnalysisType = "historical" | "live";
export type ScheduleInterval = "minute" | "hour" | "day";

export interface CampaignKpis {
  sentiment_target: number | null;
  share_of_voice_target: number | null;
  volume_target: number | null;
  engagement_rate_target: number | null;
}

export interface ScheduleConfig {
  interval_type: ScheduleInterval;
  interval_value: number;
  specific_times: string[];
}

export interface CampaignPayload {
  campaign_name: string;
  target: string;
  industry: string;
  competitors: string[];
  sources: CampaignSource[];
  kpis: {
    sentiment_target?: number;
    share_of_voice_target?: number;
    volume_target?: number;
    engagement_rate_target?: number;
  };
  alert_threshold: number | null;
  alert_emails: string[];
  analysis_type: AnalysisType;
  date_start: string | null;
  date_end: string | null;
  schedule_config: ScheduleConfig | null;
}

export interface CampaignDraft {
  campaign_name: string;
  target: string;
  industry: string;
  competitors: string[];
  sources: CampaignSource[];
  kpis: CampaignKpis;
  alert_threshold: number | null;
  alert_emails: string[];
  analysis_type: AnalysisType;
  date_start: string;
  date_end: string;
  schedule: ScheduleConfig;
}
