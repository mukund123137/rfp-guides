import { cn } from '@/lib/utils';

/**
 * Capability comparison by product archetype.
 *
 * Deliberately compares *archetypes* rather than named competitors. We have not
 * tested every product in the category, and publishing a grid of ticks against
 * names we have not verified would be exactly the pay-to-play comparison table
 * this site exists to argue against. Archetypes are defensible: they describe
 * how a class of product is built, which is stable and checkable in a demo.
 */

type Rating = 'strong' | 'varies' | 'weak' | 'none';

const archetypes = [
  { id: 'established', label: 'Established response platform' },
  { id: 'ai-native', label: 'AI-native response platform' },
  { id: 'document', label: 'Proposal / document tool' },
  { id: 'questionnaire', label: 'Questionnaire specialist' },
  { id: 'assistant', label: 'General AI assistant' },
] as const;

const rows: {
  criterion: string;
  detail: string;
  ratings: Record<(typeof archetypes)[number]['id'], Rating>;
}[] = [
  {
    criterion: 'Content library governance',
    detail: 'Item-level owners, review dates, an overdue report someone reads',
    ratings: {
      established: 'strong',
      'ai-native': 'varies',
      document: 'weak',
      questionnaire: 'varies',
      assistant: 'none',
    },
  },
  {
    criterion: 'Automated content health',
    detail: 'Stale, duplicate and conflicting content surfaced without being asked',
    ratings: {
      established: 'varies',
      'ai-native': 'strong',
      document: 'none',
      questionnaire: 'varies',
      assistant: 'none',
    },
  },
  {
    criterion: 'Provenance and citation',
    detail: 'Every generated claim traceable to a specific source you can open',
    ratings: {
      established: 'varies',
      'ai-native': 'strong',
      document: 'weak',
      questionnaire: 'strong',
      assistant: 'weak',
    },
  },
  {
    criterion: 'Honest no-answer behaviour',
    detail: 'Flags a gap instead of generating confident unsourced prose',
    ratings: {
      established: 'varies',
      'ai-native': 'varies',
      document: 'none',
      questionnaire: 'strong',
      assistant: 'weak',
    },
  },
  {
    criterion: 'Intake from messy source files',
    detail: 'Merged cells, inconsistent numbering, scanned PDFs, portal exports',
    ratings: {
      established: 'strong',
      'ai-native': 'varies',
      document: 'weak',
      questionnaire: 'strong',
      assistant: 'none',
    },
  },
  {
    criterion: 'Contributor experience for SMEs',
    detail: 'Answer without a seat, with enough context to triage the request',
    ratings: {
      established: 'varies',
      'ai-native': 'varies',
      document: 'weak',
      questionnaire: 'varies',
      assistant: 'none',
    },
  },
  {
    criterion: 'Narrative and win-theme work',
    detail: 'Designed, persuasive output rather than answered question sets',
    ratings: {
      established: 'varies',
      'ai-native': 'varies',
      document: 'strong',
      questionnaire: 'weak',
      assistant: 'varies',
    },
  },
  {
    criterion: 'Audit trail and access control',
    detail: 'Who changed what, plus permissions that hold in search results',
    ratings: {
      established: 'strong',
      'ai-native': 'varies',
      document: 'weak',
      questionnaire: 'strong',
      assistant: 'none',
    },
  },
];

const ratingMeta: Record<Rating, { label: string; className: string }> = {
  strong: {
    label: 'Typically strong',
    className: 'bg-brand-600 text-white ring-brand-600',
  },
  varies: {
    label: 'Varies widely — test it',
    className: 'bg-accent-400/15 text-accent-600 ring-accent-400/40',
  },
  weak: {
    label: 'Typically limited',
    className: 'bg-ink-100 text-ink-500 ring-ink-200',
  },
  none: {
    label: 'Not addressed',
    className: 'bg-transparent text-ink-300 ring-ink-200',
  },
};

const glyph: Record<Rating, string> = {
  strong: '●',
  varies: '◐',
  weak: '○',
  none: '–',
};

export function CapabilityMatrix({ className }: { className?: string }) {
  return (
    <div className={cn(className)}>
      <div className="overflow-x-auto rounded-xl border border-ink-200 bg-white shadow-card">
        <table className="w-full min-w-[52rem] border-collapse text-left">
          <caption className="sr-only">
            RFP software capability strengths by product archetype
          </caption>
          <thead>
            <tr className="border-b border-ink-200">
              <th
                scope="col"
                className="sticky left-0 z-10 bg-white px-5 py-4 text-[0.8125rem] font-semibold text-ink-900"
              >
                Capability
              </th>
              {archetypes.map((archetype) => (
                <th
                  key={archetype.id}
                  scope="col"
                  className="px-3 py-4 text-center align-bottom text-[0.75rem] font-semibold leading-snug text-ink-700"
                >
                  {archetype.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.criterion}
                className="border-b border-ink-200 last:border-b-0 hover:bg-paper-100"
              >
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-white px-5 py-4 font-normal hover:bg-paper-100"
                >
                  <span className="block text-[0.9375rem] font-semibold text-ink-900">
                    {row.criterion}
                  </span>
                  <span className="mt-0.5 block max-w-xs text-[0.8125rem] leading-snug text-ink-500">
                    {row.detail}
                  </span>
                </th>
                {archetypes.map((archetype) => {
                  const rating = row.ratings[archetype.id];
                  const meta = ratingMeta[rating];
                  return (
                    <td key={archetype.id} className="px-3 py-4 text-center">
                      <span
                        /* Column headers scroll out of view on a long table, so
                           the archetype is repeated in the hover title. */
                        title={`${archetype.label}: ${meta.label}`}
                        className={cn(
                          'inline-flex h-7 w-7 items-center justify-center rounded-full text-xs ring-1 ring-inset',
                          meta.className,
                        )}
                      >
                        <span aria-hidden="true">{glyph[rating]}</span>
                        <span className="sr-only">{meta.label}</span>
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-ink-500">
        {(Object.keys(ratingMeta) as Rating[]).map((rating) => (
          <li key={rating} className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className={cn(
                'inline-flex h-5 w-5 items-center justify-center rounded-full text-[0.625rem] ring-1 ring-inset',
                ratingMeta[rating].className,
              )}
            >
              {glyph[rating]}
            </span>
            {ratingMeta[rating].label}
          </li>
        ))}
      </ul>
    </div>
  );
}
