'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { ToolCard as ToolCardType } from '@/types/tools';

interface ToolCardProps {
  tool: ToolCardType;
  extended?: boolean;
}

const CATEGORY_COLORS: Record<string, string> = {
  Compare: 'var(--indigo-soft)',
  Track: 'var(--warning)',
  Risk: 'var(--danger)',
  Analyze: 'var(--info)',
  Travel: 'var(--cyan-soft)',
  Simulate: '#a78bfa',
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function ToolCard({ tool, extended = false }: ToolCardProps) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{
        y: -4,
        transition: { duration: 0.2 },
      }}
      className="group relative rounded-2xl border p-6 flex flex-col gap-4 cursor-pointer transition-all"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border-subtle)',
      }}
    >
      {/* Hover border glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{ boxShadow: `0 0 0 1px ${tool.color}40` }}
      />

      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
        style={{ backgroundColor: tool.bgColor }}
      >
        {tool.emoji}
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
            {tool.name}
          </h3>
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{
              color: CATEGORY_COLORS[tool.category],
              backgroundColor: `${CATEGORY_COLORS[tool.category]}15`,
            }}
          >
            {tool.category}
          </span>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {tool.description}
        </p>

        {extended && (
          <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
            <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-muted)' }}>
              What you&apos;ll learn:
            </p>
            <ul className="space-y-1">
              {getToolHighlights(tool.id).map((highlight) => (
                <li
                  key={highlight}
                  className="text-xs flex items-start gap-1.5"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <span style={{ color: tool.color }}>✓</span> {highlight}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Bottom row */}
      <div className="flex items-center justify-between">
        <Link
          href={tool.href}
          className="text-sm font-medium transition-colors"
          style={{ color: tool.color }}
        >
          Try Now →
        </Link>
        <span
          className="text-xs px-2 py-0.5 rounded-full"
          style={{
            color: 'var(--success)',
            backgroundColor: 'rgba(52, 211, 153, 0.1)',
          }}
        >
          Free
        </span>
      </div>
    </motion.div>
  );
}

function getToolHighlights(id: string): string[] {
  const map: Record<string, string[]> = {
    'country-comparator': [
      'GDP, military, population side by side',
      'Quality of life and corruption scores',
      'Shareable comparison link',
    ],
    'passport-visa-calculator': [
      'Visa-free access count for 199 countries',
      'Global passport power ranking',
      'Which countries you can visit without a visa',
    ],
    'sanctions-tracker': [
      'All active US, EU, UN, and UK sanctions',
      'Reasons and dates for each sanction',
      'Trade restriction details',
    ],
    'geopolitical-risk-calculator': [
      'Overall risk score 0-100',
      'Conflict, political, and economic risk',
      'Travel advisory level',
    ],
    'alliance-treaty-finder': [
      'Which military alliances a country belongs to',
      'Economic and political blocs',
      'Key bilateral relationships',
    ],
    'military-comparator': [
      'Defense budgets and troop numbers',
      'Nuclear warhead counts',
      'Naval and air force comparison',
    ],
    'un-voting-analyzer': [
      'Voting alignment scores between countries',
      'Key resolutions and positions',
      'Bloc voting patterns',
    ],
    'scenario-simulator': [
      'Economic ripple effects of conflicts',
      'Oil price impact scenarios',
      'Alliance activation scenarios',
    ],
  };
  return map[id] || [];
}
