/*
  Camada de acesso a dados de tarefas (independente de UI).
  Componentes chamam estes helpers em vez de usar Supabase direto. Supõe que o RLS
  no Supabase já limita `tasks` ao usuário autenticado.
*/

import { supabase } from "../lib/supabaseClient"
import type { Tables } from "../types/database.types"

export type Task = Tables<'tasks'>

export async function fetchTasks(): Promise<Task[]> {
  const { data: tasksData, error } = await supabase
    .from('tasks')
    .select('*')

  if (error) throw error

  return tasksData ?? []
}

// `.select().single()` retorna a linha inserida para a UI atualizar sem refetch.
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

export async function deleteTask(id: string): Promise<void> {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id)

  if (error) throw error
}