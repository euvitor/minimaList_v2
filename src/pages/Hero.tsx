import { useRef } from "react";
import { AuthModal, type AuthModalHandle } from "../components/AuthModal";
import { useTheme } from "../hooks/useTheme";

function Hero() {
    const authModalRef = useRef<AuthModalHandle>(null)
    const { theme, toggleTheme } = useTheme()

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4">

            {/* Controls */}
            <div className="fixed top-4 right-4 flex items-center gap-2">
                <a
                    href="https://github.com/euvitor"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono px-3 py-1 rounded border
                               text-gray-600 dark:text-white/70
                               border-black/15 dark:border-white/15
                               bg-white/40 dark:bg-white/5
                               backdrop-blur-sm
                               hover:bg-white/60 dark:hover:bg-white/10
                               transition-all"
                >
                    @euvitor
                </a>
                <button
                    type="button"
                    onClick={toggleTheme}
                    className="text-xs px-3 py-1 rounded border
                               border-black/15 dark:border-white/15
                               bg-white/40 dark:bg-white/5
                               backdrop-blur-sm
                               hover:bg-white/60 dark:hover:bg-white/10
                               transition-all"
                >
                    {theme === 'dark' ? '☀️' : '🌙'}
                </button>
            </div>

            {/* Glass card */}
            <div className="backdrop-blur-lg
                            bg-white/40 dark:bg-white/2
                            border border-black/20 dark:border-white/10
                            shadow-[6px_6px_0_rgba(0,0,0,0.2)] dark:shadow-[6px_6px_0_rgba(0,0,0,.7)]
                            rounded-sm px-10 py-12
                            flex flex-col items-center gap-6
                            max-w-md w-full">

                <h1 className="font-display text-6xl tracking-tight text-gray-800 dark:text-gray-100">
                    MinimaList
                    <span className="text-3xl text-blue-600 dark:text-blue-500 italic font-normal ml-1">v2</span>
                </h1>

                <p className="text-sm text-center font-mono text-gray-400 dark:text-gray-500">
                    Minimal features. Real productivity.
                </p>

                <button
                    onClick={() => authModalRef.current?.open()}
                    className="mt-2 px-5 py-2 rounded-sm text-sm font-medium
                               text-blue-800 dark:text-blue-400
                               border border-blue-700/50 dark:border-blue-400
                               bg-blue-700/10 hover:bg-blue-700/15 dark:bg-blue-700/20 dark:hover:bg-blue-700/30
                               transition-all"
                >
                    Sign In
                </button>
            </div>

            <AuthModal ref={authModalRef} />
        </div>
    )
}

export default Hero