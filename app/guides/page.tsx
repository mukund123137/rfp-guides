import type { Metadata } from 'next';
import { getSummaries } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import {
  breadcrumbSchema,
  collectionPageSchema,
  graph,
  itemListSchema,
} from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { Container } from '@/components/ui/Container';
import { ArticleGrid } from '@/components/content/ArticleGrid';
import { Breadcrumbs } from '@/components/content/Breadcrumbs';
import { ArticleCta } from '@/components/content/ArticleCta';

const TITLE = 'RFP Software Guides: Buying, Evaluation & Selection';
const DESCRIPTION =
  'Step-by-step guides to buying RFP software — requirements gathering, evaluation criteria, compliance matrices and vendor discovery. Written by practitioners, free to read.';

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/guides',
  keywords: [
    'RFP software guides',
    'how to buy RFP software',
    'RFP software evaluation',
    'RFP software selection criteria',
    'RFP vendor comparison',
  ],
});

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Guides', href: '/guides' },
];

export default function GuidesPage() {
  const guides = getSummaries('guides');

  return (
    <>
      <JsonLd
        id="guides-collection"
        data={graph(
          collectionPageSchema({
            name: TITLE,
            description: DESCRIPTION,
            path: '/guides',
          }),
          breadcrumbSchema(crumbs),
          itemListSchema(
            guides.map((guide) => ({
              name: guide.title,
              href: guide.url,
              description: guide.description,
            })),
            'RFP software guides',
          ),
        )}
      />

      <div className="surface-tint border-b border-ink-200">
        <Container className="py-12 sm:py-16">
          <Breadcrumbs crumbs={crumbs} />
          <h1 className="mt-6 max-w-3xl text-balance text-[2.25rem] font-semibold leading-[1.1] tracking-[-0.025em] text-ink-900 sm:text-[2.875rem]">
            RFP software guides
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-ink-600">
            Long-form, practitioner-written guides to the full buying cycle. Each one is
            structured so you can read it end to end before a project starts, or jump to
            the single section you need at 6pm the day before a decision meeting.
          </p>
        </Container>
      </div>

      <Container className="py-12 sm:py-16">
        <h2 className="sr-only">All guides</h2>
        <ArticleGrid articles={guides} columns={2} variant="featured" headingLevel="h3" />

        <ArticleCta
          heading="Not sure where to start?"
          body="Read How to Buy RFP Software first — it sets up the requirements work that every other guide builds on, then hands you the scoring templates."
          primary={{ href: '/guides/how-to-buy-rfp-software', label: 'Start with the buying guide' }}
          secondary={{ href: '/resources', label: 'Grab the templates' }}
          className="mt-16"
        />
      </Container>
    </>
  );
}
