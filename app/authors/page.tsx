import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbSchema, graph, itemListSchema } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/content/Breadcrumbs';
import { Card, stretchedLink } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { authors } from '@/lib/authors';
import { getArticlesByAuthor } from '@/lib/content';
import { cn } from '@/lib/utils';

const TITLE = 'Who Writes Here';
const DESCRIPTION =
  'The practitioners behind RFP Software Guides — what they did before writing, and every guide and article each one has published.';

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/authors',
  keywords: ['RFP Software Guides authors', 'proposal management experts'],
});

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Authors', href: '/authors' },
];

export default function AuthorsPage() {
  const list = Object.values(authors);

  return (
    <>
      <JsonLd
        id="authors-page"
        data={graph(
          breadcrumbSchema(crumbs),
          itemListSchema(
            list.map((a) => ({
              name: a.name,
              href: `/authors/${a.id}`,
              description: a.role,
            })),
            'Contributors',
          ),
        )}
      />

      <div className="surface-tint border-b border-ink-200">
        <Container className="py-12 sm:py-16">
          <Breadcrumbs crumbs={crumbs} />
          <p className="eyebrow mt-6">Contributors</p>
          <h1 className="mt-4 max-w-3xl text-balance font-display text-[2.25rem] font-semibold leading-[1.08] tracking-[-0.025em] text-ink-900 sm:text-[3rem]">
            Who writes here
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-ink-600">
            A small group of practitioners rather than a newsroom. Everyone here has run
            bid desks, built proposal functions or evaluated the software from the inside
            — and every byline links to what that experience actually was.
          </p>
        </Container>
      </div>

      <Container className="py-12 sm:py-16">
        <ul className="grid list-none grid-cols-1 gap-6 p-0 lg:grid-cols-3">
          {list.map((author) => {
            const count = getArticlesByAuthor(author.id).length;
            return (
              <li key={author.id} className="flex">
                <Card as="article" className="group w-full">
                  <span
                    aria-hidden="true"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-base font-semibold text-white"
                  >
                    {author.initials}
                  </span>
                  <h2 className="mt-5 font-display text-xl font-semibold text-ink-900">
                    <Link
                      href={`/authors/${author.id}`}
                      className={cn(
                        'transition-colors duration-150 ease-subtle group-hover:text-brand-700',
                        stretchedLink,
                      )}
                    >
                      {author.name}
                    </Link>
                  </h2>
                  <p className="mt-1 text-sm font-medium text-brand-700">{author.role}</p>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-600">
                    {author.bio}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                    {count} {count === 1 ? 'piece' : 'pieces'}
                    <Icon
                      name="arrow-right"
                      size={16}
                      className="transition-transform duration-150 ease-subtle group-hover:translate-x-0.5"
                    />
                  </span>
                </Card>
              </li>
            );
          })}
        </ul>
      </Container>
    </>
  );
}
