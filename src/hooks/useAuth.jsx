import React from 'react'
import { createContext, useContext, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from './useLocalStorage'
import { backendURL } from '../constEnv'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [infoLogin, setInfoLogin] = useLocalStorage("user", null)

    const navigate = useNavigate()

    // call this function when you want to authenticate the user
    const login = async (data) => {
        
        const response = await fetch(`${backendURL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email:data.username, password:data.password })
        })

        const json_response = await response.json()

        return {status:response.status,body:json_response}
        
    }

    const logout = () => {
        setInfoLogin(null)
        navigate("/", { replace: true })
    }

    const value = useMemo(() => ({
        infoLogin, login, logout, setInfoLogin
    }), [infoLogin])
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext)
}

