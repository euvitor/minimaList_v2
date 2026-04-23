## MinimaList v2

App minimalista de tarefas (to-do) com autenticação via Supabase, tema claro/escuro e rotas protegidas.

## Stack

- React + Vite
- Tailwind CSS
- React Router
- Supabase (Auth + Postgres)

## Requisitos

- Node.js (recomendado: 18+)
- npm

## Como rodar (dev)

1) Instale dependências:

```bash
npm install
```

2) Configure as variáveis de ambiente:

- Copie `.env.example` para `.env.local`
- Preencha com seus valores do Supabase

3) Rode o projeto:

```bash
npm run dev
```

## Build / Preview

```bash
npm run build
npm run preview
```

## Variáveis de ambiente (Supabase)

Este projeto usa variáveis do Vite (prefixo `VITE_`):

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Crie um arquivo `.env.local` na raiz:

```env
VITE_SUPABASE_URL="https://xxxx.supabase.co"
VITE_SUPABASE_ANON_KEY="sua_anon_key"
```

> A **anon key** vai para o bundle do frontend mesmo. A segurança deve ser feita com **RLS** no Supabase.

## Visão geral da arquitetura

- **Entrada**: `src/main.tsx` monta o React e registra providers globais.
- **Rotas**: `src/App.tsx` define rotas públicas e privadas.
- **Auth**:
  - `src/contexts/AuthContext.tsx` hidrata sessão inicial (`getSession`) e mantém sync com `onAuthStateChange`.
  - `src/routes/PrivateRoute.tsx` protege o `/dashboard` e espera o estado de auth resolver (evita “piscar”).
- **Tema**: `src/hooks/useTheme.ts` alterna a classe `dark` no `<html>` e persiste preferência no `localStorage`.
- **Acesso a dados**:
  - `src/services/tasks.ts`: CRUD de tarefas.
  - `src/services/auth.ts`: cadastro e criação do `profile`.
  - `src/lib/supabaseClient.ts`: cliente único do Supabase (tipado com `Database`).

## Banco de dados (referência rápida)

Tabelas usadas no app (a partir dos types):

- `tasks`: tarefas do usuário (assumindo RLS para restringir por usuário)
- `profiles`: dados de perfil do app (ex.: nome)

## Tipos do Supabase

O arquivo `src/types/database.types.ts` normalmente é **gerado automaticamente** a partir do schema do Supabase.
Se o schema mudar, re-gerar esses tipos evita divergências entre frontend e banco.

## Scripts

- `npm run dev`: servidor de desenvolvimento
- `npm run build`: build de produção
- `npm run preview`: preview do build
- `npm run lint`: lint do projeto

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
