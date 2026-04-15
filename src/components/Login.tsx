import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export function Login() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    async function loginHandler(e: React.FormEvent) {
        e.preventDefault()

        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
        if (signInError) { setError(signInError.message) }

    }

    return (
        <form onSubmit={loginHandler}>
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />

            <label htmlFor="password">Password:</label>
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <input type="submit" value="Login" />
            {error && <p className="error">Login error: {error}</p>}
        </form>
    )
}