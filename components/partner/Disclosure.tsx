import Link from 'next/link';
import { disclosure } from '@/lib/partner';
import { cn } from '@/lib/utils';

type DisclosureProps = {
  className?: string;
  tone?: 'light' | 'dark';
  /** Links to the fuller note on the About page. Off inside About itself. */
  withLink?: boolean;
};

/**
 * Funding note.
 *
 * Sits beneath any placement that recommends Inventive AI. Deliberately quiet —
 * one line of small text, no icon, no box — because it is a factual footnote,
 * not a banner. Quiet is fine; absent is not.
 */
export function Disclosure({
  className,
  tone = 'light',
  withLink = true,
}: DisclosureProps) {
  const isDark = tone === 'dark';

  return (
    <p
      className={cn(
        'text-xs leading-relaxed',
        isDark ? 'text-ink-500' : 'text-ink-500',
        className,
      )}
    >
      {disclosure.short}{' '}
      {withLink ? (
        <Link
          href="/about#funding"
          className={cn(
            'underline decoration-dotted underline-offset-2 transition-colors duration-150 ease-subtle',
            isDark ? 'hover:text-ink-300' : 'hover:text-brand-700',
          )}
        >
          How this site is funded
        </Link>
      ) : null}
    </p>
  );
}
