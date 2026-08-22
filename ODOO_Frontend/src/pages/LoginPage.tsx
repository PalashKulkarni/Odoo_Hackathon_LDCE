/**
 * LoginPage — authenticate with minimal friction.
 *
 * Per UI_UX_BLUEPRINT §6.2: desktop split 45% visual / 55% auth,
 * "Continue with Google" CTA, loading state, mobile single column.
 */

import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '@/features/auth/AuthProvider';
import { Button } from '@/components/ui/Button';
import { Compass } from 'lucide-react';

const routePreview = ['Tokyo', 'Kyoto', 'Osaka'];

export function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (isAuthenticated) {
    const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/dashboard';
    navigate(from, { replace: true });
    return null;
  }

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await login();
      const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } catch {
      setError('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-canvas">
      {/* Visual side — identity */}
      <div className="hidden lg:flex w-[45%] bg-ink relative overflow-hidden">
        {/* Destination atmosphere, kept quiet beneath the type */}
        <img
          src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1400&q=60"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-[0.28]"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(28,27,25,0.35) 0%, rgba(28,27,25,0.82) 100%)',
          }}
        />

        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 w-full rise">
          <Link to="/" className="flex items-center gap-2.5 no-underline group self-start">
            <span className="w-9 h-9 rounded-radius-md bg-accent-600 text-white flex items-center justify-center transition-transform group-hover:rotate-12" style={{ transitionDuration: 'var(--duration-normal)' }}>
              <Compass size={18} />
            </span>
            <span className="text-h4 text-white tracking-tight">GlobeTrotter</span>
          </Link>

          <div>
            <p className="text-label text-accent-500 mb-5">The connected travel planner</p>
            <h2 className="text-display-xl text-white leading-tight max-w-sm mb-10">
              Every great trip begins with a <em className="serif-accent">single city.</em>
            </h2>

            {/* Route fragment */}
            <div className="flex flex-col">
              {routePreview.map((city, i) => (
                <div key={city} className="flex items-stretch gap-4">
                  <div className="flex flex-col items-center pt-[13px]">
                    <div
                      className={[
                        'w-3 h-3 rounded-full shrink-0',
                        i === 0 ? 'bg-accent-500 ring-4 ring-accent-500/25' : 'border-2 border-white/50',
                      ].join(' ')}
                    />
                    {i < routePreview.length - 1 && (
                      <div className="w-px flex-1 min-h-8 my-1 border-l border-dashed border-white/25" />
                    )}
                  </div>
                  <span className={`font-display pb-6 ${i === 0 ? 'text-h3 text-white' : 'text-h4 text-white/60'}`}>
                    {city}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-caption text-white/45 tracking-wide uppercase">
            Tokyo → Kyoto → Osaka · 10 days
          </p>
        </div>
      </div>

      {/* Auth side */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-10">
        <div className="rise w-full max-w-md">
          {/* Mobile identity */}
          <Link to="/" className="lg:hidden flex items-center gap-2.5 no-underline mb-10">
            <span className="w-8 h-8 rounded-radius-md bg-accent-600 text-white flex items-center justify-center">
              <Compass size={17} />
            </span>
            <span className="text-h4 text-ink tracking-tight">GlobeTrotter</span>
          </Link>

          <h1 className="text-page-title text-ink">Welcome back</h1>
          <p className="text-body-lg text-ink-secondary mt-3 mb-10 leading-relaxed">
            Sign in to continue planning your journeys.
          </p>

          {/* Google OAuth CTA */}
          <Button
            size="lg"
            variant="secondary"
            onClick={handleLogin}
            loading={loading}
            className="w-full"
            icon={
              !loading ? (
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
              ) : undefined
            }
          >
            {loading ? 'Continuing...' : 'Continue with Google'}
          </Button>

          {error && (
            <p className="mt-4 text-body-sm text-error text-center">{error}</p>
          )}

          <div className="mt-10 pt-6 border-t border-border-default">
            <p className="text-caption text-ink-muted leading-relaxed">
              By continuing you agree to GlobeTrotter's terms of service.
              Your journeys stay private until you choose to share them.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
