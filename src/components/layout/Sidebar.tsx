"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, LifeBuoy, Repeat, ChevronRight } from "lucide-react";
import { NAV_ITEMS, APP } from "@/lib/constants";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

interface SidebarProps {
  open?: boolean;
  onNavigate?: () => void;
}

export function Sidebar({ open = true, onNavigate }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(href);

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-border bg-sidebar transition-transform md:static md:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full",
      )}
      aria-label="Primary navigation"
    >
      <div className="flex h-16 items-center border-b border-border px-5">
        <Logo />
      </div>

      <div className="border-b border-border px-5 py-4">
        <div className="text-[10px] font-semibold tracking-[0.2em] text-muted-foreground">
          {APP.workspace.toUpperCase()}
        </div>
        <div className="mt-1 text-xs text-primary">{APP.tier}</div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className={cn(
                    "group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors",
                    active
                      ? "bg-primary/10 text-primary border-l-2 border-primary pl-[10px]"
                      : "text-sidebar-foreground hover:bg-sidebar-accent",
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{item.title}</span>
                  {active && <ChevronRight className="ml-auto h-3.5 w-3.5 opacity-60" />}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-border px-3 py-4 space-y-1 text-sm text-sidebar-foreground">
        <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 hover:bg-sidebar-accent">
          <Repeat className="h-4 w-4" /> Workspace Switcher
        </button>
        <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 hover:bg-sidebar-accent">
          <LifeBuoy className="h-4 w-4" /> Help & Support
        </button>
        <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-destructive/90 hover:bg-destructive/10">
          <LogOut className="h-4 w-4" /> Sign Out
        </button>
      </div>
    </aside>
  );
}
