"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: string
  email: string
  name: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (email: string, password: string, name: string) => Promise<{ success: boolean; message: string }>
  logout: () => void
  changePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; message: string }>
  forgotPassword: (email: string) => Promise<{ success: boolean; message: string }>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on app start
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      // Try to call the actual backend API first
      const response = await fetch('http://localhost:8080/api/login/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,
          password: password
        })
      })

      if (response.ok) {
        const data = await response.json()
        if (data.message === "login succeeded" && data.user) {
          const userData: User = {
            id: data.user.id?.toString() || '1',
            email: email,
            name: data.user.username || email.split('@')[0]
          }
          setUser(userData)
          localStorage.setItem('user', JSON.stringify(userData))
          setIsLoading(false)
          return true
        }
      }

      // Fallback to demo credentials if backend fails
      if (email === 'demo@example.com' && password === 'password') {
        const userData: User = {
          id: '1',
          email: email,
          name: 'Demo User'
        }
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
        setIsLoading(false)
        return true
      } else {
        setIsLoading(false)
        return false
      }
    } catch (error) {
      console.error('Login error:', error)
      setIsLoading(false)
      return false
    }
  }

  const signup = async (email: string, password: string, name: string): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true)
    try {
      const response = await fetch('http://localhost:8080/api/login/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,
          password: password
        })
      })

      if (response.ok) {
        const data = await response.json()
        setIsLoading(false)
        if (data.username === "Successful" && data.user) {
          return {
            success: true,
            message: 'Signup successful! You can now log in.'
          }
        } else {
          return {
            success: false,
            message: data.username || 'Signup failed. Please try again.'
          }
        }
      } else {
        setIsLoading(false)
        return {
          success: false,
          message: 'Signup failed. Please try again.'
        }
      }
    } catch (error) {
      console.error('Signup error:', error)
      setIsLoading(false)
      return {
        success: false,
        message: 'Network error. Please try again.'
      }
    }
  }

  const changePassword = async (currentPassword: string, newPassword: string): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true)
    try {
      // Simulate API call - replace with actual password change logic
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setIsLoading(false)
      return {
        success: true,
        message: 'Password changed successfully!'
      }
    } catch (error) {
      setIsLoading(false)
      return {
        success: false,
        message: 'Failed to change password. Please try again.'
      }
    }
  }

  const forgotPassword = async (email: string): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true)
    try {
      // Simulate API call - replace with actual forgot password logic
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setIsLoading(false)
      return {
        success: true,
        message: 'Password reset instructions sent to your email!'
      }
    } catch (error) {
      setIsLoading(false)
      return {
        success: false,
        message: 'Failed to send reset email. Please try again.'
      }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, changePassword, forgotPassword, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}