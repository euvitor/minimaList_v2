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

        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
        if (signInError) { 
            setError(signInError.message) 
        }else{
            navigate('/dashboard')
        }

    }

    return (
        <form onSubmit={loginHandler}>
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} /> <br />

            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} /> <br />

            <input type="submit" value="Login" />
            {error && <p className="error">Login error: {error}</p>}
        </form>
    )
}