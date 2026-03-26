import type { Metadata } from 'next';
import { createMetadata } from '@/lib/seo/metadata';
import PageHeader from '@/components/shared/PageHeader';
import AboutClient from './AboutClient';

export const metadata: Metadata = createMetadata({
  title: 'About World Affairs',
  description:
    'World Affairs makes geopolitical intelligence free and accessible. Learn about our mission, data sources, and the team behind the tools.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <PageHeader
        title="About World Affairs"
        description="We believe everyone deserves access to clear, honest geopolitical intelligence — not just analysts with expensive subscriptions."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
      />
      <AboutClient />
    </div>
  );
}
