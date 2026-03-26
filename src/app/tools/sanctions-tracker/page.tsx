'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import { SANCTIONS } from '@/data/sanctions';

const SEVERITY_COLORS = {
  High: { bg: 'rgba(248, 113, 113, 0.12)', text: 'var(--danger)' },
  Medium: { bg: 'rgba(251, 191, 36, 0.12)', text: 'var(--warning)' },
  Low: { bg: 'rgba(96, 165, 250, 0.12)', text: 'var(--info)' },
};

export default function SanctionsTrackerPage() {
  const [search, setSearch] = useState('');

  const filtered = SANCTIONS.filter((s) =>
    s.country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <PageHeader
        title="Sanctions Tracker 2025"
        description="Search active sanctions on any country instantly. Full US, EU, UN and UK sanctions lists with reasons, dates and trade restriction details."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Tools', href: '/tools' },
          { label: 'Sanctions Tracker' },
        ]}
        tag="Live Sanctions Data"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-24">
        <div className="relative max-w-md mx-auto mb-8">
          <input
            type="text"
            placeholder="Search sanctioned countries..."
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

        <div className="space-y-4">
          {filtered.map((sanction, i) => (
            <motion.div
              key={sanction.country}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="rounded-2xl border p-6"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{sanction.flag}</span>
                  <div>
                    <h3 className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>
                      {sanction.country}
                    </h3>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      Since {sanction.since}
                    </p>
                  </div>
                </div>
                <span
                  className="px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shrink-0"
                  style={{
                    backgroundColor: SEVERITY_COLORS[sanction.severity].bg,
                    color: SEVERITY_COLORS[sanction.severity].text,
                  }}
                >
                  <AlertTriangle className="w-3 h-3" />
                  {sanction.severity} Severity
                </span>
              </div>

              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                {sanction.reason}
              </p>

              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                  Imposed by:
                </span>
                {sanction.imposedBy.map((imposer) => (
                  <span
                    key={imposer}
                    className="px-2 py-0.5 rounded text-xs font-medium"
                    style={{
                      backgroundColor: 'rgba(99, 102, 241, 0.12)',
                      color: 'var(--indigo-soft)',
                    }}
                  >
                    {imposer}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                  Covers:
                </span>
                {sanction.type.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded text-xs"
                    style={{
                      backgroundColor: 'var(--border-subtle)',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-16" style={{ color: 'var(--text-muted)' }}>
              <p>No sanctioned countries match your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
