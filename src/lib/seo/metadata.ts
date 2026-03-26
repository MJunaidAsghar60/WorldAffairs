import { Metadata } from 'next';

const SITE_URL = 'https://worldaffairsblog.com';
const SITE_NAME = 'World Affairs';
const SITE_DESCRIPTION = 'Free geopolitical intelligence tools. Compare countries, track sanctions, calculate risk scores and analyze global power — no signup needed.';

interface MetadataInput {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogImage?: string;
  type?: 'website' | 'article';
}

export function createMetadata({
  title,
  description,
  path,
  keywords = [],
  ogImage = '/api/og?page=home',
  type = 'website',
}: MetadataInput): Metadata {
  const url = `${SITE_URL}${path}`;
  const fullTitle = `${title} | ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
    keywords: [
      'geopolitical intelligence',
      'world affairs',
      'country comparison',
      'free geopolitical tools',
      ...keywords,
    ],
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
      creator: '@worldaffairsblog',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export { SITE_URL, SITE_NAME, SITE_DESCRIPTION };
