# Deploy no Railway — Passo a Passo para Leigos

Este guia mostra como colocar o **Cobrança Construbom** no ar usando o **Railway**, sem precisar entender de servidores. É só seguir os passos na ordem.

---

## 1. Pré-requisitos

- **Conta no GitHub** — você já tem. O código está em `vilkers/cobrador-construbom`.
- **Conta no Railway** — criar de graça em https://railway.app (clique em **Login** e entre com sua conta do GitHub; é o jeito mais fácil).
- Nada para instalar no seu computador para colocar no ar. (Instalar algo só é preciso se quiser testar localmente — veja a seção 4.)

---

## 2. Colocar o app no ar (passo a passo)

1. Entre em https://railway.app e faça login com o **GitHub**.
2. Clique em **New Project** (Novo Projeto).
3. Escolha **Deploy from GitHub repo** (publicar a partir de um repositório do GitHub).
4. Na primeira vez, o Railway vai pedir permissão para acessar seus repositórios. Autorize e selecione o repositório **`cobrador-construbom`**.
5. **Selecione o branch** correto: `claude/cobracas-app-mvp-cbo7I` (ou o branch que você quer publicar).
6. O Railway detecta sozinho que é um app **Next.js** (ele usa o **Nixpacks**, que monta tudo automaticamente). Você **não precisa configurar build nem start** — ele já sabe rodar `next start`.
7. A variável **`PORT` é automática** — o Railway define a porta e o app usa ela sozinho. Não precisa criar nada.
8. Espere o **build** terminar. Você vê o progresso na aba **Deployments**; quando ficar verde/"Success", está pronto.
9. Para ter um link público: abra a aba **Settings** do serviço → seção **Networking** → clique em **Generate Domain** (Gerar Domínio).
10. O Railway cria um endereço tipo `https://cobrador-construbom-production.up.railway.app`. **Clique nele** para abrir o app no navegador.

Pronto. Esse link você pode abrir no celular e usar.

---

## 3. Atualizações automáticas

Toda vez que o código novo for enviado para o branch publicado, o Railway **refaz o deploy sozinho**. Você não precisa repetir os passos acima — só esperar o novo build ficar verde.

---

## 4. Como testar localmente antes (opcional)

Se quiser rodar no seu próprio computador antes de publicar:

1. Tenha o **Node.js** instalado (versão 18 ou superior) — https://nodejs.org.
2. Baixe o projeto (ou abra a pasta `cobrador-construbom`).
3. No terminal, dentro da pasta do projeto, instale as dependências:
   ```bash
   npm install
   ```
4. Rode em modo de desenvolvimento:
   ```bash
   npm run dev
   ```
5. Abra no navegador: **http://localhost:3000**.

Para testar do jeito que vai para produção:
```bash
npm run build
npm run start
```

---

## 5. Importante — Onde ficam os dados (versão 1.0)

Na versão 1.0, **os dados ficam salvos no próprio navegador** (localStorage). Isso significa:

- **Cada dispositivo tem seus próprios dados.** O que você cadastrar no celular **não** aparece no computador, e vice-versa.
- Limpar os dados do navegador apaga as fichas.
- Os 20 clientes de teste (seed) aparecem para começar.

Isso **muda na Fase 2**, quando entra o banco de dados (Postgres no Railway): aí os dados ficam num lugar só e são compartilhados entre todos os dispositivos.

---

## 6. Troubleshooting (problemas comuns)

| Problema | O que verificar |
|----------|-----------------|
| **Build falhou** | Abra a aba **Deployments** → clique no deploy com erro → leia o **log**. Geralmente é erro no código enviado. Tente novamente após corrigir e dar novo push. |
| **Página não abre / "Application failed to respond"** | Confira se você **gerou o domínio** (passo 9). Não mexa na porta manualmente — o `PORT` é automático. |
| **Branch errado no ar** | Em **Settings → Source**, confirme se o branch é `claude/cobracas-app-mvp-cbo7I`. |
| **Mudança não apareceu** | Veja se o novo deploy terminou (verde). Atualize a página com o cache limpo (Ctrl+Shift+R). |
| **`localhost:3000` não abre no teste local** | Confirme que `npm run dev` está rodando e sem erro no terminal; tente outra porta se a 3000 estiver ocupada. |
| **Dados sumiram** | Lembre que na 1.0 os dados são por navegador/dispositivo (veja seção 5). |

---

Dúvida? O painel do Railway mostra logs em tempo real na aba **Deployments → View Logs**, que ajudam a entender qualquer erro.
