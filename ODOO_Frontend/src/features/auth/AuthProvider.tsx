import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { User, AuthState } from '@/types';
import { mockGetCurrentUser, mockLogin, mockRegister, mockLogout } from '@/lib/mock/services';

export interface RegisterInput {
  name: string;
  email: string;
  password?: string;
  travelStyle?: string;
}

interface AuthContextValue extends AuthState {
  login: (email?: string, password?: string) => Promise<void>;
  register: (data: RegisterInput) => Promise<void>;
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

  const login = useCallback(async (email?: string) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const user: User = await mockLogin(email);
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

  const register = useCallback(async (data: RegisterInput) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const user: User = await mockRegister(data);
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch {
      setState((prev) => ({ ...prev, isLoading: false }));
      throw new Error('Registration failed');
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
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
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
