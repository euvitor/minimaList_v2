/*
  Rotas da aplicação (react-router-dom).
  A home (/) é pública; o /dashboard fica protegido por PrivateRoute (redireciona
  quando não autenticado e espera o estado inicial de sessão resolver).
*/

import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Hero from "./pages/Hero"
import { PrivateRoute } from "./routes/PrivateRoute"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Hero />} />
        <Route path='/dashboard' element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
