import { forwardRef, useImperativeHandle, useState } from "react";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

export type AuthModalHandle = {
    open: () => void
    close: () => void
}

export const AuthModal = forwardRef<AuthModalHandle>(function AuthModal(_, ref) {
    const [isOpen, setIsOpen] = useState(false)
    const [mode, setMode] = useState<string>('login')

    useImperativeHandle(ref, () => ({
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
    }))

    if (!isOpen) return null

    return(
        <div>
            <button type="button" onClick={()=> setMode('login')}>Login</button>
            <button type="button" onClick={()=> setMode('register')}>Register</button>
            <button type="button" onClick={()=> setIsOpen(false)}>X</button>

            {mode === 'login' ? <LoginForm/> : <RegisterForm/>}
        </div>
    )
})
