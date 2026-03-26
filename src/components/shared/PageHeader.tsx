'use client';

import { motion } from 'framer-motion';
import Breadcrumb from './Breadcrumb';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  description: string;
  breadcrumbs?: BreadcrumbItem[];
  tag?: string;
}

export default function PageHeader({ title, description, breadcrumbs, tag }: PageHeaderProps) {
  return (
    <div className="pt-28 pb-12 px-4 sm:px-6 max-w-4xl mx-auto text-center">
      {breadcrumbs && <Breadcrumb items={breadcrumbs} className="justify-center mb-6" />}
      {tag && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-medium mb-4"
          style={{
            borderColor: 'var(--border-default)',
            color: 'var(--text-muted)',
          }}
        >
          {tag}
        </motion.div>
      )}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl sm:text-5xl font-bold mb-5 leading-tight"
        style={{ color: 'var(--text-primary)' }}
      >
        {title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-lg leading-relaxed max-w-2xl mx-auto"
        style={{ color: 'var(--text-secondary)' }}
      >
        {description}
      </motion.p>
    </div>
  );
}
