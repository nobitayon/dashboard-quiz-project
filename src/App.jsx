import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Dashboard, Layout, Students, Login, Quiz } from './pages'
import { AuthProvider } from './hooks/useAuth'
import ProtectedRoute from './route/ProtectedRoute'


const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/cek' element={<Layout />}>
            <Route index element={<Dashboard/>}></Route>
          </Route>
          <Route path='/dashboard' element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>}>
            <Route index element={<Dashboard />} />
            <Route path='/dashboard/quiz/:quizId' element={<Quiz/>}/>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App