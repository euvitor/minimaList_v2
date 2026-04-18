import React, { useEffect, useState } from 'react'
import { createTask, deleteTask, fetchTasks, updateTask, type Task } from '../services/tasks'
import { supabase } from '../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'


function Dashboard() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [newTaskTitle, setNewTaskTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        async function loadTasks() {
            setError(null)

            try {
                const data: Task[] = await fetchTasks()
                setTasks(data)
            } catch {
                setError("Error, can't load the tasks. Try again")
            }
        }

        loadTasks()

    }, [])

    async function newTaskHandler(e: React.FormEvent) {
        e.preventDefault()
        setError(null)

        try {
            const newTask = await createTask(newTaskTitle)
            setTasks(prev => [...prev, newTask])
            setNewTaskTitle('')
        } catch {
            setError("Error, can't create the task. Try again")
        }
    }

    async function taskDoneHandler(id: string, done: boolean) {
        setError(null)

        try {
            const updatedTask = await updateTask(id, !done)
            setTasks(prev => prev.map(t => t.id === id ? updatedTask : t))
        } catch {
            setError(`Error, can't ${done ? 'uncheck' : 'check'} the task. Try again`)
        }
    }

    async function deleteTaskHandler(id: string) {
        setError(null)

        try {
            await deleteTask(id)
            setTasks(prev => prev.filter(t => t.id !== id))
        } catch {
            setError("Error, can't delete the task. Try again")
        }
    }

    async function logoutHandler() {
        setError(null)

        const { error: logoutError } = await supabase.auth.signOut()
        if (logoutError) {
            setError('Logout error. Please try again.')
        } else {
            navigate('/')
        }
    }
    return (
        <>
            <button onClick={logoutHandler}>Logout</button>

            <form onSubmit={newTaskHandler} className='newTaskContainer'>
                <label htmlFor="newTaskInput">New Task:</label>
                <input type="text" placeholder='to-do task here' value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} />
                <input type="submit" value="Save" />
            </form>

            {error && <p className='error'>{error}</p>}

            <div className='taskList'>
                {tasks.map((currentTask: Task) => (
                    <div key={currentTask.id}>
                        <input
                            type="checkbox"
                            id={currentTask.id}
                            checked={currentTask.done}
                            onChange={() => taskDoneHandler(currentTask.id, currentTask.done)}
                        />
                        <label htmlFor={currentTask.id}>{currentTask.title}</label>
                        <button type="button" onClick={() => deleteTaskHandler(currentTask.id)}>delete</button>
                    </div>
                ))}
            </div >
        </>
    )

}

export default Dashboard