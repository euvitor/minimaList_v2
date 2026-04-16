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
        </>
    )
}