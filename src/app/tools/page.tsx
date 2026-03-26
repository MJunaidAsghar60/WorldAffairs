import type { Metadata } from 'next';
import { createMetadata } from '@/lib/seo/metadata';
import ToolsHubClient from './ToolsHubClient';

export const metadata: Metadata = createMetadata({
  title: 'Free Geopolitical Tools 2025',
  description:
    '8 free interactive tools for global analysis. Compare countries, track live sanctions, passport power rankings, military strength and more.',
  path: '/tools',
  ogImage: '/api/og?page=tools',
});

export default function ToolsPage() {
  return <ToolsHubClient />;
}
