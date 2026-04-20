import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    async function loginHandler(e: React.FormEvent) {
        e.preventDefault()
        setError(null)

        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
        if (signInError) {
            setError(signInError.message)
        } else {
            navigate('/dashboard')
        }
    }

    return (
        <form onSubmit={loginHandler} className="flex flex-col gap-4">

            <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-xs font-mono text-gray-500 dark:text-gray-400">
                    email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-3 py-2 text-sm rounded-sm
                               bg-white/60 dark:bg-white/5
                               border border-black/15 dark:border-white/15
                               text-gray-800 dark:text-gray-100
                               placeholder:text-gray-300 dark:placeholder:text-gray-600
                               focus:outline-none focus:border-blue-500/60 dark:focus:border-blue-400/60
                               transition-colors"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-xs font-mono text-gray-500 dark:text-gray-400">
                    password
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 text-sm rounded-sm
                               bg-white/60 dark:bg-white/5
                               border border-black/15 dark:border-white/15
                               text-gray-800 dark:text-gray-100
                               placeholder:text-gray-300 dark:placeholder:text-gray-600
                               focus:outline-none focus:border-blue-500/60 dark:focus:border-blue-400/60
                               transition-colors"
                />
            </div>

            {error && (
                <p className="text-xs font-mono text-red-500 dark:text-red-400">
                    {error}
                </p>
            )}

            <button
                type="submit"
                className="mt-1 px-5 py-2 rounded-sm text-sm font-medium
                           text-blue-800 dark:text-blue-400
                           border border-blue-700/50 dark:border-blue-400
                           bg-blue-700/10 hover:bg-blue-700/15 dark:bg-blue-700/20 dark:hover:bg-blue-700/30
                           transition-all"
            >
                Sign In
            </button>
        </form>
    )
}