'use client';

import { useId, useState } from 'react';
import { Button } from './Button';
import { Icon } from './Icon';
import { cn } from '@/lib/utils';

type NewsletterFormProps = {
  className?: string;
  tone?: 'light' | 'dark';
};

type Status = 'idle' | 'invalid' | 'success';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Newsletter signup UI.
 *
 * Intentionally front-end only: it validates and confirms locally so the
 * interaction is complete and accessible, and it posts nowhere. Wire the
 * `onSubmit` body to an email provider when one is chosen.
 */
export function NewsletterForm({ className, tone = 'light' }: NewsletterFormProps) {
  const inputId = useId();
  const messageId = `${inputId}-message`;
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  const isDark = tone === 'dark';

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!EMAIL_PATTERN.test(email.trim())) {
      setStatus('invalid');
      return;
    }
    setStatus('success');
    setEmail('');
  }

  if (status === 'success') {
    return (
      <p
        role="status"
        className={cn(
          'flex items-start gap-2.5 rounded-lg px-4 py-3.5 text-sm',
          isDark ? 'bg-white/10 text-brand-100' : 'bg-brand-50 text-brand-800',
          className,
        )}
      >
        <Icon name="sparkles" size={18} className="mt-px shrink-0" />
        <span>
          You&rsquo;re on the list. Look for a new guide breakdown in your inbox every
          other Tuesday.
        </span>
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn('w-full', className)} noValidate>
      <label
        htmlFor={inputId}
        className={cn(
          'block text-sm font-medium',
          isDark ? 'text-ink-200' : 'text-ink-700',
        )}
      >
        Email address
      </label>

      <div className="mt-2 flex flex-col gap-2.5 sm:flex-row">
        <input
          id={inputId}
          type="email"
          name="email"
          autoComplete="email"
          required
          placeholder="you@company.com"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status === 'invalid') setStatus('idle');
          }}
          aria-invalid={status === 'invalid'}
          aria-describedby={status === 'invalid' ? messageId : undefined}
          className={cn(
            'min-w-0 flex-1 rounded-lg border px-3.5 py-2.5 text-[0.9375rem] transition-colors duration-150 ease-subtle',
            isDark
              ? 'border-white/20 bg-white/10 text-white placeholder:text-ink-400 focus:border-brand-300'
              : 'border-ink-300 bg-white text-ink-900 placeholder:text-ink-400 focus:border-brand-500',
            status === 'invalid' && 'border-red-500',
          )}
        />
        <Button type="submit" className="shrink-0 sm:w-auto">
          Subscribe
        </Button>
      </div>

      {status === 'invalid' ? (
        <p id={messageId} role="alert" className="mt-2 text-sm text-red-500">
          Enter a valid email address, for example you@company.com.
        </p>
      ) : (
        <p
          className={cn(
            'mt-2 text-xs',
            isDark ? 'text-ink-400' : 'text-ink-500',
          )}
        >
          Twice-monthly. No vendor pitches. Unsubscribe in one click.
        </p>
      )}
    </form>
  );
}
