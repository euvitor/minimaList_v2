/*
  Ponto de entrada da SPA: monta o React em #root, carrega estilos globais e
  registra os providers no topo (ex.: AuthProvider) antes das rotas em App.
*/

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './contexts/AuthContext.tsx'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
)
