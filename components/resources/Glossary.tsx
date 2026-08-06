import type { GlossaryTerm } from '@/lib/resources';
import { cn } from '@/lib/utils';

type GlossaryProps = {
  terms: GlossaryTerm[];
  className?: string;
};

/**
 * Definition list rather than a card grid: it is the correct semantic element,
 * and it lets the whole glossary be scanned or searched in one pass.
 */
export function Glossary({ terms, className }: GlossaryProps) {
  if (!terms.length) return null;

  return (
    <dl
      className={cn(
        'grid grid-cols-1 gap-x-10 gap-y-7 border-t border-ink-200 pt-8 sm:grid-cols-2',
        className,
      )}
    >
      {terms.map((entry) => (
        <div key={entry.term}>
          <dt className="text-[1.0625rem] font-semibold text-ink-900">{entry.term}</dt>
          <dd className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-600">
            {entry.definition}
            {entry.seeAlso?.length ? (
              <span className="mt-2 block text-sm text-ink-500">
                See also: {entry.seeAlso.join(', ')}
              </span>
            ) : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}
