import type { Metadata } from 'next';
import { getSummaries } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { ArticleGrid } from '@/components/content/ArticleGrid';
import Link from 'next/link';

export const metadata: Metadata = buildMetadata({
  title: 'Page not found',
  description: 'The page you were looking for does not exist. Browse our RFP software guides, blog and resource library instead.',
  path: '/404',
  noIndex: true,
});

const destinations = [
  { href: '/guides', label: 'Guides', hint: 'buying and evaluation' },
  { href: '/compare', label: 'Compare', hint: 'capability comparisons' },
  { href: '/blog', label: 'Blog', hint: 'analysis and trends' },
  { href: '/resources', label: 'Resources', hint: 'templates and checklists' },
  { href: '/glossary', label: 'Glossary', hint: '34 terms defined' },
  { href: '/authors', label: 'Authors', hint: 'who writes here' },
  { href: '/about', label: 'About', hint: 'editorial standards' },
  { href: '/contact', label: 'Contact', hint: 'corrections and pitches' },
];

export default function NotFound() {
  const suggestions = getSummaries('guides').slice(0, 3);

  return (
    <Container className="py-20 sm:py-28">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.08em] text-brand-600">
          Error 404
        </p>
        <h1 className="mt-4 text-balance font-display text-[2.25rem] font-semibold leading-[1.06] tracking-[-0.025em] text-ink-900 sm:text-[2.875rem]">
          We couldn&rsquo;t find that page
        </h1>
        <p className="mt-5 text-pretty text-lg leading-relaxed text-ink-600">
          The link may be out of date, or the page may have been renamed. Everything we
          publish is reachable from the sections below.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/guides" size="lg">
            Browse guides
            <Icon name="arrow-right" size={18} />
          </ButtonLink>
          <ButtonLink href="/" size="lg" variant="secondary">
            Back to home
          </ButtonLink>
        </div>

        {/* A real directory beats a dead end — every section, one click away. */}
        <nav aria-label="Site sections" className="mt-10 border-t border-ink-200 pt-8">
          <h2 className="eyebrow eyebrow-muted">Everything on this site</h2>
          <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2">
            {destinations.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group flex items-baseline gap-2 text-[0.9375rem] text-ink-700 transition-colors duration-150 ease-subtle hover:text-brand-700"
                >
                  <span className="font-medium">{item.label}</span>
                  <span className="text-sm text-ink-500 group-hover:text-brand-600">
                    {item.hint}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {suggestions.length > 0 ? (
        <section aria-labelledby="suggestions-heading" className="mt-16">
          <h2
            id="suggestions-heading"
            className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-500"
          >
            Popular guides
          </h2>
          <ArticleGrid articles={suggestions} columns={3} variant="compact" className="mt-6" />
        </section>
      ) : null}
    </Container>
  );
}
