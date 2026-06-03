---
name: design-construbom
description: Aplica a identidade visual e os padrões de usabilidade da Rede Construbom (azul + amarelo, mobile-first) ao criar ou ajustar telas e componentes do app. Use quando for mexer em UI, layout, cores, responsividade ou criar um novo componente/tela.
---

# Design Construbom (UI/UX)

Padrões para manter o app bonito, consistente e fácil de usar no celular.

## Paleta (tokens do Tailwind — ver `tailwind.config.ts`)
| Uso | Token | Hex |
|-----|-------|-----|
| Azul primário | `brand-500` | #0A4C9E |
| Azul escuro | `brand-700` | #07347A |
| Acento (ação) | `accent` | #F5B700 |
| Verde (bom pagador) | `verde` | #16A34A |
| Amarelo (atenção) | `amarelo` | #F59E0B |
| Vermelho (inadimplente) | `vermelho` | #DC2626 |
| Cinza (quitado/inativo) | `cinza` | #6B7280 |
| Fundo | — | #F8FAFC |

## Regras de uso
- **Mobile-first**: pense em 360px primeiro; alvos de toque ≥ 44px.
- **Ação principal** (gerar cobrança, salvar): botão `bg-accent text-brand-800` ou `bg-brand-500 text-white`.
- **Cartões**: `rounded-xl border border-slate-200 bg-white shadow-card`.
- **Status/cor**: sempre cor + texto + bolinha (nunca só cor). Use `StatusBadge`.
- **Dinheiro**: `font-bold tabular-nums`; vermelho quando em atraso.
- **Modais**: sobem de baixo no mobile (`fixed inset-0 flex items-end sm:items-center`).
- **Container**: `mx-auto max-w-5xl px-4`; espaçamento vertical `space-y-4/5`.
- **Navegação**: `Header` (desktop/topo) + `BottomNav` (abas no mobile).

## Componentes reutilizáveis (não recriar)
`Header`, `BottomNav`, `KpiCard`, `StatusBadge`, `ClienteCard`, `MensagemModal`, `HydrationGate`.

## Checklist ao terminar uma tela
- [ ] Funciona em 360px sem rolar na horizontal.
- [ ] Usa tokens de cor (sem hex solto, exceto o verde do WhatsApp #25D366).
- [ ] Botões com `aria-label` quando só ícone.
- [ ] Textos em PT-BR simples, sem jargão.
- [ ] Reaproveitou componentes existentes.
