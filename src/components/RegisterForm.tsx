import { useState } from "react"

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
    const [errors, setErrors] = useState<RegisterErrors>({
        name: null,
        email: null,
        password: null,
        confirmPassword: null
    })

    return (
        <>
            <form action="">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" onChange={(e) => setName(e.target.value)} />
                {errors.name ?? <p>{errors.name}</p>}

                <label htmlFor="email">Email</label>
                <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} />
                {errors.email ?? <p>{errors.email}</p>}

                <label htmlFor="password">Password</label>
                <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
                {errors.password ?? <p>{errors.password}</p>}

                <label htmlFor="confirmPassword">Confirm password</label>
                <input type="password" name="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)} />
                {errors.confirmPassword ?? <p>{errors.confirmPassword}</p>}

                <input type="submit" value="Register" />
            </form>
        </>
    )
}