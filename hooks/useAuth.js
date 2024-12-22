'use client';
import { hasCookie } from '@node_modules/cookies-next/lib';
import { useState, useEffect } from 'react';

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const response = hasCookie('session');
      setIsLoggedIn(response);
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    checkAuth();
    setIsLoading(false);

    // Poll for changes every 5 seconds (optional)
    const interval = setInterval(() => {
        checkAuth();
      }, 50);
  
      return () => clearInterval(interval); // Cleanup interval on unmount

  }, []);

  return { isLoggedIn, setIsLoggedIn, isLoading };
}
