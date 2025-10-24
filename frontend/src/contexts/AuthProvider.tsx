import React, { useState, useEffect, useCallback, useMemo, type ReactNode } from 'react';
import { AuthContext } from './AuthContext';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = React.memo(({ children }) => {
  const [token, setToken] = useState<string | null>(() => {
    // Initialize token from localStorage only once
    return localStorage.getItem('adminToken');
  });
  const [loading, setLoading] = useState(true);

  // Memoize isAuthenticated value
  const isAuthenticated = useMemo(() => !!token, [token]);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    isAuthenticated,
    token,
    login: (newToken: string) => {
      localStorage.setItem('adminToken', newToken);
      setToken(newToken);
    },
    logout: () => {
      localStorage.removeItem('adminToken');
      setToken(null);
    },
    loading
  }), [isAuthenticated, token, loading]);

  // Use useCallback for the checkAuth function
  const checkAuth = useCallback(async () => {
    if (token) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/stats`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          localStorage.removeItem('adminToken');
          setToken(null);
        }
      } catch (error: any) {
        console.error('Auth check failed:', error);
        if (error.name !== 'AbortError') {
          localStorage.removeItem('adminToken');
          setToken(null);
        }
      }
    }
    setLoading(false);
  }, [token]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
});

export default AuthProvider;