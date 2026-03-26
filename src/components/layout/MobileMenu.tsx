'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';

interface NavLink {
  href: string;
  label: string;
}

interface MobileMenuProps {
  links: NavLink[];
  pathname: string;
  onClose: () => void;
}

export default function MobileMenu({ links, pathname, onClose }: MobileMenuProps) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed top-16 left-0 right-0 z-40 border-b overflow-hidden"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderColor: 'var(--border-subtle)',
      }}
    >
      <div className="px-4 py-4 flex flex-col gap-1">
        {links.map((link) => {
          const isActive =
            link.href === '/'
              ? pathname === '/'
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={cn(
                'px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-[color:var(--bg-card)] text-[color:var(--indigo-soft)]'
                  : 'text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] hover:bg-[color:var(--bg-card)]'
              )}
            >
              {link.label}
            </Link>
          );
        })}
        <Link
          href="/tools/country-comparator"
          onClick={onClose}
          className="mt-2 px-4 py-3 rounded-lg text-sm font-medium text-center transition-all"
          style={{
            backgroundColor: 'var(--indigo-vivid)',
            color: 'white',
          }}
        >
          Compare Countries →
        </Link>
      </div>
    </motion.div>
  );
}
