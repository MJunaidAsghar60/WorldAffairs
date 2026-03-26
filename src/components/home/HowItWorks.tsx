'use client';

import { motion } from 'framer-motion';

const STEPS = [
  {
    number: '01',
    title: 'Choose Your Topic',
    description:
      "Select a tool that matches what you're curious about — a country, a conflict, a sanction, or a what-if scenario.",
  },
  {
    number: '02',
    title: 'Get Instant Analysis',
    description:
      'Our tools process real data from trusted sources like the World Bank, UN, and SIPRI and turn it into something actually readable.',
  },
  {
    number: '03',
    title: 'Share with Anyone',
    description:
      'Every result has a shareable link. Send it to a friend, drop it in a debate, or cite it in your research.',
  },
];

export default function HowItWorks() {
  return (
    <section
      className="py-24 px-4 sm:px-6"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg"
            style={{ color: 'var(--text-secondary)' }}
          >
            Seriously, it takes about 10 seconds.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative p-6 rounded-2xl border"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              <div
                className="text-4xl font-extrabold font-mono mb-4 opacity-20"
                style={{ color: 'var(--indigo-soft)' }}
              >
                {step.number}
              </div>
              <h3
                className="text-lg font-semibold mb-3"
                style={{ color: 'var(--text-primary)' }}
              >
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
