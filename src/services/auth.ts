/*
  Services de autenticação (independente de UI).
  Centraliza chamadas do Supabase fora dos componentes. Após o sign-up, criamos também
  um registro em `profiles` (dados do app) ligado ao id do usuário no auth.
*/

import { supabase } from "../lib/supabaseClient";
import type { Tables } from "../types/database.types";

export type Profile = Tables<'profiles'>

export async function registerUser(userName: string, userEmail: string, userPassword: string): Promise<void> {
    const { data: newUserData, error: signUpError } = await supabase.auth.signUp({
        email: userEmail,
        password: userPassword
    })
    if (signUpError) throw signUpError
    if (!newUserData.user) throw new Error('User creation failed')

    const { error: insertError } = await supabase
        // `profiles` guarda dados do app (ex.: nome) separados do `auth.users` do Supabase.
        .from('profiles')
        .insert([
            {
                id: newUserData.user.id,
                name: userName
            }
        ])
        .select()
        .single()

    if (insertError) throw insertError


}

