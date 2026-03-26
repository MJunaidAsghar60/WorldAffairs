'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { COUNTRIES } from '@/data/countries';
import type { CountryData } from '@/types/country';

interface CountrySelectorProps {
  value: CountryData | null;
  onChange: (country: CountryData | null) => void;
  placeholder?: string;
  excludeId?: string;
}

export default function CountrySelector({
  value,
  onChange,
  placeholder = 'Choose a country...',
  excludeId,
}: CountrySelectorProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  const filtered = COUNTRIES.filter(
    (c) =>
      c.id !== excludeId &&
      (c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.region.toLowerCase().includes(query.toLowerCase()))
  );

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery('');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border text-left transition-all"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: open ? 'var(--indigo-vivid)' : 'var(--border-default)',
          color: value ? 'var(--text-primary)' : 'var(--text-muted)',
        }}
      >
        {value ? (
          <>
            <span className="text-2xl">{value.flag}</span>
            <span className="flex-1 font-medium">{value.name}</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange(null);
              }}
              className="p-1 rounded-full hover:bg-[color:var(--bg-card-hover)] transition-colors"
              style={{ color: 'var(--text-muted)' }}
            >
              <X className="w-4 h-4" />
            </button>
          </>
        ) : (
          <>
            <span className="flex-1 text-sm">{placeholder}</span>
            <ChevronDown
              className="w-4 h-4 transition-transform"
              style={{
                color: 'var(--text-muted)',
                transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />
          </>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 top-full left-0 right-0 mt-2 rounded-xl border overflow-hidden shadow-2xl"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-default)',
            }}
          >
            {/* Search */}
            <div
              className="flex items-center gap-2 px-3 py-2.5 border-b"
              style={{ borderColor: 'var(--border-subtle)' }}
            >
              <Search className="w-4 h-4 shrink-0" style={{ color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search countries..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 text-sm bg-transparent outline-none"
                style={{ color: 'var(--text-primary)' }}
                autoFocus
              />
            </div>

            {/* List */}
            <div className="max-h-64 overflow-y-auto">
              {filtered.length === 0 ? (
                <div className="px-4 py-6 text-center text-sm" style={{ color: 'var(--text-muted)' }}>
                  No countries found
                </div>
              ) : (
                filtered.map((country) => (
                  <button
                    key={country.id}
                    type="button"
                    onClick={() => {
                      onChange(country);
                      setOpen(false);
                      setQuery('');
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-[color:var(--bg-card-hover)]"
                  >
                    <span className="text-xl">{country.flag}</span>
                    <div>
                      <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                        {country.name}
                      </p>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        {country.region}
                      </p>
                    </div>
                  </button>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
