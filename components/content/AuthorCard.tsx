import Link from 'next/link';
import type { Author } from '@/lib/authors';
import { cn } from '@/lib/utils';

type AuthorCardProps = {
  author: Author;
  className?: string;
  headingLevel?: 'h2' | 'h3';
};

export function AuthorCard({
  author,
  className,
  headingLevel = 'h2',
}: AuthorCardProps) {
  const Heading = headingLevel;

  return (
    <section
      aria-label={`About the author, ${author.name}`}
      className={cn('rounded-xl border border-ink-200 bg-paper-100 p-6 sm:p-7', className)}
    >
      <div className="flex flex-col gap-5 sm:flex-row">
        <span
          aria-hidden="true"
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-600 text-lg font-semibold text-white"
        >
          {author.initials}
        </span>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-500">
            Written by
          </p>
          <Heading className="mt-1 font-display text-lg font-semibold text-ink-900">
            <Link
              href={`/authors/${author.id}`}
              className="transition-colors duration-150 ease-subtle hover:text-brand-700"
            >
              {author.name}
            </Link>
          </Heading>
          <p className="text-sm font-medium text-brand-700">{author.role}</p>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-600">{author.bio}</p>

          <ul className="mt-4 flex flex-wrap gap-2">
            {author.credentials.map((credential) => (
              <li
                key={credential}
                className="rounded-full bg-white px-3 py-1 text-xs font-medium text-ink-600 ring-1 ring-inset ring-ink-200"
              >
                {credential}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
