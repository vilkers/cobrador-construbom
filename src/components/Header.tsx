"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, CalendarClock } from "lucide-react";
import clsx from "clsx";
import { LOJA } from "@/lib/config";

const navItems = [
  { href: "/", label: "Início", icon: Home, match: (p: string) => p === "/" },
  { href: "/clientes", label: "Fichas", icon: Users, match: (p: string) => p.startsWith("/clientes") },
  { href: "/agenda", label: "Agenda", icon: CalendarClock, match: (p: string) => p.startsWith("/agenda") },
];

export function Header() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-30 border-b border-brand-700/30 bg-brand-500 text-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent font-extrabold text-brand-700">
            C
          </span>
          <div className="leading-tight">
            <div className="text-sm font-bold tracking-tight">Cobrança {LOJA.nome.split(" ")[0]}</div>
            <div className="text-[11px] text-brand-100">{LOJA.rede}</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((it) => {
            const active = it.match(pathname);
            const Icon = it.icon;
            return (
              <Link
                key={it.href}
                href={it.href}
                className={clsx(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition",
                  active ? "bg-white text-brand-600" : "text-brand-50 hover:bg-brand-600"
                )}
              >
                <Icon className="h-4 w-4" />
                {it.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
