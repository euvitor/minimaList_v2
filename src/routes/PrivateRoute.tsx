import type React from "react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

type Props = { children: React.ReactNode }

export function PrivateRoute({ children }: Props) {
    const {logged, loading} = useContext(AuthContext)

    if(loading){
        return (<p>Loading...</p>)
    }
    if (!logged) {
        return <Navigate to='/' />
    }
    
    return children
}