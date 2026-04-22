import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CampaignDraft, ScheduleInterval } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Clock, History, Plus, Radio, X } from "lucide-react";

interface Props {
  draft: CampaignDraft;
  update: (patch: Partial<CampaignDraft>) => void;
}

const FieldLabel = ({ children }: { children: React.ReactNode }) => (
  <Label className="text-[10px] font-semibold tracking-[0.18em] text-muted-foreground">
    {children}
  </Label>
);

const INTERVAL_PRESETS: {
  id: string;
  label: string;
  interval_type: ScheduleInterval;
  interval_value: number;
}[] = [
  { id: "min-1", label: "Every Minute", interval_type: "minute", interval_value: 1 },
  { id: "min-5", label: "Every 5 Minutes", interval_type: "minute", interval_value: 5 },
  { id: "hr-1", label: "Every Hour", interval_type: "hour", interval_value: 1 },
  { id: "day-1", label: "Every Day", interval_type: "day", interval_value: 1 },
];

const presetId = (t: ScheduleInterval, v: number) =>
  INTERVAL_PRESETS.find((p) => p.interval_type === t && p.interval_value === v)?.id ?? "day-1";

export function Step4Schedule({ draft, update }: Props) {
  const [timeDraft, setTimeDraft] = useState("07:00");

  const setSchedulePreset = (id: string) => {
    const p = INTERVAL_PRESETS.find((x) => x.id === id);
    if (!p) return;
    update({
      schedule: {
        interval_type: p.interval_type,
        interval_value: p.interval_value,
        specific_times: p.interval_type === "day" ? draft.schedule.specific_times : [],
      },
    });
  };

  const addTime = () => {
    if (!/^\d{2}:\d{2}$/.test(timeDraft)) return;
    if (draft.schedule.specific_times.includes(timeDraft)) return;
    update({
      schedule: {
        ...draft.schedule,
        specific_times: [...draft.schedule.specific_times, timeDraft].sort(),
      },
    });
  };

  const removeTime = (t: string) =>
    update({
      schedule: {
        ...draft.schedule,
        specific_times: draft.schedule.specific_times.filter((x) => x !== t),
      },
    });

  const isLive = draft.analysis_type === "live";
  const isDaily = draft.schedule.interval_type === "day";

  return (
    <div className="space-y-5">
      <RadioGroup
        value={draft.analysis_type}
        onValueChange={(v) => update({ analysis_type: v as CampaignDraft["analysis_type"] })}
        className="grid gap-3 sm:grid-cols-2"
      >
        {[
          {
            id: "historical" as const,
            icon: History,
            title: "Historical Snapshot",
            desc: "Runs once across the selected date range.",
          },
          {
            id: "live" as const,
            icon: Radio,
            title: "Live Tracker (Compounding)",
            desc: "Recurring scrapes on a schedule for a forward window.",
          },
        ].map((o) => {
          const Icon = o.icon;
          const active = draft.analysis_type === o.id;
          return (
            <label
              key={o.id}
              className={cn(
                "flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition",
                active
                  ? "border-primary/60 bg-primary/5"
                  : "border-border bg-secondary/30 hover:border-border/80",
              )}
            >
              <RadioGroupItem value={o.id} className="mt-1" />
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <Icon
                    className={cn("h-4 w-4", active ? "text-primary" : "text-muted-foreground")}
                  />
                  <span className="text-sm font-semibold">{o.title}</span>
                </div>
                <p className="text-xs text-muted-foreground">{o.desc}</p>
              </div>
            </label>
          );
        })}
      </RadioGroup>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <FieldLabel>{isLive ? "START DATE" : "DATE START"}</FieldLabel>
          <Input
            type="date"
            value={draft.date_start}
            onChange={(e) => update({ date_start: e.target.value })}
            className="bg-secondary/40"
          />
        </div>
        <div className="space-y-1.5">
          <FieldLabel>{isLive ? "END DATE" : "DATE END"}</FieldLabel>
          <Input
            type="date"
            value={draft.date_end}
            onChange={(e) => update({ date_end: e.target.value })}
            className="bg-secondary/40"
          />
        </div>
      </div>

      {isLive && (
        <div className="space-y-3 rounded-lg border border-border bg-secondary/20 p-4">
          <div className="space-y-1.5">
            <FieldLabel>SCHEDULE INTERVAL</FieldLabel>
            <Select
              value={presetId(draft.schedule.interval_type, draft.schedule.interval_value)}
              onValueChange={setSchedulePreset}
            >
              <SelectTrigger className="bg-secondary/40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {INTERVAL_PRESETS.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {isDaily ? (
            <div className="space-y-2">
              <FieldLabel>DAILY RUN TIMES</FieldLabel>
              <div className="flex gap-2">
                <Input
                  type="time"
                  value={timeDraft}
                  onChange={(e) => setTimeDraft(e.target.value)}
                  className="w-40 bg-secondary/40"
                />
                <button
                  type="button"
                  onClick={addTime}
                  className="inline-flex items-center gap-1 rounded-md border border-border bg-secondary/40 px-3 text-xs font-semibold hover:border-primary/40 hover:text-primary"
                >
                  <Plus className="h-3 w-3" /> Add
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {draft.schedule.specific_times.length === 0 && (
                  <span className="text-xs text-muted-foreground">
                    No times added — defaults to one run per day at 00:00.
                  </span>
                )}
                {draft.schedule.specific_times.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-medium text-primary"
                  >
                    <Clock className="h-3 w-3" />
                    {t}
                    <button
                      type="button"
                      onClick={() => removeTime(t)}
                      aria-label={`Remove ${t}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">
              The system will auto-trigger on a continuous{" "}
              <span className="text-foreground">
                {draft.schedule.interval_value > 1
                  ? `${draft.schedule.interval_value} ${draft.schedule.interval_type}`
                  : draft.schedule.interval_type}
              </span>{" "}
              loop. No specific times required.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
