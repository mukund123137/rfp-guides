'use client';

import { useEffect, useMemo, useState } from 'react';
import type { TocEntry } from '@/lib/content';
import { cn } from '@/lib/utils';

type TableOfContentsProps = {
  toc: TocEntry[];
  className?: string;
  title?: string;
};

function flattenIds(entries: TocEntry[]): string[] {
  return entries.flatMap((entry) => [entry.id, ...entry.children.map((c) => c.id)]);
}

/** Distance below the sticky header at which a heading counts as "current". */
const ACTIVATION_OFFSET = 120;

/**
 * Sticky in-article table of contents.
 *
 * Highlighting is computed from scroll position rather than from
 * IntersectionObserver callbacks. Observers only fire on *changes* in
 * intersection, so an instant jump — a page loaded at an anchor, or a
 * programmatic scroll — can move past several headings without emitting a
 * single event, leaving the highlight stranded on the first section. Measuring
 * directly on each frame is always correct for any scroll position.
 *
 * With JavaScript disabled the anchors still work; they simply never highlight.
 */
export function TableOfContents({
  toc,
  className,
  title = 'On this page',
}: TableOfContentsProps) {
  const ids = useMemo(() => flattenIds(toc), [toc]);
  const [activeId, setActiveId] = useState<string | null>(ids[0] ?? null);

  useEffect(() => {
    if (!ids.length) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const elements = ids
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null);
      if (!elements.length) return;

      // The active heading is the last one whose top has crossed the activation
      // line; before any has, the first heading stays active.
      let current = elements[0];
      for (const el of elements) {
        if (el.getBoundingClientRect().top <= ACTIVATION_OFFSET) current = el;
        else break;
      }

      // At the very bottom of the page the last heading wins, so a short final
      // section can still be reached.
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 2;
      if (atBottom) current = elements[elements.length - 1];

      setActiveId(current.id);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ids]);

  if (!toc.length) return null;

  return (
    <nav aria-labelledby="toc-heading" className={cn('text-sm', className)}>
      <h2
        id="toc-heading"
        className="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-ink-500"
      >
        {title}
      </h2>
      <ol className="space-y-1 border-l border-ink-200">
        {toc.map((entry) => (
          <li key={entry.id}>
            <TocLink entry={entry} activeId={activeId} />
            {entry.children.length > 0 ? (
              <ol className="mt-1 space-y-1">
                {entry.children.map((child) => (
                  <li key={child.id}>
                    <TocLink entry={child} activeId={activeId} nested />
                  </li>
                ))}
              </ol>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function TocLink({
  entry,
  activeId,
  nested = false,
}: {
  entry: TocEntry;
  activeId: string | null;
  nested?: boolean;
}) {
  const isActive = activeId === entry.id;

  return (
    <a
      href={`#${entry.id}`}
      aria-current={isActive ? 'location' : undefined}
      className={cn(
        '-ml-px block border-l-2 py-1 leading-snug transition-colors duration-150 ease-subtle',
        nested ? 'pl-7 text-[0.8125rem]' : 'pl-4',
        isActive
          ? 'border-brand-600 font-medium text-brand-700'
          : 'border-transparent text-ink-600 hover:border-ink-300 hover:text-ink-900',
      )}
    >
      {entry.title}
    </a>
  );
}
