/**
 * LandingPage — "Must Look Excellent"
 *
 * Per UI_UX_BLUEPRINT §6.1: navigation, hero, journey preview,
 * planning layers, AI explanation, sharing concept, final CTA.
 */

import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/features/auth/AuthProvider';
import { Compass, ArrowRight, ArrowDown, Sparkles } from 'lucide-react';

const heroStops = [
  {
    city: 'Tokyo',
    country: 'Japan',
    days: '3 days',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=480&h=320&fit=crop',
  },
  {
    city: 'Kyoto',
    country: 'Japan',
    days: '4 days',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=480&h=320&fit=crop',
  },
  {
    city: 'Osaka',
    country: 'Japan',
    days: '3 days',
    image: 'https://images.unsplash.com/photo-1590559899731-a382839e5549?w=480&h=320&fit=crop',
  },
];

const tickerCities = [
  'Tokyo', 'Kyoto', 'Osaka', 'Paris', 'Rome', 'Lisbon', 'Seoul',
  'Marrakech', 'Hanoi', 'Barcelona', 'Copenhagen', 'Mexico City',
];

const planningLenses = [
  ['01', 'Route & stops', 'Build a multi-city sequence where the route stays visible through every decision.'],
  ['02', 'Day-wise itinerary', 'Shape each day around moments, movement, and room to wander.'],
  ['03', 'Budget in context', 'See what the journey costs without losing sight of the experience.'],
  ['04', 'A thoughtful copilot', 'Ask for better pacing, smarter choices, and practical trade-offs.'],
];

export function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleStartPlanning = () => {
    navigate(isAuthenticated ? '/dashboard' : '/login');
  };

  return (
    <div className="min-h-screen bg-canvas">
      {/* ===== Navigation ===== */}
      <header className="sticky top-0 z-40 border-b border-border-soft bg-canvas/85 backdrop-blur-md">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between px-4 md:px-8 lg:px-12 h-[72px]">
          <Link to="/" className="flex items-center gap-2.5 no-underline group">
            <span className="w-8 h-8 rounded-radius-md bg-accent-600 text-white flex items-center justify-center shadow-[0_1px_2px_rgba(28,27,25,0.14)] transition-transform group-hover:rotate-12" style={{ transitionDuration: 'var(--duration-normal)' }}>
              <Compass size={17} />
            </span>
            <span className="text-h4 text-ink tracking-tight">GlobeTrotter</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#lenses" className="text-body-sm text-ink-secondary hover:text-ink no-underline transition-colors" style={{ transitionDuration: 'var(--duration-micro)' }}>Planning layers</a>
            <a href="#copilot" className="text-body-sm text-ink-secondary hover:text-ink no-underline transition-colors" style={{ transitionDuration: 'var(--duration-micro)' }}>Copilot</a>
            <a href="#share" className="text-body-sm text-ink-secondary hover:text-ink no-underline transition-colors" style={{ transitionDuration: 'var(--duration-micro)' }}>Sharing</a>
          </nav>

          <div className="flex items-center gap-2">
            <Link to="/login" className="hidden sm:block text-body-sm font-medium text-ink-secondary hover:text-ink no-underline px-3 py-2 transition-colors" style={{ transitionDuration: 'var(--duration-micro)' }}>
              Login
            </Link>
            <Button size="sm" onClick={handleStartPlanning}>
              Start Planning
            </Button>
          </div>
        </div>
      </header>

      {/* ===== Hero ===== */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 pt-14 md:pt-24 pb-16 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-[0.92fr_1.08fr] items-center gap-14 lg:gap-20">
          {/* Text side — 45% */}
          <div>
            <span className="rise text-label text-accent-600 inline-flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-accent-600" />
              The connected travel planner
            </span>
            <h1 className="rise text-hero text-ink mt-6 mb-7 max-w-[600px]" style={{ animationDelay: '70ms' }}>
              Plan the <em className="serif-accent text-accent-600">journey</em>,
              not just the destination.
            </h1>
            <p className="rise text-body-lg text-ink-secondary max-w-[480px] mb-10 leading-relaxed" style={{ animationDelay: '140ms' }}>
              GlobeTrotter keeps your route, days, costs, and ideas in one
              connected workspace — so every decision stays attached to the trip.
            </p>
            <div className="rise flex flex-wrap items-center gap-5" style={{ animationDelay: '210ms' }}>
              <Button size="lg" onClick={handleStartPlanning} icon={<ArrowRight size={18} />}>
                Start Planning
              </Button>
              <a
                href="#lenses"
                className="inline-flex items-center gap-1.5 text-body-sm font-semibold text-ink-secondary hover:text-ink no-underline transition-colors group"
                style={{ transitionDuration: 'var(--duration-micro)' }}
              >
                See how it works
                <ArrowDown size={15} className="transition-transform group-hover:translate-y-0.5" />
              </a>
            </div>
            <p className="rise text-caption text-ink-muted mt-8" style={{ animationDelay: '280ms' }}>
              Multi-city routes · Day-wise plans · Shared travel stories
            </p>
          </div>

          {/* Visual side — 55%: signature journey composition */}
          <div className="relative w-full rise" style={{ animationDelay: '160ms' }}>
            <div className="relative overflow-hidden bg-surface border border-border-default rounded-radius-xl p-6 md:p-9 shadow-default">
              <div className="flex items-center justify-between pb-6 mb-7 border-b border-border-soft">
                <span className="text-label text-accent-600">A ten-day Japanese route</span>
                <span className="text-caption text-ink-muted tabular-nums">June 2026 · 3 cities</span>
              </div>

              <div className="flex flex-col relative">
                {heroStops.map((stop, i) => (
                  <div key={stop.city} className="flex gap-5">
                    {/* Route spine */}
                    <div className="flex flex-col items-center shrink-0 w-7 pt-1">
                      <span className="text-label text-ink-muted tabular-nums mb-1.5" style={{ fontSize: '10px' }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className={['w-3.5 h-3.5 rounded-full shrink-0', i === 0 ? 'bg-accent-600 ring-4 ring-accent-100' : 'border-2 border-border-strong bg-surface'].join(' ')} />
                      {i < heroStops.length - 1 && (
                        <div className="w-px flex-1 min-h-[44px] my-1.5 border-l border-dashed border-border-strong" />
                      )}
                    </div>

                    {/* Destination row */}
                    <div className={`group flex-1 flex items-center gap-5 min-w-0 ${i < heroStops.length - 1 ? 'pb-7' : ''}`}>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-h2 text-ink leading-tight">{stop.city}</h3>
                        <p className="text-body-sm text-ink-muted mt-0.5">{stop.country}</p>
                        <span className="text-caption text-accent-600 font-semibold mt-1.5 inline-block">{stop.days}</span>
                      </div>
                      <div className="w-32 h-[5.25rem] md:w-40 md:h-24 rounded-radius-md overflow-hidden shrink-0">
                        <img
                          src={stop.image}
                          alt={stop.city}
                          className="w-full h-full object-cover transition-transform group-hover:scale-[1.04]"
                          style={{ transitionDuration: 'var(--duration-panel)' }}
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating copilot chip — product storytelling */}
            <div className="absolute -bottom-5 left-5 md:-left-7 md:bottom-10 hidden sm:flex items-center gap-2.5 bg-surface border border-border-default rounded-radius-full pl-3 pr-4 py-2.5 shadow-hover">
              <Sparkles size={15} className="text-accent-600" />
              <span className="text-caption text-ink-secondary whitespace-nowrap">
                Copilot — Day 4 looks activity-heavy.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Destination ticker ===== */}
      <section className="ticker border-y border-border-soft bg-surface py-5 overflow-hidden" aria-hidden="true">
        <div className="ticker-track flex w-max items-center">
          {[...tickerCities, ...tickerCities].map((city, i) => (
            <span key={i} className="flex items-center shrink-0">
              <span className="text-label text-ink-muted px-6">{city}</span>
              <span className="w-1 h-1 rotate-45 bg-accent-500/70" />
            </span>
          ))}
        </div>
      </section>

      {/* ===== Planning Layers ===== */}
      <section id="lenses" className="scroll-mt-20 bg-surface-muted border-b border-border-soft py-20 md:py-28">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-[0.72fr_1.28fr] gap-12 lg:gap-24">
          <div className="lg:sticky lg:top-28 self-start">
            <span className="text-label text-accent-600">One trip, every angle</span>
            <h2 className="text-display-xl text-ink mt-4 mb-6 max-w-sm">
              Same journey.<br />Different lenses.
            </h2>
            <p className="text-body-lg text-ink-secondary max-w-sm leading-relaxed">
              Overview, itinerary, activities, budget, timeline — five views of
              one world, never five separate tools.
            </p>
          </div>

          <div>
            {planningLenses.map(([number, title, desc]) => (
              <div key={number} className="group grid grid-cols-[56px_1fr] sm:grid-cols-[72px_1fr_auto] gap-x-5 py-7 border-t border-border-default last:border-b transition-all cursor-default" style={{ transitionDuration: 'var(--duration-normal)' }}>
                <span className="text-metadata text-accent-600 tabular-nums pt-1.5">{number}</span>
                <div className="transition-transform group-hover:translate-x-1" style={{ transitionDuration: 'var(--duration-micro)' }}>
                  <h3 className="text-h3 text-ink mb-1.5">{title}</h3>
                  <p className="text-body-sm text-ink-secondary max-w-md leading-relaxed">{desc}</p>
                </div>
                <ArrowRight size={18} className="hidden sm:block self-center text-ink-disabled opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" style={{ transitionDuration: 'var(--duration-normal)' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Workspace specimen ===== */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-24 items-center">
          <div>
            <span className="text-label text-accent-600">Inside the workspace</span>
            <h2 className="text-display-xl text-ink mt-4 mb-6 max-w-md">
              A studio built<br />around the route.
            </h2>
            <p className="text-body-lg text-ink-secondary max-w-md mb-9 leading-relaxed">
              The trip identity stays fixed while you move between lenses.
              No generic dashboard — just your journey, seen clearly.
            </p>
            <div className="flex flex-col gap-4 max-w-md">
              {[
                ['Persistent trip identity', 'Name, route, and dates stay visible in every view.'],
                ['Timeline-first itinerary', 'Days read like a story — time, place, and rhythm.'],
                ['Costs attached to plans', 'Budget updates as experiences take shape.'],
              ].map(([title, desc]) => (
                <div key={title} className="flex gap-4 pb-4 border-b border-border-soft last:border-none last:pb-0">
                  <span className="w-1 h-1 rounded-full bg-accent-600 mt-2.5 shrink-0" />
                  <div>
                    <h4 className="text-h4 text-ink">{title}</h4>
                    <p className="text-body-sm text-ink-secondary mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Itinerary specimen */}
          <div className="bg-surface border border-border-default rounded-radius-xl p-7 md:p-10 shadow-default">
            <div className="flex items-end justify-between pb-5 mb-2 border-b border-border-soft">
              <div>
                <span className="text-label text-accent-600">Day 03 · Itinerary</span>
                <h3 className="text-trip-title text-ink mt-1">Kyoto</h3>
              </div>
              <span className="text-caption text-ink-muted tabular-nums">4 scheduled</span>
            </div>

            <div className="relative">
              <div className="absolute left-[63px] top-4 bottom-4 w-px bg-border-default" />
              {[
                ['09:00', 'Fushimi Inari Shrine', 'Thousands of vermillion torii gates', null],
                ['12:30', 'Nishiki Market lunch', 'Street food along the covered arcade', '¥3,000'],
                ['15:00', 'Kiyomizu-dera', 'Historic temple with panoramic views', '¥400'],
                ['19:30', 'Evening walk in Gion', 'Lantern-lit lanes as the crowds thin', null],
              ].map(([time, title, desc, cost], i, arr) => (
                <div key={time} className="relative flex items-start gap-4 py-3.5">
                  <span className="w-11 shrink-0 text-right text-metadata text-ink-muted tabular-nums pt-1">{time}</span>
                  <div className={['w-3 h-3 rounded-full shrink-0 mt-1 relative z-10', i === arr.length - 1 ? 'border-2 border-border-strong bg-surface' : 'bg-accent-600'].join(' ')} />
                  <div className="flex-1 min-w-0 pb-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <h4 className="text-h4 text-ink">{title}</h4>
                      {cost && <span className="text-metadata text-ink-secondary tabular-nums shrink-0">{cost}</span>}
                    </div>
                    <p className="text-body-sm text-ink-muted mt-0.5 truncate">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== AI / Personalization ===== */}
      <section id="copilot" className="scroll-mt-20 bg-surface-muted border-y border-border-soft py-20 md:py-28">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-[1.25fr_0.75fr] gap-12 lg:gap-24 items-start">
          <div>
            <span className="text-label text-accent-600">A copilot that knows the route</span>
            <h2 className="text-display-xl text-ink mt-4 mb-6 max-w-lg">
              Suggestions in <em className="serif-accent">context</em>,<br />never out of thin air.
            </h2>
            <p className="text-body-lg text-ink-secondary max-w-md leading-relaxed mb-6">
              The copilot reads the journey you've already drawn — pacing, costs,
              city rhythm — and proposes adjustments you review before anything changes.
            </p>
            <p className="text-caption text-ink-muted">
              Nothing applies without your review. Ever.
            </p>
          </div>

          {/* Suggestion specimen — mirrors the in-product recommendation card */}
          <div className="border-l-2 border-accent-600 border-y border-r border-border-soft bg-surface p-6 md:p-7 w-full max-w-md lg:max-w-none">
            <span className="text-label text-accent-600 inline-flex items-center gap-1.5">
              <Sparkles size={13} />
              AI suggestion
            </span>
            <h3 className="text-h4 text-ink mt-4 mb-1.5">Day 4 looks activity-heavy.</h3>
            <p className="text-body-sm text-ink-secondary mb-5 leading-relaxed">
              Move the tea ceremony to Day 5 for a calmer pace through Kyoto.
            </p>
            <div className="bg-surface-muted border-y border-border-soft p-3.5 text-[13px] mb-6">
              <div className="flex items-center gap-2 text-ink-muted mb-1.5">
                <span className="font-medium text-ink-secondary">Before:</span>
                <span>Day 4 · 2 activities</span>
              </div>
              <div className="flex items-center gap-2 text-accent-600 font-medium">
                <span>After:</span>
                <span>Day 4 · 1 · Day 5 · 1</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="secondary">Review</Button>
              <Button size="sm" variant="tertiary">Dismiss</Button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Sharing concept ===== */}
      <section id="share" className="scroll-mt-20 py-20 md:py-28">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-[0.72fr_1.28fr] gap-12 lg:gap-24 items-center">
          <div>
            <span className="text-label text-accent-600">Journeys are better shared</span>
            <h2 className="text-display-xl text-ink mt-4 mb-6 max-w-md">
              One link.<br />The whole story.
            </h2>
            <p className="text-body-lg text-ink-secondary max-w-sm leading-relaxed">
              Publish any trip as an editorial page — route, days, experiences —
              or let someone copy the entire plan as their own starting point.
            </p>
          </div>

          {/* Shared-page specimen */}
          <div className="bg-surface border border-border-default rounded-radius-xl p-7 md:p-10 shadow-default">
            <div className="flex items-baseline justify-between pb-6 border-b border-border-soft mb-7">
              <div>
                <span className="text-label text-accent-600">A shared journey</span>
                <h3 className="text-trip-title text-ink mt-1.5">Japan</h3>
              </div>
              <span className="text-label text-ink-muted tracking-[0.18em]">TOKYO → KYOTO → OSAKA</span>
            </div>
            <div className="flex flex-col">
              {[
                ['01', 'Tokyo', 'Senso-ji · Tsukiji · Shibuya'],
                ['02', 'Kyoto', 'Fushimi Inari · Tea ceremony'],
                ['03', 'Osaka', 'Dotonbori · Osaka Castle'],
              ].map(([num, city, detail]) => (
                <div key={num} className="flex items-baseline gap-5 py-3.5 border-b border-border-soft last:border-none">
                  <span className="text-caption text-accent-600 tabular-nums">{num}</span>
                  <span className="text-h4 font-display text-ink min-w-24">{city}</span>
                  <span className="text-body-sm text-ink-muted ml-auto text-right">{detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Final CTA ===== */}
      <section className="bg-ink py-24 md:py-32 text-center">
        <div className="max-w-[720px] mx-auto px-4">
          <span className="rise text-label text-white/50">Ready when you are</span>
          <h2 className="rise text-display-xl text-white mt-5 mb-5" style={{ animationDelay: '80ms' }}>
            Build your next trip.
          </h2>
          <p className="rise text-body-lg text-white/60 max-w-md mx-auto mb-10 leading-relaxed" style={{ animationDelay: '160ms' }}>
            Start with a city. Build the rest from there.
          </p>
          <div className="rise flex flex-wrap items-center justify-center gap-4" style={{ animationDelay: '240ms' }}>
            <Button size="lg" onClick={handleStartPlanning} icon={<ArrowRight size={18} />}>
              Start Planning
            </Button>
            <Link
              to="/shared/japan"
              className="inline-flex items-center justify-center h-[52px] px-7 rounded-radius-md border border-white/25 text-white text-[15px] font-semibold no-underline hover:bg-white/10 active:scale-[0.98] transition-all"
              style={{ transitionDuration: 'var(--duration-normal)' }}
            >
              Explore a shared trip
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="border-t border-border-soft bg-canvas">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-14">
          <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr] gap-10 md:gap-16 pb-10">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <span className="w-8 h-8 rounded-radius-md bg-accent-600 text-white flex items-center justify-center">
                  <Compass size={17} />
                </span>
                <span className="text-h4 text-ink tracking-tight">GlobeTrotter</span>
              </div>
              <p className="text-body-sm text-ink-secondary max-w-xs leading-relaxed">
                A visual travel workspace where the journey itself organizes the product.
              </p>
            </div>

            <div>
              <h4 className="text-label text-ink-muted mb-4">Product</h4>
              <div className="flex flex-col gap-2.5">
                <Link to="/" className="text-body-sm text-ink-secondary hover:text-ink no-underline transition-colors" style={{ transitionDuration: 'var(--duration-micro)' }}>Home</Link>
                <Link to="/dashboard" className="text-body-sm text-ink-secondary hover:text-ink no-underline transition-colors" style={{ transitionDuration: 'var(--duration-micro)' }}>Dashboard</Link>
                <Link to="/trips/new" className="text-body-sm text-ink-secondary hover:text-ink no-underline transition-colors" style={{ transitionDuration: 'var(--duration-micro)' }}>Create a trip</Link>
              </div>
            </div>

            <div>
              <h4 className="text-label text-ink-muted mb-4">Explore</h4>
              <div className="flex flex-col gap-2.5">
                <Link to="/shared/japan" className="text-body-sm text-ink-secondary hover:text-ink no-underline transition-colors" style={{ transitionDuration: 'var(--duration-micro)' }}>A shared journey</Link>
                <Link to="/login" className="text-body-sm text-ink-secondary hover:text-ink no-underline transition-colors" style={{ transitionDuration: 'var(--duration-micro)' }}>Sign in</Link>
                <Link to="/profile" className="text-body-sm text-ink-secondary hover:text-ink no-underline transition-colors" style={{ transitionDuration: 'var(--duration-micro)' }}>Profile</Link>
              </div>
            </div>
          </div>

          <div className="pt-7 border-t border-border-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="text-caption text-ink-muted">© 2026 GlobeTrotter</p>
            <p className="text-caption text-ink-muted">Built for travelers who sweat the details.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
