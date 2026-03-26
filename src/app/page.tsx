import type { Metadata } from 'next';
import { createMetadata } from '@/lib/seo/metadata';
import { websiteJsonLd } from '@/lib/seo/jsonld';
import HeroSection from '@/components/home/HeroSection';
import ToolsGrid from '@/components/home/ToolsGrid';
import StatsBar from '@/components/home/StatsBar';
import FeaturedTool from '@/components/home/FeaturedTool';
import HowItWorks from '@/components/home/HowItWorks';
import BlogPreview from '@/components/home/BlogPreview';

export const metadata: Metadata = createMetadata({
  title: 'World Affairs — Free Geopolitical Tools 2025',
  description:
    'Explore 8 free geopolitical intelligence tools. Compare countries, track sanctions, calculate risk scores and analyze global power — no signup needed.',
  path: '/',
  ogImage: '/api/og?page=home',
});

export default function HomePage() {
  const jsonLd = websiteJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <ToolsGrid />
      <StatsBar />
      <FeaturedTool />
      <HowItWorks />
      <BlogPreview />
    </>
  );
}
