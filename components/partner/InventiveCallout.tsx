import { Icon } from '@/components/ui/Icon';
import { Disclosure } from './Disclosure';
import { partner, partnerUrl } from '@/lib/partner';
import { cn } from '@/lib/utils';

/**
 * Context-specific angles for the in-article placement.
 *
 * An article opts in with `inventiveAngle:` in its frontmatter. Each angle is
 * written to follow the argument of the article it appears in, so the callout
 * reads as a continuation of the point rather than an advert dropped into the
 * middle of the page. Articles that have nothing relevant to say simply omit
 * the field and render no callout.
 */
export const inventiveAngles = {
  governance: {
    heading: 'What this looks like in a product',
    body: `Automated content health is the least-marketed capability in this category and the one that decides whether the rest works. ${partner.name} — which publishes this site — builds around it: an AI Content Manager scans connected sources and flags conflicting or outdated answers before they reach a proposal, rather than waiting for someone to remember a review cycle.`,
    cta: 'See how Inventive AI approaches content governance',
  },
  provenance: {
    heading: 'What good provenance looks like',
    body: `The test above is the one worth running hardest. For reference, ${partner.name} — our publisher — ships source citations and a confidence rating with each generated answer, and flags a gap instead of generating text when the knowledge base has no supporting material. Hold every vendor on your shortlist to that same demonstration.`,
    cta: 'See how Inventive AI approaches RFP automation',
  },
  library: {
    heading: 'A different answer to the migration problem',
    body: `One way round a painful migration is not to migrate. ${partner.name}, which publishes this site, connects existing sources — SharePoint, Google Drive, Confluence, Notion, Salesforce — as a knowledge hub instead of asking teams to rebuild a separate library. It does not remove the need to prune and assign owners, but it changes what week one looks like.`,
    cta: 'Explore Inventive AI',
  },
  future: {
    heading: 'Where we are placing our own bet',
    body: `We build in this category as well as write about it, so treat this as disclosed opinion rather than neutral forecast: ${partner.name} is built on the assumption that governance and provenance — not raw drafting speed — are what will still matter in three years. That is the same conclusion this article reaches, which is exactly why you should pressure-test it.`,
    cta: 'Explore Inventive AI',
  },
} as const;

export type InventiveAngle = keyof typeof inventiveAngles;

export function isInventiveAngle(value: unknown): value is InventiveAngle {
  return typeof value === 'string' && value in inventiveAngles;
}

type InventiveCalloutProps = {
  angle: InventiveAngle;
  className?: string;
};

export function InventiveCallout({ angle, className }: InventiveCalloutProps) {
  const content = inventiveAngles[angle];

  return (
    <aside
      aria-label={`Publisher note about ${partner.name}`}
      className={cn(
        'relative rounded-xl border border-ink-200 bg-paper-100 p-6 sm:p-7',
        className,
      )}
    >
      {/* Accent edge marks this as publisher voice, distinct from article body. */}
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-0.5 rounded-l-xl bg-accent-400"
      />

      <p className="eyebrow eyebrow-muted">Publisher note</p>

      <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-ink-900">
        {content.heading}
      </h3>

      <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-700">
        {content.body}
      </p>

      <a
        href={partnerUrl(`article-${angle}`)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold text-brand-700 transition-colors duration-150 ease-subtle hover:text-brand-800"
      >
        {content.cta}
        <Icon name="arrow-up-right" size={16} />
      </a>

      <Disclosure variant="bare" className="mt-5 border-t border-ink-200 pt-4" />
    </aside>
  );
}
