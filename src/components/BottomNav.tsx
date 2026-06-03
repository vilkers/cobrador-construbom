"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, CalendarClock } from "lucide-react";
import clsx from "clsx";

const items = [
  { href: "/", label: "Início", icon: Home, match: (p: string) => p === "/" },
  { href: "/clientes", label: "Fichas", icon: Users, match: (p: string) => p.startsWith("/clientes") },
  { href: "/agenda", label: "Agenda", icon: CalendarClock, match: (p: string) => p.startsWith("/agenda") },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-slate-200 bg-white/95 backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-2xl items-stretch justify-around">
        {items.map((it) => {
          const active = it.match(pathname);
          const Icon = it.icon;
          return (
            <Link
              key={it.href}
              href={it.href}
              className={clsx(
                "flex flex-1 flex-col items-center gap-0.5 py-2.5 text-xs font-medium",
                active ? "text-brand-500" : "text-slate-500"
              )}
            >
              <Icon className="h-5 w-5" strokeWidth={active ? 2.4 : 2} />
              {it.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
