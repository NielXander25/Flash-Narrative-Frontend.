import { ArrowDown, ArrowUp, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { KPI } from "@/lib/types";

interface KPICardProps {
  kpi: KPI;
  icon?: LucideIcon;
}

export function KPICard({ kpi, icon: Icon }: KPICardProps) {
  const trendUp = kpi.trend === "up";
  const trendDown = kpi.trend === "down";
  return (
    <div className="panel relative p-5 shadow-card transition-colors hover:border-primary/30">
      <div className="flex items-start justify-between gap-3">
        <div className="text-[10px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
          {kpi.label}
        </div>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <div className="text-3xl font-bold tracking-tight text-foreground">{kpi.value}</div>
        {kpi.delta && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 text-xs font-medium",
              trendUp && "text-success",
              trendDown && "text-destructive",
              !trendUp && !trendDown && "text-muted-foreground",
            )}
          >
            {trendUp && <ArrowUp className="h-3 w-3" />}
            {trendDown && <ArrowDown className="h-3 w-3" />}
            {kpi.delta}
          </span>
        )}
      </div>
      {kpi.hint && <div className="mt-2 text-xs text-muted-foreground">{kpi.hint}</div>}
    </div>
  );
}
