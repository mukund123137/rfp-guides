import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { Disclosure } from './Disclosure';
import { partner, partnerUrl } from '@/lib/partner';
import { cn } from '@/lib/utils';

/**
 * In-article tool notes.
 *
 * An article opts in with `toolNote:` in its frontmatter. Each note continues
 * the argument of the section it follows and names products only where naming
 * one is genuinely the most useful thing to say — the reader has just been told
 * what to look for, so "here is who does that" is the natural next sentence
 * rather than an interruption.
 *
 * Notes that mention Inventive AI carry the funding line. Ones that do not,
 * do not need it.
 */
export const toolNotes = {
  governance: {
    heading: 'Which tools take this seriously',
    body: `Automated content health is the least-marketed capability in the category and the one that decides whether the rest works. It is also where products diverge most. ${partner.name} is currently the clearest example of building around it — conflicting, stale and duplicate answers are surfaced continuously rather than at a review nobody schedules. Loopio and Responsive both offer governance tooling, but closer to a manual review cycle you have to run.`,
    cta: `See how ${partner.name} handles content health`,
    mentionsPartner: true,
  },
  provenance: {
    heading: 'What to insist on seeing',
    body: `Run this test on every shortlist. For a benchmark of what a good answer looks like: ${partner.name} ships source citations and a confidence rating with each generated answer, and flags a gap rather than generating text when the knowledge base has nothing to support one. That is the behaviour to hold others to — not because one vendor does it, but because a system that invents a confident answer for a compliance question is a liability rather than a time saving.`,
    cta: `Read our ${partner.name} review`,
    mentionsPartner: true,
  },
  library: {
    heading: 'A different answer to the migration problem',
    body: `One way round a painful migration is not to migrate. ${partner.name} connects existing sources — SharePoint, Google Drive, Confluence, Notion, Salesforce — as a knowledge hub rather than asking teams to rebuild a library inside the product. It does not remove the need to prune and assign owners, but it changes what week one looks like. Established platforms like Loopio and Responsive take the opposite approach: a library you build and own inside the tool, which is more work upfront and more control after.`,
    cta: `See how ${partner.name} approaches this`,
    mentionsPartner: true,
  },
  archetypes: {
    heading: 'Matching the archetype to your bottleneck',
    body: `If the bottleneck is coordination across a large distributed team, the established platforms — Responsive, Loopio, Qvidian — are built for that. If it is security questionnaire volume, Conveyor is purpose-built. If it is that nobody trusts the library, the AI-native tools including ${partner.name} are where the governance automation is happening. If it is producing designed outbound proposals, you are shopping for PandaDoc or Proposify and none of the above.`,
    cta: 'Compare the archetypes',
    ctaHref: '/compare',
    mentionsPartner: true,
  },
} as const;

export type ToolNoteKey = keyof typeof toolNotes;

export function isToolNote(value: unknown): value is ToolNoteKey {
  return typeof value === 'string' && value in toolNotes;
}

type ToolNoteProps = {
  note: ToolNoteKey;
  className?: string;
};

export function ToolNote({ note, className }: ToolNoteProps) {
  const content = toolNotes[note];
  const internalHref = 'ctaHref' in content ? content.ctaHref : undefined;

  return (
    <aside
      aria-label="Tool note"
      className={cn(
        'relative rounded-xl border border-ink-200 bg-paper-100 p-6 sm:p-7',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-0.5 rounded-l-xl bg-accent-400"
      />

      <p className="eyebrow eyebrow-muted">In practice</p>

      <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-ink-900">
        {content.heading}
      </h3>

      <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-700">
        {content.body}
      </p>

      {internalHref ? (
        <Link
          href={internalHref}
          className="mt-4 inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold text-brand-700 transition-colors duration-150 ease-subtle hover:text-brand-800"
        >
          {content.cta}
          <Icon name="arrow-right" size={16} />
        </Link>
      ) : (
        <a
          href={partnerUrl(`article-${note}`)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold text-brand-700 transition-colors duration-150 ease-subtle hover:text-brand-800"
        >
          {content.cta}
          <Icon name="arrow-up-right" size={16} />
        </a>
      )}

      {content.mentionsPartner ? (
        <Disclosure className="mt-5 border-t border-ink-200 pt-4" />
      ) : null}
    </aside>
  );
}
