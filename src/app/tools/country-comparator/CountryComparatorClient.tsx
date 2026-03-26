'use client';

import { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Crown, BarChart2, List, Map } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import CountrySelector from '@/components/tools/CountrySelector';
import MetricRow from '@/components/tools/MetricRow';
import ShareButton from '@/components/tools/ShareButton';
import { useComparison } from '@/hooks/useComparison';
import { getCountryById } from '@/data/countries';

// Heavy components loaded lazily so initial bundle stays small
const ComparisonChart = lazy(() => import('@/components/tools/ComparisonChart'));
const WorldMap = lazy(() => import('@/components/tools/WorldMap'));

const METRIC_GROUPS = {
  economy: [
    {
      key: 'gdpNominal',
      label: 'Total Economy Size (GDP)',
      tooltip: 'The total market value of all goods and services produced — the most common way to measure how big an economy is.',
      higherIsBetter: true,
    },
    {
      key: 'gdpPPP',
      label: 'Economy by Purchasing Power (PPP)',
      tooltip: 'GDP adjusted for cost of living — shows how much people can actually buy with their money, not just the raw number.',
      higherIsBetter: true,
    },
    {
      key: 'gdpPerCapita',
      label: 'Average Income Per Person',
      tooltip: 'GDP divided by population — the best single number for understanding average living standards.',
      higherIsBetter: true,
    },
    {
      key: 'population',
      label: 'Population',
      tooltip: 'Total number of people living in the country. More people means more potential workers, consumers, and soldiers.',
      higherIsBetter: true,
    },
    {
      key: 'tradeGdpPercent',
      label: 'Trade Openness',
      tooltip: 'Total trade (imports + exports) as a percentage of GDP. Higher means the country is more integrated into the global economy.',
      higherIsBetter: true,
    },
    {
      key: 'co2Emissions',
      label: 'CO₂ Emissions',
      tooltip: 'Total carbon dioxide emissions in million tonnes per year. A lower number is better for the planet.',
      higherIsBetter: false,
    },
  ],
  military: [
    {
      key: 'militaryBudget',
      label: 'Annual Defense Spending',
      tooltip: 'How much the country spends on its military each year. The US alone spends more than the next 10 countries combined.',
      higherIsBetter: true,
    },
    {
      key: 'militaryPersonnel',
      label: 'Active Military Troops',
      tooltip: 'The number of full-time soldiers actively serving. This doesn\'t count reserves, which can be much larger.',
      higherIsBetter: true,
    },
    {
      key: 'nuclearWeapons',
      label: 'Nuclear Warheads',
      tooltip: 'The estimated number of nuclear warheads. Russia and the US hold over 90% of the world\'s total stockpile.',
      higherIsBetter: true,
    },
    {
      key: 'globalPeaceIndex',
      label: 'Global Peace Index',
      tooltip: 'Scores countries on how peaceful they are — lower is better. Factors include conflict levels, safety, and militarization.',
      higherIsBetter: false,
    },
  ],
  society: [
    {
      key: 'hdi',
      label: 'Quality of Life Score (HDI)',
      tooltip: 'The Human Development Index — measures how good life is beyond just money. Combines health, education, and income into one score from 0 to 1.',
      higherIsBetter: true,
    },
    {
      key: 'corruptionIndex',
      label: 'Transparency Score',
      tooltip: 'From Transparency International — rates how corrupt the public sector is, from 0 (very corrupt) to 100 (very clean). Higher is better.',
      higherIsBetter: true,
    },
    {
      key: 'lifeExpectancy',
      label: 'Average Life Expectancy',
      tooltip: 'How long the average person born today is expected to live. One of the best indicators of overall health and wellbeing.',
      higherIsBetter: true,
    },
    {
      key: 'internetPenetration',
      label: 'Internet Access Rate',
      tooltip: 'Percentage of the population with access to the internet — a good indicator of technological development and information access.',
      higherIsBetter: true,
    },
  ],
  global: [],
};

const TABS = [
  { id: 'economy', label: '💰 Economy' },
  { id: 'military', label: '⚔️ Military' },
  { id: 'society', label: '🌱 Society' },
] as const;

type TabId = typeof TABS[number]['id'];

const BOOLEAN_METRICS = [
  { key: 'unSecurityCouncil', label: 'UN Security Council' },
  { key: 'nato', label: 'NATO Member' },
  { key: 'brics', label: 'BRICS Member' },
  { key: 'g20', label: 'G20 Member' },
  { key: 'g7', label: 'G7 Member' },
] as const;

type BooleanKey = typeof BOOLEAN_METRICS[number]['key'];

interface CountryComparatorClientProps {
  initialCountryAId?: string;
  initialCountryBId?: string;
}

export default function CountryComparatorClient({
  initialCountryAId,
  initialCountryBId,
}: CountryComparatorClientProps = {}) {
  const { countryA, countryB, setCountryA, setCountryB, comparison, slug } = useComparison();

  useEffect(() => {
    if (initialCountryAId) {
      const a = getCountryById(initialCountryAId);
      if (a) setCountryA(a);
    }
    if (initialCountryBId) {
      const b = getCountryById(initialCountryBId);
      if (b) setCountryB(b);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [activeTab, setActiveTab] = useState<TabId>('economy');
  const [openTooltip, setOpenTooltip] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'bars' | 'chart' | 'map'>('bars');

  const shareUrl = slug
    ? `https://worldaffairsblog.com/compare/${slug}`
    : 'https://worldaffairsblog.com/tools/country-comparator';

  const handleExport = async () => {
    const { default: html2canvas } = await import('html2canvas');
    const el = document.getElementById('comparison-result');
    if (!el) return;
    const canvas = await html2canvas(el, { backgroundColor: '#080b14' });
    const a = document.createElement('a');
    a.download = `${slug || 'country-comparison'}-worldaffairsblog.png`;
    a.href = canvas.toDataURL();
    a.click();
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <PageHeader
        title="Compare Any Two Countries"
        description="Choose two countries below and we'll show you how they compare across 19 key metrics — from economic power to military strength to quality of life. All data is from trusted international sources, updated for 2025."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Tools', href: '/tools' },
          { label: 'Country Comparator' },
        ]}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-24">
        {/* Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-4 items-center mb-8">
          <CountrySelector
            value={countryA}
            onChange={setCountryA}
            placeholder="Pick the first country..."
            excludeId={countryB?.id}
          />
          <div
            className="text-lg font-bold text-center py-2"
            style={{ color: 'var(--text-muted)' }}
          >
            VS
          </div>
          <CountrySelector
            value={countryB}
            onChange={setCountryB}
            placeholder="Pick the second country..."
            excludeId={countryA?.id}
          />
        </div>

        {/* Empty state */}
        <AnimatePresence mode="wait">
          {!countryA && !countryB && (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20 rounded-2xl border"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              <div className="text-5xl mb-4">🌍</div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                Pick two countries to get started
              </h3>
              <p className="text-sm max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
                Choose two countries above to see how they compare — we&apos;ll show you everything
                from GDP to military power to quality of life.
              </p>
            </motion.div>
          )}

          {(countryA || countryB) && !(countryA && countryB) && (
            <motion.div
              key="one-selected"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16 rounded-2xl border"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              <div className="text-4xl mb-3">👆</div>
              <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
                Now pick a second country to compare with
              </p>
            </motion.div>
          )}

          {comparison && countryA && countryB && (
            <motion.div
              key="comparison"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              id="comparison-result"
            >
              {/* Score Card */}
              <div
                className="rounded-2xl border p-6 mb-6"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-default)',
                }}
              >
                <p className="text-center text-sm mb-5" style={{ color: 'var(--text-muted)' }}>
                  Overall Power & Development Score — based on all 19 metrics
                </p>
                <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center">
                  {/* Country A */}
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-3xl">{countryA.flag}</span>
                      {comparison.winner === 'A' && <Crown className="w-5 h-5" style={{ color: 'var(--warning)' }} />}
                    </div>
                    <p className="text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                      {countryA.name}
                    </p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-5xl font-mono font-bold"
                      style={{ color: 'var(--indigo-soft)' }}
                    >
                      {comparison.scoreA}
                    </motion.p>
                  </div>

                  {/* VS */}
                  <div className="text-xl font-bold" style={{ color: 'var(--text-muted)' }}>
                    VS
                  </div>

                  {/* Country B */}
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-3xl">{countryB.flag}</span>
                      {comparison.winner === 'B' && <Crown className="w-5 h-5" style={{ color: 'var(--warning)' }} />}
                    </div>
                    <p className="text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                      {countryB.name}
                    </p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-5xl font-mono font-bold"
                      style={{ color: 'var(--cyan-soft)' }}
                    >
                      {comparison.scoreB}
                    </motion.p>
                  </div>
                </div>

                {/* Progress bars */}
                <div className="mt-6 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs w-24 text-right" style={{ color: 'var(--text-muted)' }}>{countryA.name}</span>
                    <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${comparison.scoreA}%` }}
                        transition={{ duration: 0.8 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: 'var(--indigo-vivid)' }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs w-24 text-right" style={{ color: 'var(--text-muted)' }}>{countryB.name}</span>
                    <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${comparison.scoreB}%` }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: 'var(--cyan-vivid)' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Share/Export */}
                <div className="mt-5 flex flex-wrap gap-3 justify-center">
                  <ShareButton url={shareUrl} label="Share This Comparison" />
                  <button
                    type="button"
                    onClick={handleExport}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all hover:opacity-80"
                    style={{
                      borderColor: 'var(--border-default)',
                      color: 'var(--text-secondary)',
                      backgroundColor: 'var(--bg-card)',
                    }}
                  >
                    <Download className="w-4 h-4" />
                    Download as PNG
                  </button>
                </div>
              </div>

              {/* View-mode switcher + Tabs */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                {/* Metric tabs (only shown in bars mode) */}
                <div
                  className="flex gap-1 p-1 rounded-xl flex-1"
                  style={{ backgroundColor: 'var(--bg-card)' }}
                >
                  {TABS.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => { setActiveTab(tab.id); setViewMode('bars'); }}
                      className="flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all"
                      style={{
                        backgroundColor: viewMode === 'bars' && activeTab === tab.id ? 'var(--indigo-vivid)' : 'transparent',
                        color: viewMode === 'bars' && activeTab === tab.id ? 'white' : 'var(--text-muted)',
                      }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* View-mode icons */}
                <div
                  className="flex gap-1 p-1 rounded-xl"
                  style={{ backgroundColor: 'var(--bg-card)' }}
                >
                  {([
                    { mode: 'bars', icon: <List className="w-4 h-4" />, title: 'Bar view' },
                    { mode: 'chart', icon: <BarChart2 className="w-4 h-4" />, title: 'Chart view' },
                    { mode: 'map', icon: <Map className="w-4 h-4" />, title: 'Map view' },
                  ] as const).map(({ mode, icon, title }) => (
                    <button
                      key={mode}
                      type="button"
                      title={title}
                      onClick={() => setViewMode(mode)}
                      className="px-3 py-2 rounded-lg transition-all"
                      style={{
                        backgroundColor: viewMode === mode ? 'var(--indigo-vivid)' : 'transparent',
                        color: viewMode === mode ? 'white' : 'var(--text-muted)',
                      }}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              {/* ── BAR VIEW ── */}
              {viewMode === 'bars' && (
                <div
                  className="rounded-2xl border p-6"
                  style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-default)' }}
                >
                  {METRIC_GROUPS[activeTab].map((metric) => (
                    <MetricRow
                      key={metric.key}
                      metricKey={metric.key}
                      label={metric.label}
                      tooltip={metric.tooltip}
                      valueA={countryA[metric.key as keyof typeof countryA] as number}
                      valueB={countryB[metric.key as keyof typeof countryB] as number}
                      nameA={countryA.name}
                      nameB={countryB.name}
                      higherIsBetter={metric.higherIsBetter}
                      showTooltip={openTooltip === metric.key}
                      onTooltipToggle={() =>
                        setOpenTooltip(openTooltip === metric.key ? null : metric.key)
                      }
                    />
                  ))}

                  {/* Boolean memberships */}
                  <div className="mt-6">
                    <p className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                      🌐 Global Standing & Memberships
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {BOOLEAN_METRICS.map((bm) => (
                        <div
                          key={bm.key}
                          className="flex items-center justify-between p-3 rounded-xl"
                          style={{ backgroundColor: 'var(--bg-primary)' }}
                        >
                          <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                            {bm.label}
                          </span>
                          <div className="flex gap-2">
                            <span
                              className="text-xs px-2 py-0.5 rounded-full font-medium"
                              style={{
                                backgroundColor: countryA[bm.key as BooleanKey]
                                  ? 'rgba(52, 211, 153, 0.15)'
                                  : 'rgba(107, 114, 128, 0.1)',
                                color: countryA[bm.key as BooleanKey]
                                  ? 'var(--success)'
                                  : 'var(--text-muted)',
                              }}
                            >
                              {countryA[bm.key as BooleanKey] ? '✓' : '✗'}
                            </span>
                            <span
                              className="text-xs px-2 py-0.5 rounded-full font-medium"
                              style={{
                                backgroundColor: countryB[bm.key as BooleanKey]
                                  ? 'rgba(52, 211, 153, 0.15)'
                                  : 'rgba(107, 114, 128, 0.1)',
                                color: countryB[bm.key as BooleanKey]
                                  ? 'var(--success)'
                                  : 'var(--text-muted)',
                              }}
                            >
                              {countryB[bm.key as BooleanKey] ? '✓' : '✗'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── CHART VIEW ── */}
              {viewMode === 'chart' && (
                <div
                  className="rounded-2xl border p-6"
                  style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-default)' }}
                >
                  <p className="text-sm font-semibold mb-5" style={{ color: 'var(--text-primary)' }}>
                    📊 Side-by-Side Chart — all economy metrics
                  </p>
                  <Suspense
                    fallback={
                      <div className="h-72 flex items-center justify-center" style={{ color: 'var(--text-muted)' }}>
                        Crunching the numbers…
                      </div>
                    }
                  >
                    <ComparisonChart
                      nameA={countryA.name}
                      nameB={countryB.name}
                      flagA={countryA.flag}
                      flagB={countryB.flag}
                      metrics={[
                        ...METRIC_GROUPS.economy.map((m) => ({
                          key: m.key,
                          label: m.label.split('(')[0].trim(),
                          valueA: countryA[m.key as keyof typeof countryA] as number,
                          valueB: countryB[m.key as keyof typeof countryB] as number,
                        })),
                        ...METRIC_GROUPS.military.map((m) => ({
                          key: m.key,
                          label: m.label.split('(')[0].trim(),
                          valueA: countryA[m.key as keyof typeof countryA] as number,
                          valueB: countryB[m.key as keyof typeof countryB] as number,
                        })),
                        ...METRIC_GROUPS.society.map((m) => ({
                          key: m.key,
                          label: m.label.split('(')[0].trim(),
                          valueA: countryA[m.key as keyof typeof countryA] as number,
                          valueB: countryB[m.key as keyof typeof countryB] as number,
                        })),
                      ]}
                    />
                  </Suspense>
                </div>
              )}

              {/* ── MAP VIEW ── */}
              {viewMode === 'map' && (
                <div
                  className="rounded-2xl border overflow-hidden"
                  style={{ borderColor: 'var(--border-default)' }}
                >
                  <div className="px-6 pt-5 pb-3" style={{ backgroundColor: 'var(--bg-card)' }}>
                    <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                      🗺️ Where in the World
                    </p>
                    <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                      <span style={{ color: 'var(--indigo-soft)' }}>●</span> {countryA.name}
                      &nbsp;&nbsp;
                      <span style={{ color: 'var(--cyan-vivid)' }}>●</span> {countryB.name}
                    </p>
                  </div>
                  <Suspense
                    fallback={
                      <div
                        className="h-80 flex items-center justify-center text-sm"
                        style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-muted)' }}
                      >
                        Loading map…
                      </div>
                    }
                  >
                    <WorldMap
                      highlightCountries={[countryA.id.toUpperCase(), countryB.id.toUpperCase()]}
                      colorA="#6366f1"
                      colorB="#22d3ee"
                      height={360}
                    />
                  </Suspense>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
