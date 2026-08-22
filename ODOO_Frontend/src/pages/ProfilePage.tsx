/**
 * ProfilePage — UI_UX_BLUEPRINT §6.12.
 * Travel preferences as an elegant preference sheet.
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/features/auth/AuthProvider';
import { Check, ChevronLeft } from 'lucide-react';

const travelStyles = ['Adventurous', 'Relaxed', 'Cultural', 'Luxury', 'Budget', 'Balanced'];
const budgetPreferences = ['Budget', 'Moderate', 'Premium', 'Luxury'];
const interests = [
  'Temples & Shrines', 'Food & Cuisine', 'Nature', 'Nightlife',
  'Shopping', 'Art & Museums', 'Photography', 'Architecture',
  'Beach', 'Hiking', 'History', 'Local Markets',
];

export function ProfilePage() {
  const { user } = useAuth();
  const [selectedStyle, setSelectedStyle] = useState<string>('Cultural');
  const [selectedBudget, setSelectedBudget] = useState<string>('Moderate');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Temples & Shrines', 'Food & Cuisine']);
  const [saved, setSaved] = useState(false);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2400);
  };

  return (
    <div className="max-w-[720px] mx-auto px-4 md:px-8 py-10 md:py-14">
      {/* Back */}
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-1.5 text-body-sm font-medium text-ink-secondary no-underline hover:text-ink transition-colors mb-10 focus-ring rounded-[2px]"
        style={{ transitionDuration: 'var(--duration-micro)' }}
      >
        <ChevronLeft size={15} />
        Dashboard
      </Link>

      {/* Identity */}
      <header className="rise flex items-center gap-5 pb-9 mb-11 border-b border-border-default">
        {user?.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-16 h-16 rounded-full object-cover ring-4 ring-accent-100 shrink-0"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-accent-100 flex items-center justify-center text-accent-600 font-display shrink-0" style={{ fontSize: 28 }}>
            {user?.name?.[0] || '?'}
          </div>
        )}
        <div className="min-w-0">
          <span className="text-label text-accent-600">Travel profile</span>
          <h1 className="font-display text-trip-title text-ink mt-1 leading-tight truncate">{user?.name}</h1>
          <p className="text-body-sm text-ink-muted mt-0.5">{user?.email}</p>
        </div>
      </header>

      <div className="space-y-12">
        <PreferenceSection number="01" title="Travel style" subtitle="How do you prefer to travel?" delay={60}>
          {travelStyles.map((style) => (
            <Chip key={style} label={style} selected={selectedStyle === style} onClick={() => setSelectedStyle(style)} />
          ))}
        </PreferenceSection>

        <PreferenceSection number="02" title="Budget preference" subtitle="What's your typical spending level?" delay={120}>
          {budgetPreferences.map((pref) => (
            <Chip key={pref} label={pref} selected={selectedBudget === pref} onClick={() => setSelectedBudget(pref)} />
          ))}
        </PreferenceSection>

        <PreferenceSection number="03" title="Interests" subtitle="What do you enjoy most while traveling?" delay={180}>
          {interests.map((interest) => (
            <Chip
              key={interest}
              label={interest}
              selected={selectedInterests.includes(interest)}
              onClick={() => toggleInterest(interest)}
            />
          ))}
        </PreferenceSection>
      </div>

      {/* Save */}
      <div className="flex items-center gap-4 pt-11 mt-2 border-t border-border-default">
        <Button size="lg" onClick={handleSave}>Save Preferences</Button>
        {saved && (
          <span className="fade-in inline-flex items-center gap-1.5 text-body-sm font-medium text-success">
            <Check size={16} /> Preferences updated
          </span>
        )}
      </div>
    </div>
  );
}

/* ---- Section scaffold ---- */

function PreferenceSection({
  number,
  title,
  subtitle,
  children,
  delay,
}: {
  number: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <section className="rise grid grid-cols-[44px_1fr] gap-x-5" style={{ animationDelay: `${delay}ms` }}>
      <span className="text-label text-ink-disabled tabular-nums pt-1">{number}</span>
      <div>
        <h2 className="text-h3 font-display text-ink">{title}</h2>
        <p className="text-body-sm text-ink-muted mt-1 mb-5">{subtitle}</p>
        <div className="flex flex-wrap gap-2">{children}</div>
      </div>
    </section>
  );
}

/* ---- Preference chip ---- */

function Chip({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={selected}
      className={[
        'inline-flex items-center gap-1.5 h-[38px] px-4 rounded-radius-full text-body-sm font-medium border cursor-pointer transition-all focus-ring',
        selected
          ? 'bg-accent-600 border-accent-600 text-white shadow-default'
          : 'bg-surface border-border-default text-ink-secondary hover:border-border-strong hover:text-ink',
      ].join(' ')}
      style={{ transitionDuration: 'var(--duration-micro)' }}
    >
      {selected && <Check size={13} />}
      {label}
    </button>
  );
}
