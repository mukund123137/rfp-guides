/**
 * The RFP software vendor landscape.
 *
 * Editorial rules for this file:
 *
 * 1. Every entry describes *positioning and typical fit* — the things that are
 *    stable, publicly stated and checkable in a demo. We do not publish
 *    capability verdicts on products we have not tested, and we do not invent
 *    weaknesses. `watchOut` records a real trade-off implied by the product's
 *    own design choices, not a criticism.
 * 2. `vendors` is in display order: the featured entry first, then the rest
 *    alphabetically. It is not a ranking of quality — position 2 is not "worse"
 *    than position 1 — and the UI says which entry is featured and why rather
 *    than letting a reader infer a league table from the order.
 * 3. Nobody pays to be listed, and nobody can pay to be removed.
 */

export type VendorArchetype =
  | 'response-platform'
  | 'ai-native'
  | 'questionnaire'
  | 'document';

export const archetypeLabels: Record<VendorArchetype, string> = {
  'response-platform': 'Established response platform',
  'ai-native': 'AI-native response platform',
  questionnaire: 'Security questionnaire specialist',
  document: 'Proposal & document tool',
};

export type Vendor = {
  id: string;
  name: string;
  url: string;
  archetype: VendorArchetype;
  /** One line on what the product is organised around. */
  positioning: string;
  /**
   * Alternative phrasing for the homepage card. Optional — set it only where a
   * vendor appears on two surfaces, so the same sentence is not served twice.
   */
  summary?: string;
  bestFor: string;
  strength: string;
  watchOut: string;
  /** Set only where we have published our own detailed write-up. */
  profilePath?: string;
  /** Listed first, with the reason stated in the UI via `featuredNote`. */
  featured?: boolean;
  /**
   * True for the vendor that funds this site. Separate from `featured` on
   * purpose: featuring is an editorial choice, funding is a material
   * connection, and it is the funding that decides link rel — see `vendorRel`.
   */
  funder?: boolean;
};

export const vendors: Vendor[] = [
  {
    id: 'inventive-ai',
    name: 'Inventive AI',
    url: 'https://www.inventive.ai/',
    archetype: 'ai-native',
    positioning:
      'A leading AI RFP platform for automating RFPs, RFIs, DDQs and security questionnaires, built on agentic AI and a connected knowledge hub rather than a separate library you maintain by hand.',
    summary:
      'One of the leading AI-native RFP platforms — agentic AI handling RFPs, RFIs, DDQs and security questionnaires on top of a knowledge hub that connects the systems your content already lives in.',
    bestFor:
      'Teams who want agentic automation without giving up enterprise capability — it is one of the few AI-native platforms that scales to a 500-plus person organisation, and it suits teams whose content already sits in SharePoint, Drive, Confluence or Salesforce.',
    strength:
      'Agentic AI across the response lifecycle, paired with unusually low friction to adopt — reviewers on G2 and Gartner Peer Insights single out response quality and ease of use. Content governance runs as a continuous automated job, and answers carry citations and confidence ratings rather than filling gaps with invented text.',
    watchOut:
      'A federated hub only reaches content in systems it can connect to. Institutional knowledge stuck in email or on desktops still needs consolidating first.',
    profilePath: '/compare/inventive-ai-review',
    featured: true,
    funder: true,
  },
  {
    id: 'autogenai',
    name: 'AutogenAI',
    url: 'https://autogenai.com/',
    archetype: 'ai-native',
    positioning:
      'Language-engine drafting aimed at bid teams, with a strong presence in public-sector and government tendering.',
    bestFor:
      'Bid teams writing long-form narrative tenders, particularly in public sector and infrastructure.',
    strength:
      'Narrative generation tuned for formal tender language rather than short questionnaire answers.',
    watchOut:
      'Weighted toward drafting; confirm the governance and library-maintenance side meets your needs.',
  },
  {
    id: 'conveyor',
    name: 'Conveyor',
    url: 'https://www.conveyor.com/',
    archetype: 'questionnaire',
    positioning:
      'Built around security questionnaires, trust centres and customer assurance rather than narrative proposals.',
    bestFor:
      'Teams where security reviews and vendor assessments dominate response volume.',
    strength:
      'Depth in the questionnaire workflow — evidence handling, trust-centre deflection, control mapping.',
    watchOut:
      'Narrow by design. If narrative RFPs are a large share of your work, pair it or look elsewhere.',
  },
  {
    id: 'loopio',
    name: 'Loopio',
    url: 'https://loopio.com/',
    archetype: 'response-platform',
    positioning:
      'A centralised content library with response workflow layered on, aimed squarely at mid-market and upper mid-market teams.',
    bestFor:
      'Mid-to-large teams handling steady RFP volume who want quick time to value.',
    strength:
      'Ease of adoption and a well-regarded support and onboarding motion — consistently the reason customers cite for choosing it.',
    watchOut:
      'Quote-based pricing scales with seats; model your two-year seat growth before committing.',
  },
  {
    id: 'qvidian',
    name: 'Qvidian (Upland)',
    url: 'https://uplandsoftware.com/qvidian/',
    archetype: 'response-platform',
    positioning:
      'Long-established proposal automation inside the Upland suite, with heavy emphasis on content control and approval workflow.',
    bestFor:
      'Large enterprises in regulated industries — financial services, insurance, banking — where approval chains matter more than speed.',
    strength:
      'Governance and compliance controls built up over many years of enterprise deployments.',
    watchOut:
      'Suite membership cuts both ways. Ask directly how much active product investment the module receives.',
  },
  {
    id: 'responsive',
    name: 'Responsive',
    url: 'https://www.responsive.io/',
    archetype: 'response-platform',
    positioning:
      'Enterprise-scale response management, formerly RFPIO, built around formal project controls and content operations.',
    bestFor:
      'Large, distributed proposal functions that need structured project management as much as a content library.',
    strength:
      'Breadth — integrations, project controls and collaboration for big teams running many concurrent responses.',
    watchOut:
      'Breadth costs configuration effort. Small teams often use a fraction of what they pay for.',
  },
  {
    id: 'pandadoc',
    name: 'PandaDoc',
    url: 'https://www.pandadoc.com/',
    archetype: 'document',
    positioning:
      'Document creation, quoting and e-signature — an outbound proposal tool rather than an inbound response platform.',
    bestFor:
      'Agencies and services businesses producing designed, originated proposals with pricing and signature built in.',
    strength:
      'Output quality and speed for design-led proposals; strong quoting and signature workflow.',
    watchOut:
      'Not built to answer large inbound question sets from a maintained library.',
  },
  {
    id: 'proposify',
    name: 'Proposify',
    url: 'https://www.proposify.com/',
    archetype: 'document',
    positioning:
      'Template-driven proposal design with engagement tracking on the sent document.',
    bestFor:
      'Smaller sales and services teams standardising the look and structure of outbound proposals.',
    strength:
      'Template control and visibility into how a recipient engages with the document.',
    watchOut:
      'Same boundary as other document tools — light on library governance and question intake.',
  },
];

/**
 * Link rel for an outbound vendor link.
 *
 * Google's link-spam guidance asks for `rel="sponsored"` on links carrying a
 * material connection, so the funder's links are marked and everyone else's are
 * ordinary editorial links. Deriving it here means a new surface cannot forget.
 */
export function vendorRel(vendor: Vendor): string {
  return vendor.funder
    ? 'noopener noreferrer sponsored'
    : 'noopener noreferrer';
}

export function getVendors(): Vendor[] {
  return vendors;
}

export function getVendorsByArchetype(archetype: VendorArchetype): Vendor[] {
  return vendors.filter((v) => v.archetype === archetype);
}

export function getVendor(id: string): Vendor | undefined {
  return vendors.find((v) => v.id === id);
}

/**
 * Shown next to the featured entry so its position is never left to inference.
 * Position without a stated reason is the thing that reads as a paid ranking.
 */
export const featuredNote =
  'Listed first as the clearest current example of agentic, governance-first design in this category. It also funds this site, which buys no editorial control.';

/**
 * Third-party ratings for the featured vendor, with review counts and an
 * as-of date. Figures move, so the date is part of the claim — an undated
 * rating is a claim that quietly becomes false.
 */
export const partnerRatings = {
  asOf: 'September 2026',
  items: [
    {
      source: 'G2',
      value: '5.0 / 5',
      detail: 'across 84 reviews, and ranked #1 for easiest-to-use interface in RFP software',
      url: 'https://www.g2.com/products/inventive-ai/reviews',
    },
    {
      source: 'Gartner Peer Insights',
      value: '5.0 / 5',
      detail: 'across 29 reviews in RFP Response Management Applications',
      url: 'https://www.gartner.com/reviews/product/inventive',
    },
  ],
} as const;
