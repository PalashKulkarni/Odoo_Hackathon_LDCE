import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/features/auth/AuthProvider';
import { Compass, AlertCircle } from 'lucide-react';

export function AuthCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setSessionUser } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const token = searchParams.get('token');
    const userJson = searchParams.get('user');
    const error = searchParams.get('error');

    if (error) {
      setErrorMessage(error);
      const timer = setTimeout(() => {
        navigate(`/login?error=${encodeURIComponent(error)}`, { replace: true });
      }, 2000);
      return () => clearTimeout(timer);
    }

    if (token) {
      try {
        localStorage.setItem('gt_token', token);
        localStorage.setItem('gt_mock_auth', 'true');

        if (userJson) {
          const user = JSON.parse(decodeURIComponent(userJson));
          localStorage.setItem('gt_user_profile', JSON.stringify(user));
          if (setSessionUser) {
            setSessionUser(user);
          }
        }

        // Redirect to dashboard on successful auth
        const timer = setTimeout(() => {
          navigate('/dashboard', { replace: true });
        }, 500);
        return () => clearTimeout(timer);
      } catch (err) {
        console.error('Failed to parse user session:', err);
        navigate('/login?error=Invalid%20session%20data', { replace: true });
      }
    } else {
      navigate('/login', { replace: true });
    }
  }, [searchParams, navigate, setSessionUser]);

  return (
    <div className="min-h-screen bg-[#121110] text-white flex flex-col items-center justify-center p-6 select-none">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="relative inline-flex items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-accent-600/20 border border-accent-500/30 flex items-center justify-center shadow-lg shadow-accent-600/10">
            <Compass className="w-8 h-8 text-accent-500 animate-spin" style={{ animationDuration: '4s' }} />
          </div>
        </div>

        {errorMessage ? (
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-error text-sm font-medium bg-error/10 px-4 py-2 rounded-full border border-error/20">
              <AlertCircle size={16} />
              <span>{errorMessage}</span>
            </div>
            <p className="text-sm text-white/50">Redirecting you back to login...</p>
          </div>
        ) : (
          <div className="space-y-2">
            <h2 className="text-xl font-bold font-display text-white tracking-tight">
              Authenticating your journey
            </h2>
            <p className="text-sm text-white/60">
              Verifying credentials and preparing your travel passport...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthCallbackPage;
