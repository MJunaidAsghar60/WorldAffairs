'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { formatMetricValue } from '@/lib/utils/formatters';

interface ChartMetric {
  key: string;
  label: string;
  valueA: number;
  valueB: number;
}

interface ComparisonChartProps {
  metrics: ChartMetric[];
  nameA: string;
  nameB: string;
  flagA: string;
  flagB: string;
}

interface TooltipPayload {
  value: number;
  dataKey: string;
  payload: ChartMetric & { normalizedA: number; normalizedB: number };
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="px-3 py-2 rounded-lg text-xs shadow-xl border"
      style={{
        backgroundColor: 'var(--bg-card-hover)',
        borderColor: 'var(--border-default)',
        color: 'var(--text-secondary)',
      }}
    >
      <p className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
        {label}
      </p>
      {payload.map((entry) => {
        const isA = entry.dataKey === 'normalizedA';
        const rawValue = isA
          ? entry.payload.valueA
          : entry.payload.valueB;
        const metricKey = entry.payload.key;
        return (
          <p key={entry.dataKey} style={{ color: isA ? 'var(--indigo-soft)' : 'var(--cyan-soft)' }}>
            {formatMetricValue(metricKey, rawValue)}
          </p>
        );
      })}
    </div>
  );
}

export default function ComparisonChart({
  metrics,
  nameA,
  nameB,
  flagA,
  flagB,
}: ComparisonChartProps) {
  // Normalise each metric 0-100 relative to the larger of the two values
  const data = metrics.map((m) => {
    const max = Math.max(m.valueA, m.valueB) || 1;
    return {
      ...m,
      normalizedA: Math.round((m.valueA / max) * 100),
      normalizedB: Math.round((m.valueB / max) * 100),
    };
  });

  return (
    <div>
      {/* Legend */}
      <div className="flex items-center gap-6 mb-4 justify-center text-sm">
        <span className="flex items-center gap-1.5">
          <span
            className="w-3 h-3 rounded-sm inline-block"
            style={{ backgroundColor: 'var(--indigo-vivid)' }}
          />
          <span style={{ color: 'var(--text-secondary)' }}>
            {flagA} {nameA}
          </span>
        </span>
        <span className="flex items-center gap-1.5">
          <span
            className="w-3 h-3 rounded-sm inline-block"
            style={{ backgroundColor: 'var(--cyan-vivid)' }}
          />
          <span style={{ color: 'var(--text-secondary)' }}>
            {flagB} {nameB}
          </span>
        </span>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 4, right: 8, left: -24, bottom: 0 }}
          barCategoryGap="30%"
          barGap={3}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--border-subtle)"
            vertical={false}
          />
          <XAxis
            dataKey="label"
            tick={{ fill: 'var(--text-muted)', fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            interval={0}
            angle={-35}
            textAnchor="end"
            height={60}
          />
          <YAxis
            tick={{ fill: 'var(--text-muted)', fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            domain={[0, 100]}
            tickFormatter={(v: number) => `${v}%`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99,102,241,0.05)' }} />
          <Bar dataKey="normalizedA" radius={[4, 4, 0, 0]} maxBarSize={28}>
            {data.map((_, i) => (
              <Cell key={i} fill="var(--indigo-vivid)" />
            ))}
          </Bar>
          <Bar dataKey="normalizedB" radius={[4, 4, 0, 0]} maxBarSize={28}>
            {data.map((_, i) => (
              <Cell key={i} fill="var(--cyan-vivid)" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
