import type { Metadata } from 'next';
import { getSummaries } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';
import { graph, itemListSchema } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ArticleGrid } from '@/components/content/ArticleGrid';
import { Hero } from '@/components/home/Hero';
import { NewsletterSection } from '@/components/home/NewsletterSection';
import { ResourceCategoryCards } from '@/components/resources/ResourceCategoryCards';
import { VendorLandscape } from '@/components/partner/VendorLandscape';

export const metadata: Metadata = buildMetadata({
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description:
    'Learn how to buy, evaluate, compare and implement RFP software. Practitioner guides, capability comparisons, templates and checklists for proposal and procurement teams. No paid placement.',
  path: '/',
  keywords: [
    'RFP software',
    'RFP software guide',
    'proposal management software',
    'RFP response software',
    'RFP automation',
    'how to buy RFP software',
    'compare RFP software',
  ],
});

export default function HomePage() {
  const guides = getSummaries('guides');
  const posts = getSummaries('blogs');
  const comparisons = getSummaries('compare');

  const featuredGuides = guides.slice(0, 4);
  const latestPosts = posts.slice(0, 4);

  return (
    <>
      <JsonLd
        id="home-lists"
        data={graph(
          itemListSchema(
            featuredGuides.map((g) => ({
              name: g.title,
              href: g.url,
              description: g.description,
            })),
            'Featured RFP software guides',
          ),
          itemListSchema(
            latestPosts.map((p) => ({
              name: p.title,
              href: p.url,
              description: p.description,
            })),
            'Latest RFP software articles',
          ),
        )}
      />

      <Hero path={featuredGuides} />

      {/* ------------------------------------------------------- Featured guides */}
      <section aria-labelledby="featured-guides" className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            titleId="featured-guides"
            eyebrow="Start here"
            title="Featured guides"
            description="Four long-form guides that cover the full buying cycle — from writing your first requirement list to scoring vendors against a compliance matrix."
            link={{ href: '/guides', label: 'All guides' }}
          />
          <ArticleGrid
            articles={featuredGuides}
            columns={2}
            variant="featured"
            className="mt-10"
          />
        </Container>
      </section>

      {/* --------------------------------------------------------- Comparisons */}
      {comparisons.length > 0 ? (
        <section
          aria-labelledby="home-compare"
          className="border-t border-ink-200 py-16 sm:py-20"
        >
          <Container>
            <SectionHeading
              titleId="home-compare"
              eyebrow="Compare"
              title="Comparisons that hold up"
              description="Every product in this category ships the same feature list, so feature grids return a tie. These work from architecture and failure behaviour instead."
              link={{ href: '/compare', label: 'Comparison hub' }}
            />
            <ArticleGrid
              articles={comparisons}
              columns={2}
              variant="featured"
              className="mt-10"
            />
          </Container>
        </section>
      ) : null}

      <VendorLandscape />

      {/* ---------------------------------------------------------- Latest blogs */}
      <section
        aria-labelledby="latest-articles"
        className="border-t border-ink-200 py-16 sm:py-20"
      >
        <Container>
          <SectionHeading
            titleId="latest-articles"
            eyebrow="From the blog"
            title="Latest articles"
            description="Shorter reads on where the category is heading: what actually differentiates products, and how AI is changing response work."
            link={{ href: '/blog', label: 'All articles' }}
          />
          <ArticleGrid articles={latestPosts} columns={4} className="mt-10" />
        </Container>
      </section>

      {/* ------------------------------------------------------------- Resources */}
      <section aria-labelledby="home-resources" className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            titleId="home-resources"
            eyebrow="Free to use"
            title="Resources"
            description="Templates, checklists, expert guides, whitepapers and a glossary — the working files behind every guide on this site."
            link={{ href: '/resources', label: 'Resource library' }}
          />
          <ResourceCategoryCards className="mt-10" />
        </Container>
      </section>


      <NewsletterSection />
    </>
  );
}
