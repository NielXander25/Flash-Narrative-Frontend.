import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/dashboard")({
  component: () => (
    <>
      <Outlet />
      <Toaster theme="dark" position="bottom-right" />
    </>
  ),
});
