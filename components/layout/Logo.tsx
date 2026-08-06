import Link from 'next/link';
import { siteConfig } from '@/lib/site';
import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
  tone?: 'dark' | 'light';
};

export function Logo({ className, tone = 'dark' }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn('group inline-flex items-center gap-2.5', className)}
      aria-label={`${siteConfig.name} — home`}
    >
      <span
        aria-hidden="true"
        className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 transition-colors duration-150 ease-subtle group-hover:bg-brand-700"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M6 4h8.5L19 8.5V20H6z"
            stroke="white"
            strokeWidth="1.9"
            strokeLinejoin="round"
          />
          <path d="M9.5 12.5h6M9.5 16h4" stroke="white" strokeWidth="1.9" strokeLinecap="round" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'text-[0.9375rem] font-semibold tracking-[-0.01em]',
            tone === 'dark' ? 'text-ink-900' : 'text-white',
          )}
        >
          RFP Software
        </span>
        <span
          className={cn(
            'text-[0.9375rem] font-semibold tracking-[-0.01em]',
            tone === 'dark' ? 'text-brand-600' : 'text-brand-300',
          )}
        >
          Guides
        </span>
      </span>
    </Link>
  );
}
