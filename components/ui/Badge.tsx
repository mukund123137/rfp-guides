import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type BadgeProps = {
  children: ReactNode;
  tone?: 'brand' | 'neutral' | 'outline';
  className?: string;
};

const tones = {
  brand: 'bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-100',
  neutral: 'bg-ink-100 text-ink-700',
  outline: 'text-ink-600 ring-1 ring-inset ring-ink-200',
} as const;

export function Badge({ children, tone = 'brand', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
