import { supabase } from "../lib/supabaseClient";

export interface Profile {
    id: string
    created_at: string
    name: string
}

export async function registerUser(userName: string, userEmail: string, userPassword: string): Promise<void> {
    const { data: newUserData, error: signUpError } = await supabase.auth.signUp({
        email: userEmail,
        password: userPassword
    })
    if (signUpError) throw signUpError
    if (!newUserData.user) throw new Error('User creation failed')



    const {error: insertError } = await supabase
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

