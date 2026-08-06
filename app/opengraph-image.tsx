import { ogContentType, ogSize, renderOgImage } from '@/lib/og';
import { siteConfig } from '@/lib/site';

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = ogSize;
export const contentType = ogContentType;

/** Default social card, inherited by any route without its own image. */
export default function OpengraphImage() {
  return renderOgImage({
    eyebrow: 'Resource hub',
    title: 'The Complete Resource Hub for RFP Software',
    meta: 'Guides · Analysis · Templates · Glossary',
  });
}
