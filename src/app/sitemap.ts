import { MetadataRoute } from 'next';

const BASE_URL = 'https://worldaffairsblog.com';

const COMPARE_SLUGS = [
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

const TOOL_PATHS = [
  '/tools/country-comparator',
  '/tools/passport-visa-calculator',
  '/tools/sanctions-tracker',
  '/tools/geopolitical-risk-calculator',
  '/tools/alliance-treaty-finder',
  '/tools/military-comparator',
  '/tools/un-voting-analyzer',
  '/tools/scenario-simulator',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/tools`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...TOOL_PATHS.map((path) => ({
      url: `${BASE_URL}${path}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
    ...COMPARE_SLUGS.map((slug) => ({
      url: `${BASE_URL}/compare/${slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ];
}
