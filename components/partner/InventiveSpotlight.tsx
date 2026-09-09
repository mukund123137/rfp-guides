import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Disclosure } from './Disclosure';
import {
  partner,
  partnerCapabilities,
  partnerReportedMetrics,
  partnerUrl,
} from '@/lib/partner';

/**
 * Homepage placement for Inventive AI.
 *
 * Structured to stay defensible rather than promotional: the left column states
 * the evaluation criteria from our own guides, the right column shows what one
 * product does about each, and the numbers are labelled as vendor-reported. A
 * reader who ignores the product entirely still leaves with the criteria.
 */
export function InventiveSpotlight() {
  return (
    <section
      aria-labelledby="spotlight-heading"
      className="surface-deep relative overflow-hidden py-16 text-white sm:py-20"
    >
      <div
        aria-hidden="true"
        className="surface-grid pointer-events-none absolute inset-0 opacity-[0.06]"
      />

      <Container className="relative">
        <div className="lg:grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          {/* ---------------------------------------------------- Framing */}
          <div>
            <p className="eyebrow text-brand-200 before:bg-accent-400">
              Built by the publisher
            </p>

            <h2
              id="spotlight-heading"
              className="mt-5 text-balance font-display text-[2rem] font-semibold leading-[1.14] tracking-[-0.02em] text-white sm:text-[2.375rem]"
            >
              How {partner.name} approaches RFP automation
            </h2>

            <p className="mt-5 text-pretty text-[1.0625rem] leading-relaxed text-ink-300">
              We publish these guides, and we also build software in this
              category. Rather than pretend otherwise, here is our product
              measured against the same criteria we tell you to hold every
              vendor to — including the ones we would fail on if we did not
              handle them.
            </p>

            <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
              {partnerReportedMetrics.map((metric) => (
                <div key={metric.label}>
                  <dt className="sr-only">{metric.label}</dt>
                  <dd>
                    <span className="block font-display text-[1.75rem] font-semibold tracking-[-0.02em] text-white">
                      {metric.value}
                    </span>
                    <span className="mt-1 block text-[0.8125rem] leading-snug text-ink-400">
                      {metric.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-[0.6875rem] uppercase tracking-eyebrow text-ink-500">
              Figures reported by {partner.name}, not independently verified
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href={partnerUrl('home-spotlight')}
                external
                size="lg"
                ariaLabel={`Explore ${partner.name} (opens in a new tab)`}
              >
                Explore {partner.name}
                <Icon name="arrow-up-right" size={17} />
              </ButtonLink>
              <ButtonLink href={partner.profilePath} variant="inverse" size="lg">
                Read our profile
              </ButtonLink>
            </div>
          </div>

          {/* ------------------------------------------- Criteria mapping */}
          <div className="mt-12 lg:mt-0">
            <ul className="space-y-px overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]">
              {partnerCapabilities.map((item, index) => (
                <li
                  key={item.criterion}
                  className="grid gap-1.5 border-b border-white/10 p-5 last:border-b-0 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] sm:gap-6"
                >
                  <div className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 font-mono text-[0.6875rem] text-accent-400"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-sans text-[0.9375rem] font-semibold leading-snug text-white">
                      {item.criterion}
                    </h3>
                  </div>
                  <p className="text-[0.875rem] leading-relaxed text-ink-300 sm:pl-0">
                    {item.approach}
                  </p>
                </li>
              ))}
            </ul>

            <p className="mt-4 text-[0.8125rem] leading-relaxed text-ink-400">
              Each row is a test from{' '}
              <Link
                href="/guides/things-to-look-for-in-rfp-software"
                className="font-medium text-brand-200 underline decoration-brand-300/40 underline-offset-2 transition-colors duration-150 ease-subtle hover:text-white"
              >
                our evaluation guide
              </Link>
              . Run all five against any shortlist, ours included.
            </p>

            <Disclosure tone="dark" className="mt-5" />
          </div>
        </div>
      </Container>
    </section>
  );
}
