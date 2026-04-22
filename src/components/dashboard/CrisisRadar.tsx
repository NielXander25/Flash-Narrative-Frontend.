import { CRISIS_RADAR } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";

const levelClass = {
  high: "border-l-destructive bg-destructive/5",
  medium: "border-l-primary bg-primary/5",
  low: "border-l-success bg-success/5",
};

const levelLabel = {
  high: "HIGH",
  medium: "MEDIUM",
  low: "LOW",
};

const levelText = {
  high: "text-destructive",
  medium: "text-primary",
  low: "text-success",
};

export function CrisisRadar() {
  return (
    <div className="panel p-5">
      <div className="mb-4 flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-primary" />
        <h3 className="text-xs font-semibold tracking-[0.18em] text-primary">CRISIS RADAR</h3>
      </div>
      <ul className="space-y-3">
        {CRISIS_RADAR.map((c) => (
          <li
            key={c.id}
            className={cn("rounded-md border-l-2 p-3.5", levelClass[c.level])}
          >
            <div className="mb-1 flex items-center justify-between">
              <span className={cn("text-[10px] font-bold tracking-[0.2em]", levelText[c.level])}>
                {levelLabel[c.level]}
              </span>
            </div>
            <div className="text-sm font-semibold">{c.title}</div>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{c.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
