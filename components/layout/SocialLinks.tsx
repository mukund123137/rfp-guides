import { socialLinks } from '@/lib/site';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';

type SocialLinksProps = {
  className?: string;
};

/**
 * Placeholder social links — hrefs point at each network's root until real
 * profile URLs exist, so nothing 404s in the meantime.
 */
export function SocialLinks({ className }: SocialLinksProps) {
  return (
    <ul className={cn('flex items-center gap-2', className)}>
      {socialLinks.map((link) => {
        const isInternal = link.href.startsWith('/');
        return (
          <li key={link.label}>
            <a
              href={link.href}
              aria-label={link.label}
              title={link.label}
              {...(isInternal
                ? {}
                : { target: '_blank', rel: 'noopener noreferrer' })}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-ink-300 transition-colors duration-150 ease-subtle hover:border-brand-400 hover:bg-white/10 hover:text-white"
            >
              <Icon name={link.icon} size={18} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
