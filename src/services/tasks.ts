import { supabase } from "../lib/supabaseClient"
import type { Tables } from "../types/database.types"

export type Task = Tables<'tasks'>

// FETCH tasks
export async function fetchTasks(): Promise<Task[]> {
  const { data: tasksData, error } = await supabase
    .from('tasks')
    .select('*')

  if (error) throw error

  return tasksData ?? []
}

// CREATE tasks
export async function createTask(taskTitle: string): Promise<Task> {
  const { data: tasksData, error } = await supabase
    .from('tasks')
    .insert([
      { title: taskTitle },
    ])
    .select()
    .single()

  if (error) throw error.message

  return tasksData
}

// UPDATE tasks
export async function updateTask(id: string, done: boolean): Promise<Task> {
  const { data: tasksData, error } = await supabase
    .from('tasks')
    .update({ done })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error

  return tasksData
}

// DELETE tasks
export async function deleteTask(id: string): Promise<void> {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id)

  if (error) throw error
}