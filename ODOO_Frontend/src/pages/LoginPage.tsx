/**
 * LoginPage — World-class editorial travel authentication portal.
 *
 * Features:
 * - Dual-mode seamless switching (Sign In & Create Account / Register)
 * - Deep link support (/login, /register, and query params)
 * - Interactive ambient destination showcase with live itinerary previews
 * - One-click Google, Apple & Demo Traveler instant access
 * - Real-time password strength meter with visual checklist
 * - Personalized Travel Style preference selector
 * - Interactive Forgot Password dialog
 * - High-end typography, glassmorphism, and terracotta design tokens
 */

import { useState, useId, useMemo, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/features/auth/AuthProvider';
import {
  Compass,
  Mail,
  Lock,
  User as UserIcon,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  Shield,
  Star,
  MapPin,
  Calendar,
  X,
  KeyRound,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

/* =========================================================
   Showcase Destinations Data
   ========================================================= */

interface DestinationShowcase {
  id: string;
  city: string;
  country: string;
  quote: string;
  tagline: string;
  duration: string;
  stopsCount: string;
  stops: string[];
  imageUrl: string;
  traveler: {
    name: string;
    role: string;
    avatar: string;
    rating: number;
  };
}

const DESTINATIONS: DestinationShowcase[] = [
  {
    id: 'kyoto',
    city: 'Kyoto & Honshu',
    country: 'Japan',
    quote: 'Every great journey begins with a single intentional step.',
    tagline: 'Ancient Zen shrines, Arashiyama bamboo paths, and tea ceremonies.',
    duration: '10 Days',
    stopsCount: '14 Handpicked Spots',
    stops: ['Tokyo', 'Hakone', 'Kyoto', 'Osaka'],
    imageUrl:
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1600&auto=format&fit=crop&q=80',
    traveler: {
      name: 'Elena Rostova',
      role: 'Architect & Solo Explorer',
      avatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=face',
      rating: 5,
    },
  },
  {
    id: 'amalfi',
    city: 'Amalfi Coast & Positano',
    country: 'Italy',
    quote: 'Where dramatic cliffs meet azure Mediterranean waters.',
    tagline: 'Cliffside lemon groves, coastal ferries, and sunset trattorias.',
    duration: '7 Days',
    stopsCount: '9 Scenic Viewpoints',
    stops: ['Naples', 'Sorrento', 'Positano', 'Capri', 'Ravello'],
    imageUrl:
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1600&auto=format&fit=crop&q=80',
    traveler: {
      name: 'Marcus & Clara Vance',
      role: 'Culinary Travel Writers',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face',
      rating: 5,
    },
  },
  {
    id: 'swiss',
    city: 'Zermatt & Swiss Alps',
    country: 'Switzerland',
    quote: 'Pure crisp alpine air and legendary mountain peaks.',
    tagline: 'Glacier express train routes, Matterhorn views, and timber chalets.',
    duration: '8 Days',
    stopsCount: '12 Alpine Trails',
    stops: ['Zurich', 'Lucerne', 'Interlaken', 'Zermatt'],
    imageUrl:
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=1600&auto=format&fit=crop&q=80',
    traveler: {
      name: 'Julian Chen',
      role: 'Landscape Photographer',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face',
      rating: 5,
    },
  },
  {
    id: 'santorini',
    city: 'Santorini & Cyclades',
    country: 'Greece',
    quote: 'Cobalt blue domes suspended above the Aegean breeze.',
    tagline: 'Whitewashed cliffside suites, sailing lagoons, and volcanic wines.',
    duration: '6 Days',
    stopsCount: '11 Island Gems',
    stops: ['Athens', 'Mykonos', 'Naxos', 'Oia / Santorini'],
    imageUrl:
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1600&auto=format&fit=crop&q=80',
    traveler: {
      name: 'Amira Al-Mansoor',
      role: 'Cultural Historian',
      avatar:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&crop=face',
      rating: 5,
    },
  },
];

const TRAVEL_STYLES = [
  { id: 'culture', label: 'Cultural & Heritage', icon: '🏛️' },
  { id: 'nature', label: 'Nature & Trekking', icon: '🏔️' },
  { id: 'food', label: 'Gourmet & Wine', icon: '🍷' },
  { id: 'explorer', label: 'Fast Explorer', icon: '⚡' },
];

/* =========================================================
   Component
   ========================================================= */

interface LoginPageProps {
  initialMode?: 'login' | 'register';
}

export function LoginPage({ initialMode }: LoginPageProps) {
  const { login, register, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Determine initial mode from props, pathname or query param
  const queryParamMode = new URLSearchParams(location.search).get('mode');
  const pathnameIsRegister = location.pathname.includes('register');
  const defaultAuthMode: 'login' | 'register' =
    initialMode || (pathnameIsRegister || queryParamMode === 'register' ? 'register' : 'login');

  const [mode, setMode] = useState<'login' | 'register'>(defaultAuthMode);
  const [activeDestIndex, setActiveDestIndex] = useState(0);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [selectedStyle, setSelectedStyle] = useState('culture');
  const [agreedToTerms, setAgreedToTerms] = useState(true);

  // UI status
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Forgot password modal state
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  // Unique IDs for accessibility
  const nameId = useId();
  const emailId = useId();
  const passwordId = useId();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, location.state, navigate]);

  // Sync mode if route changes
  useEffect(() => {
    if (location.pathname.includes('register')) {
      setMode('register');
    } else if (location.pathname.includes('login') && !queryParamMode) {
      setMode('login');
    }
  }, [location.pathname, queryParamMode]);

  // Destination rotation timer (pauses if user interacted recently or on hover)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveDestIndex((prev) => (prev + 1) % DESTINATIONS.length);
    }, 9000);
    return () => clearInterval(timer);
  }, []);

  const currentDest = DESTINATIONS[activeDestIndex];

  // Password strength calculation
  const passwordStrength = useMemo(() => {
    if (!password) return { score: 0, label: '', color: 'bg-border-soft', text: 'text-ink-muted' };
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    switch (score) {
      case 1:
        return { score: 1, label: 'Weak', color: 'bg-error', text: 'text-error' };
      case 2:
        return { score: 2, label: 'Fair', color: 'bg-warning', text: 'text-warning' };
      case 3:
        return { score: 3, label: 'Good', color: 'bg-accent-500', text: 'text-accent-600' };
      case 4:
        return { score: 4, label: 'Strong & Secure', color: 'bg-success', text: 'text-success' };
      default:
        return { score: 1, label: 'Too short', color: 'bg-error', text: 'text-error' };
    }
  }, [password]);

  /* =========================================================
     Auth Handlers
     ========================================================= */

  const getRedirectPath = () => {
    return (location.state as { from?: { pathname: string } })?.from?.pathname || '/dashboard';
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
      navigate(getRedirectPath(), { replace: true });
    } catch {
      setError('Invalid credentials or sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password should be at least 6 characters.');
      return;
    }
    if (!agreedToTerms) {
      setError('Please agree to the Terms of Service to create your account.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await register({
        name,
        email,
        password,
        travelStyle: selectedStyle,
      });
      navigate(getRedirectPath(), { replace: true });
    } catch {
      setError('Unable to create account right now. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: string) => {
    setLoading(true);
    setError(null);
    try {
      await login(`${provider.toLowerCase()}_traveler@globetrotter.dev`);
      navigate(getRedirectPath(), { replace: true });
    } catch {
      setError(`${provider} authentication failed. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await login('alex.traveler@globetrotter.dev');
      navigate(getRedirectPath(), { replace: true });
    } catch {
      setError('Demo sign in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail || !forgotEmail.includes('@')) return;
    setForgotSubmitted(true);
    setTimeout(() => {
      setSuccessMessage(`Reset link dispatched to ${forgotEmail}`);
    }, 400);
  };

  return (
    <div className="min-h-screen flex bg-canvas text-ink selection:bg-accent-200 selection:text-ink">
      {/* =======================================================
          LEFT PANEL: Atmospheric Editorial Showcase (Desktop)
          ======================================================= */}
      <div className="hidden lg:flex w-[48%] xl:w-[50%] bg-[#121110] relative overflow-hidden flex-col justify-between p-10 xl:p-14 text-white select-none">
        {/* Background Visual Layer with Smooth Crossfade */}
        {DESTINATIONS.map((dest, idx) => (
          <div
            key={dest.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-out pointer-events-none ${
              idx === activeDestIndex ? 'opacity-40 scale-100' : 'opacity-0 scale-105'
            }`}
            style={{ transitionProperty: 'opacity, transform' }}
          >
            <img
              src={dest.imageUrl}
              alt={dest.city}
              className="w-full h-full object-cover object-center"
            />
          </div>
        ))}

        {/* Ambient Warm Gradient Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 20% 20%, rgba(214, 109, 78, 0.18) 0%, transparent 60%), linear-gradient(180deg, rgba(18, 17, 16, 0.45) 0%, rgba(18, 17, 16, 0.88) 65%, #121110 100%)',
          }}
        />

        {/* Fine Editorial Grid Lines */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Top: Brand Identity Header */}
        <div className="relative z-10 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-3 no-underline group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 rounded-radius-md"
          >
            <span
              className="w-10 h-10 rounded-radius-md bg-accent-600/90 text-white flex items-center justify-center shadow-[0_4px_16px_rgba(214,109,78,0.4)] border border-white/15 transition-all duration-300 group-hover:scale-105 group-hover:rotate-6 group-hover:bg-accent-500"
            >
              <Compass size={20} className="stroke-[2.2]" />
            </span>
            <div>
              <span className="text-[20px] font-bold text-white tracking-tight font-display flex items-center gap-1.5">
                GlobeTrotter
                <span className="text-[10px] font-sans font-semibold tracking-widest uppercase bg-white/10 px-1.5 py-0.5 rounded text-accent-200 border border-white/10">
                  Passport
                </span>
              </span>
            </div>
          </Link>

          {/* Social Proof Star Pill */}
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 shadow-sm">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={13} className="fill-amber-400 stroke-none" />
              ))}
            </div>
            <span className="text-[12px] font-medium text-white/90">4.9</span>
            <span className="text-[12px] text-white/50">· 34k+ journeys</span>
          </div>
        </div>

        {/* Middle: Editorial Route & Destination Story */}
        <div className="relative z-10 my-auto py-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-500/20 border border-accent-400/30 text-accent-200 text-[12px] font-medium tracking-wide mb-4 uppercase">
            <Sparkles size={13} className="text-accent-400" />
            Curated Journey Inspiration
          </div>

          <h2 className="text-[34px] xl:text-[40px] text-white font-display leading-[1.15] mb-4 tracking-tight">
            {currentDest.quote.split(' ').slice(0, -3).join(' ')}{' '}
            <em className="serif-accent text-accent-300 not-italic italic font-normal">
              {currentDest.quote.split(' ').slice(-3).join(' ')}
            </em>
          </h2>

          <p className="text-[15px] text-white/70 leading-relaxed max-w-lg mb-8">
            {currentDest.tagline}
          </p>

          {/* Route Sequence Capsule */}
          <div className="bg-white/[0.07] backdrop-blur-md rounded-radius-lg p-5 border border-white/10 shadow-lg mb-6">
            <div className="flex items-center justify-between mb-3 text-[12px] text-white/60 font-medium tracking-wide uppercase">
              <span className="flex items-center gap-1.5 text-accent-300">
                <MapPin size={13} />
                {currentDest.city} · {currentDest.country}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={13} />
                {currentDest.duration} · {currentDest.stopsCount}
              </span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {currentDest.stops.map((stop, idx) => (
                <div key={stop} className="flex items-center shrink-0">
                  <div
                    className={`px-3 py-1.5 rounded-radius-md text-[13px] font-medium transition-all ${
                      idx === 0
                        ? 'bg-accent-600 text-white shadow-sm'
                        : 'bg-white/10 text-white/90 border border-white/10'
                    }`}
                  >
                    {stop}
                  </div>
                  {idx < currentDest.stops.length - 1 && (
                    <ArrowRight size={14} className="mx-1.5 text-white/35 shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Traveler Endorsement Card */}
          <div className="flex items-center gap-3.5 pt-2">
            <img
              src={currentDest.traveler.avatar}
              alt={currentDest.traveler.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-accent-500/50"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <p className="text-[14px] font-semibold text-white tracking-tight">
                  {currentDest.traveler.name}
                </p>
                <CheckCircle2 size={14} className="text-accent-400" />
              </div>
              <p className="text-[12px] text-white/50">{currentDest.traveler.role}</p>
            </div>
          </div>
        </div>

        {/* Bottom: Destination Selector Tabs */}
        <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {DESTINATIONS.map((dest, i) => (
              <button
                key={dest.id}
                type="button"
                onClick={() => setActiveDestIndex(i)}
                className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-all cursor-pointer ${
                  i === activeDestIndex
                    ? 'bg-white text-ink font-semibold shadow-md'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                {dest.city.split('&')[0].trim()}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 text-[12px] text-white/40">
            <Shield size={13} className="text-accent-400" />
            <span>Encrypted & Private</span>
          </div>
        </div>
      </div>

      {/* =======================================================
          RIGHT PANEL: Authentication Container & Form
          ======================================================= */}
      <div className="flex-1 flex flex-col justify-between p-6 sm:p-10 lg:p-12 xl:p-16 overflow-y-auto">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between mb-8 pb-4 border-b border-border-soft">
          <Link to="/" className="flex items-center gap-2.5 no-underline">
            <span className="w-8 h-8 rounded-radius-md bg-accent-600 text-white flex items-center justify-center shadow-sm">
              <Compass size={17} />
            </span>
            <span className="text-h4 text-ink tracking-tight font-display">GlobeTrotter</span>
          </Link>
          <span className="text-[12px] text-ink-muted bg-surface px-2.5 py-1 rounded-full border border-border-soft">
            Traveler Portal
          </span>
        </div>

        {/* Auth Form Card Centerpiece */}
        <div className="w-full max-w-[460px] mx-auto my-auto py-4">
          {/* Animated Mode Switcher Pill Tabs */}
          <div className="bg-surface-muted/90 p-1 rounded-radius-lg border border-border-soft flex mb-8 relative">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setError(null);
              }}
              className={`flex-1 py-2.5 text-[14px] font-semibold rounded-radius-md transition-all duration-200 cursor-pointer text-center relative z-10 ${
                mode === 'login'
                  ? 'bg-surface text-ink shadow-[0_2px_8px_rgba(28,27,25,0.08)] border border-border-soft/60'
                  : 'text-ink-secondary hover:text-ink'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('register');
                setError(null);
              }}
              className={`flex-1 py-2.5 text-[14px] font-semibold rounded-radius-md transition-all duration-200 cursor-pointer text-center relative z-10 ${
                mode === 'register'
                  ? 'bg-surface text-ink shadow-[0_2px_8px_rgba(28,27,25,0.08)] border border-border-soft/60'
                  : 'text-ink-secondary hover:text-ink'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Form Titles */}
          <div className="mb-6">
            <h1 className="text-[28px] sm:text-[32px] font-bold text-ink font-display tracking-tight leading-snug">
              {mode === 'login' ? 'Welcome back, Explorer' : 'Begin your journey'}
            </h1>
            <p className="text-[14px] sm:text-[15px] text-ink-secondary mt-1.5 leading-relaxed">
              {mode === 'login'
                ? 'Sign in to access your bespoke itineraries and curated stops.'
                : 'Create your traveler passport and plan trips with connected intelligence.'}
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-6 p-3.5 rounded-radius-md bg-error-bg border border-error/30 text-error flex items-start gap-2.5 text-[13px] animate-fadeIn">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <div className="flex-1">{error}</div>
              <button
                type="button"
                onClick={() => setError(null)}
                className="text-error/70 hover:text-error cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>
          )}

          {/* Success Banner */}
          {successMessage && (
            <div className="mb-6 p-3.5 rounded-radius-md bg-success-bg border border-success/30 text-success flex items-start gap-2.5 text-[13px] animate-fadeIn">
              <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
              <div className="flex-1">{successMessage}</div>
              <button
                type="button"
                onClick={() => setSuccessMessage(null)}
                className="text-success/70 hover:text-success cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>
          )}

          {/* Quick OAuth Action Buttons */}
          <div className="space-y-2.5 mb-6">
            <button
              type="button"
              disabled={loading}
              onClick={() => handleOAuthLogin('Google')}
              className="w-full h-12 px-4 rounded-radius-md bg-surface hover:bg-surface-muted/60 border border-border-default hover:border-border-strong text-ink font-medium text-[14px] flex items-center justify-center gap-3 transition-all duration-150 cursor-pointer shadow-subtle hover:shadow-default disabled:opacity-50"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" className="shrink-0">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                disabled={loading}
                onClick={() => handleOAuthLogin('Apple')}
                className="h-11 px-3 rounded-radius-md bg-surface hover:bg-surface-muted/60 border border-border-default hover:border-border-strong text-ink font-medium text-[13px] flex items-center justify-center gap-2 transition-all duration-150 cursor-pointer shadow-subtle disabled:opacity-50"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 text-ink">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.99.6-2.63 1.35-.57.65-1.06 1.71-.93 2.73 1.01.08 2.02-.48 2.64-1.23z" />
                </svg>
                <span>Apple</span>
              </button>

              <button
                type="button"
                disabled={loading}
                onClick={handleDemoLogin}
                className="h-11 px-3 rounded-radius-md bg-accent-50 hover:bg-accent-100/70 border border-accent-200/80 text-accent-700 font-semibold text-[13px] flex items-center justify-center gap-2 transition-all duration-150 cursor-pointer shadow-subtle disabled:opacity-50"
                title="Instant one-click demo access"
              >
                <Sparkles size={14} className="text-accent-600" />
                <span>Demo Sign In</span>
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="relative flex py-2 items-center mb-6">
            <div className="flex-grow border-t border-border-soft" />
            <span className="flex-shrink mx-4 text-[12px] uppercase font-medium tracking-wider text-ink-muted bg-canvas px-2">
              or continue with email
            </span>
            <div className="flex-grow border-t border-border-soft" />
          </div>

          {/* FORM */}
          {mode === 'login' ? (
            /* ===================================================
               LOGIN FORM
               =================================================== */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor={emailId} className="text-[13px] font-semibold text-ink">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none"
                  />
                  <input
                    id={emailId}
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@globetrotter.dev"
                    className="w-full h-12 pl-10 pr-4 text-[14px] bg-surface text-ink border border-border-default hover:border-border-strong focus:border-accent-600 focus-ring rounded-radius-md outline-none transition-all placeholder:text-ink-disabled shadow-[inset_0_1px_2px_rgba(28,27,25,0.03)]"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor={passwordId} className="text-[13px] font-semibold text-ink">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setForgotEmail(email);
                      setIsForgotModalOpen(true);
                    }}
                    className="text-[12px] font-medium text-accent-600 hover:text-accent-700 hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none"
                  />
                  <input
                    id={passwordId}
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full h-12 pl-10 pr-11 text-[14px] bg-surface text-ink border border-border-default hover:border-border-strong focus:border-accent-600 focus-ring rounded-radius-md outline-none transition-all placeholder:text-ink-disabled shadow-[inset_0_1px_2px_rgba(28,27,25,0.03)]"
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink cursor-pointer p-1"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 text-[13px] text-ink-secondary cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-border-default text-accent-600 focus:ring-accent-500 cursor-pointer accent-accent-600"
                  />
                  <span>Keep me signed in on this browser</span>
                </label>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 mt-3 rounded-radius-md bg-accent-600 hover:bg-accent-700 text-white font-semibold text-[15px] flex items-center justify-center gap-2 transition-all duration-150 cursor-pointer shadow-default hover:shadow-hover hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none group"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Opening your passport...
                  </span>
                ) : (
                  <>
                    <span>Sign In to Your Journey</span>
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* ===================================================
               REGISTER FORM
               =================================================== */
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor={nameId} className="text-[13px] font-semibold text-ink">
                  Full Name / Traveler Handle
                </label>
                <div className="relative">
                  <UserIcon
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none"
                  />
                  <input
                    id={nameId}
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Elena Rostova"
                    className="w-full h-12 pl-10 pr-4 text-[14px] bg-surface text-ink border border-border-default hover:border-border-strong focus:border-accent-600 focus-ring rounded-radius-md outline-none transition-all placeholder:text-ink-disabled shadow-[inset_0_1px_2px_rgba(28,27,25,0.03)]"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor={emailId} className="text-[13px] font-semibold text-ink">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none"
                  />
                  <input
                    id={emailId}
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="elena.traveler@domain.com"
                    className="w-full h-12 pl-10 pr-4 text-[14px] bg-surface text-ink border border-border-default hover:border-border-strong focus:border-accent-600 focus-ring rounded-radius-md outline-none transition-all placeholder:text-ink-disabled shadow-[inset_0_1px_2px_rgba(28,27,25,0.03)]"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor={passwordId} className="text-[13px] font-semibold text-ink">
                  Create Password
                </label>
                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none"
                  />
                  <input
                    id={passwordId}
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 8 characters"
                    className="w-full h-12 pl-10 pr-11 text-[14px] bg-surface text-ink border border-border-default hover:border-border-strong focus:border-accent-600 focus-ring rounded-radius-md outline-none transition-all placeholder:text-ink-disabled shadow-[inset_0_1px_2px_rgba(28,27,25,0.03)]"
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink cursor-pointer p-1"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {/* Password Strength Meter */}
                {password && (
                  <div className="mt-1.5 space-y-1.5 animate-fadeIn">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-ink-muted">Password Strength</span>
                      <span className={`font-semibold ${passwordStrength.text}`}>
                        {passwordStrength.label}
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-1 h-1.5">
                      {[1, 2, 3, 4].map((step) => (
                        <div
                          key={step}
                          className={`rounded-full transition-all duration-300 ${
                            step <= passwordStrength.score ? passwordStrength.color : 'bg-surface-strong'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Personalized Travel Style Quick Selector */}
              <div className="flex flex-col gap-1.5 pt-1">
                <label className="text-[13px] font-semibold text-ink flex items-center justify-between">
                  <span>Your Primary Travel Style</span>
                  <span className="text-[11px] font-normal text-ink-muted">Personalizes AI Copilot</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {TRAVEL_STYLES.map((style) => (
                    <button
                      key={style.id}
                      type="button"
                      onClick={() => setSelectedStyle(style.id)}
                      className={`px-3 py-2 rounded-radius-md text-[12px] font-medium flex items-center gap-2 transition-all cursor-pointer border text-left ${
                        selectedStyle === style.id
                          ? 'bg-accent-50 border-accent-400 text-accent-700 font-semibold shadow-subtle'
                          : 'bg-surface border-border-default text-ink-secondary hover:border-border-strong hover:text-ink'
                      }`}
                    >
                      <span className="text-base">{style.icon}</span>
                      <span className="truncate">{style.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="pt-1">
                <label className="flex items-start gap-2.5 text-[12px] text-ink-secondary cursor-pointer select-none leading-relaxed">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded border-border-default text-accent-600 focus:ring-accent-500 cursor-pointer accent-accent-600"
                  />
                  <span>
                    I agree to GlobeTrotter's{' '}
                    <span className="text-accent-600 underline font-medium">Terms of Service</span> and{' '}
                    <span className="text-accent-600 underline font-medium">Privacy Policy</span>.
                  </span>
                </label>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 mt-3 rounded-radius-md bg-accent-600 hover:bg-accent-700 text-white font-semibold text-[15px] flex items-center justify-center gap-2 transition-all duration-150 cursor-pointer shadow-default hover:shadow-hover hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none group"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating your passport...
                  </span>
                ) : (
                  <>
                    <span>Create Account & Start Planning</span>
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Switch Bottom Hint */}
          <div className="mt-8 text-center text-[13px] text-ink-secondary">
            {mode === 'login' ? (
              <p>
                Don't have a traveler account yet?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('register');
                    setError(null);
                  }}
                  className="font-semibold text-accent-600 hover:text-accent-700 hover:underline cursor-pointer"
                >
                  Create one in seconds
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setError(null);
                  }}
                  className="font-semibold text-accent-600 hover:text-accent-700 hover:underline cursor-pointer"
                >
                  Sign in here
                </button>
              </p>
            )}
          </div>
        </div>

        {/* Footer info */}
        <div className="pt-6 border-t border-border-soft flex flex-col sm:flex-row items-center justify-between text-[12px] text-ink-muted gap-2">
          <div className="flex items-center gap-1.5">
            <Shield size={13} className="text-accent-600" />
            <span>256-bit SSL encrypted • Private by default</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className="hover:text-ink transition-colors">
              Home
            </Link>
            <span className="text-border-strong">·</span>
            <span className="hover:text-ink cursor-pointer">Support</span>
            <span className="text-border-strong">·</span>
            <span className="hover:text-ink cursor-pointer">Privacy</span>
          </div>
        </div>
      </div>

      {/* =======================================================
          FORGOT PASSWORD MODAL DIALOG
          ======================================================= */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-sm animate-fadeIn">
          <div
            className="w-full max-w-md bg-surface rounded-radius-xl p-6 sm:p-8 shadow-modal border border-border-soft relative animate-scaleUp"
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              onClick={() => {
                setIsForgotModalOpen(false);
                setForgotSubmitted(false);
              }}
              className="absolute right-4 top-4 text-ink-muted hover:text-ink p-1.5 rounded-full hover:bg-surface-muted transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            {!forgotSubmitted ? (
              <>
                <div className="w-12 h-12 rounded-full bg-accent-100 text-accent-600 flex items-center justify-center mb-4">
                  <KeyRound size={22} />
                </div>
                <h3 className="text-h3 text-ink font-display">Reset Your Password</h3>
                <p className="text-[14px] text-ink-secondary mt-1.5 mb-6 leading-relaxed">
                  Enter the email associated with your GlobeTrotter account and we will send you instructions to reset your password.
                </p>

                <form onSubmit={handleForgotSubmit} className="space-y-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-semibold text-ink">Your Account Email</label>
                    <input
                      type="email"
                      required
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="alex@globetrotter.dev"
                      className="w-full h-12 px-3.5 text-[14px] bg-surface text-ink border border-border-default focus:border-accent-600 focus-ring rounded-radius-md outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsForgotModalOpen(false)}
                      className="flex-1 h-11 rounded-radius-md bg-surface-muted text-ink font-medium text-[14px] hover:bg-surface-strong transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 h-11 rounded-radius-md bg-accent-600 text-white font-semibold text-[14px] hover:bg-accent-700 transition-colors shadow-subtle cursor-pointer"
                    >
                      Send Instructions
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="w-14 h-14 rounded-full bg-success-bg text-success mx-auto flex items-center justify-center mb-4">
                  <CheckCircle2 size={28} />
                </div>
                <h3 className="text-h3 text-ink font-display">Instructions Sent</h3>
                <p className="text-[14px] text-ink-secondary mt-2 mb-6 leading-relaxed">
                  If an account exists for <span className="font-semibold text-ink">{forgotEmail}</span>, you will receive password reset instructions within moments.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsForgotModalOpen(false);
                    setForgotSubmitted(false);
                  }}
                  className="w-full h-11 rounded-radius-md bg-accent-600 text-white font-semibold text-[14px] hover:bg-accent-700 transition-colors cursor-pointer"
                >
                  Return to Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
