import type { CampaignDraft, CampaignPayload } from "@/lib/types";

export const buildPayload = (d: CampaignDraft): CampaignPayload => {
  const kpis: CampaignPayload["kpis"] = {};
  if (d.kpis.sentiment_target !== null) kpis.sentiment_target = d.kpis.sentiment_target;
  if (d.kpis.share_of_voice_target !== null)
    kpis.share_of_voice_target = d.kpis.share_of_voice_target;
  if (d.kpis.volume_target !== null) kpis.volume_target = d.kpis.volume_target;
  if (d.kpis.engagement_rate_target !== null)
    kpis.engagement_rate_target = d.kpis.engagement_rate_target;

  const isLive = d.analysis_type === "live";
  const includeTimes = isLive && d.schedule.interval_type === "day";

  return {
    campaign_name: d.campaign_name,
    target: d.target,
    industry: d.industry.toLowerCase(),
    competitors: d.competitors,
    sources: d.sources,
    kpis,
    alert_threshold: d.alert_threshold,
    alert_emails: d.alert_emails,
    analysis_type: d.analysis_type,
    date_start: d.date_start || null,
    date_end: d.date_end || null,
    schedule_config: isLive
      ? {
          interval_type: d.schedule.interval_type,
          interval_value: d.schedule.interval_value,
          specific_times: includeTimes ? d.schedule.specific_times : [],
        }
      : null,
  };
};

export const validateStep = (step: number, d: CampaignDraft): string | null => {
  if (step === 1) {
    if (!d.campaign_name.trim()) return "Campaign name is required";
    if (!d.target.trim()) return "Target brand / keyword is required";
    if (!d.industry) return "Industry is required";
  }
  if (step === 2 && d.sources.length === 0) return "Select at least one data source";
  if (step === 4) {
    if (!d.date_start || !d.date_end) return "Date range is required";
    if (d.date_start > d.date_end) return "Start date must be before end date";
  }
  return null;
};

export const initialDraft = (defaultEmail = "manager@agency.com"): CampaignDraft => ({
  campaign_name: "",
  target: "",
  industry: "Finance",
  competitors: [],
  sources: ["news_and_web"],
  kpis: {
    sentiment_target: 80,
    share_of_voice_target: null,
    volume_target: null,
    engagement_rate_target: null,
  },
  alert_threshold: 500,
  alert_emails: [defaultEmail],
  analysis_type: "historical",
  date_start: "",
  date_end: "",
  schedule: { interval_type: "day", interval_value: 1, specific_times: [] },
});
