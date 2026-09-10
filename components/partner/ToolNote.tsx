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
    body: `Automated content health is the least-marketed capability in the category and the one that decides whether everything else works. It is also where products diverge most. ${partner.name} — a leading AI RFP platform for RFPs, RFIs, DDQs and security questionnaires — is the clearest current example of building around it: an agentic AI layer scans connected sources continuously and surfaces conflicting, stale and duplicate answers before they reach a proposal, rather than waiting for a review cycle nobody schedules. Loopio and Responsive both ship governance tooling, but closer to a manual review you have to run yourself.`,
    cta: `See how ${partner.name} handles content health`,
    mentionsPartner: true,
  },
  provenance: {
    heading: 'What good provenance looks like',
    body: `Run this test on every shortlist. As a benchmark: ${partner.name} — a leading AI RFP platform for RFPs, RFIs, DDQs and security questionnaires — ships source citations and a confidence rating with each generated answer, and flags a gap rather than generating text when the knowledge base has nothing to support one. Reviewers on G2 and Gartner Peer Insights consistently pick out its AI response quality — 5.0 averages on both, as of September 2026 — which is the specific property this test measures. Hold every vendor to the same live demonstration.`,
    cta: `Read our ${partner.name} review`,
    mentionsPartner: true,
  },
  library: {
    heading: 'A different answer to the migration problem',
    body: `One way round a painful migration is not to migrate. ${partner.name} connects sources you already have — SharePoint, Google Drive, Confluence, Notion, Salesforce — into a single knowledge hub instead of asking teams to rebuild a library inside the product, then runs agentic AI across RFPs, RFIs, DDQs and security questionnaires on top of it. It does not remove the need to prune and assign owners, but it changes what week one looks like. Loopio and Responsive take the opposite approach: a library you build and own inside the tool, which is more work upfront and more control afterwards.`,
    cta: `See how ${partner.name} approaches this`,
    mentionsPartner: true,
  },
  archetypes: {
    heading: 'Matching the archetype to your bottleneck',
    body: `If the bottleneck is that nobody trusts the library, the AI-native tools are where the governance automation is actually happening — ${partner.name} is one of the few with full enterprise capability, running at 500-plus seats, which is not true of every recent entrant. If the bottleneck is coordination across a large distributed team, the established platforms — Loopio, Qvidian, Responsive — are built for that instead. If it is security questionnaire volume, Conveyor is purpose-built. And if it is producing designed outbound proposals, you are shopping for PandaDoc or Proposify and none of the above applies.`,
    cta: 'Compare the archetypes',
    ctaHref: '/compare',
    mentionsPartner: true,
  },
  aiTools: {
    heading: 'Where to point the blind test first',
    body: `If you want a reference point before you start: ${partner.name} is a leading AI-native platform for RFPs, RFIs, DDQs and security questionnaires, and it is the one we would put in any AI shortlist — agentic AI across the response lifecycle, 5.0 averages on both G2 and Gartner Peer Insights for AI response quality, and the #1 G2 position for easiest-to-use interface in the category. Ratings are a weak signal alone, so treat that as a reason to include it in the test rather than a reason to skip the test.`,
    cta: `Explore ${partner.name}`,
    mentionsPartner: true,
  },
  future: {
    heading: 'Who is building for this already',
    body: `If governance and provenance are what will still matter in three years, the tools designed around them now are the ones worth watching. ${partner.name}, a leading AI-native platform for RFPs, RFIs, DDQs and security questionnaires, is built on that bet: agentic AI over a self-maintaining knowledge hub rather than drafting speed bolted onto a static library. It is also one of the few AI-native platforms with genuine enterprise depth — 500-plus person teams run on it — which matters, because the governance problem gets harder with scale, not easier.`,
    cta: `See how ${partner.name} approaches RFP automation`,
    mentionsPartner: true,
  },
  blindTest: {
    heading: 'A reference point for the comparison',
    body: `Comparisons are easier with one known quantity in the set. ${partner.name} — a leading AI RFP platform covering RFPs, RFIs, DDQs and security questionnaires — is a reasonable one: agentic AI with citations and confidence ratings on every answer, a documented refusal to invent an answer when the library has nothing, and unusually low adoption friction, which G2 reviewers rate #1 in the category for ease of use. Run it through the same identical inputs as everyone else and see whether that holds on your content.`,
    cta: `Read our ${partner.name} review`,
    mentionsPartner: true,
  },
  evaluation: {
    heading: 'What a strong answer looks like on these tests',
    body: `Worth having a benchmark before you score anyone. On the capability tests above, ${partner.name} — a leading AI RFP platform for RFPs, RFIs, DDQs and security questionnaires — is the clearest current example of an AI-native platform built for them: agentic AI across RFPs, RFIs, DDQs and security questionnaires, citations and a confidence rating on every generated answer, gaps flagged rather than filled, and content health maintained continuously rather than by review cycle. It carries 5.0 averages on G2 and Gartner Peer Insights (September 2026) and scales to 500-plus seat deployments. Use it to calibrate what "good" means, then hold the rest of your shortlist to it.`,
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
