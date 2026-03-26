'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const POSTS = [
  {
    slug: 'why-sanctions-dont-always-work',
    tag: 'Explainer',
    title: "Why Sanctions Don't Always Work — And When They Do",
    date: 'January 2025',
    excerpt:
      'Economic pressure is one of the most common tools in modern diplomacy. But the track record is complicated.',
  },
  {
    slug: 'brics-expansion-global-order',
    tag: 'Analysis',
    title: 'The BRICS Expansion: What It Means for the Global Order',
    date: 'February 2025',
    excerpt:
      "With five new members joining in 2024, BRICS is no longer just a talking shop. Here's what changed.",
  },
  {
    slug: 'passport-power-rankings-2025',
    tag: 'Data',
    title: 'Which Passports Got Stronger in 2025 — And Which Got Weaker',
    date: 'March 2025',
    excerpt:
      "The annual passport power rankings are out. We break down the biggest movers and what's driving the shifts.",
  },
];

const TAG_COLORS: Record<string, string> = {
  Explainer: 'rgba(99, 102, 241, 0.15)',
  Analysis: 'rgba(34, 211, 238, 0.12)',
  Data: 'rgba(52, 211, 153, 0.12)',
};

const TAG_TEXT: Record<string, string> = {
  Explainer: 'var(--indigo-soft)',
  Analysis: 'var(--cyan-soft)',
  Data: 'var(--success)',
};

export default function BlogPreview() {
  return (
    <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-2"
            style={{ color: 'var(--text-primary)' }}
          >
            From the World Affairs Blog
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base"
            style={{ color: 'var(--text-secondary)' }}
          >
            Context, analysis, and explainers on the stories that matter.
          </motion.p>
        </div>
        <Link
          href="/blog"
          className="text-sm font-medium whitespace-nowrap transition-colors hover:opacity-80"
          style={{ color: 'var(--indigo-soft)' }}
        >
          View All Articles →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {POSTS.map((post, index) => (
          <motion.article
            key={post.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="group p-6 rounded-2xl border cursor-pointer transition-colors"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-subtle)',
            }}
          >
            <Link href={`/blog/${post.slug}`} className="block h-full">
              <div className="flex items-center justify-between mb-4">
                <span
                  className="inline-block px-2.5 py-1 rounded-md text-xs font-medium"
                  style={{
                    backgroundColor: TAG_COLORS[post.tag],
                    color: TAG_TEXT[post.tag],
                  }}
                >
                  {post.tag}
                </span>
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {post.date}
                </span>
              </div>
              <h3
                className="text-base font-semibold mb-3 leading-snug group-hover:text-[color:var(--indigo-soft)] transition-colors"
                style={{ color: 'var(--text-primary)' }}
              >
                {post.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {post.excerpt}
              </p>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
