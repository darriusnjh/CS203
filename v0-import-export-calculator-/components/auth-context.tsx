"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: string
  username: string
  user_id?: string
  createdAt?: string
  updatedAt?: string
  lastLogin?: string
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<boolean>
  signup: (username: string, password: string) => Promise<{ success: boolean; message: string }>
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

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      const response = await fetch('http://localhost:8080/api/user/login', {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      })

      if (response.ok) {
        const data = await response.json()
        console.log('Login response:', data)
        if (data.message === "login succeeded" && data.user) {
          const userData: User = {
            id: data.user.user_id?.toString() || '1',
            username: data.user.username
          }
          setUser(userData)
          localStorage.setItem('user', JSON.stringify(userData))
          setIsLoading(false)
          return true
        }
      } else if (response.status === 401) {
        console.log('Login failed: Invalid credentials')
        setIsLoading(false)
        return false
      } else if (response.status === 409) {
        console.log('Login failed: User already logged in')
        setIsLoading(false)
        return false
      } else {
        console.error('Login failed with status:', response.status)
        setIsLoading(false)
        return false
      }
      setIsLoading(false)
      return false

    } catch (error) {
      console.error('Login error:', error)
      setIsLoading(false)
      return false
    }
  }

  const signup = async (username: string, password: string): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true)
    try {
      const response = await fetch('http://localhost:8080/api/user/signup', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      })

      if (response.ok) {
        const data = await response.json()
        console.log('Signup response:', data)
        if (data.username === "Successful" && data.user) {
          const userData: User = {
            id: data.user.user_id?.toString() || '1',
            username: data.user.username
          }
          setUser(userData)
          localStorage.setItem('user', JSON.stringify(userData))
          setIsLoading(false)
          return {
            success: true,
            message: 'Signup successful!'
          }
        } else {
          setIsLoading(false)
          return {
            success: false,
            message: data.username || 'Signup failed. Please try again.'
          }
        }
      } else if (response.status === 401) {
        const data = await response.json().catch(() => ({}))
        setIsLoading(false)
        return {
          success: false,
          message: data.username || 'Signup failed. User may already exist.'
        }
      } else if (response.status === 409) {
        setIsLoading(false)
        return {
          success: false,
          message: 'User already logged in. Please logout first.'
        }
      } else {
        console.error('Signup failed with status:', response.status)
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

  const logout = async () => {
    setUser(null)
    localStorage.removeItem('user')


    try {
      // Try to call the actual backend API first
      const response = await fetch('http://localhost:8080/api/user/logout', {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

      })


      setIsLoading(false)
      return false

    } catch (error) {
      console.error('Logout error:', error)
      setIsLoading(false)
      return false
    }

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