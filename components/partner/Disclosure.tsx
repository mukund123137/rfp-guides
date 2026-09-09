import Link from 'next/link';
import { disclosure } from '@/lib/partner';
import { cn } from '@/lib/utils';

type DisclosureProps = {
  className?: string;
  /** `inline` sits under a placement; `bare` drops the icon for tight spaces. */
  variant?: 'inline' | 'bare';
  tone?: 'light' | 'dark';
  /** Links to the full statement on the About page. Off inside About itself. */
  withLink?: boolean;
};

/**
 * The publisher disclosure.
 *
 * Rendered directly beneath every Inventive AI placement on the site. The text
 * lives in `lib/partner.ts` so it reads identically everywhere — a disclosure
 * that varies by page is not really a disclosure.
 */
export function Disclosure({
  className,
  variant = 'inline',
  tone = 'light',
  withLink = true,
}: DisclosureProps) {
  const isDark = tone === 'dark';

  return (
    <p
      className={cn(
        'flex gap-2 text-xs leading-relaxed',
        isDark ? 'text-ink-400' : 'text-ink-500',
        className,
      )}
    >
      {variant === 'inline' ? (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
          className="mt-0.5 shrink-0"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 16v-4.5M12 8.2v.1" />
        </svg>
      ) : null}
      <span>
        {disclosure.short}{' '}
        {withLink ? (
          <Link
            href="/about#disclosure"
            className={cn(
              'font-medium underline decoration-dotted underline-offset-2 transition-colors duration-150 ease-subtle',
              isDark ? 'text-ink-300 hover:text-white' : 'text-ink-600 hover:text-brand-700',
            )}
          >
            How we stay independent
          </Link>
        ) : null}
      </span>
    </p>
  );
}
