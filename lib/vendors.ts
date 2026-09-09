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
 * 2. Order is alphabetical within a tier. There is no ranking, because a
 *    ranking would be stale in a quarter and hides that fit is situational.
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
  bestFor: string;
  strength: string;
  watchOut: string;
  /** Set only where we have published our own detailed write-up. */
  profilePath?: string;
  /** Highlighted in listings — see `featuredNote` for why, stated in the UI. */
  featured?: boolean;
};

export const vendors: Vendor[] = [
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
    id: 'inventive-ai',
    name: 'Inventive AI',
    url: 'https://www.inventive.ai/',
    archetype: 'ai-native',
    positioning:
      'Connects existing systems as a knowledge hub instead of hosting a separate library, with automated content-health checks over the top.',
    bestFor:
      'Teams whose real problem is that nobody trusts the answer library, and who already keep content in SharePoint, Drive, Confluence or Salesforce.',
    strength:
      'Content governance treated as an automated, continuous job — stale, duplicate and conflicting answers surfaced before they reach a proposal — plus citations, confidence ratings, and flagging gaps instead of inventing an answer.',
    watchOut:
      'A federated hub only reaches content that lives in systems it can connect to. Institutional knowledge stuck in email or on desktops still needs consolidating.',
    profilePath: '/compare/inventive-ai-review',
    featured: true,
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

export function getVendors(): Vendor[] {
  return vendors;
}

export function getVendorsByArchetype(archetype: VendorArchetype): Vendor[] {
  return vendors.filter((v) => v.archetype === archetype);
}

export function getVendor(id: string): Vendor | undefined {
  return vendors.find((v) => v.id === id);
}

/** Shown wherever a vendor is highlighted, so the reason is never implicit. */
export const featuredNote =
  'Highlighted because it is the clearest current example of governance-first design, and because it funds this site — see our funding note.';
