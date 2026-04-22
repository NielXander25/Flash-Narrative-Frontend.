import { Sparkles } from "lucide-react";

export function AIExecutiveSummary() {
  return (
    <div className="panel-elevated p-5">
      <div className="mb-3 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-semibold tracking-wide text-primary">AI EXECUTIVE SUMMARY</h3>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <p className="text-sm leading-relaxed text-muted-foreground">
          “The Q2 Reputation Campaign has achieved a high MIS score of 847, driven largely by
          positive coverage of the new Sustainability Bond. However, the 3% dip in MPI suggests
          lingering friction regarding mobile app stability reported in late May.”
        </p>
        <div>
          <div className="text-[10px] font-semibold tracking-[0.18em] text-success">
            ACTION RECOMMENDED
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            Prioritize narrative around technical infrastructure upgrades in the upcoming
            “Innovation Ledger” campaign to stabilize perception in the tech-savvy demographic.
          </p>
          <button className="mt-3 text-xs font-semibold tracking-wider text-primary hover:underline">
            FULL ANALYTICS →
          </button>
        </div>
      </div>
    </div>
  );
}
