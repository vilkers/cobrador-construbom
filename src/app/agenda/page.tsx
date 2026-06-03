"use client";

import { useMemo } from "react";
import { useStore } from "@/lib/store";
import { HydrationGate } from "@/components/HydrationGate";
import { ClienteCard } from "@/components/ClienteCard";
import { comprasEmAberto } from "@/lib/cobranca";
import { agendaCliente, type Bucket } from "@/lib/agenda";
import { saldoDevedor } from "@/lib/format";
import { HOJE_ISO } from "@/lib/config";
import type { Cliente } from "@/lib/types";

const secoes: { bucket: Bucket; titulo: string; sub: string }[] = [
  { bucket: "hoje", titulo: "Hoje", sub: "Cobranças do dia" },
  { bucket: "semana", titulo: "Esta semana", sub: "Próximos dias" },
  { bucket: "sem_agenda", titulo: "Sob demanda", sub: "Cobrar quando possível / presencial" },
  { bucket: "depois", titulo: "Mais pra frente", sub: "Agendadas para depois" },
];

function AgendaInner() {
  const clientes = useStore((s) => s.clientes);

  const grupos = useMemo(() => {
    const comDebito = clientes.filter((c) => saldoDevedor(comprasEmAberto(c)) > 0);
    const map: Record<Bucket, Cliente[]> = { hoje: [], semana: [], depois: [], sem_agenda: [] };
    for (const c of comDebito) {
      map[agendaCliente(c, HOJE_ISO).bucket].push(c);
    }
    (Object.keys(map) as Bucket[]).forEach((b) => {
      map[b].sort((a, z) => agendaCliente(a, HOJE_ISO).diasAte - agendaCliente(z, HOJE_ISO).diasAte);
    });
    return map;
  }, [clientes]);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Agenda de cobranças</h1>
        <p className="text-sm text-slate-500">Organizada pela preferência de cada cliente</p>
      </div>

      {secoes.map((s) => {
        const lista = grupos[s.bucket];
        if (lista.length === 0) return null;
        return (
          <section key={s.bucket}>
            <div className="mb-2 flex items-baseline justify-between">
              <h2 className="text-sm font-semibold text-slate-900">{s.titulo}</h2>
              <span className="text-xs text-slate-500">{lista.length}</span>
            </div>
            <p className="mb-2 text-xs text-slate-400">{s.sub}</p>
            <div className="space-y-2.5">
              {lista.map((c) => (
                <ClienteCard key={c.id} cliente={c} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export default function AgendaPage() {
  return (
    <HydrationGate>
      <AgendaInner />
    </HydrationGate>
  );
}
