import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Icon } from './Icon';

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  link?: { href: string; label: string };
  align?: 'left' | 'center';
  level?: 'h2' | 'h3';
  /** Set when a parent section labels itself via aria-labelledby. */
  titleId?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  link,
  align = 'left',
  level = 'h2',
  titleId,
  className,
}: SectionHeadingProps) {
  const Tag = level;
  const centered = align === 'center';

  return (
    <div
      className={cn(
        'flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between',
        centered && 'sm:flex-col sm:items-center sm:text-center',
        className,
      )}
    >
      <div className={cn('max-w-2xl', centered && 'mx-auto')}>
        {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
        <Tag
          id={titleId}
          className="text-balance font-display text-[1.75rem] font-semibold tracking-[-0.02em] sm:text-[2.125rem]"
        >
          {title}
        </Tag>
        {description ? (
          <p className="mt-3 text-pretty text-[1.0625rem] leading-relaxed text-ink-600">
            {description}
          </p>
        ) : null}
      </div>

      {link ? (
        <Link
          href={link.href}
          className="group inline-flex shrink-0 items-center gap-1.5 text-[0.9375rem] font-semibold text-brand-700 transition-colors duration-150 ease-subtle hover:text-brand-800"
        >
          {link.label}
          <Icon
            name="arrow-right"
            size={17}
            className="transition-transform duration-150 ease-subtle group-hover:translate-x-0.5"
          />
        </Link>
      ) : null}
    </div>
  );
}
