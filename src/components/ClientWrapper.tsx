"use client";

import { ToastProvider } from "@/components/ui/toast";
import { LanguageProvider } from "@/context/LanguageContext";
import Crosshair from "@/components/ui/crosshair";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <ToastProvider>
        <Crosshair color="rgba(255, 255, 255, 0.75)" />
        {children}
      </ToastProvider>
    </LanguageProvider>
  );
}


