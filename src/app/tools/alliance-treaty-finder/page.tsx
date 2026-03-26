'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import PageHeader from '@/components/shared/PageHeader';
import { ALLIANCES } from '@/data/alliances';

const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  Military: { bg: 'rgba(248, 113, 113, 0.12)', text: 'var(--danger)' },
  Economic: { bg: 'rgba(52, 211, 153, 0.12)', text: 'var(--success)' },
  Political: { bg: 'rgba(99, 102, 241, 0.12)', text: 'var(--indigo-soft)' },
  Regional: { bg: 'rgba(96, 165, 250, 0.12)', text: 'var(--info)' },
};

export default function AllianceFinderPage() {
  const [search, setSearch] = useState('');

  const filtered = ALLIANCES.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.shortName.toLowerCase().includes(search.toLowerCase()) ||
      a.members.some((m) => m.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <PageHeader
        title="Alliance & Treaty Finder"
        description="See who's allied with who, which blocs a country belongs to, and how alliances have shifted over time."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Tools', href: '/tools' },
          { label: 'Alliance Finder' },
        ]}
        tag="Global Alliances"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-24">
        <div className="relative max-w-md mx-auto mb-8">
          <input
            type="text"
            placeholder="Search by alliance or country name..."
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

        <div className="space-y-5">
          {filtered.map((alliance, i) => (
            <motion.div
              key={alliance.shortName}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="rounded-2xl border p-6"
              style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                      {alliance.shortName}
                    </h3>
                    <span
                      className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                      style={{
                        backgroundColor: TYPE_COLORS[alliance.type].bg,
                        color: TYPE_COLORS[alliance.type].text,
                      }}
                    >
                      {alliance.type}
                    </span>
                  </div>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    {alliance.name} · Founded {alliance.founded}
                  </p>
                </div>
                <div
                  className="text-right shrink-0 px-3 py-1.5 rounded-xl"
                  style={{ backgroundColor: 'var(--bg-primary)' }}
                >
                  <p className="font-mono font-bold text-lg" style={{ color: 'var(--indigo-soft)' }}>
                    {alliance.members.length}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    members
                  </p>
                </div>
              </div>

              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                {alliance.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {alliance.members.slice(0, 12).map((member) => (
                  <span
                    key={member}
                    className="px-2 py-0.5 rounded text-xs"
                    style={{
                      backgroundColor: 'var(--border-subtle)',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {member}
                  </span>
                ))}
                {alliance.members.length > 12 && (
                  <span className="px-2 py-0.5 rounded text-xs" style={{ color: 'var(--text-muted)' }}>
                    +{alliance.members.length - 12} more
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
