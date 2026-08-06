import type { ReactNode, SVGProps } from 'react';

export type IconName =
  | 'arrow-right'
  | 'arrow-up-right'
  | 'book'
  | 'checklist'
  | 'chevron-down'
  | 'clock'
  | 'download'
  | 'guide'
  | 'linkedin'
  | 'menu'
  | 'rss'
  | 'search'
  | 'shield'
  | 'sparkles'
  | 'template'
  | 'x'
  | 'x-close'
  | 'youtube';

const paths: Record<IconName, ReactNode> = {
  'arrow-right': <path d="M5 12h14m-6-6 6 6-6 6" />,
  'arrow-up-right': <path d="M7 17 17 7m0 0h-7m7 0v7" />,
  book: (
    <>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H19v15H6.5A2.5 2.5 0 0 0 4 20.5z" />
      <path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H19v3H6.5A2.5 2.5 0 0 1 4 20.5z" />
    </>
  ),
  checklist: (
    <>
      <path d="m3 7 2 2 4-4" />
      <path d="m3 17 2 2 4-4" />
      <path d="M13 6h8M13 12h8M13 18h8" />
    </>
  ),
  'chevron-down': <path d="m6 9 6 6 6-6" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  download: (
    <>
      <path d="M12 3v12m0 0 4-4m-4 4-4-4" />
      <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
    </>
  ),
  guide: (
    <>
      <path d="M5 4h9l5 5v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" />
      <path d="M14 4v5h5M8 13h8M8 17h5" />
    </>
  ),
  // Brand marks read better as solid shapes than as outlines at small sizes.
  linkedin: (
    <>
      <path
        d="M4.5 9.5h3v10h-3zM6 4.25a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5zM11 19.5v-10h2.9v1.37a3.5 3.5 0 0 1 3.05-1.62c2.2 0 3.55 1.42 3.55 4.12v6.13h-3v-5.6c0-1.4-.6-2.2-1.8-2.2s-1.9.8-1.9 2.2v5.6z"
        fill="currentColor"
        stroke="none"
      />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  rss: (
    <>
      <path d="M5 19a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
      <path d="M5 12a7 7 0 0 1 7 7M5 6a13 13 0 0 1 13 13" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v5.5c0 4.3-2.9 8.2-7 9.5-4.1-1.3-7-5.2-7-9.5V6z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  sparkles: (
    <>
      <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z" />
      <path d="M18.5 15.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z" />
    </>
  ),
  template: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M4 9h16M9 9v11" />
    </>
  ),
  x: (
    <path
      d="M17.53 4h2.74l-5.99 6.84L21 20h-5.62l-4.4-5.75L5.94 20H3.2l6.2-7.09L3 4h5.76l4.13 5.46zm-.96 14.34h1.52L7.5 5.57H5.87z"
      fill="currentColor"
      stroke="none"
    />
  ),
  'x-close': <path d="M6 6l12 12M18 6 6 18" />,
  youtube: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="3" />
      <path d="m11 9.5 4 2.5-4 2.5z" />
    </>
  ),
};

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: number;
};

/**
 * Single inline SVG sprite. Icons ship in the HTML payload — no icon library,
 * no network request, no layout shift.
 */
export function Icon({ name, size = 20, className, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
