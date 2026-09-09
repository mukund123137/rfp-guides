/**
 * Inventive AI — the site's publisher.
 *
 * Every mention of Inventive AI on the site reads from this file: names, links,
 * verified capability claims and the disclosure wording. Keeping it in one place
 * means the relationship is described identically everywhere, and a change to
 * the disclosure cannot be applied to some pages and missed on others.
 *
 * Editorial rule for this file: only claims verifiable from Inventive AI's own
 * published material belong here, and vendor-reported numbers are labelled as
 * such wherever they are rendered. Nothing here asserts a comparative result we
 * have not tested ourselves.
 */

const BASE_URL = 'https://www.inventive.ai';

export const partner = {
  name: 'Inventive AI',
  /** Used mid-sentence where the full name would read as a repetition. */
  shortName: 'Inventive',
  url: BASE_URL,
  /** Where our own editorial profile of the product lives. */
  profilePath: '/compare/how-inventive-ai-approaches-rfp-automation',
  tagline: 'AI agents for RFP, RFI, DDQ and security questionnaire responses',
  /** One-line description in our words, not theirs. */
  summary:
    'An AI-native response platform built around a connected knowledge hub rather than a separate content library, with automated content-health checks and confidence scoring on every generated answer.',
} as const;

/**
 * Outbound link with campaign parameters, so referred traffic is attributable
 * to the page and placement it came from rather than landing as "direct".
 */
export function partnerUrl(placement: string, path = '/'): string {
  const url = new URL(path, BASE_URL);
  url.searchParams.set('utm_source', 'rfpsoftwareguide.com');
  url.searchParams.set('utm_medium', 'referral');
  url.searchParams.set('utm_campaign', 'rfp-software-guides');
  url.searchParams.set('utm_content', placement);
  return url.toString();
}

/**
 * Inventive AI's published capabilities, each paired with the evaluation
 * criterion from our own guides that it speaks to.
 *
 * The criteria were written before this section existed — they come from
 * `content/guides/things-to-look-for-in-rfp-software.md` — which is the only
 * honest way round to do this: state the test first, then show what a product
 * does about it.
 */
export const partnerCapabilities = [
  {
    criterion: 'Behaviour when the library has no answer',
    ourTest:
      'A clean admission beats a fluent invention. Ask for it to be demonstrated live.',
    approach:
      'Flags the gap instead of generating a response when the knowledge base lacks the material.',
  },
  {
    criterion: 'Behaviour when sources disagree',
    ourTest:
      'Every real library contains contradictions. A good system surfaces the conflict rather than silently picking one.',
    approach:
      'An AI Content Manager scans connected sources continuously and flags conflicting or outdated answers before they reach a proposal.',
  },
  {
    criterion: 'Provenance of generated text',
    ourTest:
      'Without a citable source per claim, a reviewer has to verify the whole answer from scratch — slower than writing it.',
    approach:
      'Ships each generated response with source citations and an AI confidence rating to show where human input is still needed.',
  },
  {
    criterion: 'Governance automation',
    ourTest:
      'Governance that depends on someone remembering loses to entropy within a year.',
    approach:
      'Treats content health as a maintained state rather than a manual chore — a self-updating knowledge base with automated freshness checks.',
  },
  {
    criterion: 'Migration and shadow libraries',
    ourTest:
      'Every location content lives in is migration work and a future shadow library.',
    approach:
      'Connects existing systems — SharePoint, Google Drive, Confluence, Notion, Salesforce — instead of requiring a separate library to be built and maintained.',
  },
] as const;

/** Integrations Inventive AI lists publicly. */
export const partnerIntegrations = [
  'SharePoint',
  'Google Drive',
  'Confluence',
  'Notion',
  'Salesforce',
  'Slack',
  'HubSpot',
  'Zendesk',
] as const;

/**
 * Vendor-reported figures. Always rendered with the "reported by Inventive AI"
 * label — we have not independently verified any of them, and saying so is the
 * difference between a citation and an endorsement.
 */
export const partnerReportedMetrics = [
  { value: '90%', label: 'faster response time' },
  { value: '50%', label: 'higher win rates' },
  { value: '70%', label: 'faster content maintenance' },
] as const;

export const disclosure = {
  /** One line, for use directly beneath any Inventive AI placement. */
  short:
    'Inventive AI publishes this site. Our guides stay vendor-neutral and no vendor — including our publisher — can buy placement or review drafts.',
  /** Compact label for tight spaces such as callout headers. */
  badge: 'Publisher',
  /** Full statement, used on the About page. */
  long: 'RFP Software Guides is published by Inventive AI, which builds AI response software for RFPs and security questionnaires. We say so on every page that mentions them, because a reader deserves to know who funds what they are reading. What that funding does not buy is editorial control: our evaluation criteria are written independently of any product, we do not rank vendors, no vendor sees a draft before publication, and we take no payment from any vendor — including Inventive AI — to be featured, ranked or recommended. Where we describe Inventive AI, we say what it does and what you should still test yourself.',
} as const;
