import { SOV_DATA } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function SOVChart() {
  const max = Math.max(...SOV_DATA.map((s) => s.share));
  return (
    <div className="panel p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold tracking-wide">Competitive SOV Benchmark</h3>
        <span className="text-[10px] tracking-[0.2em] text-muted-foreground">90D</span>
      </div>
      <ul className="space-y-4">
        {SOV_DATA.map((row) => {
          const pct = (row.share / max) * 100;
          return (
            <li key={row.brand}>
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span
                  className={cn(
                    "tracking-wide",
                    row.isSelf ? "font-semibold text-primary" : "text-muted-foreground",
                  )}
                >
                  {row.brand.toUpperCase()}
                </span>
                <span className="font-mono font-medium">{row.share}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-secondary/60">
                <div
                  className={cn(
                    "h-full rounded-full transition-all",
                    row.isSelf ? "gradient-amber" : "bg-muted-foreground/60",
                  )}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
