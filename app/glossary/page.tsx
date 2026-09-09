import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { absoluteUrl } from '@/lib/site';
import { breadcrumbSchema, graph } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/content/Breadcrumbs';
import { ArticleCta } from '@/components/content/ArticleCta';
import { Glossary } from '@/components/resources/Glossary';
import { getGlossary } from '@/lib/resources';

const TITLE = 'RFP Glossary: 34 Terms Defined in Plain Language';
const DESCRIPTION =
  'A plain-language glossary of RFP, proposal and response software terms — from answer library and compliance matrix to RAG, provenance and win theme. Defined the way practitioners use them.';

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/glossary',
  keywords: [
    'RFP glossary',
    'RFP terms',
    'proposal management glossary',
    'what is an RFP',
    'RFP software terminology',
  ],
});

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Glossary', href: '/glossary' },
];

export default function GlossaryPage() {
  const terms = getGlossary();

  return (
    <>
      <JsonLd
        id="glossary-page"
        data={graph(breadcrumbSchema(crumbs), {
          '@type': 'DefinedTermSet',
          '@id': `${absoluteUrl('/glossary')}#termset`,
          name: 'RFP Software Glossary',
          description: DESCRIPTION,
          url: absoluteUrl('/glossary'),
          inLanguage: 'en',
          hasDefinedTerm: terms.map((entry) => ({
            '@type': 'DefinedTerm',
            name: entry.term,
            description: entry.definition,
            inDefinedTermSet: absoluteUrl('/glossary'),
          })),
        })}
      />

      <div className="surface-tint border-b border-ink-200">
        <Container className="py-12 sm:py-16">
          <Breadcrumbs crumbs={crumbs} />
          <p className="eyebrow mt-6">Reference</p>
          <h1 className="mt-4 max-w-3xl text-balance font-display text-[2.25rem] font-semibold leading-[1.08] tracking-[-0.025em] text-ink-900 sm:text-[3rem]">
            The RFP software glossary
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-ink-600">
            {terms.length} terms that come up in nearly every RFP software
            conversation — defined the way practitioners actually use them, not the way
            vendor marketing does. Each definition is short enough to paste into a
            requirements document.
          </p>
        </Container>
      </div>

      <Container className="py-12 sm:py-16">
        <h2 className="sr-only">All terms</h2>
        <Glossary terms={terms} className="border-t-0 pt-0" />

        <p className="mt-12 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-600">
          Missing a term you keep running into? Tell us and we will add it — the
          glossary is maintained alongside the{' '}
          <Link
            href="/guides"
            className="font-medium text-brand-700 underline decoration-brand-300 underline-offset-2 hover:text-brand-800"
          >
            guides
          </Link>{' '}
          rather than written once and abandoned.
        </p>

        <ArticleCta
          heading="Put the vocabulary to work"
          body="The templates and checklists in our resource library use these terms consistently, so a requirements document built from them reads the same way to every evaluator."
          primary={{ href: '/resources', label: 'Browse free resources' }}
          secondary={{ href: '/guides/how-to-buy-rfp-software', label: 'Read the buying guide' }}
          className="mt-14"
        />
      </Container>
    </>
  );
}
