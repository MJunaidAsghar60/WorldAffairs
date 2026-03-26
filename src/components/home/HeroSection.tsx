'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const TICKER_ITEMS = [
  '🌍 195 Countries Tracked',
  '⚔️ 8 Active Conflicts',
  '🛡️ 38 Sanctioned Nations',
  '🤝 47 Active Alliances',
  '🛂 199 Passport Rankings',
  '📊 8 Free Tools',
];

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'var(--gradient-hero)' }}
    >
      {/* Dot grid background */}
      <div className="absolute inset-0 dot-grid opacity-60" />

      {/* Center glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: 'rgba(99, 102, 241, 0.08)' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center pt-24 pb-16">
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-medium mb-8"
          style={{
            borderColor: 'var(--indigo-vivid)',
            color: 'var(--indigo-soft)',
            backgroundColor: 'rgba(99, 102, 241, 0.08)',
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse-dot"
            style={{ backgroundColor: 'var(--cyan-vivid)' }}
          />
          Free Geopolitical Intelligence
        </motion.div>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          Understand the World.{' '}
          <span className="gradient-text">Instantly.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl leading-relaxed max-w-2xl mx-auto mb-10"
          style={{ color: 'var(--text-secondary)' }}
        >
          We built 8 free tools that turn complex world events into clear, visual
          intelligence — so you can make sense of what&apos;s happening out there.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
        >
          <Link
            href="/tools"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold transition-all hover:opacity-90 hover:scale-105"
            style={{
              backgroundColor: 'var(--indigo-vivid)',
              color: 'white',
              boxShadow: 'var(--glow-indigo)',
            }}
          >
            Explore All Tools →
          </Link>
          <Link
            href="/tools/country-comparator"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold border transition-all hover:bg-[rgba(99,102,241,0.08)]"
            style={{
              borderColor: 'var(--indigo-vivid)',
              color: 'var(--indigo-soft)',
            }}
          >
            Compare Countries Now
          </Link>
        </motion.div>

        {/* Trust line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-sm"
          style={{ color: 'var(--text-muted)' }}
        >
          ✓ No signup &nbsp;·&nbsp; ✓ Always free &nbsp;·&nbsp; ✓ Updated 2025
        </motion.p>
      </div>

      {/* Ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="w-full border-t border-b overflow-hidden py-3"
        style={{
          borderColor: 'var(--border-subtle)',
          backgroundColor: 'rgba(17, 24, 39, 0.6)',
        }}
      >
        <div className="flex whitespace-nowrap animate-ticker">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center text-sm font-medium px-8"
              style={{ color: 'var(--text-secondary)' }}
            >
              {item}
              <span className="ml-8 opacity-30">•</span>
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
