import { AGENCY_BRANDS } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const statusClass = {
  active: "bg-success/15 text-success border-success/30",
  alert: "bg-destructive/15 text-destructive border-destructive/30",
  paused: "bg-muted text-muted-foreground border-border",
};

export function AgencyPortfolio() {
  return (
    <div className="panel p-5">
      <h3 className="mb-4 text-xs font-semibold tracking-[0.18em] text-primary">
        AGENCY PORTFOLIO
      </h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {AGENCY_BRANDS.map((b) => (
          <article
            key={b.id}
            className="group overflow-hidden rounded-lg border border-border bg-secondary/30 transition-colors hover:border-primary/30"
          >
            <div
              className={cn(
                "relative h-24 bg-gradient-to-br",
                b.cover,
              )}
            >
              <Badge
                variant="outline"
                className={cn(
                  "absolute right-2 top-2 uppercase text-[10px] tracking-wider",
                  statusClass[b.status],
                )}
              >
                {b.status}
              </Badge>
            </div>
            <div className="p-4">
              <div className="font-semibold">{b.name}</div>
              <div className="mt-1 text-xs text-muted-foreground">{b.metric} · 24h</div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
