/**
 * Inventive AI — the vendor that funds this site.
 *
 * The site is positioned and written as an independent RFP software resource:
 * Inventive AI is not presented as its author, owner or editorial voice, and
 * appears in listings as one vendor among several in `lib/vendors.ts`.
 *
 * What this file does hold is the funding relationship and the wording used to
 * disclose it. That disclosure is deliberately compact — one line, not a
 * section — but it is not optional: recommending a product that funds you
 * without saying so is a deceptive endorsement under the FTC's endorsement
 * guides, and it is the fastest way to lose the credibility this site depends
 * on. Keep it short; keep it present.
 */

const BASE_URL = 'https://www.inventive.ai';

export const partner = {
  name: 'Inventive AI',
  url: BASE_URL,
  /** Our own detailed write-up of the product. */
  reviewPath: '/compare/inventive-ai-review',
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

export const disclosure = {
  /** One line, used beneath recommendations and in the footer. */
  short:
    'Inventive AI funds this site. It does not commission, review or approve what we publish, and no vendor can pay for coverage.',
  /** Slightly fuller version for the About page. */
  long: 'This site is funded by Inventive AI, one of the vendors in the category we cover. That pays for the research and keeps everything here free and ungated. It does not buy editorial control: Inventive AI does not commission articles, does not see drafts before publication, and cannot change a conclusion. No vendor — Inventive AI included — pays for placement, and we publish no ranked "best of" list because rankings in this category go stale within a quarter. Where we recommend Inventive AI, we say why, and we say what to test before you believe us.',
} as const;
