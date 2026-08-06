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
import { ArticleCard } from '@/components/content/ArticleCard';
import { Breadcrumbs } from '@/components/content/Breadcrumbs';
import { NewsletterSection } from '@/components/home/NewsletterSection';

const TITLE = 'RFP Software Blog: Market Analysis & AI Trends';
const DESCRIPTION =
  'Analysis of the RFP software market — what genuinely differentiates products, how AI drafting actually performs, and where response work is heading next.';

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/blog',
  keywords: [
    'RFP software blog',
    'AI RFP software',
    'AI proposal tools',
    'RFP software differentiators',
    'proposal automation trends',
  ],
});

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog' },
];

export default function BlogPage() {
  const posts = getSummaries('blogs');
  const [lead, ...rest] = posts;

  return (
    <>
      <JsonLd
        id="blog-collection"
        data={graph(
          collectionPageSchema({ name: TITLE, description: DESCRIPTION, path: '/blog' }),
          breadcrumbSchema(crumbs),
          itemListSchema(
            posts.map((post) => ({
              name: post.title,
              href: post.url,
              description: post.description,
            })),
            'RFP software articles',
          ),
        )}
      />

      <div className="surface-tint border-b border-ink-200">
        <Container className="py-12 sm:py-16">
          <Breadcrumbs crumbs={crumbs} />
          <h1 className="mt-6 max-w-3xl text-balance text-[2.25rem] font-semibold leading-[1.1] tracking-[-0.025em] text-ink-900 sm:text-[2.875rem]">
            The blog
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-ink-600">
            Shorter pieces on the state of the RFP software market: what the feature lists
            are hiding, what AI has actually changed in response work, and which claims
            deserve a second look.
          </p>
        </Container>
      </div>

      <Container className="py-12 sm:py-16">
        {lead ? (
          <section aria-labelledby="lead-post">
            <h2
              id="lead-post"
              className="mb-6 text-xs font-semibold uppercase tracking-[0.08em] text-brand-600"
            >
              Latest
            </h2>
            <ArticleCard article={lead} variant="featured" headingLevel="h3" />
          </section>
        ) : null}

        {rest.length > 0 ? (
          <section aria-labelledby="more-posts" className="mt-14">
            <h2
              id="more-posts"
              className="mb-6 text-xs font-semibold uppercase tracking-[0.08em] text-brand-600"
            >
              More articles
            </h2>
            <ArticleGrid articles={rest} columns={3} headingLevel="h3" />
          </section>
        ) : null}
      </Container>

      <NewsletterSection />
    </>
  );
}
