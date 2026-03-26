import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || 'home';
  const title = searchParams.get('title') || 'World Affairs';
  const subtitle = searchParams.get('subtitle') || 'Free Geopolitical Intelligence Tools';

  const pageTitles: Record<string, { title: string; subtitle: string }> = {
    home: {
      title: 'World Affairs',
      subtitle: 'Free Geopolitical Intelligence — 8 Tools, No Signup',
    },
    tools: {
      title: 'Free Geopolitical Tools 2025',
      subtitle: 'Compare countries, track sanctions, analyze military power',
    },
    'country-comparator': {
      title: 'Country Comparator',
      subtitle: 'Compare any two countries across 19 key metrics',
    },
  };

  const content = pageTitles[page] || { title, subtitle };

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #080b14 0%, #0f172a 50%, #080b14 100%)',
          padding: '60px',
        }}
      >
        {/* Globe emoji */}
        <div style={{ fontSize: '64px', marginBottom: '24px' }}>🌍</div>

        {/* Brand */}
        <div
          style={{
            fontSize: '18px',
            color: '#818cf8',
            fontWeight: '600',
            marginBottom: '16px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}
        >
          WORLD AFFAIRS
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: '56px',
            fontWeight: '800',
            color: '#f9fafb',
            textAlign: 'center',
            lineHeight: '1.1',
            marginBottom: '20px',
          }}
        >
          {content.title}
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '24px',
            color: '#d1d5db',
            textAlign: 'center',
            lineHeight: '1.4',
          }}
        >
          {content.subtitle}
        </div>

        {/* Domain */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            fontSize: '16px',
            color: '#6b7280',
          }}
        >
          worldaffairsblog.com
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
