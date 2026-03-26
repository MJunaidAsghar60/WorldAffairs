'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const HIGHLIGHTS = [
  '50 countries with real 2024 data',
  '19 metrics including military + HDI',
  'Shareable results link',
  'Export as PNG image',
];

function MiniComparison() {
  const metrics = [
    { label: 'Economy (GDP)', usaWidth: 100, chinaWidth: 65 },
    { label: 'Military Budget', usaWidth: 100, chinaWidth: 33 },
    { label: 'Quality of Life (HDI)', usaWidth: 96, chinaWidth: 82 },
  ];

  return (
    <div
      className="rounded-2xl border p-6 w-full"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border-default)',
      }}
    >
      {/* Country badges */}
      <div className="flex items-center justify-between mb-6">
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-xl"
          style={{ backgroundColor: 'rgba(99, 102, 241, 0.12)' }}
        >
          <span className="text-xl">🇺🇸</span>
          <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
            USA
          </span>
        </div>
        <span className="text-sm font-bold" style={{ color: 'var(--text-muted)' }}>
          VS
        </span>
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-xl"
          style={{ backgroundColor: 'rgba(34, 211, 238, 0.1)' }}
        >
          <span className="text-xl">🇨🇳</span>
          <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
            China
          </span>
        </div>
      </div>

      {/* Metrics */}
      <div className="space-y-4">
        {metrics.map((metric) => (
          <div key={metric.label}>
            <p className="text-xs mb-1.5" style={{ color: 'var(--text-muted)' }}>
              {metric.label}
            </p>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs w-4">🇺🇸</span>
                <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${metric.usaWidth}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: 'var(--indigo-vivid)' }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs w-4">🇨🇳</span>
                <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${metric.chinaWidth}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: 'var(--cyan-vivid)' }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Link
        href="/compare/us-vs-china"
        className="block mt-5 text-center text-sm font-medium transition-colors hover:opacity-80"
        style={{ color: 'var(--indigo-soft)' }}
      >
        See full comparison →
      </Link>
    </div>
  );
}

export default function FeaturedTool() {
  return (
    <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-3"
        >
          <div
            className="inline-flex items-center gap-1.5 text-sm font-medium mb-4"
            style={{ color: 'var(--warning)' }}
          >
            ⭐ Most Popular Tool
          </div>
          <h2
            className="text-3xl sm:text-4xl font-bold mb-5 leading-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            Compare Any Two Countries — Side by Side
          </h2>
          <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
            Our Country Comparator pulls together 19 key metrics — from GDP and military spending
            to quality of life and corruption levels — and presents them in one clean, shareable
            view. No spreadsheets. No Wikipedia rabbit holes.
          </p>
          <ul className="space-y-2.5 mb-8">
            {HIGHLIGHTS.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <Check className="w-4 h-4 shrink-0" style={{ color: 'var(--success)' }} />
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
          <Link
            href="/tools/country-comparator"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all hover:opacity-90 hover:scale-105"
            style={{
              backgroundColor: 'var(--indigo-vivid)',
              color: 'white',
            }}
          >
            Try the Country Comparator →
          </Link>
        </motion.div>

        {/* Preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <MiniComparison />
        </motion.div>
      </div>
    </section>
  );
}
