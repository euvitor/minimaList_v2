# MinimaList v2

Aplicação de tarefas desenvolvida com React, TypeScript e Supabase, com foco em autenticação, rotas protegidas e controle de acesso por usuário.

O projeto surgiu como estudo prático para entender o Supabase em um fluxo real, mantendo uma estrutura organizada e coerente mesmo em um escopo simples.

## Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Supabase (Auth + Postgres)

## Funcionalidades

- Cadastro e login com Supabase Auth
- Sessão persistida
- Dashboard com rota protegida
- CRUD de tarefas
- Tema claro/escuro
- Segurança com RLS no banco

## Decisões técnicas

- **Auth em contexto** para disponibilizar a sessão globalmente sem prop drilling
- **PrivateRoute com `loading`** para evitar redirecionamento incorreto durante a validação da sessão
- **Services isolados** para centralizar integração com Supabase
- **RLS** para garantir que cada usuário acesse apenas as próprias tarefas

## Estrutura

```txt
src/
├── components/
├── contexts/
├── hooks/
├── lib/
├── pages/
├── routes/
├── services/
├── types/
├── App.tsx
└── main.tsx
```

## Como rodar

### Pré-requisitos

- Node.js 18+
- npm

### Instalação

```bash
git clone https://github.com/euvitor/minimaList_v2.git
cd minimaList_v2
npm install
```

### Variáveis de ambiente

Crie um arquivo `.env.local` na raiz:

```env
VITE_SUPABASE_URL="https://xxxx.supabase.co"
VITE_SUPABASE_ANON_KEY="sua_anon_key"
```

> A `anon key` fica no frontend. A proteção dos dados é feita pelas políticas de RLS no Supabase.

### Desenvolvimento

```bash
npm run dev
```

### Build

```bash
npm run build
npm run preview
```

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run lint`

## Próximos passos

- Consolidar a autenticação na camada de `services`
- Adicionar datas, tags e anexos
- Explorar compartilhamento de tarefas entre usuários
- Avaliar uso de Supabase Realtime

## Status

Projeto desenvolvido como estudo prático com foco em autenticação, segurança e organização de código.
