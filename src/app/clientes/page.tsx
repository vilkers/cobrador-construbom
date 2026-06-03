"use client";

import { useMemo, useState } from "react";
import { useStore } from "@/lib/store";
import { HydrationGate } from "@/components/HydrationGate";
import { ClienteCard } from "@/components/ClienteCard";
import { comprasEmAberto } from "@/lib/cobranca";
import { saldoDevedor, labelClassificacao } from "@/lib/format";
import { Search } from "lucide-react";
import clsx from "clsx";
import type { Classificacao } from "@/lib/types";

type Filtro = "todos" | Classificacao;
type Ordem = "saldo" | "nome";

const filtros: { key: Filtro; label: string; dot?: string }[] = [
  { key: "todos", label: "Todos" },
  { key: "vermelho", label: labelClassificacao.vermelho, dot: "bg-vermelho" },
  { key: "amarelo", label: labelClassificacao.amarelo, dot: "bg-amarelo" },
  { key: "verde", label: labelClassificacao.verde, dot: "bg-verde" },
  { key: "cinza", label: labelClassificacao.cinza, dot: "bg-cinza" },
];

function ClientesInner() {
  const clientes = useStore((s) => s.clientes);
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState<Filtro>("todos");
  const [ordem, setOrdem] = useState<Ordem>("saldo");

  const lista = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    let r = clientes.filter((c) => {
      if (filtro !== "todos" && c.classificacao !== filtro) return false;
      if (!termo) return true;
      return (
        c.nome.toLowerCase().includes(termo) ||
        c.codigo.includes(termo) ||
        c.telefone.includes(termo)
      );
    });
    r = [...r].sort((a, b) => {
      if (ordem === "nome") return a.nome.localeCompare(b.nome);
      return saldoDevedor(comprasEmAberto(b)) - saldoDevedor(comprasEmAberto(a));
    });
    return r;
  }, [clientes, busca, filtro, ordem]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-900">Fichas</h1>
        <span className="text-sm text-slate-500">{lista.length} cliente(s)</span>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar por nome, código ou telefone"
          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-800 shadow-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
        />
      </div>

      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
        {filtros.map((f) => (
          <button
            key={f.key}
            onClick={() => setFiltro(f.key)}
            className={clsx(
              "flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition",
              filtro === f.key
                ? "border-brand-500 bg-brand-500 text-white"
                : "border-slate-200 bg-white text-slate-600"
            )}
          >
            {f.dot && <span className={clsx("h-2 w-2 rounded-full", filtro === f.key ? "bg-white" : f.dot)} />}
            {f.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 text-xs text-slate-500">
        <span>Ordenar:</span>
        <button
          onClick={() => setOrdem("saldo")}
          className={clsx("rounded-md px-2 py-1 font-medium", ordem === "saldo" ? "bg-brand-50 text-brand-600" : "text-slate-500")}
        >
          Maior saldo
        </button>
        <button
          onClick={() => setOrdem("nome")}
          className={clsx("rounded-md px-2 py-1 font-medium", ordem === "nome" ? "bg-brand-50 text-brand-600" : "text-slate-500")}
        >
          Nome
        </button>
      </div>

      <div className="space-y-2.5">
        {lista.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-500">
            Nenhum cliente encontrado.
          </div>
        ) : (
          lista.map((c) => <ClienteCard key={c.id} cliente={c} />)
        )}
      </div>
    </div>
  );
}

export default function ClientesPage() {
  return (
    <HydrationGate>
      <ClientesInner />
    </HydrationGate>
  );
}
