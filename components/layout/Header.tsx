'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { primaryNav } from '@/lib/site';
import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Logo } from './Logo';
import { cn } from '@/lib/utils';

function isActivePath(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Route change closes the panel; without this it would persist across navigation.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Escape closes the panel while it is open.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Logo />

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {primaryNav.map((item) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'rounded-lg px-3 py-2 text-[0.9375rem] font-medium transition-colors duration-150 ease-subtle',
                        active
                          ? 'text-brand-700'
                          : 'text-ink-600 hover:bg-ink-50 hover:text-ink-900',
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden md:block">
            <ButtonLink href="/resources" size="sm" variant="secondary">
              Free templates
            </ButtonLink>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="-mr-2 inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink-700 transition-colors duration-150 ease-subtle hover:bg-ink-100 md:hidden"
          >
            <Icon name={menuOpen ? 'x-close' : 'menu'} size={22} />
          </button>
        </div>
      </Container>

      {menuOpen ? (
        <div id="mobile-menu" className="border-t border-ink-200 bg-white md:hidden">
          <Container className="py-3">
            <nav aria-label="Mobile">
              <ul className="flex flex-col">
                {primaryNav.map((item) => {
                  const active = isActivePath(pathname, item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                          'flex flex-col gap-0.5 rounded-lg px-3 py-3 transition-colors duration-150 ease-subtle',
                          active ? 'bg-brand-50' : 'hover:bg-ink-50',
                        )}
                      >
                        <span
                          className={cn(
                            'text-base font-medium',
                            active ? 'text-brand-700' : 'text-ink-900',
                          )}
                        >
                          {item.label}
                        </span>
                        {item.description ? (
                          <span className="text-sm text-ink-500">{item.description}</span>
                        ) : null}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <ButtonLink href="/resources" size="md" className="mt-3 w-full">
              Free templates
              <Icon name="arrow-right" size={18} />
            </ButtonLink>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
