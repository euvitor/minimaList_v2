/*
  Tema do app persistido no `localStorage`, para manter a escolha entre rotas e reload.
  Se não houver valor válido salvo, usa o tema do sistema (`prefers-color-scheme`).
  A classe `dark` no <html> é a fonte de verdade para os estilos `dark:` do Tailwind.
*/

import { useEffect, useState } from "react"

const STORAGE_KEY = 'minimalist_theme'

type Theme = 'dark' | 'light'

function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function readStoredTheme(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'dark' || stored === 'light') {
    return stored
  }
  return getSystemTheme()
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readStoredTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const toggleTheme = () => {
    setTheme((t) => {
      const next = t === 'dark' ? 'light' : 'dark'
      localStorage.setItem(STORAGE_KEY, next)
      return next
    })
  }

  return { theme, toggleTheme }
}