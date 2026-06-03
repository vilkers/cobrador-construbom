import type { Cliente, Compra, Tom } from "./types";
import { formatBRL, formatData, diasAtraso, saldoDevedor } from "./format";
import { LOJA, HOJE_ISO } from "./config";

export function comprasEmAberto(cliente: Cliente): Compra[] {
  return cliente.compras.filter((c) => c.status !== "pago" && c.valorTotal - c.valorPago > 0.001);
}

function primeiroNome(nome: string): string {
  return nome.trim().split(/\s+/)[0];
}

function linhaCompra(c: Compra, comAtraso: boolean): string {
  const saldo = c.valorTotal - c.valorPago;
  const base = `• ${c.descricao} — venc. ${formatData(c.vencimento)}: ${formatBRL(saldo)}`;
  if (!comAtraso) return base;
  const dias = diasAtraso(c.vencimento, HOJE_ISO);
  if (dias > 0) return `${base} (${dias} dia${dias > 1 ? "s" : ""} em atraso)`;
  return base;
}

/** Monta a mensagem de cobrança conforme o tom escolhido. */
export function gerarMensagem(cliente: Cliente, tom?: Tom): string {
  const tomFinal = tom ?? cliente.preferencia.tom;
  const abertas = comprasEmAberto(cliente);
  const total = saldoDevedor(abertas);
  const nome = primeiroNome(cliente.nome);

  if (abertas.length === 0) {
    return `Oi ${nome}, tudo bem? Aqui é da ${LOJA.nome}. Passando só pra avisar que sua ficha está em dia, sem valores em aberto. Obrigado pela parceria! 🙏`;
  }

  const itensSimples = abertas.map((c) => linhaCompra(c, false)).join("\n");
  const itensComAtraso = abertas.map((c) => linhaCompra(c, true)).join("\n");
  const totalFmt = formatBRL(total);

  if (tomFinal === "amigavel") {
    return [
      `Oi ${nome}, tudo bem? 😊`,
      `Aqui é da ${LOJA.nome}.`,
      ``,
      `Passando pra lembrar do seu saldo aqui na loja:`,
      itensSimples,
      ``,
      `Total em aberto: ${totalFmt}.`,
      ``,
      `Quando puder dar um jeitinho a gente agradece! Qualquer dúvida é só chamar. 🙏`,
      `${LOJA.assinatura}`,
    ].join("\n");
  }

  if (tomFinal === "lembrete") {
    return [
      `Olá ${nome}, aqui é da ${LOJA.nome}.`,
      ``,
      `Lembrete do seu saldo em aberto:`,
      itensSimples,
      ``,
      `Total: ${totalFmt}.`,
      ``,
      `Consegue confirmar a melhor data pro pagamento? Obrigado!`,
      `${LOJA.assinatura}`,
    ].join("\n");
  }

  // firme
  const linhaPix = LOJA.pix ? `\nPix para pagamento: ${LOJA.pix}` : "";
  return [
    `${nome}, aqui é da ${LOJA.nome}.`,
    ``,
    `Consta em aberto na sua ficha:`,
    itensComAtraso,
    ``,
    `Total em aberto: ${totalFmt}.`,
    ``,
    `Pedimos a regularização o quanto antes para mantermos seu cadastro liberado.${linhaPix}`,
    `Aguardamos seu retorno. Obrigado.`,
    `${LOJA.assinatura}`,
  ].join("\n");
}
