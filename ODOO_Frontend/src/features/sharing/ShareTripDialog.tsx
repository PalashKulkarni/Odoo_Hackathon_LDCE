import { useState } from 'react';
import type { Trip } from '@/types';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { Copy, Check, ExternalLink, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ShareTripDialogProps {
  isOpen: boolean;
  onClose: () => void;
  trip: Trip;
}

export function ShareTripDialog({ isOpen, onClose, trip }: ShareTripDialogProps) {
  const [copied, setCopied] = useState(false);
  const [isPublic, setIsPublic] = useState(trip.isPublic ?? true);
  const toast = useToast();

  const shareSlug = trip.id === 'trip-japan' ? 'japan' : trip.id;
  const shareUrl = `${window.location.origin}/shared/${shareSlug}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success('Link copied', 'Anyone with this link can explore your journey.');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy", 'Select the link text and copy it manually.');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Share Journey"
      description="Make your trip viewable to anyone with the link or let them clone it."
    >
      <div className="space-y-5">
        {/* Toggle public */}
        <div className="flex items-center justify-between p-4 bg-surface-muted border border-border-soft rounded-radius-lg">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-radius-md bg-accent-100 flex items-center justify-center text-accent-600">
              <Globe size={20} />
            </div>
            <div>
              <div className="text-body-sm font-semibold text-ink">Public Access</div>
              <div className="text-caption text-ink-muted">
                Anyone with the link can explore and copy this trip
              </div>
            </div>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={isPublic}
            onClick={() => setIsPublic(!isPublic)}
            className={[
              'w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer border-none focus-ring',
              isPublic ? 'bg-accent-600' : 'bg-border-strong',
            ].join(' ')}
            style={{ transitionDuration: 'var(--duration-micro)' }}
          >
            <div
              className={[
                'bg-white w-4 h-4 rounded-full shadow-md transform transition-transform',
                isPublic ? 'translate-x-5' : 'translate-x-0',
              ].join(' ')}
              style={{ transitionDuration: 'var(--duration-normal)' }}
            />
          </button>
        </div>

        {/* Share Link Box */}
        <div>
          <label htmlFor="share-url" className="text-[14px] font-semibold text-ink block mb-2">
            Shareable Link
          </label>
          <div className="flex items-center gap-2">
            <input
              id="share-url"
              type="text"
              readOnly
              value={shareUrl}
              onFocus={(e) => e.target.select()}
              className="flex-1 h-12 px-3.5 text-body-sm text-ink-secondary bg-surface border border-border-default rounded-radius-md outline-none select-all"
            />
            <Button
              onClick={handleCopy}
              variant={copied ? 'secondary' : 'primary'}
              icon={copied ? <Check size={16} /> : <Copy size={16} />}
              className="shrink-0"
            >
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
        </div>

        {/* Action to preview */}
        <div className="pt-2 border-t border-border-soft flex items-center justify-between">
          <Link
            to={`/shared/${shareSlug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-body-sm text-accent-600 hover:text-accent-500 font-semibold no-underline"
          >
            Preview public page <ExternalLink size={14} />
          </Link>
          <Button variant="tertiary" onClick={onClose}>
            Done
          </Button>
        </div>
      </div>
    </Modal>
  );
}
