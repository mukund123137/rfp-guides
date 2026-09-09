import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildMetadata } from '@/lib/seo';
import { absoluteUrl, siteConfig } from '@/lib/site';
import { breadcrumbSchema, graph, ORGANIZATION_ID } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/content/Breadcrumbs';
import { ArticleGrid } from '@/components/content/ArticleGrid';
import { authors } from '@/lib/authors';
import { getArticlesByAuthor } from '@/lib/content';

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return Object.keys(authors).map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = authors[slug];
  if (!author) return { title: 'Author not found' };

  return buildMetadata({
    title: `${author.name} — ${author.role}`,
    description: `${author.bio} Read every guide and article by ${author.name} on ${siteConfig.name}.`,
    path: `/authors/${author.id}`,
    keywords: [author.name, 'RFP software', author.role],
  });
}

export default async function AuthorPage({ params }: PageProps) {
  const { slug } = await params;
  const author = authors[slug];
  if (!author) notFound();

  const articles = getArticlesByAuthor(author.id);
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Authors', href: '/authors' },
    { name: author.name, href: `/authors/${author.id}` },
  ];

  return (
    <>
      <JsonLd
        id={`author-${author.id}`}
        data={graph(breadcrumbSchema(crumbs), {
          '@type': 'ProfilePage',
          '@id': `${absoluteUrl(`/authors/${author.id}`)}#profile`,
          url: absoluteUrl(`/authors/${author.id}`),
          mainEntity: {
            '@type': 'Person',
            '@id': `${absoluteUrl(`/authors/${author.id}`)}#person`,
            name: author.name,
            jobTitle: author.role,
            description: author.bio,
            knowsAbout: author.credentials,
            worksFor: { '@id': ORGANIZATION_ID },
            url: absoluteUrl(`/authors/${author.id}`),
          },
        })}
      />

      <div className="surface-tint border-b border-ink-200">
        <Container className="py-12 sm:py-16">
          <Breadcrumbs crumbs={crumbs} />

          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-start">
            <span
              aria-hidden="true"
              className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-brand-600 text-2xl font-semibold text-white"
            >
              {author.initials}
            </span>

            <div className="max-w-2xl">
              <h1 className="text-balance font-display text-[2.125rem] font-semibold leading-[1.1] tracking-[-0.025em] text-ink-900 sm:text-[2.75rem]">
                {author.name}
              </h1>
              <p className="mt-2 text-lg font-medium text-brand-700">{author.role}</p>
              <p className="mt-4 text-pretty text-[1.0625rem] leading-relaxed text-ink-600">
                {author.bio}
              </p>

              <ul className="mt-6 flex flex-wrap gap-2">
                {author.credentials.map((credential) => (
                  <li
                    key={credential}
                    className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-ink-600 ring-1 ring-inset ring-ink-200"
                  >
                    {credential}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-12 sm:py-16">
        <h2 className="font-display text-2xl font-semibold tracking-[-0.02em] text-ink-900 sm:text-[1.875rem]">
          {articles.length === 1
            ? 'One piece by this author'
            : `${articles.length} pieces by this author`}
        </h2>
        <ArticleGrid articles={articles} columns={3} headingLevel="h3" className="mt-8" />
      </Container>
    </>
  );
}
