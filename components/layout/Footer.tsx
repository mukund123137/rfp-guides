import Link from 'next/link';
import { footerNav, siteConfig } from '@/lib/site';
import { partner, partnerUrl } from '@/lib/partner';
import { Container } from '@/components/ui/Container';
import { NewsletterForm } from '@/components/ui/NewsletterForm';
import { Logo } from './Logo';
import { SocialLinks } from './SocialLinks';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-ink-900 text-ink-300">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]">
          {/* Brand + newsletter */}
          <div className="max-w-md">
            <Logo tone="light" />

            <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-400">
              {siteConfig.description}
            </p>

            <section aria-labelledby="newsletter-heading" className="mt-8">
              <h2 id="newsletter-heading" className="text-base font-semibold text-white">
                The RFP Software Brief
              </h2>
              <p className="mt-1.5 text-sm text-ink-400">
                One evaluation lesson, one template and one market shift — every other
                Tuesday.
              </p>
              <NewsletterForm tone="dark" className="mt-4" />
            </section>
          </div>

          {/* Navigation columns */}
          <nav aria-label="Footer">
            <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
              {footerNav.map((group) => (
                <div key={group.title}>
                  <h2 className="text-xs font-semibold uppercase tracking-[0.08em] text-white">
                    {group.title}
                  </h2>
                  <ul className="mt-4 space-y-2.5">
                    {group.items.map((item) => (
                      <li key={`${group.title}-${item.href}`}>
                        <Link
                          href={item.href}
                          className="text-sm leading-snug text-ink-400 transition-colors duration-150 ease-subtle hover:text-white"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-ink-400">
            <p>
              &copy; {year} {siteConfig.name}. All rights reserved.
            </p>
            <p className="mt-1.5 max-w-xl text-xs leading-relaxed text-ink-500">
              Independent guidance on RFP software. No sponsored posts, no affiliate
              links, no paid placement. Funded by{' '}
              <a
                href={partnerUrl('footer-funding')}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="underline decoration-dotted underline-offset-2 transition-colors duration-150 ease-subtle hover:text-ink-300"
              >
                {partner.name}
              </a>
              , which has no editorial control —{' '}
              <Link
                href="/about#funding"
                className="underline decoration-dotted underline-offset-2 transition-colors duration-150 ease-subtle hover:text-ink-300"
              >
                how that works
              </Link>
              .
            </p>
          </div>

          <SocialLinks />
        </div>
      </Container>
    </footer>
  );
}
