import type { Metadata } from 'next';
import Link from 'next/link';
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
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Breadcrumbs } from '@/components/content/Breadcrumbs';
import { ArticleGrid } from '@/components/content/ArticleGrid';
import { CapabilityMatrix } from '@/components/partner/CapabilityMatrix';
import { Disclosure } from '@/components/partner/Disclosure';
import { partner, partnerIntegrations, partnerUrl } from '@/lib/partner';

const TITLE = 'Compare RFP Software by Capability, Not Feature List';
const DESCRIPTION =
  'A capability comparison of RFP software archetypes — what genuinely differs between established platforms, AI-native tools, document builders and questionnaire specialists, and the failure tests that separate them.';

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/compare',
  keywords: [
    'compare RFP software',
    'RFP software comparison',
    'best RFP software',
    'AI RFP software comparison',
    'RFP software alternatives',
  ],
});

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Compare', href: '/compare' },
];

export default function ComparePage() {
  const comparisons = getSummaries('compare');

  return (
    <>
      <JsonLd
        id="compare-collection"
        data={graph(
          collectionPageSchema({
            name: TITLE,
            description: DESCRIPTION,
            path: '/compare',
          }),
          breadcrumbSchema(crumbs),
          itemListSchema(
            comparisons.map((item) => ({
              name: item.title,
              href: item.url,
              description: item.description,
            })),
            'RFP software comparisons',
          ),
        )}
      />

      {/* ------------------------------------------------------------- Header */}
      <div className="surface-tint border-b border-ink-200">
        <Container className="py-12 sm:py-16">
          <Breadcrumbs crumbs={crumbs} />
          <p className="eyebrow mt-6">Comparison</p>
          <h1 className="mt-4 max-w-3xl text-balance font-display text-[2.25rem] font-semibold leading-[1.08] tracking-[-0.025em] text-ink-900 sm:text-[3rem]">
            Compare RFP software by capability, not feature list
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-ink-600">
            Every product in this category ships the same feature list, so feature
            grids return a tie. These comparisons work from architecture and failure
            behaviour instead — the things that still differ once you put real
            content in front of them.
          </p>
        </Container>
      </div>

      {/* ------------------------------------------------------------- Matrix */}
      <Container className="py-14 sm:py-16">
        <section aria-labelledby="matrix-heading">
          <div className="max-w-2xl">
            <h2
              id="matrix-heading"
              className="font-display text-2xl font-semibold tracking-[-0.015em] text-ink-900 sm:text-[1.875rem]"
            >
              Capability strengths by product archetype
            </h2>
            <p className="mt-3 text-pretty text-[1.0625rem] leading-relaxed text-ink-600">
              We compare archetypes rather than named products on purpose. We have
              not tested every product in the category, and a grid of ticks against
              names nobody verified is the pay-to-play comparison this site exists to
              argue against. How a class of product is built changes slowly and is
              checkable in any demo.
            </p>
          </div>

          <CapabilityMatrix className="mt-8" />

          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-ink-500">
            &ldquo;Varies widely&rdquo; is the most useful cell in the table. It marks
            the capabilities where two products in the same archetype can be a year
            apart — and therefore where your own testing earns the most.{' '}
            <Link
              href="/compare/rfp-software-comparison-framework"
              className="font-medium text-brand-700 underline decoration-brand-300 underline-offset-2 hover:text-brand-800"
            >
              The framework explains each row.
            </Link>
          </p>
        </section>

        {/* ------------------------------------------------------- Comparisons */}
        {comparisons.length > 0 ? (
          <section aria-labelledby="comparisons-heading" className="mt-16 sm:mt-20">
            <h2
              id="comparisons-heading"
              className="font-display text-2xl font-semibold tracking-[-0.015em] text-ink-900 sm:text-[1.875rem]"
            >
              Read the comparisons
            </h2>
            <ArticleGrid
              articles={comparisons}
              columns={2}
              variant="featured"
              className="mt-8"
            />
          </section>
        ) : null}
      </Container>

      {/* ------------------------------------------------- Publisher placement */}
      <section
        aria-labelledby="compare-partner-heading"
        className="border-y border-ink-200 bg-paper-100 py-14 sm:py-16"
      >
        <Container>
          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
            <div>
              <p className="eyebrow eyebrow-muted">Publisher</p>
              <h2
                id="compare-partner-heading"
                className="mt-4 text-balance font-display text-2xl font-semibold tracking-[-0.015em] text-ink-900 sm:text-[1.875rem]"
              >
                One product, read against these criteria in public
              </h2>
              <p className="mt-4 text-pretty text-[1.0625rem] leading-relaxed text-ink-600">
                {partner.name} publishes this site and builds in the AI-native
                archetype above. Rather than leave that implicit, we published a
                profile that applies our own tests to our own product — including a
                section on where it is the wrong choice.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={partner.profilePath} size="lg">
                  Read the profile
                  <Icon name="arrow-right" size={18} />
                </ButtonLink>
                <ButtonLink
                  href={partnerUrl('compare-hub')}
                  external
                  variant="secondary"
                  size="lg"
                  ariaLabel={`Explore ${partner.name} (opens in a new tab)`}
                >
                  Explore {partner.name}
                  <Icon name="arrow-up-right" size={17} />
                </ButtonLink>
              </div>

              <Disclosure className="mt-6 max-w-xl" />
            </div>

            <div className="mt-10 rounded-xl border border-ink-200 bg-white p-6 shadow-card lg:mt-0">
              <h3 className="font-sans text-sm font-semibold uppercase tracking-eyebrow text-ink-500">
                Connects to
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {partnerIntegrations.map((integration) => (
                  <li
                    key={integration}
                    className="rounded-full bg-paper-100 px-3 py-1.5 text-[0.8125rem] font-medium text-ink-700 ring-1 ring-inset ring-ink-200"
                  >
                    {integration}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-600">
                {partner.summary}
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
