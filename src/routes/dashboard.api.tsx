import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { KPICard } from "@/components/dashboard/KPICard";
import { API_KEYS } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Trash2, Plus, ShieldCheck, Webhook } from "lucide-react";

export const Route = createFileRoute("/dashboard/api")({
  head: () => ({
    meta: [
      { title: "API Management — Flash Narrative" },
      {
        name: "description",
        content: "Manage Flash Narrative API keys, webhooks and access permissions.",
      },
    ],
  }),
  component: ApiPage,
});

function ApiPage() {
  return (
    <DashboardShell breadcrumbs={[{ label: "Workspace" }, { label: "API Hub" }]}>
      <div className="mb-6 panel-elevated flex items-center gap-3 border-l-2 border-l-primary p-4">
        <ShieldCheck className="h-5 w-5 text-primary" />
        <div className="flex-1">
          <div className="text-sm font-semibold">SECURITY PROTOCOL ACTIVE</div>
          <div className="text-xs text-muted-foreground">
            All API requests are monitored and logged via Flash Narrative encryption modules.
          </div>
        </div>
        <span className="hidden rounded-md border border-success/30 bg-success/10 px-2 py-1 text-[10px] font-semibold tracking-wider text-success md:inline">
          ENDPOINT STATUS: HEALTHY
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <KPICard kpi={{ id: "req", label: "Total Requests (24h)", value: "1.28M", delta: "+12.4%", trend: "up" }} />
        <KPICard kpi={{ id: "lat", label: "Avg. Latency", value: "42ms", hint: "Within optimal range" }} />
        <KPICard kpi={{ id: "keys", label: "Active Keys", value: "14", hint: "4 keys rotating in 48h" }} />
      </div>

      <section className="mt-6">
        <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold tracking-tight">ACTIVE CREDENTIALS</h2>
            <p className="text-xs text-muted-foreground">
              Manage your Flash Narrative access keys and permissions.
            </p>
          </div>
          <Button className="gradient-amber gap-1.5 font-semibold text-primary-foreground">
            <Plus className="h-4 w-4" /> Generate New API Key
          </Button>
        </div>

        <div className="panel overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  <th className="px-5 py-3 text-left font-medium">Key Name</th>
                  <th className="px-5 py-3 text-left font-medium">Permissions</th>
                  <th className="px-5 py-3 text-left font-medium">Status</th>
                  <th className="px-5 py-3 text-left font-medium">Created</th>
                  <th className="px-5 py-3 text-left font-medium">Last Used</th>
                  <th className="px-5 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {API_KEYS.map((k) => (
                  <tr key={k.id} className="border-b border-border/60 last:border-0 hover:bg-secondary/40">
                    <td className="px-5 py-3.5 font-mono text-sm">{k.name}</td>
                    <td className="px-5 py-3.5">
                      <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary text-[10px] uppercase">
                        {k.permissions}
                      </Badge>
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge variant="outline" className="border-success/30 bg-success/10 text-success text-[10px] uppercase">
                        ● {k.status}
                      </Badge>
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground">{k.created}</td>
                    <td className="px-5 py-3.5 text-muted-foreground">{k.lastUsed}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex justify-end gap-1.5">
                        <Button variant="ghost" size="icon" className="h-7 w-7" aria-label="Reveal">
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" aria-label="Revoke">
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-lg font-bold tracking-tight">WEBHOOK CONFIGURATION</h2>
        <div className="panel p-5">
          <div className="grid gap-4 md:grid-cols-[1fr_auto_auto] md:items-center">
            <div>
              <div className="text-[10px] tracking-[0.18em] text-muted-foreground">ENDPOINT URL</div>
              <code className="mt-1 inline-block rounded-md border border-border bg-secondary/40 px-3 py-1.5 text-xs">
                <Webhook className="mr-1.5 inline h-3 w-3" />
                https://api.internal-vault.io/hooks/risk-alert
              </code>
            </div>
            <div>
              <div className="text-[10px] tracking-[0.18em] text-muted-foreground">EVENTS</div>
              <div className="mt-1 flex gap-1.5">
                <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary text-[10px]">
                  + CRISIS_ALERT
                </Badge>
                <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary text-[10px]">
                  + MARKET_SHIFT
                </Badge>
              </div>
            </div>
            <Button variant="outline" size="sm">
              CONFIGURE
            </Button>
          </div>
        </div>
      </section>
    </DashboardShell>
  );
}
