import { useEffect, useState } from 'react'
import { fetchTasks, type Task } from './services/tasks'

function App() {
  const [tasks, setTasks] = useState<Task[]>([])

  console.log(tasks)

  useEffect(() => {
    async function loadTasks() {
      const data: Task[] = await fetchTasks()
      setTasks(data)
    }

    loadTasks()

  }, [])

  return (
    <>
      <div className='newTaskContainer'>
        <label htmlFor="newTaskInput"></label>
        <input type="text" placeholder='to-do task here' />
      </div>
      <div className='taskList'>
        {tasks.map((val: Task) => (
          <p>{val.title} <br /></p>
        ))}
      </div >
    </>
  )
}

export default App
