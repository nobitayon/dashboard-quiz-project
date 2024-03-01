import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    const {user} = useAuth()
    console.log(user)
    if (!user){
        // user is not authenticated
        return <Navigate to="/"/>
    }
  return children
}

export default ProtectedRoute