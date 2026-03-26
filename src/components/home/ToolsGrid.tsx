'use client';

import { motion } from 'framer-motion';
import ToolCard from '@/components/shared/ToolCard';
import type { ToolCard as ToolCardType } from '@/types/tools';

const TOOLS: ToolCardType[] = [
  {
    id: 'country-comparator',
    name: 'Country Comparator',
    emoji: '🌍',
    category: 'Compare',
    description:
      'Pick any two countries and see how they really stack up — from GDP to military power to quality of life.',
    href: '/tools/country-comparator',
    color: 'var(--indigo-soft)',
    bgColor: 'rgba(99, 102, 241, 0.12)',
  },
  {
    id: 'passport-visa-calculator',
    name: 'Passport Calculator',
    emoji: '🛂',
    category: 'Travel',
    description:
      'Find out how powerful your passport is and exactly which countries you can visit without a visa.',
    href: '/tools/passport-visa-calculator',
    color: 'var(--cyan-soft)',
    bgColor: 'rgba(34, 211, 238, 0.1)',
  },
  {
    id: 'sanctions-tracker',
    name: 'Sanctions Tracker',
    emoji: '⚠️',
    category: 'Track',
    description:
      'See every active sanction on any country — who imposed it, why, and what it means for trade and travel.',
    href: '/tools/sanctions-tracker',
    color: 'var(--warning)',
    bgColor: 'rgba(251, 191, 36, 0.1)',
  },
  {
    id: 'geopolitical-risk-calculator',
    name: 'Geopolitical Risk',
    emoji: '📊',
    category: 'Risk',
    description:
      "Get a plain-English risk score for any country — great for investors, expats, and anyone planning a move.",
    href: '/tools/geopolitical-risk-calculator',
    color: 'var(--danger)',
    bgColor: 'rgba(248, 113, 113, 0.1)',
  },
  {
    id: 'alliance-treaty-finder',
    name: 'Alliance Finder',
    emoji: '🤝',
    category: 'Analyze',
    description:
      "See who's allied with who, which blocs a country belongs to, and how alliances have shifted over time.",
    href: '/tools/alliance-treaty-finder',
    color: 'var(--success)',
    bgColor: 'rgba(52, 211, 153, 0.1)',
  },
  {
    id: 'military-comparator',
    name: 'Military Comparator',
    emoji: '⚔️',
    category: 'Compare',
    description:
      'Compare army sizes, defense budgets, nuclear arsenals and air power between any two nations.',
    href: '/tools/military-comparator',
    color: 'var(--indigo-soft)',
    bgColor: 'rgba(99, 102, 241, 0.12)',
  },
  {
    id: 'un-voting-analyzer',
    name: 'UN Voting Analyzer',
    emoji: '🗳️',
    category: 'Analyze',
    description:
      "See how any country votes at the UN — and which nations tend to vote together or against each other.",
    href: '/tools/un-voting-analyzer',
    color: 'var(--info)',
    bgColor: 'rgba(96, 165, 250, 0.1)',
  },
  {
    id: 'scenario-simulator',
    name: 'Scenario Simulator',
    emoji: '🔮',
    category: 'Simulate',
    description:
      "Play out geopolitical 'what-ifs' — like what happens to oil prices if a major conflict escalates.",
    href: '/tools/scenario-simulator',
    color: '#a78bfa',
    bgColor: 'rgba(167, 139, 250, 0.1)',
  },
];

export { TOOLS };

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

export default function ToolsGrid() {
  return (
    <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Everything You Need to{' '}
          <span className="gradient-text">Understand Global Power</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg max-w-xl mx-auto"
          style={{ color: 'var(--text-secondary)' }}
        >
          Pick a tool and get answers in seconds — no background knowledge required.
        </motion.p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {TOOLS.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </motion.div>
    </section>
  );
}
