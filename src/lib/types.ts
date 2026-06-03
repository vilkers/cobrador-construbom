// Tipos centrais do Cobrança Construbom

/** Classificação por cor (semáforo de cobrança) */
export type Classificacao = "verde" | "amarelo" | "vermelho" | "cinza";

/** Frequência de cobrança preferida para o cliente */
export type Frequencia = "semanal" | "quinzenal" | "mensal" | "personalizada";

/** Canal preferido de contato */
export type Canal = "whatsapp" | "ligacao" | "presencial";

/** Tom da mensagem de cobrança */
export type Tom = "amigavel" | "lembrete" | "firme";

/** Status de uma compra */
export type StatusCompra = "em_aberto" | "pago" | "atrasado";

export interface Compra {
  id: string;
  descricao: string;
  /** ISO date (YYYY-MM-DD) */
  dataCompra: string;
  /** ISO date (YYYY-MM-DD) */
  vencimento: string;
  valorTotal: number;
  valorPago: number;
  status: StatusCompra;
}

export interface PreferenciaCobranca {
  frequencia: Frequencia;
  /** 0=Dom ... 6=Sáb (para frequências semanais/quinzenais) */
  diaSemana?: number;
  /** Dia do mês (1-31) para frequência mensal */
  diaMes?: number;
  canal: Canal;
  tom: Tom;
  /** Ex: "manhã", "após 18h" */
  melhorHorario?: string;
}

export interface Cliente {
  id: string;
  /** Código de identificação da ficha */
  codigo: string;
  nome: string;
  /** Telefone com DDD, somente dígitos preferencialmente */
  telefone: string;
  classificacao: Classificacao;
  endereco?: string;
  /** ISO date (YYYY-MM-DD) — abertura da ficha */
  dataCadastro: string;
  observacoes?: string;
  preferencia: PreferenciaCobranca;
  compras: Compra[];
}
