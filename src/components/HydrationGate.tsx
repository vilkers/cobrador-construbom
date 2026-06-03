"use client";

import { useStore } from "@/lib/store";
import { Loader2 } from "lucide-react";

export function HydrationGate({ children }: { children: React.ReactNode }) {
  const hydrated = useStore((s) => s.hydrated);
  if (!hydrated) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-brand-500">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }
  return <>{children}</>;
}
