import type { Metadata } from 'next';
import { createMetadata } from '@/lib/seo/metadata';
import { softwareAppJsonLd } from '@/lib/seo/jsonld';
import MilitaryComparatorClient from './MilitaryComparatorClient';

export const metadata: Metadata = createMetadata({
  title: 'Military Strength Comparison Tool 2025',
  description:
    'Compare military power between any two countries. Defense budgets, troop numbers, nuclear weapons, naval and air force strength — all in one place.',
  path: '/tools/military-comparator',
  keywords: [
    'military comparison',
    'army strength comparison',
    'defense budget 2025',
    'strongest military',
  ],
});

export default function MilitaryComparatorPage() {
  const jsonLd = softwareAppJsonLd(
    'Military Comparator',
    'Compare military power between any two countries with defense budgets, troops, and nuclear weapons data.',
    '/tools/military-comparator'
  );
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MilitaryComparatorClient />
    </>
  );
}
