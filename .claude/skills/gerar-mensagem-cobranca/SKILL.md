---
name: gerar-mensagem-cobranca
description: Gera uma mensagem de cobrança pronta para WhatsApp a partir dos dados de um cliente (nome, dívidas, vencimentos, tom). Use quando o usuário pedir para "escrever/gerar uma cobrança", "montar mensagem de cobrança" ou ajustar o tom (amigável, lembrete, firme) de uma cobrança.
---

# Gerar mensagem de cobrança

Monte uma mensagem curta, humana e dentro da lei (CDC) para cobrar um cliente.

## Entradas necessárias
- Nome do cliente (use só o primeiro nome no início).
- Lista de itens em aberto: descrição, vencimento, saldo (total − pago).
- Total em aberto.
- Tom desejado: `amigavel`, `lembrete` ou `firme` (padrão = preferência da ficha).
- Nome da loja (ver `src/lib/config.ts` → `LOJA`).

## Estrutura por tom

**Amigável (cliente verde):**
1. Saudação calorosa + identifica a loja.
2. "Passando pra lembrar do seu saldo..."
3. Lista de itens.
4. Total. Pedido leve ("quando puder dar um jeitinho").
5. Assinatura.

**Lembrete (cliente amarelo):**
1. Saudação cordial + loja.
2. "Lembrete do seu saldo em aberto:"
3. Lista + total.
4. Pedir confirmação de data de pagamento.

**Firme (cliente vermelho):**
1. Nome + loja, direto.
2. "Consta em aberto na sua ficha:" (com dias de atraso por item).
3. Total.
4. Pedir regularização + oferecer caminho (pix/parcelamento).
5. Pedir retorno.

## Regras
- Nunca exponha o devedor nem ameace (CDC art. 42/71).
- Confira o saldo real; não cobre item já pago.
- Respeite o melhor horário e o canal preferido da ficha.
- WhatsApp = texto curto; sem juridiquês para verde/amarelo.

## Implementação de referência
A lógica viva está em `src/lib/cobranca.ts` (`gerarMensagem`). Para mudanças no app, edite lá e mantenha os três tons coerentes. Para o link do WhatsApp use `telefoneWhatsApp()` de `src/lib/format.ts` e `https://wa.me/<numero>?text=<encoded>`.
