import { useState, useEffect } from 'react';

export interface User {
  uid: string;
  username: string;
}

export const usePiAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // For demonstration purposes, we'll simulate Pi Network authentication
    // In a real app, you would integrate with the actual Pi Network SDK
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        
        // Simulate Pi Network SDK check
        // In reality, you would use the Pi Network SDK to check authentication
        const piAppId = process.env.REACT_APP_PI_APP_ID;
        
        if (!piAppId) {
          setError('Pi Network App ID not configured');
          setIsAuthenticated(false);
          return;
        }

        // For demo purposes, we'll use localStorage to simulate authentication
        const storedAuth = localStorage.getItem('pi_auth');
        if (storedAuth) {
          const authData = JSON.parse(storedAuth);
          setUser(authData);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        setError('Failed to check authentication');
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate Pi Network authentication flow
      // In a real app, this would trigger the Pi Network authentication
      const mockUser: User = {
        uid: 'demo_user_' + Date.now(),
        username: 'demo_user'
      };
      
      localStorage.setItem('pi_auth', JSON.stringify(mockUser));
      setUser(mockUser);
      setIsAuthenticated(true);
    } catch (err) {
      setError('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('pi_auth');
    setUser(null);
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    user,
    isLoading,
    error,
    login,
    logout
  };
};