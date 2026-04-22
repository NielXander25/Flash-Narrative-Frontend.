import { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { CampaignDraft } from "@/lib/types";
import { buildPayload, initialDraft, validateStep } from "@/lib/campaign-payload";
import { createCampaign } from "@/lib/api-client";
import { Step1Identifiers } from "./wizard/Step1Identifiers";
import { Step2Sources } from "./wizard/Step2Sources";
import { Step3Kpis } from "./wizard/Step3Kpis";
import { Step4Schedule } from "./wizard/Step4Schedule";
import { Step5Review } from "./wizard/Step5Review";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

const STEPS = [
  { id: 1, label: "Identifiers" },
  { id: 2, label: "Sources" },
  { id: 3, label: "KPIs & Alerts" },
  { id: 4, label: "Schedule" },
  { id: 5, label: "Review" },
];

export function CampaignWizard({ open, onOpenChange }: Props) {
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<CampaignDraft>(() => initialDraft());
  const [submitting, setSubmitting] = useState(false);

  const update = (patch: Partial<CampaignDraft>) => setDraft((d) => ({ ...d, ...patch }));

  const handleClose = (v: boolean) => {
    if (submitting) return;
    onOpenChange(v);
    if (!v) {
      setTimeout(() => {
        setStep(1);
        setDraft(initialDraft());
      }, 200);
    }
  };

  const next = () => {
    const err = validateStep(step, draft);
    if (err) {
      toast.error(err);
      return;
    }
    setStep((s) => Math.min(5, s + 1));
  };
  const prev = () => setStep((s) => Math.max(1, s - 1));

  const payload = useMemo(() => buildPayload(draft), [draft]);

  const launch = async () => {
    for (let s = 1; s <= 4; s++) {
      const err = validateStep(s, draft);
      if (err) {
        setStep(s);
        toast.error(err);
        return;
      }
    }
    setSubmitting(true);
    const res = await createCampaign(payload);
    setSubmitting(false);

    if (res.ok) {
      toast.success("Campaign launched", {
        description: "Live signals will appear in the Command Center shortly.",
      });
      handleClose(false);
    } else {
      toast.error("Backend offline — payload captured locally", {
        description: res.error ?? "Check console for full payload.",
      });
       
      console.info("[CampaignWizard] payload", payload);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[92vh] max-w-3xl overflow-hidden border-border bg-popover p-0">
        <DialogHeader className="border-b border-border px-6 py-5">
          <DialogTitle className="text-lg font-semibold">Initialize New Campaign</DialogTitle>
          <p className="text-xs text-muted-foreground">
            Configure intelligence parameters for Flash Narrative.
          </p>
        </DialogHeader>

        {/* Stepper */}
        <div className="border-b border-border px-6 py-4">
          <div className="flex items-center gap-2">
            {STEPS.map((s, i) => (
              <div key={s.id} className="flex flex-1 items-center gap-2">
                <div
                  className={cn(
                    "grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] font-semibold transition",
                    step >= s.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground",
                  )}
                >
                  {s.id}
                </div>
                <span
                  className={cn(
                    "hidden whitespace-nowrap text-xs sm:inline",
                    step === s.id ? "font-semibold text-foreground" : "text-muted-foreground",
                  )}
                >
                  {s.label}
                </span>
                {i < STEPS.length - 1 && (
                  <div
                    className={cn(
                      "ml-1 h-px flex-1 transition",
                      step > s.id ? "bg-primary" : "bg-border",
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="max-h-[55vh] overflow-y-auto px-6 py-6">
          {step === 1 && <Step1Identifiers draft={draft} update={update} />}
          {step === 2 && <Step2Sources draft={draft} update={update} />}
          {step === 3 && <Step3Kpis draft={draft} update={update} />}
          {step === 4 && <Step4Schedule draft={draft} update={update} />}
          {step === 5 && <Step5Review draft={draft} />}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border px-6 py-4">
          <button
            type="button"
            onClick={() => (step === 1 ? handleClose(false) : prev())}
            disabled={submitting}
            className="text-xs font-semibold tracking-[0.18em] text-muted-foreground hover:text-foreground disabled:opacity-50"
          >
            {step === 1 ? "CANCEL" : "← BACK"}
          </button>

          <div className="flex items-center gap-3">
            <span className="hidden text-[11px] text-muted-foreground sm:inline">
              Step {step} of {STEPS.length}
            </span>
            <Button
              onClick={step === 5 ? launch : next}
              disabled={submitting}
              className="gradient-amber font-semibold text-primary-foreground"
            >
              {submitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              {step === 5
                ? submitting
                  ? "Launching…"
                  : "Launch Campaign"
                : "Next Step"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
