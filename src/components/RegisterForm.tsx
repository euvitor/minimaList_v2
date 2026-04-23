/*
  Cadastro com validação client-side.
  Usa um service (`registerUser`) para manter detalhes do Supabase fora da UI.
  A validação do "confirm password" é debounced para evitar erros enquanto o usuário digita.
*/

import { useCallback, useEffect, useState } from "react"
import { registerUser } from "../services/auth"
import { useNavigate } from "react-router-dom"

export type RegisterErrors = {
    name: string | null,
    email: string | null,
    password: string | null,
    confirmPassword: string | null
}

export function RegisterForm() {
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [signUpError, setSignUpError] = useState<string | null>(null)
    const [errors, setErrors] = useState<RegisterErrors>({
        name: null,
        email: null,
        password: null,
        confirmPassword: null
    })
    const navigate = useNavigate()

    const validateRegister = useCallback((): RegisterErrors => {
        const newErrors: RegisterErrors = {
            name: null,
            email: null,
            password: null,
            confirmPassword: null
        }

        if (!name) {
            newErrors.name = 'Name field must be filled!'
        }
        if (!email) {
            newErrors.email = 'Email field must be filled!'
        }
        if (!password) {
            newErrors.password = 'Password field must be filled!'
        }
        if (!confirmPassword) {
            newErrors.confirmPassword = 'Password must be confirmed!'
        } else if (confirmPassword !== password) {
            newErrors.confirmPassword = 'Passwords must be the same!'
        }

        return newErrors
    }, [name, email, password, confirmPassword])


    useEffect(() => {
        if (!confirmPassword) return
        const timer = setTimeout(() => {
            const result = validateRegister()
            setErrors(prev => ({ ...prev, confirmPassword: result.confirmPassword }))
        }, 1000)

        return () => clearTimeout(timer)
    }, [confirmPassword, validateRegister])

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        const result = validateRegister()
        setErrors(result)

        const hasErrors = Object.values(result).some(value => value !== null)

        if (!hasErrors) {
            try {
                await registerUser(name, email, password)
                navigate('/dashboard')
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setSignUpError(error.message)
                }
            }
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <div className="flex flex-col gap-1">
                <label htmlFor="name" className="text-xs font-mono text-gray-500 dark:text-gray-400">Name</label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 tex-sm rounded-sm
                               bg-white/60 dark:bg-white/5
                               border border-black/15 dark:border-white/15
                               text-gray-800 dark:text-gray-100
                               placeholder:text-gray-300 dark:placeholder:text-gray-600
                               focus:outline-none focus:border-blue-500/60 dark:focus:border-blue-400/60
                               transition-colors"
                />
                {errors.name &&
                    <p className="text-xs font-mono text-red-500 dark:text-red-400">
                        {errors.name}
                    </p>}
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-xs font-mono text-gray-500 dark:text-gray-400">Email</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 tex-sm rounded-sm
                               bg-white/60 dark:bg-white/5
                               border border-black/15 dark:border-white/15
                               text-gray-800 dark:text-gray-100
                               placeholder:text-gray-300 dark:placeholder:text-gray-600
                               focus:outline-none focus:border-blue-500/60 dark:focus:border-blue-400/60
                               transition-colors"
                />
                {errors.email &&
                    <p className="text-xs font-mono text-red-500 dark:text-red-400">
                        {errors.email}
                    </p>}
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-xs font-mono text-gray-500 dark:text-gray-400">Password</label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 tex-sm rounded-sm
                               bg-white/60 dark:bg-white/5
                               border border-black/15 dark:border-white/15
                               text-gray-800 dark:text-gray-100
                               placeholder:text-gray-300 dark:placeholder:text-gray-600
                               focus:outline-none focus:border-blue-500/60 dark:focus:border-blue-400/60
                               transition-colors"
                />
                {errors.password &&
                    <p className="text-xs font-mono text-red-500 dark:text-red-400">
                        {errors.password}
                    </p>}
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="confirmPassword" className="text-xs font-mono text-gray-500 dark:text-gray-400">Confirm password</label>
                <input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 tex-sm rounded-sm
                               bg-white/60 dark:bg-white/5
                               border border-black/15 dark:border-white/15
                               text-gray-800 dark:text-gray-100
                               placeholder:text-gray-300 dark:placeholder:text-gray-600
                               focus:outline-none focus:border-blue-500/60 dark:focus:border-blue-400/60
                               transition-colors"
                />
                {errors.confirmPassword &&
                    <p className="text-xs font-mono text-red-500 dark:text-red-400">
                        {errors.confirmPassword}
                    </p>}
                {signUpError &&
                    <p className="text-xs font-mono text-red-500 dark:text-red-400">
                        {signUpError}
                    </p>}
            </div>

            <button
                type="submit"
                className="mt-1 px-5 py-2 rounded-sm text-sm font-medium
                           text-blue-800 dark:text-blue-400
                           border border-blue-700/50 dark:border-blue-400
                           bg-blue-700/10 hover:bg-blue-700/15 dark:bg-blue-700/20 dark:hover:bg-blue-700/30
                           transition-all"
            >
                Register
            </button>
        </form>
    )
}