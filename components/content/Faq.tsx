import type { FaqItem } from '@/lib/content';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';

type FaqProps = {
  items: FaqItem[];
  className?: string;
  heading?: string;
  headingId?: string;
};

/**
 * Built on native `<details>`: keyboard accessible, searchable by the browser's
 * find-in-page, and it needs no JavaScript at all.
 */
export function Faq({
  items,
  className,
  heading = 'Frequently asked questions',
  headingId = 'faq',
}: FaqProps) {
  if (!items.length) return null;

  return (
    <section aria-labelledby={headingId} className={cn('scroll-mt-28', className)}>
      <h2
        id={headingId}
        className="font-display text-2xl font-semibold tracking-[-0.02em] text-ink-900 sm:text-[1.875rem]"
      >
        {heading}
      </h2>

      <div className="mt-6 divide-y divide-ink-200 border-y border-ink-200">
        {items.map((item) => (
          <details key={item.question} className="group py-1">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-4 text-[1.0625rem] font-medium text-ink-900 transition-colors duration-150 ease-subtle hover:text-brand-700 [&::-webkit-details-marker]:hidden">
              <span className="text-pretty">{item.question}</span>
              <Icon
                name="chevron-down"
                size={20}
                className="mt-0.5 shrink-0 text-ink-400 transition-transform duration-200 ease-subtle group-open:-rotate-180"
              />
            </summary>
            <p className="pb-5 pr-8 text-[0.9375rem] leading-relaxed text-ink-600">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
