import React, { useEffect, useState } from 'react'
import { createTask, deleteTask, fetchTasks, updateTask, type Task } from './services/tasks'


function App() {
  //  --- STATES ---
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskTitle, setNewTaskTitle] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  console.log(tasks)

  // Search for tasks once at first render - [] avoid refetch on each render
  useEffect(() => {
    async function loadTasks() {
      const data: Task[] = await fetchTasks()
      setTasks(data)
    }

    loadTasks()

  }, [])

  //  --- HANDLERS ---
  // Handlers updates the local state without refetch
  async function newTaskHandler(e: React.FormEvent) {
    e.preventDefault()

    try {
      const newTask = await createTask(newTaskTitle)
      setTasks(prev => [...prev, newTask])
      setNewTaskTitle('')
    } catch {
      setError("Error, can't create the task. Try again")
    }
  }

  async function taskDoneHandler(id: string, done: boolean) {
    try {
      const updatedTask = await updateTask(id, !done)
      setTasks(prev => prev.map(t => t.id === id ? updatedTask : t))
    } catch {
      setError(`Error, can't ${done ? 'uncheck' : 'check'} the task. Try again`)
    }
  }

  // Delete confirmed by the absence of error
  async function deleteTaskHandler(id: string) {
    try {
      await deleteTask(id)
      setTasks(prev => prev.filter(t => t.id !== id))
    } catch {
      setError("Error, can't delete the task. Try again")
    }
  }

  return (
    <>
      {/* --- TASK FORM --- */}
      <form onSubmit={newTaskHandler} className='newTaskContainer'>
        <label htmlFor="newTaskInput">New Task:</label>
        <input type="text" placeholder='to-do task here' value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} />
        <input type="submit" value="Save" />
      </form>

      {/* --- TASK LIST --- */}
      {error && <p className='error'>{error}</p>}
      <div className='taskList'>
        {tasks.map((val: Task) => (
          <div key={val.id}>
            <input
              type="checkbox"
              id={val.id}
              checked={val.done}
              onChange={() => taskDoneHandler(val.id, val.done)}
            />
            <label htmlFor={val.id}>{val.title}</label>
            <button type="button" onClick={() => deleteTaskHandler(val.id)}>delete</button>
          </div>
        ))}
      </div >
    </>
  )
}

export default App
