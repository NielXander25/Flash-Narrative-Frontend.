import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { KPICard } from "@/components/dashboard/KPICard";
import { SentimentChart } from "@/components/dashboard/SentimentChart";
import { SOVChart } from "@/components/dashboard/SOVChart";
import { MentionsTable } from "@/components/dashboard/MentionsTable";
import { AIExecutiveSummary } from "@/components/dashboard/AIExecutiveSummary";
import { INTEL_KPIS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Calendar, Download } from "lucide-react";

export const Route = createFileRoute("/dashboard/intelligence")({
  head: () => ({
    meta: [
      { title: "Reputation Intelligence — Flash Narrative" },
      {
        name: "description",
        content:
          "Deep-dive analysis of media performance, sentiment trajectory, and competitive share of voice.",
      },
    ],
  }),
  component: IntelligencePage,
});

function IntelligencePage() {
  return (
    <DashboardShell
      breadcrumbs={[
        { label: "Zenith Bank" },
        { label: "Q2 Reputation Campaign" },
        { label: "Intelligence Dashboard" },
      ]}
    >
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">REPUTATION INTELLIGENCE</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Deep-dive analysis of Zenith Bank's Q2 media performance and market sentiment trajectory.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Calendar className="h-3.5 w-3.5" /> Last 90 Days
          </Button>
          <Button size="sm" className="gradient-amber gap-1.5 font-semibold text-primary-foreground">
            <Download className="h-3.5 w-3.5" /> Export Data
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {INTEL_KPIS.map((k) => (
          <KPICard key={k.id} kpi={k} />
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SentimentChart />
        <SOVChart />
      </div>

      <div className="mt-6">
        <MentionsTable />
      </div>

      <div className="mt-6">
        <AIExecutiveSummary />
      </div>
    </DashboardShell>
  );
}
