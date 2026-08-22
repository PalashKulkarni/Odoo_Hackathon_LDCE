/* User types — matches shared/types/index.ts contract */

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
