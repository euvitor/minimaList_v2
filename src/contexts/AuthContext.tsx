import type { User } from "@supabase/supabase-js"
import { createContext, useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"

interface AuthContextType {
    logged: boolean
    user: User | null
    loading: boolean
}

// Values used only if a component is consumed outside AuthProvider
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType>({
    logged: false,
    user: null,
    loading: true
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    // derived from user — avoids state sync issues
    const logged = user !== null

    useEffect(() => {
        async function loadSession() {
            const { data: sessionData, error } = await supabase.auth.getSession()

            if (error) {
                setUser(null)
            } else {
                setUser(sessionData.session?.user ?? null)
            }

            setLoading(false)
        }

        loadSession()

        // sync context with auth changes
        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {

            setUser(session?.user ?? null)
            setLoading(false)
        })

        // prevents duplicate listeners on hot reload
        return () => {
            authListener.subscription.unsubscribe()
        }
    }, [])

    return (
        <AuthContext.Provider value={{ user, loading, logged }}>
            {children}
        </AuthContext.Provider>
    )
}
 