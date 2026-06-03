"use client";

import Link from "next/link";
import { Cliente } from "@/lib/types";
import { formatBRL, saldoDevedor, labelFrequencia } from "@/lib/format";
import { comprasEmAberto } from "@/lib/cobranca";
import { StatusBadge } from "./StatusBadge";
import { ChevronRight } from "lucide-react";
import clsx from "clsx";

const barra: Record<string, string> = {
  verde: "bg-verde",
  amarelo: "bg-amarelo",
  vermelho: "bg-vermelho",
  cinza: "bg-cinza",
};

export function ClienteCard({ cliente }: { cliente: Cliente }) {
  const abertas = comprasEmAberto(cliente);
  const saldo = saldoDevedor(abertas);
  const temAtraso = abertas.some((c) => c.status === "atrasado");

  return (
    <Link
      href={`/clientes/${cliente.id}`}
      className="group flex items-stretch overflow-hidden rounded-xl border border-slate-200 bg-white shadow-card transition hover:shadow-cardhover"
    >
      <div className={clsx("w-1.5 shrink-0", barra[cliente.classificacao])} />
      <div className="flex flex-1 items-center gap-3 p-3.5">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="truncate font-semibold text-slate-900">{cliente.nome}</span>
          </div>
          <div className="mt-0.5 flex items-center gap-2 text-xs text-slate-500">
            <span>#{cliente.codigo}</span>
            <span>•</span>
            <span>{labelFrequencia[cliente.preferencia.frequencia]}</span>
          </div>
          <div className="mt-2">
            <StatusBadge classificacao={cliente.classificacao} />
          </div>
        </div>
        <div className="text-right">
          <div
            className={clsx(
              "text-base font-bold tabular-nums",
              saldo > 0 ? (temAtraso ? "text-vermelho" : "text-slate-900") : "text-verde"
            )}
          >
            {formatBRL(saldo)}
          </div>
          <div className="text-[11px] text-slate-500">
            {saldo > 0 ? (temAtraso ? "em atraso" : "em aberto") : "em dia"}
          </div>
        </div>
        <ChevronRight className="h-5 w-5 shrink-0 text-slate-300 group-hover:text-slate-400" />
      </div>
    </Link>
  );
}
