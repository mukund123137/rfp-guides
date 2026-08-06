import { cn } from '@/lib/utils';

type ProseContentProps = {
  html: string;
  className?: string;
};

/**
 * Renders markdown that was compiled to HTML at build time.
 *
 * The HTML comes exclusively from files in `content/` that ship with this
 * repository — it is authored, reviewed and version-controlled alongside the
 * code, never supplied by a user or a remote service.
 */
export function ProseContent({ html, className }: ProseContentProps) {
  return (
    <div
      className={cn('prose', className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
