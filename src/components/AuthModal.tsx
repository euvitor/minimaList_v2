/*
  Modal de autenticação usado na landing page.
  Expõe um handle imperativo via ref (open/close) para disparar o modal sem
  gerenciar estado de visibilidade no pai. Clique fora fecha; clique dentro não.
*/

import { forwardRef, useImperativeHandle, useState } from "react";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

export type AuthModalHandle = {
    open: () => void
    close: () => void
}

export const AuthModal = forwardRef<AuthModalHandle>(function AuthModal(_, ref) {
    const [isOpen, setIsOpen] = useState(false)
    const [mode, setMode] = useState<'login' | 'register'>('login')

    useImperativeHandle(ref, () => ({
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
    }))
    // Evita renderizar overlay até abrir (DOM mais simples e sem capturar cliques ao fundo).
    if (!isOpen) return null

    return (
        // Overlay
        <div
            className="fixed inset-0 z-50 flex items-center justify-center px-4
                      backdrop-blur-xs"
            onClick={() => setIsOpen(false)}
        >
            {/* Card — stopPropagation evita fechar ao clicar dentro */}
            <div
                className="relative w-full max-w-sm
                           backdrop-blur-xl bg-white/90 dark:bg-neutral-900/90
                           border border-black/20 dark:border-white/10
                           shadow-[6px_6px_0_rgba(0,0,0,0.2)] dark:shadow-[6px_6px_0_rgba(0,0,0,0.7)]
                           rounded-sm px-8 py-10
                           flex flex-col gap-6"
                onClick={(e) => e.stopPropagation()}
            >

                {/* Tab switcher */}
                <div className="flex gap-1 p-1 rounded-sm
                                bg-black/5 dark:bg-white/5
                                border border-black/10 dark:border-white/10">
                    {(['login', 'register'] as const).map((m) => (
                        <button
                            key={m}
                            type="button"
                            onClick={() => setMode(m)}
                            className={`flex-1 py-1.5 text-xs font-mono rounded-sm transition-all
                                ${mode === m
                                    ? 'bg-white dark:bg-white/10 text-gray-800 dark:text-gray-100 shadow-sm'
                                    : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
                                }`}
                        >
                            {m === 'login' ? 'sign in' : 'register'}
                        </button>
                    ))}
                </div>

                {mode === 'login' ? <LoginForm /> : <RegisterForm />}
            </div>
        </div>
    )
})