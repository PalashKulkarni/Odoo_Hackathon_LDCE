export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
}

export interface Trip {
  id: string;
  userId: string;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  status: 'ACTIVE' | 'COMPLETED';
  isPublic: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}