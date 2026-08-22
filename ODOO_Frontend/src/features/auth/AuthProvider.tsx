import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { User, AuthState } from '@/types';
import { mockGetCurrentUser, mockLogin, mockLogout } from '@/lib/mock/services';

interface AuthContextValue extends AuthState {
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Check auth status on mount
  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const user = await mockGetCurrentUser();
      setState({
        user,
        isAuthenticated: !!user,
        isLoading: false,
      });
    } catch {
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  }

  const login = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      // In production, this would redirect to Google OAuth
      // For now, use mock login
      const user: User = await mockLogin();
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch {
      setState((prev) => ({ ...prev, isLoading: false }));
      throw new Error('Login failed');
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await mockLogout();
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch {
      // Even if logout fails server-side, clear local state
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
