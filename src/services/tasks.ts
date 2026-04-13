import { supabase } from "../lib/supabaseClient"


export interface Task {
    id: string
    created_at: string
    title: string
    done: boolean
    user_id: string | null
}

export async function fetchTasks(): Promise<Task[]> {
    const { data, error } = await supabase.from('tasks').select('*')

    if (error) throw error

    return data ?? []
}