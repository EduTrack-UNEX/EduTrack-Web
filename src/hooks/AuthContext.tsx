import React, { createContext, useContext, useState, useEffect } from "react"

interface AuthContextType {
  token: string | null
  setToken: (token: string | null) => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setTokenState] = useState<string | null>(null)

  useEffect(() => {
    const savedToken = localStorage.getItem("token")
    if (savedToken) {
      setTokenState(savedToken)
    }
  }, [])

  const setToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem("token", newToken)
      setTokenState(newToken)
    } else {
      localStorage.removeItem("token")
      setTokenState(null)
    }
  }

  return (
    <AuthContext.Provider value={{ token, setToken, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
