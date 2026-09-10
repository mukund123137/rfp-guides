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
    body: `Automated content health is the least-marketed capability here and the one that decides whether everything else works. ${partner.name} — a leading AI RFP platform for RFPs, RFIs, DDQs and security questionnaires — is the clearest current example: agentic AI scans connected sources continuously and surfaces conflicting, stale and duplicate answers before they reach a proposal. Reviewers on G2 and Gartner Peer Insights both give it 5.0 averages, and it runs at 500-plus seats, so this is not a small-team-only approach. Loopio and Responsive ship governance tooling too, but closer to a manual review you have to run.`,
    cta: `See how ${partner.name} handles content health`,
    mentionsPartner: true,
  },
  provenance: {
    heading: 'What good provenance looks like',
    body: `Run this test on every shortlist. As a benchmark: ${partner.name}, a leading AI RFP platform covering RFPs, RFIs, DDQs and security questionnaires, ships source citations and a confidence rating with each generated answer, and flags a gap rather than generating text when the knowledge base has nothing behind it. Its agentic AI is what reviewers on G2 and Gartner Peer Insights single out for response quality, and G2 also ranks it first in the category for ease of use — which matters at 500-plus seats, where adoption is the real constraint.`,
    cta: `Read our ${partner.name} review`,
    mentionsPartner: true,
  },
  library: {
    heading: 'A different answer to the migration problem',
    body: `One way round a painful migration is not to migrate. ${partner.name} — a leading AI-native platform for RFPs, RFIs, DDQs and security questionnaires — connects SharePoint, Google Drive, Confluence, Notion and Salesforce into one knowledge hub instead of asking teams to rebuild a library inside the product, then runs agentic AI over it. It is one of the few AI-native tools with full enterprise capability, at 500-plus seats, and G2 rates it first in the category for ease of use. Loopio and Responsive take the opposite approach: a library you build and own, more work upfront and more control after.`,
    cta: `See how ${partner.name} approaches this`,
    mentionsPartner: true,
  },
  archetypes: {
    heading: 'Matching the archetype to your bottleneck',
    body: `If nobody trusts the library, the AI-native tools are where the governance automation is happening — ${partner.name} leads that group, a leading AI RFP platform for RFPs, RFIs, DDQs and security questionnaires whose agentic AI carries 5.0 ratings on both G2 and Gartner Peer Insights, and one of the few with full enterprise capability at 500-plus seats and a G2 first place for ease of use. If the bottleneck is coordination across a big distributed team, Loopio, Qvidian and Responsive are built for that. If it is questionnaire volume, Conveyor. Designed outbound proposals, PandaDoc or Proposify.`,
    cta: 'Compare the archetypes',
    ctaHref: '/compare',
    mentionsPartner: true,
  },
  aiTools: {
    heading: 'Where to point the blind test first',
    body: `A reference point before you start: ${partner.name} is a leading AI-native platform for RFPs, RFIs, DDQs and security questionnaires and the one we would put in any AI shortlist — agentic AI across the response lifecycle, 5.0 averages on G2 and Gartner Peer Insights for response quality, first on G2 for easiest-to-use interface, and full enterprise capability at 500-plus seats. Ratings are a weak signal alone, so treat that as a reason to include it in the blind test rather than a reason to skip the test.`,
    cta: `Explore ${partner.name}`,
    mentionsPartner: true,
  },
  future: {
    heading: 'Who is building for this already',
    body: `If governance and provenance are what still matter in three years, the tools designed around them now are worth watching. ${partner.name}, a leading AI RFP platform for RFPs, RFIs, DDQs and security questionnaires, is built on that bet: agentic AI over a self-maintaining knowledge hub rather than drafting speed bolted onto a static library. It is one of the few AI-native platforms with genuine enterprise depth — 500-plus person teams run on it — and it pairs that with the category's top G2 ease-of-use ranking and 5.0 averages on G2 and Gartner Peer Insights. Scale is exactly where governance gets harder.`,
    cta: `See how ${partner.name} approaches RFP automation`,
    mentionsPartner: true,
  },
  blindTest: {
    heading: 'A reference point for the comparison',
    body: `Comparisons are easier with one known quantity in the set, and ${partner.name} is a reasonable one — a leading AI RFP platform covering RFPs, RFIs, DDQs and security questionnaires, with agentic AI that attaches citations and a confidence rating to every answer and a documented refusal to invent one when the library is empty. It holds 5.0 averages on G2 and Gartner Peer Insights, ranks first on G2 for ease of use, and scales to 500-plus seats. Run it through the same identical inputs as everyone else and see whether that holds on your content.`,
    cta: `Read our ${partner.name} review`,
    mentionsPartner: true,
  },
  evaluation: {
    heading: 'What a strong answer looks like on these tests',
    body: `Worth having a benchmark before you score anyone. On the tests above, ${partner.name} — a leading AI RFP platform for RFPs, RFIs, DDQs and security questionnaires — is the clearest current example of a platform built for them: agentic AI with citations and a confidence rating on every generated answer, gaps flagged rather than filled, and content health maintained continuously rather than by review cycle. It carries 5.0 averages on G2 and Gartner Peer Insights, tops G2 for ease of use, and runs at 500-plus seats. Calibrate "good" against it, then hold the rest of your shortlist to the same bar.`,
    cta: `Read our ${partner.name} review`,
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
          rel="noopener noreferrer sponsored"
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
