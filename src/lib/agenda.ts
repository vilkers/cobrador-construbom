import type { Cliente } from "./types";
import { DIAS_SEMANA } from "./format";

export type Bucket = "hoje" | "semana" | "depois" | "sem_agenda";

export interface AgendaInfo {
  /** dias até a próxima cobrança (0 = hoje). 999 = sem agenda automática */
  diasAte: number;
  bucket: Bucket;
  /** rótulo amigável: "Hoje", "Sexta (em 2 dias)", "Sob demanda" */
  label: string;
}

function diaDoMes(d: Date): number {
  return d.getDate();
}

/** Próxima ocorrência de um dia do mês a partir de hoje (inclui hoje). */
function diasAteDiaDoMes(hoje: Date, diaMes: number): number {
  const ano = hoje.getFullYear();
  const mes = hoje.getMonth();
  let alvo = new Date(ano, mes, Math.min(diaMes, diasNoMes(ano, mes)));
  if (alvo < zerar(hoje)) {
    const proxMes = mes + 1;
    alvo = new Date(ano, proxMes, Math.min(diaMes, diasNoMes(ano, proxMes)));
  }
  return Math.round((zerar(alvo).getTime() - zerar(hoje).getTime()) / 86400000);
}

function diasNoMes(ano: number, mes: number): number {
  return new Date(ano, mes + 1, 0).getDate();
}

function zerar(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

export function agendaCliente(cliente: Cliente, hojeIso: string): AgendaInfo {
  const hoje = new Date(hojeIso + "T00:00:00");
  const pref = cliente.preferencia;

  let diasAte = 999;

  if (
    (pref.frequencia === "semanal" || pref.frequencia === "quinzenal") &&
    pref.diaSemana !== undefined
  ) {
    const hojeWeekday = hoje.getDay();
    diasAte = (pref.diaSemana - hojeWeekday + 7) % 7;
  } else if (pref.frequencia === "mensal" && pref.diaMes !== undefined) {
    diasAte = diasAteDiaDoMes(hoje, pref.diaMes);
  } else {
    diasAte = 999;
  }

  let bucket: Bucket;
  let label: string;

  if (diasAte === 999) {
    bucket = "sem_agenda";
    label = "Sob demanda";
  } else if (diasAte === 0) {
    bucket = "hoje";
    label = "Hoje";
  } else if (diasAte <= 6) {
    bucket = "semana";
    const dataAlvo = new Date(hoje);
    dataAlvo.setDate(dataAlvo.getDate() + diasAte);
    const nomeDia = DIAS_SEMANA[dataAlvo.getDay()];
    label = `${nomeDia} (em ${diasAte} dia${diasAte > 1 ? "s" : ""})`;
  } else {
    bucket = "depois";
    label = `Em ${diasAte} dias`;
  }

  return { diasAte, bucket, label };
}
