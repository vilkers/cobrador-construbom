# Cobrança Construbom — Roadmap

Evolução do produto em fases. A Fase 1 é o MVP já decidido (versão 1.0); as fases seguintes descrevem a direção.

---

## Fase 1 — MVP (versão 1.0 atual)

Objetivo: colocar nas mãos da cobradora um auxiliar funcional, mesmo sem backend.

- **Seed local** com 20 clientes de teste já carregados.
- **Fichas de clientes** com personalização total de cobrança (dia, frequência, canal, tom, horário, observações).
- **Compras** por cliente com cálculo de **saldo devedor**.
- **Classificação por cor** (semáforo) com sugestão automática.
- **Dashboard**: total a receber, total atrasado, clientes por cor, agenda do dia/semana.
- **Lista de fichas** com busca e filtro.
- **Agenda de cobranças** do dia e da semana.
- **Gerar mensagem de cobrança** pronta para copiar/enviar via `wa.me`.
- Dados em **localStorage** (sem banco).

**Limitação conhecida:** dados ficam no navegador → cada dispositivo tem seus próprios dados. Resolvido na Fase 2.

---

## Fase 2 — Backend e Multiusuário

Objetivo: dados confiáveis e compartilhados entre aparelhos.

- **Banco de dados real** (PostgreSQL no Railway).
- **Login / multiusuário**, para que mais de uma pessoa use o mesmo conjunto de dados.
- **Dados compartilhados entre dispositivos** (celular e desktop veem o mesmo).
- Migração dos dados do `localStorage` para o banco.

---

## Fase 3 — Automação e Operação

Objetivo: tirar trabalho manual e registrar o que foi cobrado.

- **Lembretes automáticos** de cobranças no dia certo.
- **Histórico de contatos/cobranças** realizadas (quando e como foi cobrado cada cliente).
- **Integração com a WhatsApp API** (envio assistido/automático).
- **Registro de pagamentos** e baixa de parcelas.
- **Relatórios e exportação** (ex.: planilha de inadimplência, total recebido no mês).

---

## Fase 4 — Inteligência

Objetivo: ajudar a decidir, não só registrar.

- **IA para sugerir tom/abordagem** por perfil de cliente.
- **Previsão de inadimplência** com base no histórico.
- Recomendações de quando e como cobrar para maximizar recebimento.

---

## Tabela de Priorização

| Item | Fase | Impacto | Esforço | Prioridade |
|------|------|---------|---------|------------|
| Fichas + compras + saldo | 1 | Alto | Médio | Feita |
| Gerar mensagem de cobrança | 1 | Alto | Baixo | Feita |
| Dashboard + agenda | 1 | Alto | Médio | Feita |
| Banco de dados (Postgres) | 2 | Alto | Médio | Alta |
| Login / multiusuário | 2 | Alto | Médio | Alta |
| Registro de pagamentos | 3 | Alto | Médio | Alta |
| Histórico de cobranças | 3 | Médio | Médio | Média |
| Lembretes automáticos | 3 | Médio | Médio | Média |
| Integração WhatsApp API | 3 | Médio | Alto | Média |
| Relatórios / exportação | 3 | Médio | Médio | Média |
| IA de tom/abordagem | 4 | Médio | Alto | Baixa |
| Previsão de inadimplência | 4 | Médio | Alto | Baixa |
