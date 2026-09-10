import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { absoluteUrl, siteConfig } from '@/lib/site';
import { breadcrumbSchema, graph, ORGANIZATION_ID } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/content/Breadcrumbs';
import { Icon, type IconName } from '@/components/ui/Icon';
import { partner, partnerUrl } from '@/lib/partner';

const TITLE = 'Contact';
const DESCRIPTION =
  'How to reach the editors of RFP Software Guides — corrections, contributions, glossary additions, and press. We correct factual errors in place.';

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/contact',
  keywords: ['contact RFP Software Guides', 'RFP software corrections'],
});

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Contact', href: '/contact' },
];

const reasons: { icon: IconName; title: string; body: string; subject: string }[] = [
  {
    icon: 'shield',
    title: 'Report a correction',
    body: 'Something factually wrong, out of date, or missing an important caveat. Tell us which page and what is wrong — we correct errors in place and note the change when it alters a recommendation.',
    subject: 'Correction',
  },
  {
    icon: 'book',
    title: 'Suggest a glossary term',
    body: 'A term you keep running into that we have not defined. Send the term and, if you have one, the definition you would use.',
    subject: 'Glossary suggestion',
  },
  {
    icon: 'guide',
    title: 'Pitch a contribution',
    body: 'We publish practitioners, not agencies. If you have run bid desks or built a proposal function and want to write, send a two-paragraph outline and what you have done.',
    subject: 'Contribution pitch',
  },
  {
    icon: 'search',
    title: 'Press and research',
    body: 'Questions about our methodology, our editorial standards, or a figure we published. We will point you at the source or tell you we do not have one.',
    subject: 'Press enquiry',
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        id="contact-page"
        data={graph(breadcrumbSchema(crumbs), {
          '@type': 'ContactPage',
          '@id': `${absoluteUrl('/contact')}#contact`,
          name: TITLE,
          description: DESCRIPTION,
          url: absoluteUrl('/contact'),
          mainEntity: { '@id': ORGANIZATION_ID },
        })}
      />

      <div className="surface-tint border-b border-ink-200">
        <Container className="py-12 sm:py-16">
          <Breadcrumbs crumbs={crumbs} />
          <p className="eyebrow mt-6">Get in touch</p>
          <h1 className="mt-4 max-w-3xl text-balance font-display text-[2.25rem] font-semibold leading-[1.08] tracking-[-0.025em] text-ink-900 sm:text-[3rem]">
            Contact the editors
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-ink-600">
            One inbox, read by the people who write here. We reply to corrections first,
            usually within a couple of working days.
          </p>
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="mt-7 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-5 py-3 text-[0.9375rem] font-semibold text-white shadow-sm transition-all duration-150 ease-subtle hover:bg-brand-700 hover:shadow-md"
          >
            {siteConfig.contactEmail}
            <Icon name="arrow-right" size={17} />
          </a>
        </Container>
      </div>

      <Container className="py-12 sm:py-16">
        <h2 className="sr-only">What to write about</h2>
        <ul className="grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2">
          {reasons.map((reason) => (
            <li
              key={reason.title}
              className="rounded-xl border border-ink-200 bg-white p-6 shadow-card"
            >
              <span
                aria-hidden="true"
                className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-600"
              >
                <Icon name={reason.icon} size={22} />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-ink-900">
                {reason.title}
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">
                {reason.body}
              </p>
              <a
                href={`mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(reason.subject)}`}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition-colors duration-150 ease-subtle hover:text-brand-800"
              >
                Email about this
                <Icon name="arrow-right" size={15} />
              </a>
            </li>
          ))}
        </ul>

        <section
          aria-labelledby="publisher-contact"
          className="mt-14 rounded-xl border border-ink-200 bg-paper-100 p-6 sm:p-8"
        >
          <h2
            id="publisher-contact"
            className="font-display text-xl font-semibold text-ink-900"
          >
            Looking for {partner.name}, not the editors?
          </h2>
          <p className="mt-2 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-600">
            {partner.name} funds this site — it is a leading AI RFP platform for
            automating RFPs, RFIs, DDQs and security questionnaires, known for its
            agentic AI and for being straightforward to adopt. The editorial inbox above
            is not a sales channel and we do not pass enquiries on, so for product
            questions, demos or pricing, go to the company directly.
          </p>
          <a
            href={partnerUrl('contact-page')}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold text-brand-700 transition-colors duration-150 ease-subtle hover:text-brand-800"
          >
            Explore {partner.name}
            <Icon name="arrow-up-right" size={16} />
          </a>
        </section>
      </Container>
    </>
  );
}
