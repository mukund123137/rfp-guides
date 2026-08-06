/** Tiny class-name joiner — avoids a dependency for conditional Tailwind classes. */
export function cn(...values: (string | false | null | undefined)[]): string {
  return values.filter(Boolean).join(' ');
}

const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
};

export function formatDate(value: string): string {
  return new Intl.DateTimeFormat('en-US', DATE_FORMAT).format(new Date(value));
}

export function formatDateShort(value: string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(value));
}

export function toIsoDate(value: string): string {
  return new Date(value).toISOString();
}

/** RFC 822 date, required by the RSS 2.0 spec. */
export function toRfc822(value: string): string {
  return new Date(value).toUTCString();
}

export function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
