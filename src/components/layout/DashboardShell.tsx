import { useState, type ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { CampaignWizard } from "@/components/dashboard/CampaignWizard";

interface DashboardShellProps {
  children: ReactNode;
  breadcrumbs?: { label: string }[];
}

export function DashboardShell({ children, breadcrumbs }: DashboardShellProps) {
  const [navOpen, setNavOpen] = useState(false);
  const [wizardOpen, setWizardOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <Sidebar open={navOpen} onNavigate={() => setNavOpen(false)} />
      {navOpen && (
        <button
          aria-label="Close menu"
          onClick={() => setNavOpen(false)}
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
        />
      )}
      <div className="flex min-w-0 flex-1 flex-col">
        <Header
          onMenuClick={() => setNavOpen((v) => !v)}
          onNewCampaign={() => setWizardOpen(true)}
          breadcrumbs={breadcrumbs}
        />
        <main className="flex-1 overflow-x-hidden p-4 md:p-6 lg:p-8">{children}</main>
      </div>
      <CampaignWizard open={wizardOpen} onOpenChange={setWizardOpen} />
    </div>
  );
}
