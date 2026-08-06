import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import {
  breadcrumbSchema,
  collectionPageSchema,
  graph,
  itemListSchema,
} from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/content/Breadcrumbs';
import { ArticleCta } from '@/components/content/ArticleCta';
import { ResourceCategoryCards } from '@/components/resources/ResourceCategoryCards';
import { ResourceList } from '@/components/resources/ResourceList';
import { Glossary } from '@/components/resources/Glossary';
import {
  getGlossary,
  getResources,
  getResourcesByCategory,
  resourceCategories,
} from '@/lib/resources';

const TITLE = 'RFP Software Resources: Templates, Checklists & Glossary';
const DESCRIPTION =
  'Free RFP software resources — scoring templates, requirement matrices, buying checklists, implementation guides, compliance references and a 30-term glossary.';

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/resources',
  keywords: [
    'RFP software templates',
    'RFP evaluation checklist',
    'RFP scoring template',
    'RFP software glossary',
    'RFP compliance matrix template',
  ],
});

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Resources', href: '/resources' },
];

export default function ResourcesPage() {
  const resources = getResources();
  const glossary = getGlossary();

  return (
    <>
      <JsonLd
        id="resources-collection"
        data={graph(
          collectionPageSchema({
            name: TITLE,
            description: DESCRIPTION,
            path: '/resources',
          }),
          breadcrumbSchema(crumbs),
          itemListSchema(
            resourceCategories.map((category) => ({
              name: category.title,
              href: `/resources#${category.id}`,
              description: category.blurb,
            })),
            'RFP software resource categories',
          ),
          {
            '@type': 'DefinedTermSet',
            name: 'RFP Software Glossary',
            description:
              'Plain-language definitions of the terms used across RFP, proposal and procurement software.',
            hasDefinedTerm: glossary.map((entry) => ({
              '@type': 'DefinedTerm',
              name: entry.term,
              description: entry.definition,
            })),
          },
        )}
      />

      <div className="surface-tint border-b border-ink-200">
        <Container className="py-12 sm:py-16">
          <Breadcrumbs crumbs={crumbs} />
          <h1 className="mt-6 max-w-3xl text-balance text-[2.25rem] font-semibold leading-[1.1] tracking-[-0.025em] text-ink-900 sm:text-[2.875rem]">
            Resource library
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-ink-600">
            {resources.length} working files behind our guides — scoring sheets,
            requirement matrices, demo scripts and security-review checklists — plus a{' '}
            {glossary.length}-term glossary. Everything here is free, ungated, and written
            to be copied into your own documents.
          </p>

          {/* Sits directly under the h1, so card titles are h2 to keep the outline flat. */}
          <ResourceCategoryCards className="mt-10" headingLevel="h2" />
        </Container>
      </div>

      <Container className="py-14 sm:py-16">
        <div className="space-y-16 sm:space-y-20">
          {resourceCategories
            .filter((category) => category.id !== 'glossary')
            .map((category) => {
              const items = getResourcesByCategory(category.id);
              if (!items.length) return null;

              return (
                <section
                  key={category.id}
                  id={category.id}
                  aria-labelledby={`${category.id}-heading`}
                  className="scroll-mt-28"
                >
                  <h2
                    id={`${category.id}-heading`}
                    className="text-2xl font-semibold tracking-[-0.015em] text-ink-900 sm:text-[1.75rem]"
                  >
                    {category.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-pretty text-[1.0625rem] leading-relaxed text-ink-600">
                    {category.blurb}
                  </p>
                  <ResourceList items={items} className="mt-8" />
                </section>
              );
            })}

          {/* -------------------------------------------------------- Glossary */}
          <section id="glossary" aria-labelledby="glossary-heading" className="scroll-mt-28">
            <h2
              id="glossary-heading"
              className="text-2xl font-semibold tracking-[-0.015em] text-ink-900 sm:text-[1.75rem]"
            >
              Glossary
            </h2>
            <p className="mt-3 max-w-2xl text-pretty text-[1.0625rem] leading-relaxed text-ink-600">
              {glossary.length} terms that come up in nearly every RFP software
              conversation — defined the way practitioners actually use them, not the way
              vendor marketing does.
            </p>
            <Glossary terms={glossary} className="mt-8" />
          </section>
        </div>

        <ArticleCta
          heading="Pair the templates with the guide that explains them"
          body="Templates are faster to use when you know what each column is for. Our buying guide walks through the requirement, scoring and compliance work these files are designed to support."
          primary={{ href: '/guides', label: 'Read the guides' }}
          secondary={{ href: '/blog', label: 'Latest analysis' }}
          className="mt-20"
        />
      </Container>
    </>
  );
}
