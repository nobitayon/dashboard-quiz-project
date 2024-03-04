import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    const {infoLogin:{role}} = useAuth()
    if (role!="admin"){
        // user is not authenticated
        return <Navigate to="/"/>
    }
  return children
}

export default ProtectedRoute