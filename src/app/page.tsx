"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { HydrationGate } from "@/components/HydrationGate";
import { KpiCard } from "@/components/KpiCard";
import { ClienteCard } from "@/components/ClienteCard";
import { comprasEmAberto } from "@/lib/cobranca";
import { agendaCliente } from "@/lib/agenda";
import { saldoDevedor, formatBRL, formatData, DIAS_SEMANA, labelClassificacao } from "@/lib/format";
import { HOJE_ISO } from "@/lib/config";
import { Wallet, AlertTriangle, Users, CalendarClock, ArrowRight, RefreshCw } from "lucide-react";
import type { Classificacao } from "@/lib/types";

const ordemCores: Classificacao[] = ["verde", "amarelo", "vermelho", "cinza"];
const dotCor: Record<Classificacao, string> = {
  verde: "bg-verde",
  amarelo: "bg-amarelo",
  vermelho: "bg-vermelho",
  cinza: "bg-cinza",
};

function DashboardInner() {
  const clientes = useStore((s) => s.clientes);
  const resetSeed = useStore((s) => s.resetSeed);

  const m = useMemo(() => {
    let aReceber = 0;
    let emAtraso = 0;
    let comDebito = 0;
    const porCor: Record<Classificacao, number> = { verde: 0, amarelo: 0, vermelho: 0, cinza: 0 };

    for (const c of clientes) {
      porCor[c.classificacao]++;
      const abertas = comprasEmAberto(c);
      const saldo = saldoDevedor(abertas);
      if (saldo > 0) comDebito++;
      aReceber += saldo;
      emAtraso += saldoDevedor(abertas.filter((x) => x.status === "atrasado"));
    }

    const hoje = clientes
      .filter((c) => saldoDevedor(comprasEmAberto(c)) > 0)
      .filter((c) => agendaCliente(c, HOJE_ISO).bucket === "hoje")
      .sort((a, b) => saldoDevedor(comprasEmAberto(b)) - saldoDevedor(comprasEmAberto(a)));

    const semanaCount = clientes
      .filter((c) => saldoDevedor(comprasEmAberto(c)) > 0)
      .filter((c) => agendaCliente(c, HOJE_ISO).bucket === "semana").length;

    return { aReceber, emAtraso, comDebito, porCor, hoje, semanaCount };
  }, [clientes]);

  const hojeData = new Date(HOJE_ISO + "T00:00:00");

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Visão geral</h1>
        <p className="text-sm capitalize text-slate-500">
          {DIAS_SEMANA[hojeData.getDay()]}, {formatData(HOJE_ISO)}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <KpiCard
          label="A receber"
          valor={formatBRL(m.aReceber)}
          tone="brand"
          icon={<Wallet className="h-4 w-4" />}
        />
        <KpiCard
          label="Em atraso"
          valor={formatBRL(m.emAtraso)}
          tone="vermelho"
          icon={<AlertTriangle className="h-4 w-4" />}
        />
        <KpiCard
          label="Clientes com débito"
          valor={String(m.comDebito)}
          sub={`de ${clientes.length} fichas`}
          icon={<Users className="h-4 w-4" />}
        />
        <KpiCard
          label="Cobrar hoje"
          valor={String(m.hoje.length)}
          sub={`${m.semanaCount} esta semana`}
          tone="amarelo"
          icon={<CalendarClock className="h-4 w-4" />}
        />
      </div>

      {/* Distribuição por cor */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-card">
        <div className="mb-3 text-sm font-semibold text-slate-900">Clientes por classificação</div>
        <div className="grid grid-cols-4 gap-2">
          {ordemCores.map((cor) => (
            <div key={cor} className="rounded-lg bg-slate-50 p-2.5 text-center">
              <div className="flex items-center justify-center gap-1.5">
                <span className={`h-2.5 w-2.5 rounded-full ${dotCor[cor]}`} />
                <span className="text-lg font-bold tabular-nums text-slate-900">{m.porCor[cor]}</span>
              </div>
              <div className="mt-0.5 text-[10px] leading-tight text-slate-500">
                {labelClassificacao[cor]}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cobranças de hoje */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900">Para cobrar hoje</h2>
          <Link href="/agenda" className="flex items-center gap-1 text-xs font-medium text-brand-500">
            Ver agenda <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        {m.hoje.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-500">
            Nenhuma cobrança programada para hoje. 🎉
          </div>
        ) : (
          <div className="space-y-2.5">
            {m.hoje.map((c) => (
              <ClienteCard key={c.id} cliente={c} />
            ))}
          </div>
        )}
      </div>

      {/* Rodapé: restaurar base de teste */}
      <div className="border-t border-slate-200 pt-4 text-center">
        <button
          onClick={() => {
            if (confirm("Restaurar os 20 clientes de teste? Isso apaga as alterações feitas no navegador.")) {
              resetSeed();
            }
          }}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-slate-600"
        >
          <RefreshCw className="h-3.5 w-3.5" /> Restaurar base de teste
        </button>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <HydrationGate>
      <DashboardInner />
    </HydrationGate>
  );
}
