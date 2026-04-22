import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Button } from "@/components/ui/button";
import { REPORTS } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Eye, Download, FileText, Plus } from "lucide-react";

export const Route = createFileRoute("/dashboard/reports")({
  head: () => ({
    meta: [
      { title: "Reports Command Center — Flash Narrative" },
      {
        name: "description",
        content: "Build, export and send executive intelligence briefings to clients.",
      },
    ],
  }),
  component: ReportsPage,
});

const statusClass = {
  "report-sent": "bg-success/15 text-success border-success/30",
  "report-pending": "bg-primary/15 text-primary border-primary/30",
  "in-progress": "bg-blue-500/15 text-blue-400 border-blue-500/30",
  draft: "bg-muted text-muted-foreground border-border",
};

const statusLabel = {
  "report-sent": "REPORT SENT",
  "report-pending": "REPORT PENDING",
  "in-progress": "IN PROGRESS",
  draft: "DRAFT",
};

function ReportsPage() {
  return (
    <DashboardShell breadcrumbs={[{ label: "Workspace" }, { label: "Reports" }]}>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Reports Command Center</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Build, export and send client presentations.
          </p>
        </div>
        <Button className="gradient-amber gap-1.5 font-semibold text-primary-foreground">
          <Plus className="h-4 w-4" /> New Report
        </Button>
      </div>

      <div className="panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                <th className="px-5 py-3 text-left font-medium">Campaign</th>
                <th className="px-5 py-3 text-left font-medium">Client</th>
                <th className="px-5 py-3 text-left font-medium">Start Date</th>
                <th className="px-5 py-3 text-left font-medium">End Date</th>
                <th className="px-5 py-3 text-left font-medium">Status</th>
                <th className="px-5 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {REPORTS.map((r) => (
                <tr key={r.id} className="border-b border-border/60 last:border-0 hover:bg-secondary/40">
                  <td className="px-5 py-3.5 font-medium">{r.campaign}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{r.client}</td>
                  <td className="px-5 py-3.5 font-mono text-muted-foreground">{r.startDate}</td>
                  <td className="px-5 py-3.5 font-mono text-muted-foreground">{r.endDate}</td>
                  <td className="px-5 py-3.5">
                    <Badge variant="outline" className={cn("text-[10px] tracking-wider", statusClass[r.status])}>
                      {statusLabel[r.status]}
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex justify-end gap-1.5">
                      {r.status === "report-pending" || r.status === "in-progress" ? (
                        <Button size="sm" className="gradient-amber h-7 text-xs font-semibold text-primary-foreground">
                          BUILD REPORT
                        </Button>
                      ) : (
                        <>
                          <Button variant="ghost" size="icon" className="h-7 w-7" aria-label="View">
                            <Eye className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7" aria-label="Download">
                            <Download className="h-3.5 w-3.5" />
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 panel p-10 text-center">
        <div className="text-[10px] tracking-[0.2em] text-muted-foreground">INACTIVE LEDGER VIEW</div>
        <div className="mx-auto mt-6 grid h-12 w-12 place-items-center rounded-md bg-secondary">
          <FileText className="h-5 w-5 text-muted-foreground" />
        </div>
        <h3 className="mt-4 font-semibold">No reports generated yet.</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Start by selecting a campaign and clicking Build Report.
        </p>
        <Button className="gradient-amber mt-4 gap-1.5 font-semibold text-primary-foreground">
          <Plus className="h-4 w-4" /> New Report
        </Button>
      </div>
    </DashboardShell>
  );
}
