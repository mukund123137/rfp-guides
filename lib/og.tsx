import { ImageResponse } from 'next/og';
import { siteConfig } from './site';

/** Shared config for every `opengraph-image` route in the app. */
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = 'image/png';

type RenderOgImageInput = {
  eyebrow: string;
  title: string;
  meta?: string;
};

/**
 * Builds the social preview card. Rendered at build time by each route's
 * `opengraph-image` file, so every page ships a real 1200x630 PNG with its own
 * headline rather than one generic image.
 */
export function renderOgImage({ eyebrow, title, meta }: RenderOgImageInput) {
  // ImageResponse supports a deliberately small CSS subset — flexbox only,
  // no shorthand gaps on some properties, explicit display on every div.
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#ffffff',
          backgroundImage:
            'radial-gradient(900px 420px at 8% -8%, #e4edfd 0%, rgba(255,255,255,0) 62%)',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              width: 56,
              height: 56,
              borderRadius: 14,
              backgroundColor: '#1d63d8',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 20,
            }}
          >
            <div
              style={{
                display: 'flex',
                width: 22,
                height: 28,
                border: '4px solid #ffffff',
                borderRadius: 3,
              }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 25, fontWeight: 700, color: '#161c27' }}>
              RFP Software
            </span>
            <span style={{ fontSize: 25, fontWeight: 700, color: '#1d63d8' }}>Guides</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span
            style={{
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 2.5,
              textTransform: 'uppercase',
              color: '#1d63d8',
              marginBottom: 22,
            }}
          >
            {eyebrow}
          </span>
          <span
            style={{
              fontSize: title.length > 74 ? 56 : 66,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: -1.6,
              color: '#161c27',
            }}
          >
            {title}
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '2px solid #d9dde3',
            paddingTop: 26,
          }}
        >
          <span style={{ fontSize: 24, color: '#4f5a70' }}>
            {meta ?? 'Independent, vendor-neutral research'}
          </span>
          <span style={{ fontSize: 24, fontWeight: 600, color: '#68738a' }}>
            {siteConfig.url.replace('https://www.', '')}
          </span>
        </div>
      </div>
    ),
    { ...ogSize },
  );
}
