import type { Metadata } from 'next';
import { createMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';
import PageHeader from '@/components/shared/PageHeader';

export const metadata: Metadata = createMetadata({
  title: 'World Affairs Blog — Geopolitical Analysis & Explainers',
  description:
    'In-depth analysis, explainers, and data-driven takes on the global events that matter. Written for curious people, not policy insiders.',
  path: '/blog',
});

const POSTS = [
  {
    slug: 'why-sanctions-dont-always-work',
    tag: 'Explainer',
    title: "Why Sanctions Don't Always Work — And When They Do",
    date: 'January 2025',
    readTime: '7 min read',
    excerpt:
      'Economic pressure is one of the most common tools in modern diplomacy. But the track record is complicated — here\'s what the data actually shows.',
  },
  {
    slug: 'brics-expansion-global-order',
    tag: 'Analysis',
    title: 'The BRICS Expansion: What It Means for the Global Order',
    date: 'February 2025',
    readTime: '9 min read',
    excerpt:
      "With five new members joining in 2024, BRICS is no longer just a talking shop. Here's what changed — and what it means for Western economic dominance.",
  },
  {
    slug: 'passport-power-rankings-2025',
    tag: 'Data',
    title: 'Which Passports Got Stronger in 2025 — And Which Got Weaker',
    date: 'March 2025',
    readTime: '5 min read',
    excerpt:
      "The annual passport power rankings are out. We break down the biggest movers, explain what's driving the shifts, and highlight the surprising losers.",
  },
];

const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  Explainer: { bg: 'rgba(99, 102, 241, 0.12)', text: 'var(--indigo-soft)' },
  Analysis: { bg: 'rgba(34, 211, 238, 0.1)', text: 'var(--cyan-soft)' },
  Data: { bg: 'rgba(52, 211, 153, 0.1)', text: 'var(--success)' },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <PageHeader
        title="World Affairs Blog"
        description="Context, analysis, and explainers on the stories that matter. Written for curious people, not policy insiders."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Blog' }]}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-24">
        <div className="space-y-6">
          {POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block group"
            >
              <article
                className="rounded-2xl border p-6 transition-colors hover:border-[color:var(--indigo-vivid)] hover:bg-[color:var(--bg-card-hover)]"
                style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="px-2.5 py-1 rounded-md text-xs font-medium"
                    style={{
                      backgroundColor: TAG_COLORS[post.tag].bg,
                      color: TAG_COLORS[post.tag].text,
                    }}
                  >
                    {post.tag}
                  </span>
                  <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--text-muted)' }}>
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <h2
                  className="text-xl font-bold mb-3 group-hover:text-[color:var(--indigo-soft)] transition-colors"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {post.title}
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {post.excerpt}
                </p>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
