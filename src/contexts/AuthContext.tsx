import type { User } from "@supabase/supabase-js"
import { createContext, useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"


// Shape of values exposed to the component tree
interface AuthContextType {
    logged: boolean
    user: User | null
    loading: boolean
}

// Default values used only if a component  is consumed outside AuthProvider
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType>({
    logged: false,
    user: null,
    loading: true
})


// Manages auth component and provides it to the component tree
export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    // derived from user — avoids state sync issues
    const logged = user !== null

    useEffect(() => {
        // fires immediately with current session, then on every auth state change
        const { data } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
            setLoading(false)
        })

        // cancels listener on unmount — prevents duplicate listeners on hot reload
        return () => {
            data.subscription.unsubscribe()
        }
    }, [])

    return (
        <AuthContext.Provider value={{ user, loading, logged }}>
            {children}
        </AuthContext.Provider>
    )
}
