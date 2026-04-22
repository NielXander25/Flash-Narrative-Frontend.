import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { ChipInput } from "./ChipInput";
import type { CampaignDraft, CampaignKpis } from "@/lib/types";
import { cn } from "@/lib/utils";

interface Props {
  draft: CampaignDraft;
  update: (patch: Partial<CampaignDraft>) => void;
}

const FieldLabel = ({ children }: { children: React.ReactNode }) => (
  <Label className="text-[10px] font-semibold tracking-[0.18em] text-muted-foreground">
    {children}
  </Label>
);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface KpiRowProps {
  enabled: boolean;
  onToggle: (v: boolean) => void;
  label: string;
  children: React.ReactNode;
}

function KpiRow({ enabled, onToggle, label, children }: KpiRowProps) {
  return (
    <div
      className={cn(
        "rounded-md border p-4 transition",
        enabled ? "border-primary/40 bg-primary/5" : "border-border bg-secondary/30",
      )}
    >
      <label className="flex cursor-pointer items-center gap-2">
        <Checkbox checked={enabled} onCheckedChange={(v) => onToggle(Boolean(v))} />
        <span className="text-sm font-semibold">{label}</span>
      </label>
      {enabled && <div className="mt-3">{children}</div>}
    </div>
  );
}

export function Step3Kpis({ draft, update }: Props) {
  const setKpi = <K extends keyof CampaignKpis>(key: K, value: CampaignKpis[K]) =>
    update({ kpis: { ...draft.kpis, [key]: value } });

  const SliderField = ({
    value,
    onChange,
    suffix = "%",
  }: {
    value: number;
    onChange: (n: number) => void;
    suffix?: string;
  }) => (
    <div className="flex items-center gap-4">
      <Slider
        value={[value]}
        min={0}
        max={100}
        step={1}
        onValueChange={(v) => onChange(v[0])}
        className="flex-1"
      />
      <span className="w-16 text-right text-sm font-semibold tabular-nums">
        {value}
        {suffix}
      </span>
    </div>
  );

  return (
    <div className="space-y-3">
      <KpiRow
        enabled={draft.kpis.sentiment_target !== null}
        onToggle={(v) => setKpi("sentiment_target", v ? 80 : null)}
        label="Brand Sentiment Target"
      >
        <SliderField
          value={draft.kpis.sentiment_target ?? 0}
          onChange={(n) => setKpi("sentiment_target", n)}
        />
      </KpiRow>

      <KpiRow
        enabled={draft.kpis.share_of_voice_target !== null}
        onToggle={(v) => setKpi("share_of_voice_target", v ? 25 : null)}
        label="Share of Voice (SOV) Target"
      >
        <SliderField
          value={draft.kpis.share_of_voice_target ?? 0}
          onChange={(n) => setKpi("share_of_voice_target", n)}
        />
      </KpiRow>

      <KpiRow
        enabled={draft.kpis.volume_target !== null}
        onToggle={(v) => setKpi("volume_target", v ? 5000 : null)}
        label="Total Mention Volume"
      >
        <Input
          type="number"
          min={0}
          value={draft.kpis.volume_target ?? 0}
          onChange={(e) => setKpi("volume_target", Number(e.target.value))}
          className="bg-secondary/40"
        />
      </KpiRow>

      <KpiRow
        enabled={draft.kpis.engagement_rate_target !== null}
        onToggle={(v) => setKpi("engagement_rate_target", v ? 50 : null)}
        label="Engagement Rate Target"
      >
        <SliderField
          value={draft.kpis.engagement_rate_target ?? 0}
          onChange={(n) => setKpi("engagement_rate_target", n)}
        />
      </KpiRow>

      <div className="grid gap-4 pt-2 sm:grid-cols-2">
        <div className="space-y-1.5">
          <FieldLabel>CRISIS ALERT THRESHOLD</FieldLabel>
          <Input
            type="number"
            min={0}
            value={draft.alert_threshold ?? ""}
            onChange={(e) =>
              update({
                alert_threshold: e.target.value === "" ? null : Number(e.target.value),
              })
            }
            placeholder="e.g. 500"
            className="bg-secondary/40"
          />
          <p className="text-[11px] text-muted-foreground">
            Trigger an alert when negative mentions exceed this number per run.
          </p>
        </div>
        <div className="space-y-1.5">
          <FieldLabel>ALERT RECIPIENTS</FieldLabel>
          <ChipInput
            values={draft.alert_emails}
            onChange={(alert_emails) => update({ alert_emails })}
            validate={(v) => EMAIL_RE.test(v)}
            placeholder="Add email and press Enter"
          />
        </div>
      </div>
    </div>
  );
}
