import { MENTIONS } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { MentionSentiment } from "@/lib/types";

const sentimentClass: Record<MentionSentiment, string> = {
  positive: "bg-success/15 text-success border-success/30",
  neutral: "bg-muted text-muted-foreground border-border",
  critical: "bg-destructive/15 text-destructive border-destructive/30",
  trending: "bg-primary/15 text-primary border-primary/30",
};

const statusClass: Record<string, string> = {
  verified: "bg-success/10 text-success border-success/30",
  priority: "bg-destructive/10 text-destructive border-destructive/30",
  review: "bg-muted text-muted-foreground border-border",
  "real-time": "bg-primary/10 text-primary border-primary/30",
};

export function MentionsTable() {
  return (
    <div className="panel overflow-hidden">
      <div className="flex flex-wrap items-center gap-1 border-b border-border px-5 py-3 text-xs">
        <button className="border-b-2 border-primary px-3 py-1.5 font-semibold text-primary">
          NEWS & WEB COVERAGE
        </button>
        <button className="px-3 py-1.5 text-muted-foreground hover:text-foreground">
          SOCIAL INTELLIGENCE
        </button>
        <button className="px-3 py-1.5 text-muted-foreground hover:text-foreground">
          REGULATORY
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              <th className="px-5 py-3 text-left font-medium">Entity / Source</th>
              <th className="px-5 py-3 text-left font-medium">Volume</th>
              <th className="px-5 py-3 text-left font-medium">Engagement</th>
              <th className="px-5 py-3 text-left font-medium">Sentiment</th>
              <th className="px-5 py-3 text-left font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {MENTIONS.map((m) => (
              <tr key={m.id} className="border-b border-border/60 last:border-0 hover:bg-secondary/40">
                <td className="px-5 py-3.5 font-medium">{m.source}</td>
                <td className="px-5 py-3.5 font-mono text-muted-foreground">{m.volume}</td>
                <td className="px-5 py-3.5 font-mono text-muted-foreground">{m.engagement}</td>
                <td className="px-5 py-3.5">
                  <Badge variant="outline" className={cn("capitalize", sentimentClass[m.sentiment])}>
                    {m.sentiment}
                  </Badge>
                </td>
                <td className="px-5 py-3.5">
                  <Badge variant="outline" className={cn("uppercase tracking-wider text-[10px]", statusClass[m.status])}>
                    {m.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
