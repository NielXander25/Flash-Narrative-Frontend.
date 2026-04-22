import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { SENTIMENT_DATA } from "@/lib/constants";

export function SentimentChart() {
  const positive = SENTIMENT_DATA.find((s) => s.name === "Positive")?.value ?? 0;
  return (
    <div className="panel p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold tracking-wide">Sentiment Distribution</h3>
        <span className="text-[10px] tracking-[0.2em] text-muted-foreground">LIVE</span>
      </div>
      <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2">
        <div className="relative h-56">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                contentStyle={{
                  background: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Pie
                data={SENTIMENT_DATA}
                innerRadius={60}
                outerRadius={88}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {SENTIMENT_DATA.map((s) => (
                  <Cell key={s.name} fill={s.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-xs uppercase tracking-widest text-success">Positive</div>
            <div className="text-2xl font-bold">{positive}%</div>
            <div className="text-[10px] text-muted-foreground">DOMINANT</div>
          </div>
        </div>
        <ul className="space-y-3 text-sm">
          {SENTIMENT_DATA.map((s) => (
            <li key={s.name} className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
              <span className="font-medium">{s.name}</span>
              <span className="ml-auto text-muted-foreground">{s.value}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
