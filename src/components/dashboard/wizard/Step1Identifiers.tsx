import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChipInput } from "./ChipInput";
import { INDUSTRY_SECTORS, SUGGESTED_COMPETITORS } from "@/lib/constants";
import type { CampaignDraft } from "@/lib/types";
import { Plus } from "lucide-react";

interface Props {
  draft: CampaignDraft;
  update: (patch: Partial<CampaignDraft>) => void;
}

const FieldLabel = ({ children }: { children: React.ReactNode }) => (
  <Label className="text-[10px] font-semibold tracking-[0.18em] text-muted-foreground">
    {children}
  </Label>
);

export function Step1Identifiers({ draft, update }: Props) {
  const suggestions = SUGGESTED_COMPETITORS[draft.industry] ?? [];
  const addCompetitor = (name: string) => {
    if (draft.competitors.includes(name)) return;
    update({ competitors: [...draft.competitors, name] });
  };

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <FieldLabel>CAMPAIGN NAME</FieldLabel>
          <Input
            value={draft.campaign_name}
            onChange={(e) => update({ campaign_name: e.target.value })}
            placeholder="Zenith Bank Q1 Health"
            className="bg-secondary/40"
          />
        </div>
        <div className="space-y-1.5">
          <FieldLabel>TARGET BRAND / KEYWORD *</FieldLabel>
          <Input
            value={draft.target}
            onChange={(e) => update({ target: e.target.value })}
            placeholder="e.g. Zenith Bank"
            className="bg-secondary/40"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <FieldLabel>INDUSTRY *</FieldLabel>
        <Select value={draft.industry} onValueChange={(v) => update({ industry: v })}>
          <SelectTrigger className="bg-secondary/40">
            <SelectValue placeholder="Select industry" />
          </SelectTrigger>
          <SelectContent>
            {INDUSTRY_SECTORS.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <FieldLabel>COMPETITORS</FieldLabel>
        <ChipInput
          values={draft.competitors}
          onChange={(competitors) => update({ competitors })}
          placeholder="Type a competitor and press Enter"
        />
        {suggestions.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="text-[10px] font-semibold tracking-[0.18em] text-muted-foreground">
              SUGGESTED
            </span>
            {suggestions
              .filter((s) => !draft.competitors.includes(s))
              .map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => addCompetitor(s)}
                  className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary/40 px-2.5 py-0.5 text-xs text-foreground transition hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                >
                  <Plus className="h-3 w-3" />
                  {s}
                </button>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
