import { Bell, Search, Settings as SettingsIcon, Menu, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  onMenuClick: () => void;
  onNewCampaign: () => void;
  breadcrumbs?: { label: string; href?: string }[];
}

export function Header({ onMenuClick, onNewCampaign, breadcrumbs }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur md:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="hidden items-center gap-2 text-xs text-muted-foreground md:flex">
          {breadcrumbs.map((b, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <span className="opacity-40">/</span>}
              <span className={i === breadcrumbs.length - 1 ? "text-foreground" : ""}>
                {b.label}
              </span>
            </span>
          ))}
        </nav>
      )}

      <div className="ml-auto flex flex-1 items-center justify-end gap-2 md:gap-3">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search intelligence…"
            className="h-9 w-72 border-border bg-secondary/40 pl-9 text-sm"
            aria-label="Search"
          />
        </div>

        <Button
          onClick={onNewCampaign}
          className="gradient-amber h-9 gap-1.5 text-primary-foreground font-semibold shadow-[0_0_0_1px_oklch(0.78_0.16_78/0.4)] hover:opacity-95"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">New Campaign Analysis</span>
          <span className="sm:hidden">New</span>
        </Button>

        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Settings">
          <SettingsIcon className="h-4 w-4" />
        </Button>

        <div
          className="ml-1 grid h-8 w-8 place-items-center rounded-full bg-secondary text-xs font-semibold ring-1 ring-border"
          aria-label="Account"
        >
          AG
        </div>
      </div>
    </header>
  );
}
