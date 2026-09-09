import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';
import { breadcrumbSchema, graph, ORGANIZATION_ID } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/content/Breadcrumbs';
import { ArticleCta } from '@/components/content/ArticleCta';
import { AuthorCard } from '@/components/content/AuthorCard';
import { authors } from '@/lib/authors';
import { absoluteUrl } from '@/lib/site';
import { partner, partnerUrl, disclosure } from '@/lib/partner';

const TITLE = 'About RFP Software Guides';
const DESCRIPTION =
  'Who writes RFP Software Guides, how the site is funded, and the editorial standards behind everything we publish. No rankings, no sponsored posts, no vendor can buy coverage.';

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/about',
  keywords: [
    'about RFP Software Guides',
    'RFP software editorial standards',
    'vendor neutral RFP research',
  ],
});

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
];

const principles = [
  {
    title: 'Nobody can buy coverage',
    body: 'No vendor pays to be featured, ranked or recommended here, and no vendor sees a draft before publication. There are no sponsored posts, no affiliate links and no pay-to-play directory. Our vendor listings are alphabetical within each category, and nobody can pay to be added or removed.',
  },
  {
    title: 'We name the trade-off, not just the strength',
    body: 'Every vendor we describe gets a "watch out for" line alongside what it does well, because a listing that only records strengths is an advertisement with extra steps. Where we recommend a product, we say what to test before you believe us.',
  },
  {
    title: 'Every guide is written by someone who did the work',
    body: 'Our contributors have run bid desks, built proposal functions and sat through the demos. If none of us has direct experience with a topic, we interview people who do and say so in the article.',
  },
  {
    title: 'We describe capabilities, not rankings',
    body: 'We discuss what to look for and how to test it rather than declaring a winner. Product-by-product rankings go stale in a quarter, and a publisher that sells in the category has no business writing one. A good evaluation method outlives both.',
  },
  {
    title: 'We date and revisit everything',
    body: 'Each page carries a last-reviewed date. When the market moves — a category consolidates, an AI capability becomes table stakes — we revise the page rather than publishing a near-duplicate.',
  },
];

const method = [
  {
    step: '01',
    title: 'Scope from real questions',
    body: 'Topics come from the questions buyers actually ask on calls and in community threads: how many seats do we need, what does implementation really involve, is AI drafting trustworthy for security questionnaires.',
  },
  {
    step: '02',
    title: 'Draft against a working example',
    body: 'Every framework in a guide is applied to a concrete scenario before publication. If a scoring model cannot be filled in for a plausible mid-market buyer, it does not ship.',
  },
  {
    step: '03',
    title: 'Review for accuracy and bias',
    body: 'A second contributor checks claims, flags anything that reads like vendor copy, and removes any language that implies a recommendation we have not earned.',
  },
  {
    step: '04',
    title: 'Publish, then maintain',
    body: 'Pages get a review date on publication and are re-checked on a rolling schedule. Corrections are made in place and noted when they change a conclusion.',
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        id="about-page"
        data={graph(breadcrumbSchema(crumbs), {
          '@type': 'AboutPage',
          '@id': `${absoluteUrl('/about')}#about`,
          name: TITLE,
          description: DESCRIPTION,
          url: absoluteUrl('/about'),
          mainEntity: { '@id': ORGANIZATION_ID },
        })}
      />

      <div className="surface-tint border-b border-ink-200">
        <Container className="py-12 sm:py-16">
          <Breadcrumbs crumbs={crumbs} />
          <h1 className="mt-6 max-w-3xl text-balance text-[2.25rem] font-semibold leading-[1.1] tracking-[-0.025em] text-ink-900 sm:text-[2.875rem]">
            About {siteConfig.name}
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-ink-600">
            We publish practical education about RFP software: how to buy it, how to
            evaluate it, how the products actually differ, and how to make one stick once
            it is bought. No rankings, no sponsored posts, no pay-to-play directory.
          </p>
        </Container>
      </div>

      <Container className="py-14 sm:py-16">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
          <div className="min-w-0 max-w-prose">
            <section aria-labelledby="why-heading">
              <h2
                id="why-heading"
                className="text-2xl font-semibold tracking-[-0.015em] text-ink-900 sm:text-[1.75rem]"
              >
                Why this site exists
              </h2>
              <div className="prose mt-5">
                <p>
                  Buying software to manage RFP responses is a strange purchase. The teams
                  making the decision are usually mid-deadline when they start looking,
                  the products all describe themselves in nearly identical language, and
                  the thing that determines success — whether your answer library is any
                  good — barely appears on a feature comparison sheet.
                </p>
                <p>
                  Most of the material available to those teams is produced by the vendors
                  themselves. It is not dishonest, but it is written to make a case. What
                  is missing is the boring, useful part: how to build a requirement list
                  that reflects your actual workflow, how to score a demo so two evaluators
                  reach comparable conclusions, what questions to ask about content
                  governance, and what the first ninety days after signing really involve.
                </p>
                <p>
                  That gap is what we write into. Our{' '}
                  <Link href="/guides">guides</Link> cover the buying cycle end to end, the{' '}
                  <Link href="/blog">blog</Link> tracks how the category is changing
                  (especially around AI), and the{' '}
                  <Link href="/resources">resource library</Link> holds the templates and
                  checklists we would hand a colleague starting an evaluation tomorrow.
                </p>
              </div>
            </section>

            <section
              id="editorial-standards"
              aria-labelledby="standards-heading"
              className="mt-16 scroll-mt-28"
            >
              <h2
                id="standards-heading"
                className="text-2xl font-semibold tracking-[-0.015em] text-ink-900 sm:text-[1.75rem]"
              >
                Editorial standards
              </h2>
              <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-600">
                Four commitments govern what we publish. They are deliberately
                restrictive, because the value of a neutral resource disappears the moment
                a reader has to wonder who paid for the page.
              </p>

              <ul className="mt-8 space-y-6">
                {principles.map((principle) => (
                  <li
                    key={principle.title}
                    className="rounded-xl border border-ink-200 bg-white p-6 shadow-card"
                  >
                    <h3 className="text-lg font-semibold text-ink-900">
                      {principle.title}
                    </h3>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">
                      {principle.body}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="method-heading" className="mt-16">
              <h2
                id="method-heading"
                className="text-2xl font-semibold tracking-[-0.015em] text-ink-900 sm:text-[1.75rem]"
              >
                How we research and publish
              </h2>

              <ol className="mt-8 space-y-8 border-l border-ink-200 pl-6">
                {method.map((item) => (
                  <li key={item.step} className="relative">
                    <span
                      aria-hidden="true"
                      className="absolute -left-[1.9375rem] flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-[0.625rem] font-bold text-white"
                    >
                      {item.step}
                    </span>
                    <h3 className="text-lg font-semibold text-ink-900">{item.title}</h3>
                    <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-600">
                      {item.body}
                    </p>
                  </li>
                ))}
              </ol>
            </section>

            <section
              id="funding"
              aria-labelledby="funding-heading"
              className="mt-16 scroll-mt-28"
            >
              <h2
                id="funding-heading"
                className="font-display text-2xl font-semibold tracking-[-0.02em] text-ink-900 sm:text-[1.875rem]"
              >
                How this site is funded
              </h2>
              <div className="prose mt-5">
                <p>{disclosure.long}</p>
                <p>
                  We think that is a better arrangement than the alternatives on offer in
                  this category — affiliate commissions that quietly reorder a list, or a
                  directory where position tracks ad spend. But it is a real interest, so
                  you should read anything we say about{' '}
                  <Link href={partner.reviewPath}>{partner.name}</Link> with it in mind,
                  and check our reasoning against your own testing.
                </p>
                <p>
                  If this ever changes — sponsored content, affiliate links, paid
                  placement — it will be disclosed here first and on every affected page.
                </p>
              </div>
            </section>

            <section aria-labelledby="contact-heading" className="mt-16">
              <h2
                id="contact-heading"
                className="text-2xl font-semibold tracking-[-0.015em] text-ink-900 sm:text-[1.75rem]"
              >
                Corrections and contact
              </h2>
              <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-600">
                Found something wrong, out of date, or missing an important caveat? Tell
                us at{' '}
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="font-medium text-brand-700 underline decoration-brand-300 underline-offset-2 hover:text-brand-800"
                >
                  {siteConfig.contactEmail}
                </a>
                . We correct factual errors in place and note the change when it alters a
                recommendation.
              </p>
            </section>
          </div>

          {/* Sidebar */}
          <aside aria-labelledby="facts-heading" className="lg:pt-2">
            <div className="rounded-xl border border-ink-200 bg-ink-50/60 p-6">
              <h2
                id="facts-heading"
                className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-500"
              >
                At a glance
              </h2>
              <dl className="mt-4 space-y-4 text-sm">
                <div>
                  <dt className="font-semibold text-ink-900">Publishing since</dt>
                  <dd className="mt-0.5 text-ink-600">{siteConfig.foundingYear}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink-900">Coverage</dt>
                  <dd className="mt-0.5 text-ink-600">
                    RFP, RFI and RFQ response software; proposal management; security
                    questionnaire automation; procurement-side sourcing tools
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink-900">Funding</dt>
                  <dd className="mt-0.5 text-ink-600">
                    Funded by{' '}
                    <a
                      href={partnerUrl('about-sidebar')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-700 underline decoration-brand-300 underline-offset-2 hover:text-brand-800"
                    >
                      {partner.name}
                    </a>
                    , with no editorial control.{' '}
                    <Link
                      href="#funding"
                      className="text-brand-700 underline decoration-brand-300 underline-offset-2 hover:text-brand-800"
                    >
                      Details
                    </Link>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink-900">Paid placement</dt>
                  <dd className="mt-0.5 text-ink-600">
                    Not available to any vendor. No advertising, sponsorship or affiliate
                    income.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink-900">Contact</dt>
                  <dd className="mt-0.5">
                    <a
                      href={`mailto:${siteConfig.contactEmail}`}
                      className="text-brand-700 underline decoration-brand-300 underline-offset-2 hover:text-brand-800"
                    >
                      {siteConfig.contactEmail}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>

        <section aria-labelledby="team-heading" className="mt-20">
          <h2
            id="team-heading"
            className="text-2xl font-semibold tracking-[-0.015em] text-ink-900 sm:text-[1.75rem]"
          >
            Who writes here
          </h2>
          <p className="mt-3 max-w-2xl text-pretty text-[1.0625rem] leading-relaxed text-ink-600">
            A small group of practitioners rather than a newsroom. Each byline links to the
            experience behind it.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {Object.values(authors).map((author) => (
              <AuthorCard key={author.id} author={author} headingLevel="h3" />
            ))}
          </div>
        </section>

        <ArticleCta
          heading="Start with the buying guide"
          body="If you are early in an evaluation, How to Buy RFP Software is the fastest way to get oriented — then take the scoring templates from the resource library into your first vendor call."
          primary={{ href: '/guides/how-to-buy-rfp-software', label: 'Read the buying guide' }}
          secondary={{ href: '/resources', label: 'Resource library' }}
          className="mt-20"
        />
      </Container>
    </>
  );
}
