import { cn } from '@/lib/utils';

type KeyTakeawaysProps = {
  items: string[];
  className?: string;
  heading?: string;
};

export function KeyTakeaways({
  items,
  className,
  heading = 'Key takeaways',
}: KeyTakeawaysProps) {
  if (!items.length) return null;

  return (
    <aside
      aria-label={heading}
      className={cn(
        'rounded-xl border border-brand-100 bg-brand-50/70 p-6 sm:p-7',
        className,
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-brand-700">
        {heading}
      </p>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-700">
            <span
              aria-hidden="true"
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600"
            />
            <span className="text-pretty">{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
