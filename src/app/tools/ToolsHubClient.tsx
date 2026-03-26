'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MessageSquarePlus } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import ToolCard from '@/components/shared/ToolCard';
import { TOOLS } from '@/components/home/ToolsGrid';

type Category = 'All' | 'Compare' | 'Track' | 'Risk' | 'Analyze' | 'Travel' | 'Simulate';

const FILTER_TABS: Category[] = ['All', 'Compare', 'Track', 'Risk', 'Analyze', 'Travel', 'Simulate'];

export default function ToolsHubClient() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<Category>('All');

  const filtered = TOOLS.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(search.toLowerCase()) ||
      tool.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || tool.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <PageHeader
        title="Free Geopolitical Intelligence Tools"
        description="Everything you need to make sense of world affairs — without a PhD. All 8 tools are completely free, no signup required."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Tools' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
        {/* Search */}
        <div className="relative max-w-md mx-auto mb-6">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
            style={{ color: 'var(--text-muted)' }}
          />
          <input
            type="text"
            placeholder="Search tools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border outline-none text-sm transition-colors focus:border-[color:var(--indigo-vivid)]"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-default)',
              color: 'var(--text-primary)',
            }}
          />
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setCategory(tab)}
              className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
              style={{
                backgroundColor:
                  category === tab ? 'var(--indigo-vivid)' : 'var(--bg-card)',
                color: category === tab ? 'white' : 'var(--text-secondary)',
                border: `1px solid ${category === tab ? 'transparent' : 'var(--border-subtle)'}`,
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tools grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-16">
          {filtered.map((tool, i) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <ToolCard tool={tool} extended />
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-16" style={{ color: 'var(--text-muted)' }}>
              <p className="text-lg">No tools match your search.</p>
              <p className="text-sm mt-1">Try a different keyword or category.</p>
            </div>
          )}
        </div>

        {/* Suggest a tool */}
        <div
          className="rounded-2xl border p-8 text-center"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-subtle)',
          }}
        >
          <MessageSquarePlus className="w-10 h-10 mx-auto mb-4" style={{ color: 'var(--indigo-soft)' }} />
          <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            Missing something?
          </h3>
          <p className="text-sm mb-5 max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
            We&apos;re always adding new tools. Tell us what would help you make sense of world
            events.
          </p>
          <button
            type="button"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all hover:opacity-90"
            style={{
              backgroundColor: 'var(--indigo-vivid)',
              color: 'white',
            }}
          >
            Send a Suggestion
          </button>
        </div>
      </div>
    </div>
  );
}
