'use client';

import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import { formatMetricValue } from '@/lib/utils/formatters';
import { getMetricBarWidth } from '@/lib/utils/calculations';

interface MetricRowProps {
  metricKey: string;
  label: string;
  tooltip: string;
  valueA: number;
  valueB: number;
  nameA: string;
  nameB: string;
  higherIsBetter: boolean;
  showTooltip: boolean;
  onTooltipToggle: () => void;
}

export default function MetricRow({
  metricKey,
  label,
  tooltip,
  valueA,
  valueB,
  nameA,
  nameB,
  higherIsBetter,
  showTooltip,
  onTooltipToggle,
}: MetricRowProps) {
  const widthA = getMetricBarWidth(valueA, valueB, metricKey);
  const widthB = getMetricBarWidth(valueB, valueA, metricKey);

  const aWins = higherIsBetter ? valueA > valueB : valueA < valueB;
  const bWins = higherIsBetter ? valueB > valueA : valueB < valueA;

  return (
    <div
      className="py-4 border-b"
      style={{ borderColor: 'var(--border-subtle)' }}
    >
      {/* Label row */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
          {label}
        </span>
        <div className="relative">
          <button
            type="button"
            onClick={onTooltipToggle}
            className="p-0.5 rounded transition-colors hover:opacity-70"
            style={{ color: 'var(--text-muted)' }}
          >
            <Info className="w-3.5 h-3.5" />
          </button>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute z-10 left-0 top-6 w-64 p-3 rounded-lg text-xs leading-relaxed shadow-xl border"
              style={{
                backgroundColor: 'var(--bg-card-hover)',
                borderColor: 'var(--border-default)',
                color: 'var(--text-secondary)',
              }}
            >
              {tooltip}
            </motion.div>
          )}
        </div>
      </div>

      {/* Bars */}
      <div className="space-y-2">
        {/* Country A */}
        <div className="flex items-center gap-3">
          <span
            className="text-xs w-20 shrink-0 truncate"
            style={{ color: aWins ? 'var(--indigo-soft)' : 'var(--text-muted)' }}
          >
            {nameA}
          </span>
          <div className="flex-1 h-6 rounded-lg overflow-hidden relative" style={{ backgroundColor: 'var(--bg-primary)' }}>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${widthA}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="h-full rounded-lg flex items-center justify-end pr-2"
              style={{
                backgroundColor: aWins ? 'var(--indigo-vivid)' : 'rgba(99, 102, 241, 0.4)',
                minWidth: '2rem',
              }}
            >
              <span className="text-xs font-mono font-semibold text-white text-right whitespace-nowrap">
                {formatMetricValue(metricKey, valueA)}
              </span>
            </motion.div>
          </div>
        </div>

        {/* Country B */}
        <div className="flex items-center gap-3">
          <span
            className="text-xs w-20 shrink-0 truncate"
            style={{ color: bWins ? 'var(--cyan-vivid)' : 'var(--text-muted)' }}
          >
            {nameB}
          </span>
          <div className="flex-1 h-6 rounded-lg overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${widthB}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
              className="h-full rounded-lg flex items-center justify-end pr-2"
              style={{
                backgroundColor: bWins ? 'var(--cyan-vivid)' : 'rgba(34, 211, 238, 0.4)',
                minWidth: '2rem',
              }}
            >
              <span className="text-xs font-mono font-semibold text-white text-right whitespace-nowrap">
                {formatMetricValue(metricKey, valueB)}
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
