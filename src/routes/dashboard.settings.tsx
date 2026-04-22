import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Upload, Sparkles } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/settings")({
  head: () => ({
    meta: [
      { title: "Agency Settings — Flash Narrative" },
      {
        name: "description",
        content: "Configure your Flash Narrative workspace identity and visual signature.",
      },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <DashboardShell breadcrumbs={[{ label: "Settings" }, { label: "Intelligence" }]}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">AGENCY SETTINGS</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Configure your workspace identity and visual signature.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section className="panel p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-semibold">Identity & Assets</h2>
              <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary text-[10px]">
                CORE MODULE
              </Badge>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-[10px] tracking-[0.18em] text-muted-foreground">
                  WORKSPACE NAME
                </Label>
                <Input placeholder="e.g. Ogilvy PR Nigeria" className="bg-secondary/40" />
              </div>

              <div className="space-y-1.5">
                <Label className="text-[10px] tracking-[0.18em] text-muted-foreground">
                  AGENCY BRAND LOGO
                </Label>
                <div className="rounded-md border border-dashed border-border bg-secondary/30 p-8 text-center">
                  <div className="mx-auto grid h-10 w-10 place-items-center rounded-md bg-secondary">
                    <Upload className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="mt-3 text-sm font-medium">Upload Vector SVG or PNG</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Max size 2MB. Preferred aspect 1:1 or 4:1
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="panel p-5">
            <h2 className="mb-4 font-semibold">Visual Signature</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <ColorField label="PRIMARY ACCENT" value="#D4A017" swatch="#D4A017" />
              <ColorField label="SECONDARY TINT" value="#0E0E0E" swatch="#0E0E0E" />
            </div>
            <div className="mt-5 flex items-center justify-between rounded-md bg-secondary/40 p-4">
              <div className="flex items-center gap-2.5">
                <Sparkles className="h-4 w-4 text-primary" />
                <div>
                  <div className="text-sm font-medium">Auto-generate Palette</div>
                  <div className="text-xs text-muted-foreground">Sync system tones with your brand colors</div>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </section>

          <div className="flex justify-end">
            <Button
              onClick={() => toast.success("Settings saved")}
              className="gradient-amber px-6 font-semibold text-primary-foreground"
            >
              SAVE CHANGES
            </Button>
          </div>
        </div>

        <aside className="space-y-3">
          <div className="text-[10px] font-semibold tracking-[0.2em] text-muted-foreground">
            LIVE PREVIEW
          </div>
          <div className="panel-elevated overflow-hidden">
            <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-destructive/70" />
              <span className="h-2 w-2 rounded-full bg-warning/80" />
              <span className="h-2 w-2 rounded-full bg-success/80" />
              <span className="ml-auto text-[10px] text-muted-foreground">FLASH NARRATIVE PREVIEW</span>
            </div>
            <div className="space-y-3 p-4">
              <div className="grid h-10 w-10 place-items-center rounded-md gradient-amber text-primary-foreground font-bold">
                F
              </div>
              <div className="space-y-2">
                <div className="h-2 w-3/4 rounded bg-secondary" />
                <div className="h-2 w-1/2 rounded bg-secondary" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="h-12 rounded bg-secondary/60" />
                <div className="h-12 rounded bg-secondary/60" />
              </div>
              <Button className="gradient-amber w-full font-semibold text-primary-foreground">
                Action Button
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </DashboardShell>
  );
}

function ColorField({ label, value, swatch }: { label: string; value: string; swatch: string }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-[10px] tracking-[0.18em] text-muted-foreground">{label}</Label>
      <div className="flex items-center gap-2 rounded-md border border-border bg-secondary/40 px-3 py-2">
        <span className="h-5 w-5 rounded border border-border" style={{ background: swatch }} />
        <span className="font-mono text-sm">{value}</span>
      </div>
    </div>
  );
}
