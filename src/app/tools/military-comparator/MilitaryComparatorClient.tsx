'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '@/components/shared/PageHeader';
import CountrySelector from '@/components/tools/CountrySelector';
import MetricRow from '@/components/tools/MetricRow';
import ShareButton from '@/components/tools/ShareButton';
import type { CountryData } from '@/types/country';

const MILITARY_METRICS = [
  {
    key: 'militaryBudget',
    label: 'Annual Defense Spending',
    tooltip: 'Total military budget in billions USD — includes personnel, equipment, and operations.',
    higherIsBetter: true,
  },
  {
    key: 'militaryPersonnel',
    label: 'Active Military Troops',
    tooltip: 'Number of full-time active-duty soldiers. Doesn\'t count reservists or paramilitary forces.',
    higherIsBetter: true,
  },
  {
    key: 'nuclearWeapons',
    label: 'Nuclear Warheads',
    tooltip: 'Estimated total nuclear warheads including deployed and stockpiled weapons.',
    higherIsBetter: true,
  },
  {
    key: 'globalPeaceIndex',
    label: 'Global Peace Index',
    tooltip: 'A lower score means a more peaceful, less militarized country. Ranges roughly from 1.0 (very peaceful) to 3.5 (active conflict).',
    higherIsBetter: false,
  },
];

export default function MilitaryComparatorClient() {
  const [countryA, setCountryA] = useState<CountryData | null>(null);
  const [countryB, setCountryB] = useState<CountryData | null>(null);
  const [openTooltip, setOpenTooltip] = useState<string | null>(null);

  const bothSelected = countryA && countryB;

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <PageHeader
        title="Military Strength Comparator"
        description="Compare defense budgets, troop numbers, nuclear arsenals, and peace indices between any two nations. Data from SIPRI and public military databases, updated for 2025."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Tools', href: '/tools' },
          { label: 'Military Comparator' },
        ]}
        tag="Military Intelligence"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-4 items-center mb-8">
          <CountrySelector
            value={countryA}
            onChange={setCountryA}
            placeholder="First country..."
            excludeId={countryB?.id}
          />
          <div className="text-lg font-bold text-center py-2" style={{ color: 'var(--text-muted)' }}>
            VS
          </div>
          <CountrySelector
            value={countryB}
            onChange={setCountryB}
            placeholder="Second country..."
            excludeId={countryA?.id}
          />
        </div>

        <AnimatePresence mode="wait">
          {!bothSelected && (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20 rounded-2xl border"
              style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}
            >
              <div className="text-5xl mb-4">⚔️</div>
              <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
                Select two countries above to compare their military strength.
              </p>
            </motion.div>
          )}

          {bothSelected && countryA && countryB && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div
                className="rounded-2xl border p-6 mb-5"
                style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-default)' }}
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{countryA.flag}</span>
                    <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {countryA.name}
                    </span>
                  </div>
                  <span className="font-bold text-sm" style={{ color: 'var(--text-muted)' }}>
                    VS
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {countryB.name}
                    </span>
                    <span className="text-3xl">{countryB.flag}</span>
                  </div>
                </div>

                {MILITARY_METRICS.map((metric) => (
                  <MetricRow
                    key={metric.key}
                    metricKey={metric.key}
                    label={metric.label}
                    tooltip={metric.tooltip}
                    valueA={countryA[metric.key as keyof CountryData] as number}
                    valueB={countryB[metric.key as keyof CountryData] as number}
                    nameA={countryA.name}
                    nameB={countryB.name}
                    higherIsBetter={metric.higherIsBetter}
                    showTooltip={openTooltip === metric.key}
                    onTooltipToggle={() =>
                      setOpenTooltip(openTooltip === metric.key ? null : metric.key)
                    }
                  />
                ))}
              </div>

              <div className="flex justify-center">
                <ShareButton
                  url={`https://worldaffairsblog.com/tools/military-comparator?a=${countryA.id}&b=${countryB.id}`}
                  label="Share This Comparison"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
