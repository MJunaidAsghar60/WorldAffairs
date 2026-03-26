'use client';

import { motion } from 'framer-motion';

const DATA_SOURCES = [
  { source: 'World Bank', use: 'GDP, population, trade, and development data' },
  { source: 'SIPRI', use: 'Military expenditure and arms transfer data' },
  { source: 'UN Development Programme', use: 'Human Development Index (HDI)' },
  { source: 'Transparency International', use: 'Corruption Perceptions Index' },
  { source: 'Institute for Economics & Peace', use: 'Global Peace Index' },
  { source: 'Henley & Partners', use: 'Passport power rankings' },
  { source: 'US/EU/UN Official Records', use: 'Sanctions lists and restrictions' },
];

const VALUES = [
  {
    emoji: '🔓',
    title: 'Always Free',
    desc: "No paywalls, no signup required. Geopolitical intelligence should be a public good.",
  },
  {
    emoji: '🎯',
    title: 'Genuinely Accurate',
    desc: "We cite sources for everything. If we're uncertain, we say so.",
  },
  {
    emoji: '🌍',
    title: 'Politically Neutral',
    desc: "We show data, not opinions. Our tools present facts — what you conclude is up to you.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12 },
  }),
};

export default function AboutClient() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-24 space-y-12">
      {/* Mission */}
      <motion.div
        custom={0}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="rounded-2xl border p-8"
        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}
      >
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          Our Mission
        </h2>
        <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
          World Affairs started with a simple frustration: understanding global events requires
          piecing together data from a dozen different sources, most of them buried behind paywalls
          or presented in formats that require a PhD to decode.
        </p>
        <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          We set out to fix that. Our goal is to make geopolitical intelligence as easy to access
          as checking the weather — free, visual, and genuinely useful for students, journalists,
          investors, travelers, and anyone trying to make sense of the world.
        </p>
      </motion.div>

      {/* Data Sources */}
      <motion.div
        custom={1}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="rounded-2xl border p-8"
        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}
      >
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          Where Our Data Comes From
        </h2>
        <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>
          We only use data from trusted, authoritative sources. Here&apos;s what powers our tools:
        </p>
        <ul className="space-y-3">
          {DATA_SOURCES.map((item) => (
            <li key={item.source} className="flex items-start gap-3">
              <span
                className="mt-1.5 w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: 'var(--indigo-soft)' }}
              />
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                <strong style={{ color: 'var(--text-primary)' }}>{item.source}</strong> — {item.use}
              </span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Values */}
      <motion.div
        custom={2}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="rounded-2xl border p-8"
        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}
      >
        <h2 className="text-2xl font-bold mb-5" style={{ color: 'var(--text-primary)' }}>
          What We Stand For
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              className="text-center p-5 rounded-xl"
              style={{ backgroundColor: 'var(--bg-primary)' }}
            >
              <div className="text-3xl mb-3">{v.emoji}</div>
              <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                {v.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {v.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
