import { useEffect, useState } from "react"
import { registerUser } from "../services/auth"

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


    function validateRegister(): RegisterErrors {
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
    }

    useEffect(() => {
        if (!confirmPassword) return
        const timer = setTimeout(() => {
            const result = validateRegister()
            setErrors(prev => ({ ...prev, confirmPassword: result.confirmPassword }))
        }, 1000)

        return () => clearTimeout(timer)
    }, [confirmPassword])

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        const result = validateRegister()
        setErrors(result)

        const hasErrors = Object.values(result).some(value => value !== null)

        if (!hasErrors) {
            try {
                await registerUser(name, email, password)
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setSignUpError(error.message)
                }
            }
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input id="name" type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                {errors.name && <p>{errors.name}</p>}

                <label htmlFor="email">Email</label>
                <input id="email" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                {errors.email && <p>{errors.email}</p>}

                <label htmlFor="password">Password</label>
                <input id="password" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                {errors.password && <p>{errors.password}</p>}

                <label htmlFor="confirmPassword">Confirm password</label>
                <input id="confirmPassword" type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                {signUpError && <p>{signUpError}</p>}

                <input type="submit" value="Register" />
            </form>
        </>
    )
}
