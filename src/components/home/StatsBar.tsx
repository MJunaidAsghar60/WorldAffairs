'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const STATS = [
  { value: 195, suffix: '+', label: 'Countries in our database' },
  { value: 19, suffix: '', label: 'Metrics per comparison' },
  { value: 8, suffix: '', label: 'Free tools, no signup' },
  { value: 2025, suffix: '', label: 'Data updated for this year' },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className="font-mono font-bold text-4xl sm:text-5xl">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function StatsBar() {
  return (
    <section
      className="py-16 px-4 border-t border-b"
      style={{
        borderColor: 'var(--border-subtle)',
        backgroundColor: 'var(--bg-secondary)',
      }}
    >
      <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
        {STATS.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="text-center relative"
          >
            <div style={{ color: 'var(--indigo-soft)' }}>
              <CountUp target={stat.value} suffix={stat.suffix} />
            </div>
            <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
              {stat.label}
            </p>
            {index < STATS.length - 1 && (
              <div
                className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 h-12 w-px"
                style={{ backgroundColor: 'var(--border-subtle)' }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
