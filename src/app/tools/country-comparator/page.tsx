import type { Metadata } from 'next';
import { createMetadata } from '@/lib/seo/metadata';
import { softwareAppJsonLd } from '@/lib/seo/jsonld';
import CountryComparatorClient from './CountryComparatorClient';

export const metadata: Metadata = createMetadata({
  title: 'Compare Any Two Countries — GDP, Military & More',
  description:
    'Side-by-side country comparison across 19 key metrics: GDP, military power, HDI, corruption index and more. Free, instant, no signup required.',
  path: '/tools/country-comparator',
  keywords: [
    'compare countries',
    'country comparison tool',
    'india vs china',
    'usa vs russia',
    'gdp comparison 2025',
  ],
  ogImage: '/api/og?page=country-comparator',
});

export default function CountryComparatorPage() {
  const jsonLd = softwareAppJsonLd(
    'Country Comparator',
    'Compare any two countries across 19 key metrics including GDP, military power, HDI, and more.',
    '/tools/country-comparator'
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CountryComparatorClient />
    </>
  );
}
