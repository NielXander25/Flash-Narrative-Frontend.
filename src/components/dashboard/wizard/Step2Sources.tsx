import { Newspaper, Radio, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CampaignDraft, CampaignSource } from "@/lib/types";

interface Props {
  draft: CampaignDraft;
  update: (patch: Partial<CampaignDraft>) => void;
}

const OPTIONS: {
  id: CampaignSource;
  title: string;
  desc: string;
  icon: typeof Newspaper;
}[] = [
  {
    id: "news_and_web",
    title: "News & Web",
    desc: "Tier-1 publications, RSS feeds, regulatory outlets and indexed web articles.",
    icon: Newspaper,
  },
  {
    id: "social_pulse",
    title: "Social Media Pulse",
    desc: "Real-time signals from X, LinkedIn, Reddit and Nairaland.",
    icon: Radio,
  },
];

export function Step2Sources({ draft, update }: Props) {
  const toggle = (id: CampaignSource) => {
    const next = draft.sources.includes(id)
      ? draft.sources.filter((s) => s !== id)
      : [...draft.sources, id];
    update({ sources: next });
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        {OPTIONS.map((o) => {
          const active = draft.sources.includes(o.id);
          const Icon = o.icon;
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => toggle(o.id)}
              className={cn(
                "group relative flex flex-col gap-2 rounded-lg border p-4 text-left transition",
                active
                  ? "border-primary/60 bg-primary/5 shadow-[0_0_0_1px_oklch(0.78_0.16_78/0.3)]"
                  : "border-border bg-secondary/30 hover:border-border/80",
              )}
            >
              <div className="flex items-center justify-between">
                <div
                  className={cn(
                    "grid h-8 w-8 place-items-center rounded-md",
                    active ? "bg-primary/15 text-primary" : "bg-secondary text-muted-foreground",
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div
                  className={cn(
                    "grid h-5 w-5 place-items-center rounded border",
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background",
                  )}
                >
                  {active && <Check className="h-3 w-3" />}
                </div>
              </div>
              <div className="text-sm font-semibold">{o.title}</div>
              <p className="text-xs leading-relaxed text-muted-foreground">{o.desc}</p>
            </button>
          );
        })}
      </div>
      <p className="rounded-md border border-border bg-secondary/30 px-3 py-2 text-xs text-muted-foreground">
        Disabling <span className="text-foreground">Social Media Pulse</span> conserves API credits
        and accelerates run completion times.
      </p>
    </div>
  );
}
