import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/features/auth/AuthProvider';

/**
 * ProtectedRoute — redirects unauthenticated users to login.
 * Shows nothing while auth state is loading to avoid flash.
 */
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return null; // Avoid layout flash during auth check
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
