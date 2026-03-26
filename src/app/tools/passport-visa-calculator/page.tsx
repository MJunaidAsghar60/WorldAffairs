'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import PageHeader from '@/components/shared/PageHeader';
import { PASSPORT_DATA } from '@/data/visa';

export default function PassportCalculatorPage() {
  const [search, setSearch] = useState('');

  const filtered = PASSPORT_DATA.filter((p) =>
    p.country.toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => a.rank - b.rank);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <PageHeader
        title="Passport Power Index 2025"
        description="Find out how powerful your passport really is. See visa-free access scores, global rankings, and which countries you can visit without a visa."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Tools', href: '/tools' },
          { label: 'Passport Calculator' },
        ]}
        tag="Travel Intelligence"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-24">
        <div className="relative max-w-md mx-auto mb-8">
          <input
            type="text"
            placeholder="Search by country name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border outline-none text-sm transition-colors focus:border-[color:var(--indigo-vivid)]"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-default)',
              color: 'var(--text-primary)',
            }}
          />
        </div>

        <div
          className="rounded-2xl border overflow-hidden"
          style={{ borderColor: 'var(--border-subtle)' }}
        >
          {/* Header */}
          <div
            className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-4 px-5 py-3 text-xs font-semibold border-b"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-subtle)',
              color: 'var(--text-muted)',
            }}
          >
            <span>Rank</span>
            <span>Country</span>
            <span>Visa-Free</span>
            <span className="hidden sm:block">On Arrival</span>
            <span className="hidden sm:block">eVisa</span>
            <span>Score</span>
          </div>

          {/* Rows */}
          {filtered.map((passport, i) => (
            <motion.div
              key={passport.country}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.02 }}
              className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-4 px-5 py-3.5 border-b items-center transition-colors hover:bg-[color:var(--bg-card-hover)]"
              style={{ borderColor: 'var(--border-subtle)' }}
            >
              <span
                className="font-mono text-sm font-semibold w-8 text-center"
                style={{
                  color: passport.rank <= 5 ? 'var(--warning)' : 'var(--text-muted)',
                }}
              >
                #{passport.rank}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xl">{passport.flag}</span>
                <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                  {passport.country}
                </span>
              </div>
              <span className="font-mono text-sm font-semibold" style={{ color: 'var(--success)' }}>
                {passport.visaFreeCount}
              </span>
              <span
                className="font-mono text-sm hidden sm:block"
                style={{ color: 'var(--text-secondary)' }}
              >
                {passport.visaOnArrival}
              </span>
              <span
                className="font-mono text-sm hidden sm:block"
                style={{ color: 'var(--text-secondary)' }}
              >
                {passport.eVisa}
              </span>
              <div
                className="px-2 py-1 rounded-lg text-xs font-mono font-bold"
                style={{
                  backgroundColor: 'rgba(99, 102, 241, 0.12)',
                  color: 'var(--indigo-soft)',
                }}
              >
                {passport.score}
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-xs text-center mt-4" style={{ color: 'var(--text-muted)' }}>
          Data from Henley Passport Index 2025. Visa-free count includes visa-on-arrival and eVisa access.
        </p>
      </div>
    </div>
  );
}
