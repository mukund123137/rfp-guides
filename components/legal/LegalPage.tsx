import type { ReactNode } from 'react';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/content/Breadcrumbs';
import { TableOfContents } from '@/components/content/TableOfContents';
import type { TocEntry } from '@/lib/content';
import type { BreadcrumbCrumb } from '@/lib/schema';
import { formatDate } from '@/lib/utils';

type LegalPageProps = {
  title: string;
  intro: string;
  effectiveDate: string;
  crumbs: BreadcrumbCrumb[];
  /** Section ids and titles, used for the sidebar contents list. */
  sections: { id: string; title: string }[];
  children: ReactNode;
};

/**
 * Shared shell for policy pages. Keeps privacy and terms structurally identical
 * — same header, same contents list, same last-updated treatment — so only the
 * prose differs between them.
 */
export function LegalPage({
  title,
  intro,
  effectiveDate,
  crumbs,
  sections,
  children,
}: LegalPageProps) {
  const toc: TocEntry[] = sections.map((section) => ({
    id: section.id,
    title: section.title,
    depth: 2,
    children: [],
  }));

  return (
    <>
      <div className="surface-tint border-b border-ink-200">
        <Container className="py-12 sm:py-16">
          <Breadcrumbs crumbs={crumbs} />
          <p className="eyebrow mt-6">Policy</p>
          <h1 className="mt-4 max-w-3xl text-balance font-display text-[2.25rem] font-semibold leading-[1.08] tracking-[-0.025em] text-ink-900 sm:text-[2.875rem]">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-ink-600">
            {intro}
          </p>
          <p className="mt-6 border-t border-ink-200 pt-5 text-sm text-ink-500">
            Effective{' '}
            <time dateTime={new Date(effectiveDate).toISOString()}>
              {formatDate(effectiveDate)}
            </time>
            . We update this page when what we do changes, not on a schedule.
          </p>
        </Container>
      </div>

      <Container className="py-12 sm:py-14">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-12 xl:gap-16">
          <div className="prose min-w-0 max-w-prose">{children}</div>

          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <TableOfContents toc={toc} title="Contents" />
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
