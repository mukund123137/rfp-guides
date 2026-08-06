export type Author = {
  id: string;
  name: string;
  role: string;
  bio: string;
  initials: string;
  credentials: string[];
};

/**
 * Author records referenced by `author:` in article frontmatter.
 * Keyed by slug so content files never hard-code bios.
 */
export const authors: Record<string, Author> = {
  'dana-whitfield': {
    id: 'dana-whitfield',
    name: 'Dana Whitfield',
    role: 'Editor, Procurement Technology',
    initials: 'DW',
    bio: 'Dana spent eleven years running competitive bids on the buy side — first in public-sector procurement, then leading a sourcing desk for a mid-market healthcare group. She now writes about how response teams choose and operate the software they live in.',
    credentials: [
      '11 years in sourcing and procurement',
      'Ran 400+ competitive solicitations',
      'Former public-sector contracting officer',
    ],
  },
  'marcus-oyelaran': {
    id: 'marcus-oyelaran',
    name: 'Marcus Oyelaran',
    role: 'Analyst, Proposal Operations',
    initials: 'MO',
    bio: 'Marcus led proposal operations for two enterprise software vendors, scaling one team from four responders to a 30-person global function. He focuses on content architecture, review workflows and the unglamorous plumbing that decides whether an RFP tool actually gets used.',
    credentials: [
      'Built two proposal functions from scratch',
      'APMP Practitioner',
      'Specialises in content lifecycle design',
    ],
  },
  'priya-raghunathan': {
    id: 'priya-raghunathan',
    name: 'Priya Raghunathan',
    role: 'Contributing Analyst, AI & Automation',
    initials: 'PR',
    bio: 'Priya evaluates applied AI in enterprise workflow tools. Before writing full-time she was a solutions architect on security-questionnaire automation, which gave her a long and slightly cynical memory of what retrieval systems do when the source library is messy.',
    credentials: [
      'Former solutions architect, response automation',
      'Runs blind evaluations of AI drafting quality',
      'Focus on retrieval accuracy and auditability',
    ],
  },
};

export const defaultAuthorId = 'dana-whitfield';

export function getAuthor(id?: string): Author {
  if (id && authors[id]) return authors[id];
  return authors[defaultAuthorId];
}
