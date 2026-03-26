'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import PageHeader from '@/components/shared/PageHeader';
import CountrySelector from '@/components/tools/CountrySelector';
import RiskMeter from '@/components/tools/RiskMeter';
import type { CountryData } from '@/types/country';

function calculateRiskScore(country: CountryData) {
  const conflictRisk = Math.round(((country.globalPeaceIndex - 1) / 2.5) * 100);
  const politicalStability = Math.round((1 - country.corruptionIndex / 100) * 100);
  const economicRisk = Math.round((1 - Math.min(country.gdpPerCapita / 80000, 1)) * 100);
  const overall = Math.round((conflictRisk * 0.4 + politicalStability * 0.35 + economicRisk * 0.25));

  const clamped = (v: number) => Math.max(5, Math.min(95, v));

  return {
    overall: clamped(overall),
    conflictRisk: clamped(conflictRisk),
    politicalStability: clamped(politicalStability),
    economicRisk: clamped(economicRisk),
  };
}

function getTravelAdvisory(score: number): string {
  if (score >= 70) return 'Do Not Travel';
  if (score >= 50) return 'Avoid Non-Essential Travel';
  if (score >= 30) return 'Exercise Caution';
  return 'Generally Safe';
}

function getAdvisoryColor(score: number): string {
  if (score >= 70) return 'var(--danger)';
  if (score >= 50) return 'var(--warning)';
  if (score >= 30) return 'var(--info)';
  return 'var(--success)';
}

export default function GeopoliticalRiskPage() {
  const [country, setCountry] = useState<CountryData | null>(null);

  const risk = country ? calculateRiskScore(country) : null;

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <PageHeader
        title="Geopolitical Risk Calculator"
        description="Get an instant geopolitical risk score for any country. Analyze conflict levels, political stability and economic risk in one free tool."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Tools', href: '/tools' },
          { label: 'Risk Calculator' },
        ]}
        tag="Risk Analysis"
      />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 pb-24">
        <div className="mb-8">
          <CountrySelector
            value={country}
            onChange={setCountry}
            placeholder="Pick a country to assess..."
          />
        </div>

        {!country && (
          <div
            className="text-center py-20 rounded-2xl border"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}
          >
            <div className="text-5xl mb-4">📊</div>
            <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
              Select a country above to get its geopolitical risk score.
            </p>
          </div>
        )}

        {country && risk && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-5"
          >
            {/* Overall */}
            <div
              className="rounded-2xl border p-6"
              style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-default)' }}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-4xl">{country.flag}</span>
                <div>
                  <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                    {country.name}
                  </h2>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    {country.region}
                  </p>
                </div>
              </div>

              <RiskMeter score={risk.overall} label="Overall Geopolitical Risk" size="lg" />

              <div
                className="mt-4 p-3 rounded-xl inline-flex items-center gap-2 text-sm font-semibold"
                style={{
                  backgroundColor: `${getAdvisoryColor(risk.overall)}15`,
                  color: getAdvisoryColor(risk.overall),
                }}
              >
                Travel Advisory: {getTravelAdvisory(risk.overall)}
              </div>
            </div>

            {/* Sub-scores */}
            <div
              className="rounded-2xl border p-6 space-y-6"
              style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}
            >
              <div>
                <p className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>
                  Conflict & Security Risk
                </p>
                <RiskMeter score={risk.conflictRisk} label="Based on Global Peace Index" />
              </div>
              <div className="border-t pt-6" style={{ borderColor: 'var(--border-subtle)' }}>
                <p className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>
                  Political Instability Risk
                </p>
                <RiskMeter score={risk.politicalStability} label="Based on corruption and governance" />
              </div>
              <div className="border-t pt-6" style={{ borderColor: 'var(--border-subtle)' }}>
                <p className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>
                  Economic Risk
                </p>
                <RiskMeter score={risk.economicRisk} label="Based on GDP per capita" />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
