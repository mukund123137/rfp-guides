import type { Metadata } from 'next';
import { getSummaries } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { ArticleGrid } from '@/components/content/ArticleGrid';

export const metadata: Metadata = buildMetadata({
  title: 'Page not found',
  description: 'The page you were looking for does not exist. Browse our RFP software guides, blog and resource library instead.',
  path: '/404',
  noIndex: true,
});

export default function NotFound() {
  const suggestions = getSummaries('guides').slice(0, 3);

  return (
    <Container className="py-20 sm:py-28">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.08em] text-brand-600">
          Error 404
        </p>
        <h1 className="mt-4 text-balance text-[2.25rem] font-semibold leading-[1.1] tracking-[-0.025em] text-ink-900 sm:text-[2.75rem]">
          We couldn&rsquo;t find that page
        </h1>
        <p className="mt-5 text-pretty text-lg leading-relaxed text-ink-600">
          The link may be out of date, or the page may have been renamed. Everything we
          publish is reachable from the guides index, the blog or the resource library.
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
