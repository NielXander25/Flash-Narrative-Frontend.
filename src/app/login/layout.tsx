import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Sign In — Flash Narrative",
  description: "Sign in to access your Flash Narrative intelligence dashboard.",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Toaster richColors position="top-right" />
    </>
  );
}
