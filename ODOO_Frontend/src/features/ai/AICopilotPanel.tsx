import { useState, useRef, useEffect, useCallback } from 'react';
import type { Trip, AIMessage, AIRecommendation } from '@/types';
import { mockSendAIMessage } from '@/lib/mock/services';
import { AIRecommendationCard } from './AIRecommendationCard';
import { Button } from '@/components/ui/Button';
import { Sparkles, X, SendHorizonal } from 'lucide-react';

interface AICopilotPanelProps {
  trip: Trip;
  isOpen: boolean;
  onClose: () => void;
  onApplyRecommendation?: (rec: AIRecommendation) => void;
}

const promptSuggestions = [
  'Suggest activities for this trip',
  'Help me balance this itinerary',
  'Find ways to reduce costs',
];

export function AICopilotPanel({
  trip,
  isOpen,
  onClose,
  onApplyRecommendation,
}: AICopilotPanelProps) {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hello! I'm your AI Travel Copilot for **${trip.name}**. How can I help you plan or refine your days?`,
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Reviewing your itinerary...');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const idSeq = useRef(0);

  /* Focus + Escape handling while open */
  useEffect(() => {
    if (!isOpen) return;

    inputRef.current?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, loading]);

  const handleApply = useCallback(
    (rec: AIRecommendation) => onApplyRecommendation?.(rec),
    [onApplyRecommendation]
  );

  const handleDismiss = useCallback((rec: AIRecommendation) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (!msg.recommendations) return msg;
        return {
          ...msg,
          recommendations: msg.recommendations.map((r) =>
            r.id === rec.id ? { ...r, status: 'dismissed' as const } : r
          ),
        };
      })
    );
  }, []);

  if (!isOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const messageText = (textToSend || input).trim();
    if (!messageText || loading) return;

    const seq = ++idSeq.current;
    const userMessage: AIMessage = {
      id: `user-${seq}`,
      role: 'user',
      content: messageText,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    const lower = messageText.toLowerCase();
    if (lower.includes('budget') || lower.includes('cost')) {
      setLoadingText('Analyzing your trip expenses...');
    } else if (lower.includes('itinerar') || lower.includes('balance')) {
      setLoadingText('Reviewing your day-by-day rhythm...');
    } else {
      setLoadingText('Looking into your destinations...');
    }

    try {
      const response = await mockSendAIMessage(trip.id, messageText);
      setMessages((prev) => [...prev, response.message]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${seq}`,
          role: 'assistant',
          content: "I couldn't generate a recommendation right now. Please try again.",
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Backdrop — mobile only */}
      <div
        className="fixed inset-0 bg-ink/30 backdrop-blur-[2px] z-40 lg:hidden"
        style={{ animation: 'modal-fade-in 150ms ease-out' }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Copilot drawer */}
      <aside
        role="complementary"
        aria-label="AI Travel Copilot"
        className={[
          'fixed right-0 top-0 bottom-0 z-50 flex flex-col overflow-hidden',
          'w-full sm:w-[420px] bg-surface border-l border-border-default shadow-modal',
          'copilot-drawer-in',
        ].join(' ')}
      >
        {/* Header */}
        <header className="px-5 pt-6 pb-5 border-b border-border-default shrink-0">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="text-label text-accent-600 inline-flex items-center gap-1.5 mb-2">
                <Sparkles size={13} />
                Trip intelligence
              </span>
              <h2 className="font-display text-h2 text-ink leading-none">Your Copilot</h2>
              <span className="text-[11px] font-medium text-ink-muted block mt-2">
                Working inside {trip.name}
              </span>
            </div>
            <button
              onClick={onClose}
              aria-label="Close copilot"
              className="w-8 h-8 rounded-radius-md hover:bg-surface-muted flex items-center justify-center text-ink-muted hover:text-ink transition-colors cursor-pointer border-none bg-transparent shrink-0 focus-ring"
              style={{ transitionDuration: 'var(--duration-micro)' }}
            >
              <X size={18} />
            </button>
          </div>
        </header>

        {/* Message stream */}
        <div
          className="flex-1 overflow-y-auto px-5 py-6 space-y-5"
          role="log"
          aria-live="polite"
          aria-label="Copilot conversation"
        >
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div key={msg.id} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                <div
                  className={[
                    'max-w-[88%] px-4 py-3 text-body-sm leading-relaxed whitespace-pre-line',
                    isUser
                      ? 'bg-accent-600 text-white rounded-radius-lg rounded-br-sm shadow-[0_1px_2px_rgba(28,27,25,0.14)]'
                      : 'bg-surface-muted text-ink rounded-radius-lg rounded-bl-sm',
                  ].join(' ')}
                >
                  {msg.content.replace(/\*\*/g, '')}
                </div>

                {msg.recommendations && msg.recommendations.length > 0 && (
                  <div className="w-full mt-2">
                    {msg.recommendations
                      .filter((r) => r.status !== 'dismissed')
                      .map((rec) => (
                        <AIRecommendationCard
                          key={rec.id}
                          recommendation={rec}
                          onApply={handleApply}
                          onDismiss={handleDismiss}
                        />
                      ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing indicator with contextual copy */}
          {loading && (
            <div className="flex items-center gap-3 text-body-sm text-ink-secondary py-1" aria-label={loadingText}>
              <span className="inline-flex items-center gap-1 px-3.5 py-2.5 bg-surface-muted rounded-radius-lg rounded-bl-sm" aria-hidden="true">
                <i className="typing-dot" style={{ animationDelay: '0ms' }} />
                <i className="typing-dot" style={{ animationDelay: '160ms' }} />
                <i className="typing-dot" style={{ animationDelay: '320ms' }} />
              </span>
              <span>{loadingText}</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested prompts */}
        {messages.length <= 2 && (
          <div className="px-5 py-4 border-t border-border-soft bg-surface-muted/60">
            <span className="text-label text-ink-muted block mb-2.5">Useful prompts</span>
            <div className="flex flex-wrap gap-2">
              {promptSuggestions.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSend(prompt)}
                  disabled={loading}
                  className="h-[32px] px-3 rounded-radius-full border border-border-default bg-surface text-caption text-ink-secondary hover:text-accent-600 hover:border-accent-500/40 disabled:opacity-45 cursor-pointer transition-colors text-left focus-ring"
                  style={{ transitionDuration: 'var(--duration-micro)' }}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 border-t border-border-default bg-surface shrink-0 flex items-center gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about this trip..."
            aria-label="Message the copilot"
            className="flex-1 h-12 px-3.5 text-[15px] text-ink bg-surface-muted border border-border-default rounded-radius-md outline-none focus:border-accent-600 focus-ring placeholder:text-ink-disabled transition-all"
            style={{ transitionDuration: 'var(--duration-micro)' }}
          />
          <Button
            type="submit"
            size="md"
            aria-label="Send message"
            disabled={!input.trim() || loading}
            className="w-12 px-0 shrink-0"
            icon={<SendHorizonal size={17} />}
          />
        </form>
      </aside>
    </>
  );
}
