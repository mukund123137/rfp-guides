import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * `inverse` exists as a real variant rather than a set of overriding classes:
 * Tailwind resolves conflicts by stylesheet order, not by the order classes are
 * listed, so passing `bg-transparent text-white` alongside the `secondary`
 * variant's `bg-white text-ink-800` produced white-on-white text.
 */
type Variant = 'primary' | 'secondary' | 'inverse' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-150 ease-subtle disabled:cursor-not-allowed disabled:opacity-60';

const variants: Record<Variant, string> = {
  primary:
    'bg-brand-600 text-white shadow-sm hover:bg-brand-700 hover:shadow-md active:bg-brand-800',
  secondary:
    'border border-ink-300 bg-white text-ink-800 hover:border-brand-400 hover:bg-brand-50 hover:text-brand-800',
  inverse:
    'border border-white/25 text-white hover:border-white/50 hover:bg-white/10',
  ghost: 'text-brand-700 hover:bg-brand-50 hover:text-brand-800',
};

const sizes: Record<Size, string> = {
  sm: 'px-3.5 py-2 text-sm',
  md: 'px-5 py-2.5 text-[0.9375rem]',
  lg: 'px-6 py-3 text-base',
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

type ButtonLinkProps = CommonProps & {
  href: string;
  external?: boolean;
  ariaLabel?: string;
};

export function ButtonLink({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className,
  external = false,
  ariaLabel,
}: ButtonLinkProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        rel="noopener noreferrer"
        target="_blank"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {children}
    </button>
  );
}
