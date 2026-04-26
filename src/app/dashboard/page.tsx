import type { Metadata } from "next";
import { Activity } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { COMMAND_KPIS } from "@/lib/constants";
import { KPICard } from "@/components/dashboard/KPICard";
import { CrisisRadar } from "@/components/dashboard/CrisisRadar";
import { AgencyPortfolio } from "@/components/dashboard/AgencyPortfolio";

export const metadata: Metadata = {
  title: "Global Command Center — Flash Narrative",
  description:
    "Real-time narrative intelligence and systemic risk monitoring across your global brand portfolio.",
};

export default function CommandCenterPage() {
  return (
    <DashboardShell breadcrumbs={[{ label: "Workspace" }, { label: "Command Center" }]}>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">GLOBAL COMMAND CENTER</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Real-time narrative intelligence & systemic risk monitoring.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-md border border-success/30 bg-success/10 px-3 py-1.5 text-xs font-semibold text-success">
          <Activity className="h-3.5 w-3.5" /> LIVE UPLINK ACTIVE
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {COMMAND_KPIS.map((k) => (
          <KPICard key={k.id} kpi={k} />
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <CrisisRadar />
        </div>
        <div className="lg:col-span-2">
          <AgencyPortfolio />
        </div>
      </div>
    </DashboardShell>
  );
}
