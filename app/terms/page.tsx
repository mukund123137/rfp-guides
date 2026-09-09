import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { absoluteUrl, siteConfig } from '@/lib/site';
import { breadcrumbSchema, graph } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { LegalPage } from '@/components/legal/LegalPage';
import { partner } from '@/lib/partner';

const TITLE = 'Terms of Use';
const DESCRIPTION =
  'The terms covering use of RFP Software Guides — what you may do with our templates and guidance, what we warrant, and the limits of editorial content as advice.';
const EFFECTIVE = '2026-09-09';

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/terms',
});

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Terms', href: '/terms' },
];

const sections = [
  { id: 'acceptance', title: 'Using this site' },
  { id: 'not-advice', title: 'Guidance is not professional advice' },
  { id: 'using-materials', title: 'Using our templates and content' },
  { id: 'attribution', title: 'Republishing and attribution' },
  { id: 'accuracy', title: 'Accuracy and corrections' },
  { id: 'funding', title: 'How this site is funded' },
  { id: 'liability', title: 'Liability' },
  { id: 'contact-terms', title: 'Contact' },
];

export default function TermsPage() {
  return (
    <>
      <JsonLd
        id="terms-page"
        data={graph(breadcrumbSchema(crumbs), {
          '@type': 'WebPage',
          '@id': `${absoluteUrl('/terms')}#page`,
          name: TITLE,
          description: DESCRIPTION,
          url: absoluteUrl('/terms'),
        })}
      />

      <LegalPage
        title={TITLE}
        intro="Plain terms for a publication. You are welcome to use what we publish in your own evaluation work — these terms mostly exist to be clear about what our guidance is and is not."
        effectiveDate={EFFECTIVE}
        crumbs={crumbs}
        sections={sections}
      >
        <h2 id="acceptance">Using this site</h2>
        <p>
          By using {siteConfig.name} you accept these terms. If you do not, please do not
          use the site. We may update these terms; the effective date above tells you when
          they last changed.
        </p>

        <h2 id="not-advice">Guidance is not professional advice</h2>
        <p>
          Everything here is general editorial guidance about buying and operating RFP
          software. It is <strong>not</strong> legal, procurement, security, financial or
          compliance advice, and it is not tailored to your organisation, your contracts or
          your regulatory obligations.
        </p>
        <p>
          Our guides deliberately tell you to verify things yourself — run the demo tests,
          read the SOC 2 report, take the contract to your own counsel. That instruction is
          part of the guidance, not a disclaimer bolted onto it. Decisions you make remain
          yours.
        </p>

        <h2 id="using-materials">Using our templates and content</h2>
        <p>
          The templates, checklists, scorecards and matrices we publish exist to be used.
          You may copy them into your own documents, adapt them, and use them inside your
          organisation — including commercially — without asking us and without payment.
        </p>
        <p>
          You may not repackage them as a product for sale, present them as your own
          original work in a commercial offering, or use them to build a competing
          directory or comparison service.
        </p>

        <h2 id="attribution">Republishing and attribution</h2>
        <p>
          Short quotations with a link back are welcome and need no permission. Republishing
          a full article, or a substantial part of one, needs our written permission —
          mostly so that outdated copies of a page we have since corrected do not circulate
          under our name.
        </p>
        <p>
          Do not present our content as the output of an unrelated publication, and do not
          use our name or marks in a way that implies we endorse a product, including any
          product we write about.
        </p>

        <h2 id="accuracy">Accuracy and corrections</h2>
        <p>
          We work to keep this site accurate and each page carries a last-reviewed date, but
          the market moves and pages go stale. We make no warranty that content is complete,
          current or fit for a particular purpose. Vendor-reported figures we cite are
          labelled as such and are not independently verified by us.
        </p>
        <p>
          If you find an error, tell us at{' '}
          <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>. We
          correct factual errors in place and note the change where it alters a conclusion.
        </p>

        <h2 id="funding">How this site is funded</h2>
        <p>
          This site is funded by {partner.name}, one of the vendors in the category we
          cover. That funding does not buy editorial control: {partner.name} does not
          commission our articles, see drafts before publication or approve conclusions.
          No vendor pays for placement, and we publish no vendor rankings. The fuller
          note is on our <Link href="/about#funding">about page</Link>.
        </p>

        <h2 id="liability">Liability</h2>
        <p>
          To the extent permitted by law, we are not liable for losses arising from
          decisions made on the basis of content published here, from errors or omissions in
          that content, or from any interruption in access to the site. Nothing in these
          terms limits liability that cannot lawfully be limited.
        </p>
        <p>
          Outbound links are provided for reference. We are not responsible for the content,
          accuracy or practices of any site we link to.
        </p>

        <h2 id="contact-terms">Contact</h2>
        <p>
          Questions about these terms go to{' '}
          <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>. See
          also our <Link href="/privacy">privacy policy</Link>.
        </p>
      </LegalPage>
    </>
  );
}
