'use client';

import { motion } from 'framer-motion';

interface RiskMeterProps {
  score: number;
  label: string;
  size?: 'sm' | 'md' | 'lg';
}

function getRiskColor(score: number): string {
  if (score >= 75) return 'var(--danger)';
  if (score >= 50) return 'var(--warning)';
  if (score >= 25) return 'var(--info)';
  return 'var(--success)';
}

function getRiskLabel(score: number): string {
  if (score >= 75) return 'High Risk';
  if (score >= 50) return 'Moderate Risk';
  if (score >= 25) return 'Low Risk';
  return 'Very Safe';
}

export default function RiskMeter({ score, label, size = 'md' }: RiskMeterProps) {
  const color = getRiskColor(score);
  const riskLabel = getRiskLabel(score);

  const sizeMap = {
    sm: { text: 'text-2xl', bar: 'h-2' },
    md: { text: 'text-4xl', bar: 'h-3' },
    lg: { text: 'text-6xl', bar: 'h-4' },
  };

  return (
    <div className="space-y-2">
      <div className="flex items-end gap-2">
        <span
          className={`font-mono font-bold ${sizeMap[size].text}`}
          style={{ color }}
        >
          {score}
        </span>
        <span className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>
          / 100
        </span>
      </div>
      <div
        className={`w-full rounded-full overflow-hidden ${sizeMap[size].bar}`}
        style={{ backgroundColor: 'var(--bg-primary)' }}
      >
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${score}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium" style={{ color }}>
          {riskLabel}
        </span>
        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
          {label}
        </span>
      </div>
    </div>
  );
}
