import { supabase } from "../lib/supabaseClient"

export interface Task {
  id: string
  created_at: string
  title: string
  done: boolean
  user_id: string | null // null untill authentication is implemented
}

// FETCH tasks
export async function fetchTasks(): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')

  if (error) throw error

  return data ?? []
}

// CREATE tasks
export async function createTask(taskTitle: string): Promise<Task> {
  const { data, error } = await supabase
    .from('tasks')
    .insert([
      { title: taskTitle },
    ])
    .select()
    .single()

  if (error) throw error

  return data
}

// UPDATE tasks
export async function updateTask(id: string, done: boolean): Promise<Task> {
  const { data, error } = await supabase
    .from('tasks')
    .update({ done: done })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error

  return data
}

// DELETE tasks
export async function deleteTask(id: string) {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id)

  if (error) throw error
}