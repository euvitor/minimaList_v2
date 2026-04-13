import React, { useEffect, useState } from 'react'
import { createTask, deleteTask, fetchTasks, updateTask, type Task } from './services/tasks'


function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskTitle, setNewTaskTitle] = useState<string>('')

  console.log(tasks)

  useEffect(() => {
    async function loadTasks() {
      const data: Task[] = await fetchTasks()
      setTasks(data)
    }

    loadTasks()

  }, [])


  //  --- HANDLERS ---
  async function newTaskHandler(e: React.FormEvent) {
    e.preventDefault()

    const newTask = await createTask(newTaskTitle)
    setTasks(prev => [...prev, newTask])
    setNewTaskTitle('')
  }

  async function taskDoneHandler(id: string, done: boolean) {
    const updatedTask = await updateTask(id, !done)
    setTasks(prev => prev.map(t => t.id === id ? updatedTask : t))
  }

  async function deleteTaskHandler(id: string) {
    await deleteTask(id)
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  return (
    <>
      <form onSubmit={newTaskHandler} className='newTaskContainer'>
        <label htmlFor="newTaskInput">New Task:</label>
        <input type="text" placeholder='to-do task here' value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} />
        <input type="submit" value="Save" />
      </form>
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
