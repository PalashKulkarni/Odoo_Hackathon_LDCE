/**
 * CreateTripPage — Per UI_UX_BLUEPRINT §6.4:
 * - 50/50 split: editorial left + form right
 * - "Where is this journey going?" heading
 * - Form with actual schema fields only
 */

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { mockCreateTrip } from '@/lib/mock/services';
import { ArrowLeft } from 'lucide-react';

export function CreateTripPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.startDate || !form.endDate) return;

    setLoading(true);
    setError(null);
    try {
      const trip = await mockCreateTrip(form);
      navigate(`/trips/${trip.id}`);
    } catch {
      setError('Failed to create trip. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-10 py-8 md:py-16">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-body-sm text-ink-secondary hover:text-ink mb-8 bg-transparent border-none cursor-pointer transition-colors"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-24">
        {/* Editorial side — 50% */}
        <div>
          <span className="text-label text-accent-600">A new visual world</span>
          <h1 className="text-display-xl text-ink leading-tight mt-4">
            Where is this journey going?
          </h1>
          <p className="text-body-lg text-ink-secondary mt-4 max-w-md">
            Give your trip a name and dates. You'll add cities and activities once you're inside the workspace.
          </p>
        </div>

        {/* Form side — 50% */}
        <div className="max-w-lg lg:border-l lg:border-border-default lg:pl-10">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <Input
              label="Trip name"
              placeholder="Japan, Italy, Weekend getaway..."
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              required
            />

            <Input
              label="Description"
              placeholder="What's this trip about?"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Start date"
                type="date"
                value={form.startDate}
                onChange={(e) => setForm((f) => ({ ...f, startDate: e.target.value }))}
                required
              />
              <Input
                label="End date"
                type="date"
                value={form.endDate}
                onChange={(e) => setForm((f) => ({ ...f, endDate: e.target.value }))}
                required
              />
            </div>

            {error && (
              <p className="text-body-sm text-error">{error}</p>
            )}

            <div className="flex items-center gap-3 mt-2">
              <Button type="submit" loading={loading}>
                {loading ? 'Creating trip...' : 'Create Trip'}
              </Button>
              <Button type="button" variant="tertiary" onClick={() => navigate(-1)}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
