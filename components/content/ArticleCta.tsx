import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';

type ArticleCtaProps = {
  heading?: string;
  body?: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
  className?: string;
};

/**
 * End-of-article conversion block. Defaults point at the resource library
 * rather than a vendor, which keeps the site's neutral stance intact.
 */
export function ArticleCta({
  heading = 'Put this into practice',
  body = 'Download the scoring templates, requirement matrices and buying checklists that pair with this guide — free, no signup wall.',
  primary = { href: '/resources', label: 'Browse free resources' },
  secondary = { href: '/guides', label: 'See all guides' },
  className,
}: ArticleCtaProps) {
  return (
    <section
      aria-labelledby="article-cta-heading"
      className={cn(
        'relative overflow-hidden rounded-2xl bg-ink-900 px-6 py-9 text-white sm:px-9 sm:py-11',
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-brand-600/25 blur-3xl"
      />

      <div className="relative max-w-2xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-brand-100">
          <Icon name="download" size={14} />
          Free toolkit
        </span>

        <h2
          id="article-cta-heading"
          className="mt-4 text-balance text-2xl font-semibold tracking-[-0.015em] text-white sm:text-[1.75rem]"
        >
          {heading}
        </h2>
        <p className="mt-3 text-pretty text-[1.0625rem] leading-relaxed text-ink-200">
          {body}
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={primary.href} size="lg" className="sm:w-auto">
            {primary.label}
            <Icon name="arrow-right" size={18} />
          </ButtonLink>
          <ButtonLink href={secondary.href} variant="inverse" size="lg">
            {secondary.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
