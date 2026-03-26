import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav
      className={cn('flex items-center gap-1 text-xs', className)}
      aria-label="Breadcrumb"
      style={{ color: 'var(--text-muted)' }}
    >
      {items.map((item, index) => (
        <span key={item.label} className="flex items-center gap-1">
          {index > 0 && <ChevronRight className="w-3 h-3 opacity-50" />}
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-[color:var(--indigo-soft)] transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span style={{ color: 'var(--text-secondary)' }}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
