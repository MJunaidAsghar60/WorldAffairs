import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: 'https://worldaffairsblog.com/sitemap.xml',
    host: 'worldaffairsblog.com',
  };
}
