import type { Classificacao, Frequencia, Canal, Tom } from "./types";

export function formatBRL(valor: number): string {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

/** Recebe ISO (YYYY-MM-DD) e devolve dd/mm/aaaa sem problema de fuso. */
export function formatData(iso: string): string {
  if (!iso) return "";
  const [ano, mes, dia] = iso.split("-");
  return `${dia}/${mes}/${ano}`;
}

/** Diferença em dias entre hoje e uma data ISO (positivo = no passado/atrasado). */
export function diasAtraso(vencimentoIso: string, hojeIso?: string): number {
  const hoje = hojeIso ? new Date(hojeIso + "T00:00:00") : new Date();
  hoje.setHours(0, 0, 0, 0);
  const venc = new Date(vencimentoIso + "T00:00:00");
  const ms = hoje.getTime() - venc.getTime();
  return Math.round(ms / (1000 * 60 * 60 * 24));
}

export const DIAS_SEMANA = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];

export const labelClassificacao: Record<Classificacao, string> = {
  verde: "Bom pagador",
  amarelo: "Atenção",
  vermelho: "Inadimplente",
  cinza: "Quitado / Inativo",
};

export const corClassificacao: Record<Classificacao, string> = {
  verde: "#16A34A",
  amarelo: "#F59E0B",
  vermelho: "#DC2626",
  cinza: "#6B7280",
};

export const labelFrequencia: Record<Frequencia, string> = {
  semanal: "Semanal",
  quinzenal: "Quinzenal",
  mensal: "Mensal",
  personalizada: "Personalizada",
};

export const labelCanal: Record<Canal, string> = {
  whatsapp: "WhatsApp",
  ligacao: "Ligação",
  presencial: "Presencial",
};

export const labelTom: Record<Tom, string> = {
  amigavel: "Amigável",
  lembrete: "Lembrete",
  firme: "Firme",
};

/** Saldo devedor de uma lista de compras. */
export function saldoDevedor(compras: { valorTotal: number; valorPago: number }[]): number {
  return compras.reduce((acc, c) => acc + (c.valorTotal - c.valorPago), 0);
}

/** Apenas dígitos do telefone, com DDI 55 para link wa.me */
export function telefoneWhatsApp(telefone: string): string {
  const digitos = telefone.replace(/\D/g, "");
  if (digitos.startsWith("55")) return digitos;
  return "55" + digitos;
}

export function formatTelefone(telefone: string): string {
  const d = telefone.replace(/\D/g, "");
  if (d.length === 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  if (d.length === 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return telefone;
}
