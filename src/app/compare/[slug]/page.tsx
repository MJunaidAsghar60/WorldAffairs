import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createMetadata } from '@/lib/seo/metadata';
import { faqJsonLd, breadcrumbJsonLd } from '@/lib/seo/jsonld';
import { getCountryById } from '@/data/countries';
import ComparePageClient from './ComparePageClient';

const STATIC_SLUGS = [
  'us-vs-china',
  'india-vs-pakistan',
  'russia-vs-ukraine',
  'usa-vs-russia',
  'india-vs-china',
  'iran-vs-israel',
  'north-korea-vs-south-korea',
  'saudi-arabia-vs-iran',
  'uk-vs-france',
  'germany-vs-france',
  'brazil-vs-argentina',
];

const SLUG_TO_IDS: Record<string, [string, string]> = {
  'us-vs-china': ['us', 'cn'],
  'india-vs-pakistan': ['in', 'pk'],
  'russia-vs-ukraine': ['ru', 'ua'],
  'usa-vs-russia': ['us', 'ru'],
  'india-vs-china': ['in', 'cn'],
  'iran-vs-israel': ['ir', 'il'],
  'north-korea-vs-south-korea': ['kp', 'kr'],
  'saudi-arabia-vs-iran': ['sa', 'ir'],
  'uk-vs-france': ['gb', 'fr'],
  'germany-vs-france': ['de', 'fr'],
  'brazil-vs-argentina': ['br', 'ar'],
};

export function generateStaticParams() {
  return STATIC_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const ids = SLUG_TO_IDS[params.slug];
  if (!ids) {
    return { title: 'Country Comparison | World Affairs' };
  }

  const countryA = getCountryById(ids[0]);
  const countryB = getCountryById(ids[1]);

  if (!countryA || !countryB) {
    return { title: 'Country Comparison | World Affairs' };
  }

  return createMetadata({
    title: `${countryA.name} vs ${countryB.name} — Full Comparison 2025`,
    description: `Compare ${countryA.name} and ${countryB.name} across GDP, military, population, HDI and 15 more key metrics. Free detailed analysis updated for 2025.`,
    path: `/compare/${params.slug}`,
    keywords: [
      `${countryA.name.toLowerCase()} vs ${countryB.name.toLowerCase()}`,
      'country comparison 2025',
      'gdp comparison',
      'military comparison',
    ],
  });
}

export default function ComparePage({ params }: { params: { slug: string } }) {
  const ids = SLUG_TO_IDS[params.slug];

  if (!ids) {
    notFound();
  }

  const countryA = getCountryById(ids[0]);
  const countryB = getCountryById(ids[1]);

  if (!countryA || !countryB) {
    notFound();
  }

  const faqData = faqJsonLd([
    {
      q: `Which has a bigger economy, ${countryA.name} or ${countryB.name}?`,
      a: `${countryA.gdpNominal > countryB.gdpNominal ? countryA.name : countryB.name} has a larger economy. ${countryA.name}'s GDP is approximately $${countryA.gdpNominal}B compared to ${countryB.name}'s $${countryB.gdpNominal}B.`,
    },
    {
      q: `How does ${countryA.name}'s military compare to ${countryB.name}?`,
      a: `${countryA.name} spends $${countryA.militaryBudget}B on defense annually with ${countryA.militaryPersonnel}K active troops. ${countryB.name} spends $${countryB.militaryBudget}B with ${countryB.militaryPersonnel}K active troops.`,
    },
    {
      q: `Which country has a higher quality of life, ${countryA.name} or ${countryB.name}?`,
      a: `Based on the Human Development Index (HDI), ${countryA.hdi > countryB.hdi ? countryA.name : countryB.name} ranks higher with an HDI of ${Math.max(countryA.hdi, countryB.hdi).toFixed(3)} vs ${Math.min(countryA.hdi, countryB.hdi).toFixed(3)}.`,
    },
  ]);

  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Compare', url: '/tools/country-comparator' },
    { name: `${countryA.name} vs ${countryB.name}`, url: `/compare/${params.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <ComparePageClient initialCountryAId={ids[0]} initialCountryBId={ids[1]} />
    </>
  );
}
