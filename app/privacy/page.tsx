import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { absoluteUrl, siteConfig } from '@/lib/site';
import { breadcrumbSchema, graph } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { LegalPage } from '@/components/legal/LegalPage';
import { partner } from '@/lib/partner';

const TITLE = 'Privacy Policy';
const DESCRIPTION =
  'What RFP Software Guides collects, what it does not, and who to contact. The short version: no analytics, no advertising trackers, no cookies set by this site.';
const EFFECTIVE = '2026-09-09';

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/privacy',
});

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Privacy', href: '/privacy' },
];

const sections = [
  { id: 'summary', title: 'The short version' },
  { id: 'what-we-collect', title: 'What we collect' },
  { id: 'cookies', title: 'Cookies and tracking' },
  { id: 'newsletter', title: 'The newsletter form' },
  { id: 'third-parties', title: 'Third parties and outbound links' },
  { id: 'your-rights', title: 'Your rights' },
  { id: 'changes', title: 'Changes to this policy' },
  { id: 'contact-privacy', title: 'Contact' },
];

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        id="privacy-page"
        data={graph(breadcrumbSchema(crumbs), {
          '@type': 'WebPage',
          '@id': `${absoluteUrl('/privacy')}#page`,
          name: TITLE,
          description: DESCRIPTION,
          url: absoluteUrl('/privacy'),
        })}
      />

      <LegalPage
        title={TITLE}
        intro="This site is a static publication. It collects far less than most sites, and this page says exactly what that means rather than reserving rights we do not exercise."
        effectiveDate={EFFECTIVE}
        crumbs={crumbs}
        sections={sections}
      >
        <h2 id="summary">The short version</h2>
        <p>
          {siteConfig.name} is a set of static pages. We do not run analytics, we do not
          serve advertising, we do not embed third-party trackers, and this site sets no
          cookies. We do not build profiles of readers, and we have nothing to sell to
          data brokers because we do not collect anything to sell.
        </p>
        <p>
          If that changes — if we add analytics, for example — this page will be updated
          before the change ships, not after.
        </p>

        <h2 id="what-we-collect">What we collect</h2>
        <p>
          <strong>Through the site itself: nothing.</strong> There is no account system,
          no login, no comment system and no form that transmits data to us.
        </p>
        <p>
          <strong>Through our hosting provider:</strong> like any web server, the
          infrastructure serving these pages processes standard request data — IP address,
          user agent, requested URL, timestamp — in order to deliver the page and to
          protect against abuse. We do not combine this with anything else, and we do not
          use it to identify individuals.
        </p>
        <p>
          <strong>By email:</strong> if you write to us, we hold your message and address
          for as long as it takes to deal with it, and for a reasonable period afterwards
          so we can pick up a thread. We do not add correspondents to any mailing list.
        </p>

        <h2 id="cookies">Cookies and tracking</h2>
        <p>
          This site sets no cookies. It uses no local storage for tracking, no pixels, no
          fingerprinting and no session identifiers. There is no cookie banner because
          there is nothing to consent to.
        </p>
        <p>
          The site also loads no web fonts from third-party services — all typography uses
          fonts already present on your device — so no font provider receives a request
          from your browser on our behalf.
        </p>

        <h2 id="newsletter">The newsletter form</h2>
        <p>
          The newsletter signup currently validates your address in your browser and
          confirms on screen. <strong>It does not transmit anything to a server.</strong>{' '}
          No address entered into it is stored or received by us today.
        </p>
        <p>
          When we connect a real email provider, this section will be updated first to
          name the provider, say what is stored, and explain how to unsubscribe and have
          your address deleted.
        </p>

        <h2 id="third-parties">Third parties and outbound links</h2>
        <p>
          This site is published by {partner.name}. Links to {partner.name} carry campaign
          parameters in the URL so that company can see which page a visitor arrived from.
          Those parameters identify the page and placement — not you. Once you follow any
          outbound link, the destination site&rsquo;s own privacy policy applies, and we
          have no control over what it collects.
        </p>
        <p>
          We do not share, sell or transfer reader data to third parties, because we do not
          hold reader data to share.
        </p>

        <h2 id="your-rights">Your rights</h2>
        <p>
          Depending on where you live, you may have rights to access, correct, delete or
          port personal data an organisation holds about you, and to object to its
          processing. Since the only personal data we hold is email correspondence you
          chose to send us, exercising those rights is straightforward: write to us and ask.
        </p>
        <p>
          If you are in the UK or EU and are unhappy with how we have handled a request,
          you have the right to complain to your local data protection authority.
        </p>

        <h2 id="changes">Changes to this policy</h2>
        <p>
          Material changes will be reflected in the effective date at the top of this page.
          We will not quietly broaden what we collect and leave this page stale — if we
          start collecting something new, this page changes in the same release.
        </p>

        <h2 id="contact-privacy">Contact</h2>
        <p>
          Privacy questions and data requests go to{' '}
          <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>. See
          also our <Link href="/terms">terms of use</Link> and our{' '}
          <Link href="/about#disclosure">publisher disclosure</Link>.
        </p>
      </LegalPage>
    </>
  );
}
