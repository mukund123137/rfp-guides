import Link from 'next/link';
import type { Article, ArticleSummary } from '@/lib/content';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icon';
import { JsonLd } from '@/components/seo/JsonLd';
import { Breadcrumbs } from './Breadcrumbs';
import { TableOfContents } from './TableOfContents';
import { KeyTakeaways } from './KeyTakeaways';
import { ProseContent } from './ProseContent';
import { Faq } from './Faq';
import { AuthorCard } from './AuthorCard';
import { ArticleCta } from './ArticleCta';
import { RelatedArticles } from './RelatedArticles';
import {
  InventiveCallout,
  isInventiveAngle,
} from '@/components/partner/InventiveCallout';
import {
  articleSchema,
  breadcrumbSchema,
  faqSchema,
  graph,
  type BreadcrumbCrumb,
} from '@/lib/schema';
import { formatDate } from '@/lib/utils';

type ArticleLayoutProps = {
  article: Article;
  crumbs: BreadcrumbCrumb[];
  related: ArticleSummary[];
};

/**
 * The single template behind every guide and blog post. Adding an article means
 * adding a markdown file — no React changes required.
 */
export function ArticleLayout({ article, crumbs, related }: ArticleLayoutProps) {
  const publishedIso = new Date(article.publishedAt).toISOString();
  const updatedIso = new Date(article.updatedAt).toISOString();
  const wasUpdated = article.updatedAt !== article.publishedAt;

  return (
    <>
      <JsonLd
        id={`article-${article.slug}`}
        data={graph(
          articleSchema(article),
          breadcrumbSchema(crumbs),
          faqSchema(article.faq),
        )}
      />

      <article>
        {/* ---------------------------------------------------------------- Header */}
        <header className="surface-tint border-b border-ink-200 pb-10 pt-8 sm:pb-12">
          <Container>
            <Breadcrumbs crumbs={crumbs} />

            <div className="mt-6 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2.5">
                <Badge tone="brand">{article.category}</Badge>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500">
                  <Icon name="clock" size={15} />
                  {article.readingTime} min read
                </span>
              </div>

              <h1 className="mt-4 text-balance font-display text-[2.25rem] font-semibold leading-[1.08] tracking-[-0.025em] text-ink-900 sm:text-[3rem]">
                {article.title}
              </h1>

              <p className="mt-5 text-pretty text-lg leading-relaxed text-ink-600">
                {article.description}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-ink-200 pt-5 text-sm text-ink-600">
                <span className="flex items-center gap-2.5">
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-[0.6875rem] font-semibold text-white"
                  >
                    {article.author.initials}
                  </span>
                  <span>
                    By{' '}
                    <Link
                      href={`/authors/${article.author.id}`}
                      className="font-semibold text-ink-900 underline decoration-ink-300 underline-offset-2 transition-colors duration-150 ease-subtle hover:text-brand-700 hover:decoration-brand-400"
                    >
                      {article.author.name}
                    </Link>
                  </span>
                </span>

                <span aria-hidden="true" className="text-ink-300">
                  &middot;
                </span>

                <span>
                  {wasUpdated ? 'Last updated' : 'Published'}{' '}
                  <time dateTime={wasUpdated ? updatedIso : publishedIso}>
                    {formatDate(wasUpdated ? article.updatedAt : article.publishedAt)}
                  </time>
                </span>

                {wasUpdated ? (
                  <>
                    <span aria-hidden="true" className="text-ink-300">
                      &middot;
                    </span>
                    <span className="text-ink-500">
                      Originally published{' '}
                      <time dateTime={publishedIso}>
                        {formatDate(article.publishedAt)}
                      </time>
                    </span>
                  </>
                ) : null}
              </div>
            </div>
          </Container>
        </header>

        {/* ------------------------------------------------------------- Body grid */}
        <Container className="py-10 sm:py-14">
          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-12 xl:gap-16">
            <div className="min-w-0 max-w-prose">
              {article.takeaways.length > 0 ? (
                <KeyTakeaways items={article.takeaways} className="mb-10" />
              ) : null}

              {/* Mobile TOC: collapsed by default so it never pushes content down. */}
              {article.toc.length > 0 ? (
                <details className="mb-10 rounded-xl border border-ink-200 bg-paper-100 p-5 lg:hidden">
                  <summary className="cursor-pointer list-none text-sm font-semibold text-ink-900 [&::-webkit-details-marker]:hidden">
                    <span className="flex items-center justify-between">
                      Table of contents
                      <Icon name="chevron-down" size={18} className="text-ink-400" />
                    </span>
                  </summary>
                  <TableOfContents toc={article.toc} className="mt-4" title="Sections" />
                </details>
              ) : null}

              <ProseContent html={article.html} />

              {/* Publisher callout, only where the article opts in via frontmatter. */}
              {isInventiveAngle(article.inventiveAngle) ? (
                <InventiveCallout angle={article.inventiveAngle} className="mt-14" />
              ) : null}

              {article.faq.length > 0 ? (
                <Faq items={article.faq} className="mt-16" />
              ) : null}

              <ArticleCta
                heading={article.ctaHeading}
                body={article.ctaBody}
                className="mt-16"
              />

              <AuthorCard author={article.author} className="mt-10" />

              <p className="mt-8 text-sm text-ink-500">
                Reviewed for accuracy on{' '}
                <time dateTime={updatedIso}>{formatDate(article.updatedAt)}</time>. We
                update this page whenever the underlying market or product landscape
                changes materially.
              </p>
            </div>

            {/* Desktop sticky TOC */}
            {article.toc.length > 0 ? (
              <aside className="hidden lg:block">
                <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pb-8">
                  <TableOfContents toc={article.toc} />
                </div>
              </aside>
            ) : null}
          </div>
        </Container>

        {related.length > 0 ? (
          <div className="border-t border-ink-200 bg-paper-100 py-14">
            <Container>
              <RelatedArticles articles={related} />
            </Container>
          </div>
        ) : null}
      </article>
    </>
  );
}
