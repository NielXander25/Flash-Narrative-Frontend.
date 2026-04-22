import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { INDUSTRY_SECTORS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Bell, Play, Target } from "lucide-react";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

const STEPS = [
  { id: 1, label: "Identity" },
  { id: 2, label: "Intelligence Scope" },
  { id: 3, label: "Execution" },
];

export function CampaignWizard({ open, onOpenChange }: Props) {
  const [step, setStep] = useState(1);

  const next = () => setStep((s) => Math.min(3, s + 1));
  const prev = () => setStep((s) => Math.max(1, s - 1));

  const handleClose = (v: boolean) => {
    onOpenChange(v);
    if (!v) setTimeout(() => setStep(1), 200);
  };

  const launch = () => {
    toast.success("Campaign analysis initialized", {
      description: "Live signals will appear in the Command Center shortly.",
    });
    handleClose(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-xl border-border bg-popover p-0">
        <DialogHeader className="border-b border-border px-6 py-5">
          <DialogTitle className="text-lg font-semibold">Initialize New Campaign</DialogTitle>
          <p className="text-xs text-muted-foreground">
            Configure intelligence parameters for Flash Narrative.
          </p>
        </DialogHeader>

        <div className="px-6 pt-5">
          <div className="flex items-center gap-3">
            {STEPS.map((s, i) => (
              <div key={s.id} className="flex flex-1 items-center gap-2">
                <div
                  className={cn(
                    "grid h-6 w-6 place-items-center rounded-full text-[11px] font-semibold",
                    step >= s.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground",
                  )}
                >
                  {s.id}
                </div>
                <span
                  className={cn(
                    "text-xs",
                    step === s.id ? "font-semibold text-foreground" : "text-muted-foreground",
                  )}
                >
                  {s.label}
                </span>
                {i < STEPS.length - 1 && (
                  <div
                    className={cn(
                      "ml-1 h-px flex-1",
                      step > s.id ? "bg-primary" : "bg-border",
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 py-6">
          {step === 1 && (
            <div className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="brand" className="text-[10px] tracking-[0.18em] text-muted-foreground">
                    BRAND NAME
                  </Label>
                  <Input id="brand" placeholder="e.g. Zenith Bank" className="bg-secondary/40" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="campaign" className="text-[10px] tracking-[0.18em] text-muted-foreground">
                    CAMPAIGN NAME
                  </Label>
                  <Input id="campaign" placeholder="Q3 Reputation" className="bg-secondary/40" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] tracking-[0.18em] text-muted-foreground">
                  INDUSTRY SECTOR
                </Label>
                <Select defaultValue={INDUSTRY_SECTORS[0]}>
                  <SelectTrigger className="bg-secondary/40">
                    <SelectValue />
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
              <div className="space-y-2 pt-2">
                <CollapsibleHint icon={Target} label="Step 2: Define Sentiment Thresholds" />
                <CollapsibleHint icon={Play} label="Step 3: Alert Configuration" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-[10px] tracking-[0.18em] text-muted-foreground">
                  KEYWORDS / NARRATIVE TOKENS
                </Label>
                <Input placeholder="liquidity, sustainability, mobile app" className="bg-secondary/40" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label className="text-[10px] tracking-[0.18em] text-muted-foreground">
                    SENTIMENT FLOOR
                  </Label>
                  <Input defaultValue="-25%" className="bg-secondary/40" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] tracking-[0.18em] text-muted-foreground">
                    VOLUME CEILING
                  </Label>
                  <Input defaultValue="50,000" className="bg-secondary/40" />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <CollapsibleHint icon={Bell} label="Real-time Crisis Alerts (SMS + Email)" active />
              <CollapsibleHint icon={Target} label="Daily Executive Briefing" active />
              <CollapsibleHint icon={Play} label="Auto-publish to Reports Ledger" />
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-border px-6 py-4">
          <button
            onClick={() => (step === 1 ? handleClose(false) : prev())}
            className="text-xs font-semibold tracking-[0.18em] text-muted-foreground hover:text-foreground"
          >
            {step === 1 ? "CANCEL" : "← BACK"}
          </button>
          <Button
            onClick={step === 3 ? launch : next}
            className="gradient-amber font-semibold text-primary-foreground"
          >
            {step === 3 ? "Launch Campaign" : "Next Step"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function CollapsibleHint({
  icon: Icon,
  label,
  active = false,
}: {
  icon: typeof Bell;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-md border px-4 py-3 text-sm",
        active ? "border-primary/40 bg-primary/5" : "border-border bg-secondary/40",
      )}
    >
      <Icon className={cn("h-4 w-4", active ? "text-primary" : "text-muted-foreground")} />
      <span className="flex-1">{label}</span>
      <span className="text-muted-foreground">+</span>
    </div>
  );
}
