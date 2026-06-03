# Cobrança Construbom 🧾

Assistente de cobranças para a loja de materiais de construção da sua sogra (associada à **Rede Construbom**). Cada cliente é uma **ficha** com a sua forma de cobrar (dia, frequência, canal, tom). O app dá **visibilidade do universo financeiro** da loja e **gera mensagens prontas** para mandar no WhatsApp.

> **Versão 1.0 (validação):** os dados ficam salvos **no próprio navegador** (sem banco). Já vem com **20 clientes de teste** para você experimentar antes de cadastrar os reais. A persistência em banco (multi-dispositivo) está prevista na Fase 2 — veja `docs/ROADMAP.md`.

## ✨ O que já dá pra fazer
- **Visão geral (dashboard):** total a receber, total em atraso, clientes por cor e cobranças do dia.
- **Fichas:** lista com busca e filtro pelo semáforo (🟢 bom pagador, 🟡 atenção, 🔴 inadimplente, ⚪ quitado).
- **Ficha do cliente:** dados, *como cobrar este cliente*, lista de compras/dívidas, registrar pagamento e **gerar mensagem de cobrança** (copiar ou abrir no WhatsApp).
- **Agenda:** quem cobrar hoje / esta semana, conforme a preferência de cada cliente.
- **Mensagens em 3 tons:** amigável, lembrete e firme.

## 🚀 Rodar na sua máquina
```bash
npm install
npm run dev
# abra http://localhost:3000
```

## ☁️ Publicar (Railway)
Passo a passo para leigos em [`docs/DEPLOY-RAILWAY.md`](docs/DEPLOY-RAILWAY.md). Resumo: conectar este repositório no Railway → ele detecta o Next.js sozinho → *Generate Domain* → pronto.

## 🧱 Stack
Next.js 14 (App Router) · TypeScript · Tailwind CSS · Zustand (persistência em `localStorage`).

## 📚 Documentação
- [`docs/PRODUTO.md`](docs/PRODUTO.md) — o que é, para quem, modelo de dados, casos de uso.
- [`docs/DESIGN.md`](docs/DESIGN.md) — identidade visual e usabilidade.
- [`docs/ROADMAP.md`](docs/ROADMAP.md) — fases e próximos passos.
- [`docs/DEPLOY-RAILWAY.md`](docs/DEPLOY-RAILWAY.md) — como publicar.

## 🤖 Agentes e skills (Claude Code)
Para evoluir o app com ajuda especializada:
- **Agentes:** `agente-cobranca`, `agente-admin`, `agente-design` (em `.claude/agents/`).
- **Skills:** `gerar-mensagem-cobranca`, `design-construbom` (em `.claude/skills/`).

## ⚙️ Configuração rápida
- Nome/assinatura da loja usados nas mensagens: `src/lib/config.ts`.
- Cores da marca: `tailwind.config.ts`.
- Base de teste (20 clientes): `src/lib/seed.ts`. Use o botão de reset no app ou limpe o `localStorage` para recarregar.
