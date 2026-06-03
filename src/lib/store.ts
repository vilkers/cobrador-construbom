"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Cliente, Classificacao, Compra } from "./types";
import { SEED_CLIENTES } from "./seed";

interface State {
  clientes: Cliente[];
  hydrated: boolean;
  setHydrated: () => void;

  getCliente: (id: string) => Cliente | undefined;
  setClassificacao: (clienteId: string, classificacao: Classificacao) => void;
  registrarPagamento: (clienteId: string, compraId: string, valor: number) => void;
  updateCliente: (clienteId: string, patch: Partial<Cliente>) => void;
  addCompra: (clienteId: string, compra: Compra) => void;
  resetSeed: () => void;
}

function recalcStatus(compra: Compra, hojeIso: string): Compra["status"] {
  const saldo = compra.valorTotal - compra.valorPago;
  if (saldo <= 0.001) return "pago";
  const hoje = new Date(hojeIso + "T00:00:00");
  const venc = new Date(compra.vencimento + "T00:00:00");
  return venc < hoje ? "atrasado" : "em_aberto";
}

import { HOJE_ISO } from "./config";

export const useStore = create<State>()(
  persist(
    (set, get) => ({
      clientes: SEED_CLIENTES,
      hydrated: false,
      setHydrated: () => set({ hydrated: true }),

      getCliente: (id) => get().clientes.find((c) => c.id === id),

      setClassificacao: (clienteId, classificacao) =>
        set((s) => ({
          clientes: s.clientes.map((c) =>
            c.id === clienteId ? { ...c, classificacao } : c
          ),
        })),

      registrarPagamento: (clienteId, compraId, valor) =>
        set((s) => ({
          clientes: s.clientes.map((c) => {
            if (c.id !== clienteId) return c;
            return {
              ...c,
              compras: c.compras.map((comp) => {
                if (comp.id !== compraId) return comp;
                const novoPago = Math.min(comp.valorTotal, comp.valorPago + valor);
                const atualizada = { ...comp, valorPago: novoPago };
                return { ...atualizada, status: recalcStatus(atualizada, HOJE_ISO) };
              }),
            };
          }),
        })),

      updateCliente: (clienteId, patch) =>
        set((s) => ({
          clientes: s.clientes.map((c) =>
            c.id === clienteId ? { ...c, ...patch } : c
          ),
        })),

      addCompra: (clienteId, compra) =>
        set((s) => ({
          clientes: s.clientes.map((c) =>
            c.id === clienteId ? { ...c, compras: [...c.compras, compra] } : c
          ),
        })),

      resetSeed: () => set({ clientes: SEED_CLIENTES }),
    }),
    {
      name: "cobranca-construbom-v1",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);
