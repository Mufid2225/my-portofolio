"use client";

import { ToastProvider } from "@/components/ui/toast";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return <ToastProvider>{children}</ToastProvider>;
}
