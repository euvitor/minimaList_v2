import React, { useEffect, useState } from 'react'
import { createTask, deleteTask, fetchTasks, updateTask, type Task } from '../services/tasks'
import { supabase } from '../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import { Plus, Square, SquareCheck, X } from 'lucide-react'


function Dashboard() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [newTaskTitle, setNewTaskTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()
    const { theme, toggleTheme } = useTheme()


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
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
            {/* Controls */}
            <div className="fixed top-4 left-4 flex items-center gap-2">
                <a
                    href="https://github.com/euvitor"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono px-3 py-1 rounded border
                               text-gray-600 dark:text-white/70
                               border-black/15 dark:border-white/15
                               shadow-[3px_3px_0_rgba(0,0,0,0.1)] dark:shadow-[3px_3px_0_rgba(0,0,0,0.35)]
                               bg-white/40 dark:bg-white/5
                               backdrop-blur-sm
                               hover:bg-white/60 dark:hover:bg-white/10
                               transition-all">
                    @euvitor
                </a>
            </div>
            <div className="fixed top-4 right-4 flex items-center gap-2">
                <button
                    onClick={logoutHandler}
                    className="text-xs font-mono px-3 py-1 rounded border
                               text-gray-600 dark:text-white/70
                               border-black/15 dark:border-white/15
                               shadow-[3px_3px_0_rgba(0,0,0,0.1)] dark:shadow-[3px_3px_0_rgba(0,0,0,0.35)]
                               bg-white/40 dark:bg-white/5
                               backdrop-blur-sm
                               hover:bg-white/60 dark:hover:bg-white/10
                               transition-all">
                    Logout
                </button>
                <button
                    type="button"
                    onClick={toggleTheme}
                    className="text-xs px-3 py-1 rounded border
                               border-black/15 dark:border-white/15
                               shadow-[3px_3px_0_rgba(0,0,0,0.1)] dark:shadow-[3px_3px_0_rgba(0,0,0,0.35)]
                               bg-white/40 dark:bg-white/5
                               backdrop-blur-sm
                               hover:bg-white/60 dark:hover:bg-white/10
                               transition-all">
                    {theme === 'dark' ? '☀️' : '🌙'}
                </button>
            </div>

            {/* Glass card */}
            <div className="backdrop-blur-lg
                            bg-white/40 dark:bg-white/2
                            border border-black/20 dark:border-white/10
                            shadow-[6px_6px_0_rgba(0,0,0,0.12)] dark:shadow-[6px_6px_0_rgba(0,0,0,.7)]
                            rounded-sm px-10 py-12
                            flex flex-col items-center gap-6
                            max-w-md w-full"> 
                <form onSubmit={newTaskHandler} className='w-full flex items-center gap-3'>
                    <label htmlFor="newTaskInput" className='sr-only'>New Task:</label>
                    <input
                        type="text"
                        placeholder='to-do task here'
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        className='flex-1 px-3 py-1.5 text-sm
                                   border-b-2 border-blue-700/30 dark:border-white/15
                                   text-gray-800 dark:text-gray-100
                                   placeholder:text-gray-400 dark:placeholder:text-gray-500
                                   focus:outline-none focus:border-blue-500/60 dark:focus:border-blue-400/60
                                   transition-colors'/>
                    <button
                        type="submit"
                        aria-label='add task'
                        className="shrink-0 p-2 rounded-sm
                                   text-white dark:text-neutral-500
                                   bg-blue-700/50 hover:bg-blue-700/70
                                   dark:bg-neutral-700/40 dark:hover:bg-neutral-700/60
                                   transition-all">
                        <Plus size={18} strokeWidth={3} />
                    </button>

                </form>

                {error && <p className="text-xs font-mono text-red-500 dark:text-red-400">
                    {error}
                </p>}

                <div className="w-full flex flex-col gap-3">
                    {tasks.map((currentTask: Task) => (
                        <div
                            key={currentTask.id}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-sm
                                       backdrop-blur-md
                                       bg-white/30 dark:bg-white/5
                                       border border-black/20 dark:border-white/10
                                       shadow-[3px_3px_0_rgba(0,0,0,0.1)] dark:shadow-[3px_3px_0_rgba(0,0,0,0.35)]
                                       transition-all"
                        >
                            <label
                                htmlFor={currentTask.id}
                                className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    id={currentTask.id}
                                    checked={currentTask.done}
                                    onChange={() => taskDoneHandler(currentTask.id, currentTask.done)}
                                    className="peer sr-only"
                                />

                                <span className="relative flex h-6 w-6 shrink-0 items-center justify-center">
                                    {currentTask.done ? (
                                        <SquareCheck
                                            size={20}
                                            strokeWidth={1.75}
                                            className="text-blue-700/80 dark:text-blue-400/80 transition-all"
                                        />
                                    ) : (
                                        <Square
                                            size={20}
                                            strokeWidth={1.75}
                                            className="text-black/40 dark:text-white/20 transition-all"
                                        />
                                    )}
                                </span>

                                <span
                                    className={`flex-1 text-sm truncate transition-colors ${currentTask.done
                                        ? 'text-gray-400 dark:text-gray-500 line-through'
                                        : 'text-gray-800 dark:text-gray-100'
                                        }`}
                                >
                                    {currentTask.title}
                                </span>
                            </label>

                            <button
                                type="button"
                                onClick={() => deleteTaskHandler(currentTask.id)}
                                aria-label={`Delete task ${currentTask.title}`}
                                className="shrink-0 p-2 rounded-sm
                                           border border-black/20 dark:border-white/10
                                           bg-white/35 dark:bg-white/5
                                           text-gray-500 dark:text-gray-400
                                           hover:text-red-500 dark:hover:text-red-400
                                           hover:border-red-400/40 dark:hover:border-red-400/30
                                           hover:bg-red-500/5 dark:hover:bg-red-400/10
                                           transition-all"
                            >
                                <X size={16} strokeWidth={2.4} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

}

export default Dashboard