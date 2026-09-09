import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

/**
 * Resource categories are declared here so the homepage cards, the resources
 * page sections and the in-page anchors can never drift apart.
 */
export const resourceCategories = [
  {
    id: 'templates',
    label: 'Templates',
    title: 'Templates',
    blurb:
      'Editable scoring sheets, requirement matrices and stakeholder briefs you can drop straight into an evaluation.',
    icon: 'template' as const,
  },
  {
    id: 'checklists',
    label: 'Checklists',
    title: 'Buying Checklists',
    blurb:
      'Step-by-step lists for demos, security review, reference calls and contract redlines — so nothing gets skipped under deadline.',
    icon: 'checklist' as const,
  },
  {
    id: 'implementation',
    label: 'Expert Guides',
    title: 'Implementation Guides',
    blurb:
      'What to do in the first 90 days after signing: content migration, library pruning, owner assignment and adoption tracking.',
    icon: 'guide' as const,
  },
  {
    id: 'compliance',
    label: 'Whitepapers',
    title: 'Compliance Resources',
    blurb:
      'Reference material for security questionnaires, data residency, accessibility and public-sector procurement rules.',
    icon: 'shield' as const,
  },
  {
    id: 'glossary',
    label: 'Glossary',
    title: 'Glossary',
    /** Has a standalone page; the resources section links out to it. */
    href: '/glossary',
    blurb:
      'Plain-language definitions for the terms that appear in nearly every RFP software conversation.',
    icon: 'book' as const,
  },
] as const;

export type ResourceCategoryId = (typeof resourceCategories)[number]['id'];
export type ResourceCategory = (typeof resourceCategories)[number];

export type ResourceItem = {
  slug: string;
  title: string;
  description: string;
  category: ResourceCategoryId;
  format: string;
  effort: string;
  order: number;
  bullets: string[];
  href?: string;
};

export type GlossaryTerm = {
  term: string;
  definition: string;
  seeAlso?: string[];
};

const RESOURCES_DIR = path.join(process.cwd(), 'content', 'resources');

type ResourceFrontmatter = {
  title: string;
  description: string;
  category: ResourceCategoryId;
  format?: string;
  effort?: string;
  order?: number;
  bullets?: string[];
  href?: string;
  terms?: GlossaryTerm[];
};

function readResourceFiles(): { fm: ResourceFrontmatter; slug: string }[] {
  if (!fs.existsSync(RESOURCES_DIR)) return [];
  return fs
    .readdirSync(RESOURCES_DIR)
    .filter((file) => file.endsWith('.md'))
    .sort()
    .map((file) => {
      const raw = fs.readFileSync(path.join(RESOURCES_DIR, file), 'utf8');
      const { data } = matter(raw);
      return { fm: data as ResourceFrontmatter, slug: file.replace(/\.md$/, '') };
    });
}

let resourceCache: ResourceItem[] | null = null;

export function getResources(): ResourceItem[] {
  if (resourceCache) return resourceCache;

  resourceCache = readResourceFiles()
    .filter(({ fm }) => fm.category !== 'glossary')
    .map(({ fm, slug }) => ({
      slug,
      title: fm.title,
      description: fm.description,
      category: fm.category,
      format: fm.format ?? 'Worksheet',
      effort: fm.effort ?? '15 min',
      order: fm.order ?? 99,
      bullets: fm.bullets ?? [],
      href: fm.href,
    }))
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));

  return resourceCache;
}

export function getResourcesByCategory(
  category: ResourceCategoryId,
): ResourceItem[] {
  return getResources().filter((item) => item.category === category);
}

let glossaryCache: GlossaryTerm[] | null = null;

export function getGlossary(): GlossaryTerm[] {
  if (glossaryCache) return glossaryCache;

  const terms = readResourceFiles()
    .filter(({ fm }) => fm.category === 'glossary')
    .flatMap(({ fm }) => fm.terms ?? []);

  glossaryCache = terms.sort((a, b) => a.term.localeCompare(b.term));
  return glossaryCache;
}
