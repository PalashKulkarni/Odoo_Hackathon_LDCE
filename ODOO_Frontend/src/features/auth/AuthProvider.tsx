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
  loginWithGoogle: () => void;
  register: (data: RegisterInput) => Promise<void>;
  logout: () => Promise<void>;
  setSessionUser: (user: User) => void;
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
    const token = localStorage.getItem('gt_token');
    
    // 1. Try to verify session with backend
    try {
      const headers: Record<string, string> = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const res = await fetch('/api/auth/me', {
        headers,
        credentials: 'include',
      });

      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          const user: User = {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            avatarUrl: data.user.avatarUrl || `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(data.user.name || 'Traveler')}&backgroundColor=d66d4e,f5ddd5`,
          };
          localStorage.setItem('gt_user_profile', JSON.stringify(user));
          localStorage.setItem('gt_mock_auth', 'true');
          setState({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
          return;
        }
      }
    } catch {
      // Backend not reachable, fall back to local storage / mock
    }

    // 2. Fallback to cached profile or mock user
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

  const loginWithGoogle = useCallback(() => {
    // Redirect to backend Google OAuth initiation route
    window.location.href = '/api/auth/google';
  }, []);

  const setSessionUser = useCallback((user: User) => {
    setState({
      user,
      isAuthenticated: true,
      isLoading: false,
    });
  }, []);

  const login = useCallback(async (email?: string) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    
    try {
      // Try backend login first
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: email || 'alex.traveler@globetrotter.dev' }),
      });

      if (res.ok) {
        const data = await res.json();
        const user: User = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          avatarUrl: data.user.avatarUrl || `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(data.user.name)}&backgroundColor=d66d4e,f5ddd5`,
        };
        if (data.token) {
          localStorage.setItem('gt_token', data.token);
        }
        localStorage.setItem('gt_mock_auth', 'true');
        localStorage.setItem('gt_user_profile', JSON.stringify(user));

        setState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
        return;
      }
    } catch {
      // Fall through to mock on backend error
    }

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
      // Try backend register first
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name: data.name, email: data.email }),
      });

      if (res.ok) {
        const resData = await res.json();
        const user: User = {
          id: resData.user.id,
          name: resData.user.name,
          email: resData.user.email,
          avatarUrl: resData.user.avatarUrl || `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(resData.user.name)}&backgroundColor=d66d4e,f5ddd5`,
        };
        if (resData.token) {
          localStorage.setItem('gt_token', resData.token);
        }
        localStorage.setItem('gt_mock_auth', 'true');
        localStorage.setItem('gt_user_profile', JSON.stringify(user));

        setState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
        return;
      }
    } catch {
      // Fall through to mock on error
    }

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
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch {
      // Ignore network error during logout
    }

    try {
      await mockLogout();
    } finally {
      localStorage.removeItem('gt_token');
      localStorage.removeItem('gt_mock_auth');
      localStorage.removeItem('gt_user_profile');
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        loginWithGoogle,
        register,
        logout,
        setSessionUser,
      }}
    >
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
