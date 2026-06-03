"use client";

import { useState } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { HydrationGate } from "@/components/HydrationGate";
import { StatusBadge } from "@/components/StatusBadge";
import { MensagemModal } from "@/components/MensagemModal";
import { comprasEmAberto } from "@/lib/cobranca";
import { agendaCliente } from "@/lib/agenda";
import {
  formatBRL,
  formatData,
  formatTelefone,
  saldoDevedor,
  diasAtraso,
  labelFrequencia,
  labelCanal,
  labelTom,
  labelClassificacao,
  DIAS_SEMANA,
} from "@/lib/format";
import { HOJE_ISO } from "@/lib/config";
import type { Classificacao, Compra } from "@/lib/types";
import {
  ArrowLeft,
  MessageSquareText,
  Phone,
  MapPin,
  CalendarClock,
  Clock,
  StickyNote,
  CircleDollarSign,
} from "lucide-react";
import clsx from "clsx";

const cores: Classificacao[] = ["verde", "amarelo", "vermelho", "cinza"];
const corBg: Record<Classificacao, string> = {
  verde: "bg-verde",
  amarelo: "bg-amarelo",
  vermelho: "bg-vermelho",
  cinza: "bg-cinza",
};

function FichaInner({ id }: { id: string }) {
  const cliente = useStore((s) => s.clientes.find((c) => c.id === id));
  const setClassificacao = useStore((s) => s.setClassificacao);
  const registrarPagamento = useStore((s) => s.registrarPagamento);

  const [showMsg, setShowMsg] = useState(false);
  const [pagando, setPagando] = useState<Compra | null>(null);
  const [valorPag, setValorPag] = useState("");

  if (!cliente) {
    return (
      <div className="py-10 text-center">
        <p className="text-slate-500">Cliente não encontrado.</p>
        <Link href="/clientes" className="mt-2 inline-block text-brand-500">
          Voltar para fichas
        </Link>
      </div>
    );
  }

  const abertas = comprasEmAberto(cliente);
  const saldo = saldoDevedor(abertas);
  const pref = cliente.preferencia;
  const ag = agendaCliente(cliente, HOJE_ISO);

  const diaPrefLabel =
    pref.frequencia === "mensal" && pref.diaMes
      ? `dia ${pref.diaMes}`
      : pref.diaSemana !== undefined
        ? DIAS_SEMANA[pref.diaSemana]
        : "—";

  const confirmarPagamento = () => {
    if (!pagando) return;
    const v = parseFloat(valorPag.replace(",", "."));
    if (!isNaN(v) && v > 0) {
      registrarPagamento(cliente.id, pagando.id, v);
    }
    setPagando(null);
    setValorPag("");
  };

  return (
    <div className="space-y-4">
      <Link href="/clientes" className="inline-flex items-center gap-1 text-sm text-slate-500">
        <ArrowLeft className="h-4 w-4" /> Fichas
      </Link>

      {/* Cabeçalho */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-card">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-lg font-bold leading-tight text-slate-900">{cliente.nome}</h1>
            <div className="mt-0.5 text-xs text-slate-500">
              Ficha #{cliente.codigo} • aberta em {formatData(cliente.dataCadastro)}
            </div>
            <div className="mt-2">
              <StatusBadge classificacao={cliente.classificacao} />
            </div>
          </div>
        </div>

        {/* Trocar classificação */}
        <div className="mt-3 border-t border-slate-100 pt-3">
          <div className="mb-1.5 text-xs font-medium text-slate-500">Classificar cliente</div>
          <div className="flex flex-wrap gap-2">
            {cores.map((cor) => (
              <button
                key={cor}
                onClick={() => setClassificacao(cliente.id, cor)}
                className={clsx(
                  "flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition",
                  cliente.classificacao === cor
                    ? "border-slate-800 bg-slate-800 text-white"
                    : "border-slate-200 bg-white text-slate-600"
                )}
              >
                <span className={clsx("h-2 w-2 rounded-full", corBg[cor])} />
                {labelClassificacao[cor]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Saldo + ação principal */}
      <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-brand-500 to-brand-700 p-4 text-white shadow-card">
        <div className="text-xs font-medium text-brand-100">Saldo em aberto</div>
        <div className="mt-0.5 text-3xl font-bold tabular-nums">{formatBRL(saldo)}</div>
        <div className="mt-1 text-xs text-brand-100">
          {abertas.length} compra(s) • próxima cobrança: {ag.label}
        </div>
        <button
          onClick={() => setShowMsg(true)}
          disabled={saldo <= 0}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-bold text-brand-800 transition hover:brightness-95 disabled:opacity-50"
        >
          <MessageSquareText className="h-4 w-4" />
          Gerar mensagem de cobrança
        </button>
      </div>

      {/* Preferências de cobrança */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-card">
        <div className="mb-3 text-sm font-semibold text-slate-900">Como cobrar este cliente</div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <Info icon={<CalendarClock className="h-4 w-4" />} label="Frequência" valor={labelFrequencia[pref.frequencia]} />
          <Info icon={<CalendarClock className="h-4 w-4" />} label="Dia de cobrar" valor={diaPrefLabel} />
          <Info icon={<MessageSquareText className="h-4 w-4" />} label="Canal" valor={labelCanal[pref.canal]} />
          <Info icon={<CircleDollarSign className="h-4 w-4" />} label="Tom" valor={labelTom[pref.tom]} />
          <Info icon={<Clock className="h-4 w-4" />} label="Melhor horário" valor={pref.melhorHorario || "—"} />
          <Info icon={<Phone className="h-4 w-4" />} label="Telefone" valor={formatTelefone(cliente.telefone)} />
        </div>
        {cliente.endereco && (
          <div className="mt-3 flex items-start gap-2 border-t border-slate-100 pt-3 text-sm text-slate-600">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
            <span>{cliente.endereco}</span>
          </div>
        )}
        {cliente.observacoes && (
          <div className="mt-2 flex items-start gap-2 text-sm text-slate-600">
            <StickyNote className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
            <span className="italic">{cliente.observacoes}</span>
          </div>
        )}
      </div>

      {/* Compras */}
      <div>
        <h2 className="mb-2 text-sm font-semibold text-slate-900">Compras / dívidas</h2>
        <div className="space-y-2.5">
          {cliente.compras.map((compra) => {
            const saldoC = compra.valorTotal - compra.valorPago;
            const dias = diasAtraso(compra.vencimento, HOJE_ISO);
            return (
              <div key={compra.id} className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-card">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="font-medium text-slate-900">{compra.descricao}</div>
                    <div className="mt-0.5 text-xs text-slate-500">
                      Compra {formatData(compra.dataCompra)} • venc. {formatData(compra.vencimento)}
                    </div>
                  </div>
                  <CompraStatus status={compra.status} dias={dias} />
                </div>

                <div className="mt-2 flex items-end justify-between">
                  <div className="text-xs text-slate-500">
                    Total {formatBRL(compra.valorTotal)} • Pago {formatBRL(compra.valorPago)}
                  </div>
                  <div className="text-right">
                    <div
                      className={clsx(
                        "text-base font-bold tabular-nums",
                        saldoC > 0 ? "text-slate-900" : "text-verde"
                      )}
                    >
                      {formatBRL(saldoC)}
                    </div>
                  </div>
                </div>

                {saldoC > 0 && (
                  <button
                    onClick={() => {
                      setPagando(compra);
                      setValorPag(String(saldoC));
                    }}
                    className="mt-2 w-full rounded-lg border border-slate-200 py-2 text-xs font-semibold text-brand-600 transition hover:bg-brand-50"
                  >
                    Registrar pagamento
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {showMsg && (
        <MensagemModal cliente={cliente} open={showMsg} onClose={() => setShowMsg(false)} />
      )}

      {/* Modal de pagamento */}
      {pagando && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4">
          <div className="w-full max-w-sm rounded-t-2xl bg-white p-4 shadow-xl sm:rounded-2xl">
            <h3 className="font-semibold text-slate-900">Registrar pagamento</h3>
            <p className="mt-0.5 text-xs text-slate-500">{pagando.descricao}</p>
            <label className="mt-3 block text-xs font-medium text-slate-600">Valor recebido (R$)</label>
            <input
              type="number"
              inputMode="decimal"
              value={valorPag}
              onChange={(e) => setValorPag(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
              autoFocus
            />
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => {
                  setPagando(null);
                  setValorPag("");
                }}
                className="flex-1 rounded-xl border border-slate-300 py-2.5 text-sm font-semibold text-slate-600"
              >
                Cancelar
              </button>
              <button
                onClick={confirmarPagamento}
                className="flex-1 rounded-xl bg-brand-500 py-2.5 text-sm font-semibold text-white"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Info({ icon, label, valor }: { icon: React.ReactNode; label: string; valor: string }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-xs text-slate-500">
        <span className="text-slate-400">{icon}</span>
        {label}
      </div>
      <div className="mt-0.5 font-medium text-slate-800">{valor}</div>
    </div>
  );
}

function CompraStatus({ status, dias }: { status: Compra["status"]; dias: number }) {
  if (status === "pago") {
    return <span className="shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">Pago</span>;
  }
  if (status === "atrasado") {
    return (
      <span className="shrink-0 rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
        {dias > 0 ? `${dias}d atraso` : "Atrasado"}
      </span>
    );
  }
  return <span className="shrink-0 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">Em aberto</span>;
}

export default function FichaPage({ params }: { params: { id: string } }) {
  return (
    <HydrationGate>
      <FichaInner id={params.id} />
    </HydrationGate>
  );
}
