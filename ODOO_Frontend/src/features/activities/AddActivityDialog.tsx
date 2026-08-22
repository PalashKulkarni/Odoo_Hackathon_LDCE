import { useState } from 'react';
import type { TripStop, StopActivity, ActivityCategory } from '@/types';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { selectClassNames } from '@/components/ui/selectStyles';
import { ChevronDown } from 'lucide-react';

interface AddActivityDialogProps {
  isOpen: boolean;
  onClose: () => void;
  stops: TripStop[];
  defaultStopId?: string;
  defaultDay?: number;
  onAddActivity: (stopId: string, activity: StopActivity) => void;
}

const categories: { label: string; value: ActivityCategory }[] = [
  { label: 'Sightseeing', value: 'sightseeing' },
  { label: 'Food & Dining', value: 'food' },
  { label: 'Culture & Heritage', value: 'culture' },
  { label: 'Nature & Parks', value: 'nature' },
  { label: 'Shopping', value: 'shopping' },
  { label: 'Nightlife', value: 'nightlife' },
  { label: 'Transport', value: 'transport' },
  { label: 'Other', value: 'other' },
];

export function AddActivityDialog({
  isOpen,
  onClose,
  stops,
  defaultStopId,
  defaultDay = 1,
  onAddActivity,
}: AddActivityDialogProps) {
  const [stopId, setStopId] = useState(defaultStopId || stops[0]?.id || '');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ActivityCategory>('sightseeing');
  const [day, setDay] = useState(defaultDay);
  const [startTime, setStartTime] = useState('10:00');
  const [endTime, setEndTime] = useState('12:00');
  const [cost, setCost] = useState('');
  const [duration, setDuration] = useState('120');

  // State intentionally initializes fresh on each open — the Modal unmounts
  // its children while closed, so defaults re-sync without effects.

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !stopId) return;

    const currentStop = stops.find((s) => s.id === stopId);
    const newStopActivity: StopActivity = {
      id: `sa-${Date.now()}`,
      stopId,
      activityId: `act-${Date.now()}`,
      activity: {
        id: `act-${Date.now()}`,
        cityId: currentStop?.cityId || '',
        title: title.trim(),
        description: description.trim() || undefined,
        category,
        estimatedCost: cost ? parseFloat(cost) : 0,
        estimatedDuration: duration ? parseInt(duration, 10) : undefined,
      },
      day,
      startTime: startTime || undefined,
      endTime: endTime || undefined,
    };

    onAddActivity(stopId, newStopActivity);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Activity"
      description="Schedule a new experience into your itinerary."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Destination selector */}
        <div className="relative">
          <label htmlFor="activity-stop" className="text-[14px] font-semibold text-ink block mb-2">
            City / Stop
          </label>
          <select
            id="activity-stop"
            value={stopId}
            onChange={(e) => setStopId(e.target.value)}
            className={selectClassNames}
            required
          >
            {stops.map((stop) => (
              <option key={stop.id} value={stop.id}>
                {stop.city.name}, {stop.city.country}
              </option>
            ))}
          </select>
          <ChevronDown size={16} className="absolute right-3.5 top-[38px] text-ink-muted pointer-events-none" />
        </div>

        <Input
          label="Activity title"
          placeholder="e.g. Visit Senso-ji Temple"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <Input
          label="Description or notes"
          placeholder="e.g. Try fresh melon pan at the entrance"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Category */}
        <div className="relative">
          <label htmlFor="activity-category" className="text-[14px] font-semibold text-ink block mb-2">
            Category
          </label>
          <select
            id="activity-category"
            value={category}
            onChange={(e) => setCategory(e.target.value as ActivityCategory)}
            className={selectClassNames}
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
          <ChevronDown size={16} className="absolute right-3.5 top-[38px] text-ink-muted pointer-events-none" />
        </div>

        {/* Scheduling */}
        <div className="grid grid-cols-3 gap-3">
          <Input
            label="Day #"
            type="number"
            min="1"
            max="30"
            value={day}
            onChange={(e) => setDay(parseInt(e.target.value, 10) || 1)}
            required
          />
          <Input
            label="Start time"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <Input
            label="End time"
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>

        {/* Cost & Duration */}
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Estimated cost (¥ / currency)"
            type="number"
            min="0"
            placeholder="0"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
          />
          <Input
            label="Duration (minutes)"
            type="number"
            min="15"
            step="15"
            placeholder="120"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-end gap-2 pt-5 mt-1 border-t border-border-soft">
          <Button type="button" variant="tertiary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Add Activity</Button>
        </div>
      </form>
    </Modal>
  );
}
