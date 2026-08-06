import Link from 'next/link';
import type { ArticleSummary } from '@/lib/content';
import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';

type HeroProps = {
  /** Ordered guides, rendered as a numbered reading path beside the headline. */
  path: ArticleSummary[];
};

const stats = [
  { value: '4', label: 'In-depth buying guides' },
  { value: '30+', label: 'Glossary definitions' },
  { value: '100%', label: 'Vendor-neutral, no paid placement' },
];

export function Hero({ path }: HeroProps) {
  return (
    <section className="surface-tint border-b border-ink-200">
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start lg:gap-16">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-brand-700 ring-1 ring-inset ring-brand-100">
              <Icon name="book" size={14} />
              Independent research &amp; education
            </p>

            <h1 className="mt-6 text-balance text-[2.5rem] font-semibold leading-[1.08] tracking-[-0.025em] text-ink-900 sm:text-5xl lg:text-[3.25rem]">
              The Complete Resource Hub for RFP Software
            </h1>

            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink-600 sm:text-xl">
              Learn how to buy, evaluate, compare, and implement RFP software with expert
              guides, industry insights, and practical resources.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/guides" size="lg">
                Browse Guides
                <Icon name="arrow-right" size={18} />
              </ButtonLink>
              <ButtonLink href="/blog" size="lg" variant="secondary">
                Latest Articles
              </ButtonLink>
            </div>
          </div>

          {/* Reading path — gives the wide layout a second column and gets new
              readers into the right guide without a detour via the index. */}
          {path.length > 0 ? (
            <nav
              aria-labelledby="reading-path-heading"
              className="mt-14 rounded-xl border border-ink-200 bg-white/80 p-6 shadow-card backdrop-blur lg:mt-0"
            >
              <h2
                id="reading-path-heading"
                className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-500"
              >
                The buying path
              </h2>
              <ol className="mt-4 space-y-3.5">
                {path.map((article, index) => (
                  <li key={article.slug} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-[0.625rem] font-bold text-brand-700"
                    >
                      {index + 1}
                    </span>
                    <Link
                      href={article.url}
                      className="text-[0.9375rem] font-medium leading-snug text-ink-700 transition-colors duration-150 ease-subtle hover:text-brand-700"
                    >
                      {article.title}
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}
        </div>

        <dl className="mt-14 grid grid-cols-1 gap-8 border-t border-ink-200 pt-9 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block text-3xl font-semibold tracking-[-0.02em] text-brand-700">
                  {stat.value}
                </span>
                <span className="mt-1.5 block text-[0.9375rem] text-ink-600">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
