# Cobrança Construbom — Documento de Produto

> Codinome: `cobrador-construbom` · Versão 1.0 (MVP)

Assistente de cobranças para a dona de uma loja de materiais de construção (associada à Rede Construbom, ES) administrar dívidas e cobranças de clientes pessoa física.

---

## 1. Visão e Problema

**Visão:** dar à dona da loja um **auxiliar de cobrança** + **visibilidade de todo o universo financeiro da loja** — quem deve, quanto deve, quem cobrar hoje e como falar com cada cliente.

**Problema:** hoje a cobrança é feita "na cabeça" e em papéis soltos. A gestora não tem uma visão única de quem está devendo, de quanto é o total a receber, nem de quem precisa ser cobrado no dia. Cada cliente paga de um jeito e responde melhor a um tom diferente, mas não existe nenhum lugar que organize isso. A cobrança via WhatsApp dá trabalho: é preciso lembrar o nome, o valor, montar a mensagem do zero e ainda achar o tom certo para não perder o cliente.

O app resolve isso reunindo, em um só lugar:

- O cadastro de cada cliente em uma **ficha** com tudo que importa para cobrar.
- O histórico de **compras** e o **saldo devedor** de cada um.
- Uma **agenda** do que cobrar hoje/na semana.
- Um **gerador de mensagem de cobrança** pronta para copiar e mandar no WhatsApp.
- Um **dashboard** com a saúde financeira da loja.

---

## 2. Persona — A Cobradora

**Quem é:** dona/gestora da loja de materiais de construção. Não é técnica. Faz a maior parte da cobrança pelo **celular**, principalmente via **WhatsApp**.

**Objetivos:**

- Saber rapidamente **quem precisa cobrar hoje**.
- Cobrar **sem retrabalho**: poucos toques, mensagem já pronta.
- Não perder cliente cobrando de forma errada (tom firme demais com bom pagador, ou mole demais com enrolão).
- Enxergar **quanto tem a receber** e **quanto está atrasado**.

**Dores atuais:**

| Dor | Impacto |
|-----|---------|
| Controle na cabeça / em papel | Esquece cobranças, perde dinheiro |
| Montar mensagem do zero toda vez | Demora, desânimo, cobra menos |
| Não saber o tom certo para cada cliente | Atrito, perda de cliente |
| Falta de visão do total a receber/atrasado | Decisões no escuro |
| Não saber quem é bom ou mau pagador | Vende fiado para quem não devia |

---

## 3. Conceito Central — A Ficha do Cliente

A unidade central do app é a **FICHA** de cada cliente. Cada ficha tem **personalização total de cobrança**, porque cada cliente paga e responde de um jeito.

A ficha guarda:

- **Identidade:** código, nome, telefone/WhatsApp, data de cadastro (abertura da ficha).
- **Classificação por cor (semáforo):** verde / amarelo / vermelho (e cinza para quitado/inativo).
- **Preferências de cobrança:** dia de cobrar, frequência, canal preferido, tom, melhor horário, observações.
- **Compras:** lista de compras com valores, vencimentos e status, formando o **saldo devedor**.

A ficha é o que torna possível a função-chave: **gerar uma mensagem de cobrança** já no tom certo, com os dados certos da dívida, pronta para o WhatsApp.

---

## 4. Funcionalidades

### 4.1. Versão 1.0 (MVP — entra agora)

- Cadastro e edição de **fichas de clientes** com personalização total de cobrança.
- Registro de **compras** por cliente (descrição, datas, valores, status).
- Cálculo automático de **saldo devedor** por cliente e total.
- **Classificação por cor** (semáforo) com sugestão automática do sistema.
- **Dashboard**: total a receber, total atrasado, clientes por cor, agenda do dia/semana.
- **Lista de fichas** com busca e filtro por cor/status.
- **Agenda de cobranças** do dia e da semana.
- **Gerar mensagem de cobrança** pronta, conforme o tom, para copiar e enviar (link `wa.me`).
- **20 clientes de teste (seed)** já carregados.
- Dados persistidos no **navegador (localStorage)** — sem banco de dados.

### 4.2. Futuras (não entram na 1.0)

- Banco de dados real e login multiusuário (dados compartilhados entre dispositivos).
- Histórico de contatos/cobranças realizadas.
- Lembretes automáticos e integração com a WhatsApp API.
- Registro de pagamentos e baixa de parcelas.
- Relatórios e exportação.
- IA para sugerir tom/abordagem por perfil e previsão de inadimplência.

---

## 5. Modelo de Dados

### 5.1. Entidade `Cliente` (a Ficha)

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | string | Identificador interno único |
| `codigo` | string | Código de identificação do cliente |
| `nome` | string | Nome do cliente |
| `telefone` | string | Telefone/WhatsApp (usado no link `wa.me`) |
| `dataCadastro` | data | Data de abertura da ficha |
| `cor` | enum | Classificação semáforo: `verde` \| `amarelo` \| `vermelho` \| `cinza` |
| `diaCobranca` | número/string | Dia preferido para cobrar |
| `frequencia` | enum | `semanal` \| `quinzenal` \| `mensal` \| `personalizada` |
| `canalPreferido` | enum | `whatsapp` \| `ligacao` \| `presencial` |
| `tom` | enum | `amigavel` \| `neutro` \| `firme` |
| `melhorHorario` | string | Melhor horário para abordar |
| `observacoes` | string | Anotações livres |
| `compras` | Compra[] | Lista de compras do cliente |

### 5.2. Entidade `Compra`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | string | Identificador único da compra |
| `clienteId` | string | Ficha à qual pertence |
| `descricao` | string | Itens (cimento, tijolo, tinta, areia, ferro, telha, argamassa etc.) |
| `dataCompra` | data | Data da compra |
| `valorTotal` | número | Valor total da compra |
| `valorPago` | número | Valor já pago |
| `vencimento` | data | Data de vencimento |
| `status` | enum | `em_aberto` \| `pago` \| `atrasado` |

**Saldo devedor do cliente** = `soma(valorTotal − valorPago)` de todas as compras não quitadas.

---

## 6. Regras de Classificação por Cor (Semáforo)

A cor resume, num relance, o risco do cliente:

| Cor | Significado | Hex |
|-----|-------------|-----|
| 🟢 Verde | Bom pagador — paga em dia | `#16A34A` |
| 🟡 Amarelo | Atenção — às vezes atrasa | `#F59E0B` |
| 🔴 Vermelho | Enrolão / inadimplente | `#DC2626` |
| ⚪ Cinza | Quitado / inativo | `#6B7280` |

**Como o sistema sugere a cor** (a gestora sempre pode sobrescrever manualmente):

- **Verde:** nenhuma compra atrasada; histórico de pagamento em dia.
- **Amarelo:** pelo menos uma compra vencida há poucos dias, ou histórico de atrasos curtos e recorrentes.
- **Vermelho:** compra(s) atrasada(s) há muito tempo e/ou saldo devedor alto em aberto.
- **Cinza:** sem saldo devedor (tudo quitado) ou ficha marcada como inativa.

A sugestão é um **apoio**, não uma regra rígida: a cobradora conhece os clientes e pode ajustar a cor a qualquer momento.

---

## 7. Casos de Uso (Histórias de Usuário)

- **Ver quem cobrar hoje:** _Como cobradora, quero abrir o app e ver na agenda quem deve ser cobrado hoje, para não esquecer ninguém._
- **Gerar mensagem de cobrança:** _Como cobradora, quero gerar uma mensagem pronta no tom do cliente com os dados da dívida, para copiar e mandar no WhatsApp em poucos toques._
- **Ver a saúde financeira:** _Como cobradora, quero ver no dashboard o total a receber e o total atrasado, para saber como está a loja._
- **Cadastrar um cliente:** _Como cobradora, quero abrir uma ficha com nome, contato e preferências de cobrança, para personalizar como cobro essa pessoa._
- **Registrar uma compra fiado:** _Como cobradora, quero lançar uma compra com valor e vencimento, para que entre no saldo devedor e na agenda de cobrança._
- **Identificar maus pagadores:** _Como cobradora, quero filtrar clientes por cor, para focar nos vermelhos e ter cuidado ao vender fiado para eles._
- **Personalizar a abordagem:** _Como cobradora, quero definir tom, canal e melhor horário de cada cliente, para cobrar do jeito que funciona com cada um._
- **Consultar o histórico de um cliente:** _Como cobradora, quero abrir a ficha e ver todas as compras e o saldo, para saber exatamente quanto cobrar._
