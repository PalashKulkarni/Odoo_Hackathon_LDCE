import { useState } from 'react';
import type { City, TripStop } from '@/types';
import { mockCities } from '@/lib/mock/data';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { MapPin, Plus } from 'lucide-react';

interface AddStopDialogProps {
  isOpen: boolean;
  onClose: () => void;
  tripId: string;
  existingStopsCount: number;
  onAddStop: (stop: TripStop) => void;
}

export function AddStopDialog({
  isOpen,
  onClose,
  tripId,
  existingStopsCount,
  onAddStop,
}: AddStopDialogProps) {
  const [selectedCity, setSelectedCity] = useState<City | null>(mockCities[0]);
  const [customCityName, setCustomCityName] = useState('');
  const [customCountry, setCustomCountry] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [isCustom, setIsCustom] = useState(false);

  // State re-initializes on open — the Modal unmounts children while closed.

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let city: City;
    if (isCustom) {
      if (!customCityName.trim()) return;
      city = {
        id: `city-${Date.now()}`,
        name: customCityName.trim(),
        country: customCountry.trim() || 'Global',
      };
    } else {
      if (!selectedCity) return;
      city = selectedCity;
    }

    const newStop: TripStop = {
      id: `stop-${Date.now()}`,
      tripId,
      cityId: city.id,
      city,
      sequence: existingStopsCount + 1,
      arrivalDate: arrivalDate || undefined,
      departureDate: departureDate || undefined,
      activities: [],
    };

    onAddStop(newStop);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Destination"
      description="Add a new city or stop along your journey."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* City selection options */}
        <div>
          <label className="text-body-sm font-semibold text-ink block mb-2">
            Select Destination
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
            {mockCities.map((city) => (
              <button
                type="button"
                key={city.id}
                onClick={() => {
                  setSelectedCity(city);
                  setIsCustom(false);
                }}
                className={[
                  'flex items-center gap-2.5 p-3 rounded-radius-md border text-left cursor-pointer transition-all focus-ring',
                  !isCustom && selectedCity?.id === city.id
                    ? 'bg-accent-50 border-accent-600 text-accent-600 font-semibold'
                    : 'bg-surface border-border-default text-ink-secondary hover:border-border-strong',
                ].join(' ')}
                style={{ transitionDuration: 'var(--duration-micro)' }}
              >
                <MapPin size={16} className="shrink-0" />
                <div className="truncate">
                  <div className="text-body-sm leading-tight truncate">{city.name}</div>
                  <div className="text-[11px] text-ink-muted leading-tight">{city.country}</div>
                </div>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setIsCustom(true)}
            className={[
              'text-body-sm text-accent-600 hover:text-accent-500 font-medium flex items-center gap-1 bg-transparent border-none cursor-pointer',
              isCustom ? 'underline' : '',
            ].join(' ')}
          >
            <Plus size={14} /> Or enter a custom city
          </button>
        </div>

        {isCustom && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-surface-muted rounded-radius-md border border-border-soft">
            <Input
              label="City name"
              placeholder="e.g. Hakone"
              value={customCityName}
              onChange={(e) => setCustomCityName(e.target.value)}
              required={isCustom}
            />
            <Input
              label="Country"
              placeholder="e.g. Japan"
              value={customCountry}
              onChange={(e) => setCustomCountry(e.target.value)}
            />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <Input
            label="Arrival date"
            type="date"
            value={arrivalDate}
            onChange={(e) => setArrivalDate(e.target.value)}
          />
          <Input
            label="Departure date"
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-end gap-2 pt-4 border-t border-border-soft">
          <Button type="button" variant="tertiary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Add Stop</Button>
        </div>
      </form>
    </Modal>
  );
}
