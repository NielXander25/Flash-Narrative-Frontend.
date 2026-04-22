import type { CampaignDraft } from "@/lib/types";
import {
  Bell,
  Building2,
  Clock,
  Newspaper,
  Radio,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

interface Props {
  draft: CampaignDraft;
}

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Target;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border bg-secondary/30 p-4">
      <div className="mb-3 flex items-center gap-2">
        <Icon className="h-4 w-4 text-primary" />
        <h4 className="text-[11px] font-semibold tracking-[0.18em] text-muted-foreground">
          {title}
        </h4>
      </div>
      <div className="space-y-1.5 text-sm">{children}</div>
    </div>
  );
}

const Row = ({ k, v }: { k: string; v: React.ReactNode }) => (
  <div className="flex items-baseline justify-between gap-3">
    <span className="text-xs text-muted-foreground">{k}</span>
    <span className="text-right text-sm font-semibold">{v}</span>
  </div>
);

export function Step5Review({ draft }: Props) {
  const hasKpi =
    draft.kpis.sentiment_target !== null ||
    draft.kpis.share_of_voice_target !== null ||
    draft.kpis.volume_target !== null ||
    draft.kpis.engagement_rate_target !== null;

  return (
    <div className="space-y-3">
      <Section icon={Building2} title="IDENTITY">
        <Row k="Campaign" v={draft.campaign_name || "—"} />
        <Row k="Target" v={draft.target || "—"} />
        <Row k="Industry" v={draft.industry || "—"} />
        <Row
          k="Competitors"
          v={draft.competitors.length ? draft.competitors.join(", ") : "Auto"}
        />
      </Section>

      <Section icon={Newspaper} title="DATA SOURCES">
        <div className="flex flex-wrap gap-2">
          {draft.sources.includes("news_and_web") && (
            <span className="inline-flex items-center gap-1.5 rounded-md border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
              <Newspaper className="h-3 w-3" /> News & Web
            </span>
          )}
          {draft.sources.includes("social_pulse") && (
            <span className="inline-flex items-center gap-1.5 rounded-md border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
              <Radio className="h-3 w-3" /> Social Pulse
            </span>
          )}
          {draft.sources.length === 0 && (
            <span className="text-xs text-destructive">No source selected.</span>
          )}
        </div>
      </Section>

      <Section icon={TrendingUp} title="KPI TARGETS">
        {!hasKpi && <p className="text-xs text-muted-foreground">No KPI targets set.</p>}
        <div className="grid gap-2 sm:grid-cols-2">
          {draft.kpis.sentiment_target !== null && (
            <Row k="Sentiment" v={`${draft.kpis.sentiment_target}%`} />
          )}
          {draft.kpis.share_of_voice_target !== null && (
            <Row k="Share of Voice" v={`${draft.kpis.share_of_voice_target}%`} />
          )}
          {draft.kpis.volume_target !== null && (
            <Row k="Volume" v={draft.kpis.volume_target.toLocaleString()} />
          )}
          {draft.kpis.engagement_rate_target !== null && (
            <Row k="Engagement" v={`${draft.kpis.engagement_rate_target}%`} />
          )}
        </div>
      </Section>

      <Section icon={Bell} title="ALERTS">
        <Row k="Crisis Threshold" v={draft.alert_threshold ?? "—"} />
        <Row
          k="Recipients"
          v={
            <span className="inline-flex items-center gap-1">
              <Users className="h-3 w-3 text-muted-foreground" />
              {draft.alert_emails.length || 0}
            </span>
          }
        />
      </Section>

      <Section icon={Clock} title="SCHEDULE">
        <Row
          k="Mode"
          v={draft.analysis_type === "live" ? "Live Tracker" : "Historical Snapshot"}
        />
        <Row k="Window" v={`${draft.date_start || "—"} → ${draft.date_end || "—"}`} />
        {draft.analysis_type === "live" && (
          <>
            <Row
              k="Interval"
              v={
                draft.schedule.interval_value > 1
                  ? `Every ${draft.schedule.interval_value} ${draft.schedule.interval_type}s`
                  : `Every ${draft.schedule.interval_type}`
              }
            />
            {draft.schedule.interval_type === "day" &&
              draft.schedule.specific_times.length > 0 && (
                <Row k="Run Times" v={draft.schedule.specific_times.join(", ")} />
              )}
          </>
        )}
      </Section>
    </div>
  );
}
