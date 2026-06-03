# Cobrança Construbom — Design System e Usabilidade

> Identidade visual alinhada à **Rede Construbom** (azul + amarelo).

---

## 1. Princípios de UX

1. **Mobile-first.** A cobradora vive no celular. Tudo é pensado primeiro para a tela pequena e depois adaptado ao desktop.
2. **Poucos cliques para cobrar.** O caminho "ver quem cobrar → abrir ficha → gerar mensagem → copiar/abrir WhatsApp" deve ser o mais curto possível.
3. **Clareza para usuária não-técnica.** Linguagem simples, sem jargão. Botões com rótulos claros ("Gerar mensagem", "Copiar", "Abrir no WhatsApp").
4. **Informação no relance.** Cores de semáforo, totais grandes e badges fazem a leitura ser instantânea.
5. **Sem surpresas.** Ações destrutivas pedem confirmação; o estado (em aberto/pago/atrasado) é sempre visível.
6. **Tolerante a erro.** Campos com valores padrão sensatos; nada obriga preenchimento técnico.

---

## 2. Paleta de Cores

### 2.1. Marca (Construbom)

| Token | Hex | Uso |
|-------|-----|-----|
| Azul primário | `#0A4C9E` | Cor principal: cabeçalho, botões primários, links, destaques |
| Azul escuro | `#07347A` | Estados hover/ativo, gradientes, textos sobre amarelo |
| Amarelo/acento | `#F5B700` | Acento, botão de ação secundária, faixas de destaque |

### 2.2. Status — Semáforo

| Token | Hex | Uso |
|-------|-----|-----|
| Verde | `#16A34A` | Bom pagador / em dia |
| Amarelo | `#F59E0B` | Atenção / às vezes atrasa |
| Vermelho | `#DC2626` | Inadimplente / atrasado |
| Cinza | `#6B7280` | Quitado / inativo |

### 2.3. Neutros

| Token | Hex | Uso |
|-------|-----|-----|
| Fundo | `#F8FAFC` | Fundo geral das telas |
| Cartão | `#FFFFFF` | Superfície de cards, modais, listas |
| Texto | `#0F172A` | Texto principal |

> Observação: o amarelo de marca (`#F5B700`) e o amarelo de status (`#F59E0B`) são propositalmente distintos — um é identidade, o outro é alerta.

---

## 3. Tipografia

- **Família:** fonte sans-serif do sistema / Inter (legível em qualquer aparelho).
- **Escala (mobile):**

| Papel | Tamanho | Peso |
|-------|---------|------|
| Número de destaque (totais) | 28–32px | 700 |
| Título de tela | 20–24px | 700 |
| Título de card / nome | 16–18px | 600 |
| Corpo | 14–16px | 400/500 |
| Apoio / legenda | 12–13px | 400 |

- **Regra:** corpo nunca abaixo de 14px no celular; números financeiros sempre em destaque.

---

## 4. Espaçamentos e Layout

- **Grid base de 4px** (4 / 8 / 12 / 16 / 24 / 32).
- **Padding de card:** 16px; **gap entre cards:** 12px.
- **Margem lateral da tela (mobile):** 16px.
- **Cantos arredondados:** 12px em cards, 8px em botões/badges.
- **Sombra:** leve nos cards (`shadow-sm`) para separar do fundo `#F8FAFC`.

---

## 5. Componentes

### 5.1. Card de Ficha (cliente)

Mostra de relance: faixa/ponto na **cor do semáforo**, nome, código, **saldo devedor** em destaque, badge de status e atalho de cobrança. Toque no card abre a ficha completa.

### 5.2. Badges de Status

Pílula colorida com a cor do semáforo (verde/amarelo/vermelho/cinza) e o status da compra (em aberto/pago/atrasado). Texto curto, alto contraste.

### 5.3. Botões

- **Primário:** fundo azul `#0A4C9E`, texto branco. Ação principal (Salvar, Gerar mensagem).
- **Acento:** fundo amarelo `#F5B700`, texto azul escuro `#07347A`. Ação de destaque secundária.
- **Secundário/contorno:** borda azul, fundo branco.
- **WhatsApp:** verde, com ícone, abre `wa.me`.
- Altura mínima de **44px** para toque confortável.

### 5.4. Modal de Mensagem de Cobrança

- Mostra a **mensagem montada** conforme o tom e os dados da dívida, em campo de texto.
- Botões: **Copiar** (copia para a área de transferência) e **Abrir no WhatsApp** (link `wa.me` com a mensagem).
- Permite ajustar o texto antes de enviar.

---

## 6. Telas Principais

| Tela | O que mostra |
|------|--------------|
| **Dashboard** | Total a receber, total atrasado, contagem de clientes por cor, resumo da agenda do dia/semana. Visão da saúde da loja. |
| **Lista de Fichas** | Todos os clientes em cards, com busca e filtro por cor/status; saldo devedor visível em cada um. |
| **Ficha do Cliente** | Dados, preferências de cobrança, lista de compras, saldo devedor e botão de **gerar mensagem**. |
| **Agenda** | Cobranças do dia e da semana, organizadas pelo dia/frequência de cada ficha; atalho direto para cobrar. |

---

## 7. Acessibilidade e Legibilidade

- **Contraste:** combinações de texto/fundo seguem o mínimo WCAG AA (4.5:1 para texto normal). Texto branco sobre azul `#0A4C9E` e texto azul escuro `#07347A` sobre amarelo `#F5B700` garantem leitura confortável.
- **Toque:** alvos de toque com **mínimo de 44×44px** e espaçamento entre eles para evitar erro no celular.
- **Cor não é o único sinal:** além da cor do semáforo, sempre há rótulo em texto (ex.: badge "Atrasado") para quem tem baixa visão ou daltonismo.
- **Tamanhos:** texto base nunca menor que 14px no celular; números financeiros ampliados.
- **Foco visível:** estados de foco e toque claramente destacados para navegação por teclado e leitores de tela.
