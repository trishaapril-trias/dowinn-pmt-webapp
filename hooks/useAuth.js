
'use client'
import { useState, useEffect } from 'react'

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true)
        console.log('Fetching auth status...')  // Debug log
        
        const response = await fetch('/api/auth/check', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Cache-Control': 'no-cache'
          },
        })
        
        console.log('Response status:', response.status)  // Debug log
        
        if (!response.ok) {
          const text = await response.text()  // Get the actual response text
          console.log('Error response:', text)  // Debug log
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        console.log('Auth data:', data)  // Debug log
        setIsLoggedIn(data.isAuthenticated)
      } catch (error) {
        console.error('Error checking auth status:', error)
        setIsLoggedIn(false)
      } finally {
        setIsLoading(false)
      }
    }
    
    checkAuth()
  }, [])
  
  return { isLoggedIn, isLoading }
}