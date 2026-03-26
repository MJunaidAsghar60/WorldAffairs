'use client';

import PageHeader from '@/components/shared/PageHeader';

export default function UnVotingAnalyzerPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <PageHeader
        title="UN Voting Analyzer"
        description="See how any country votes at the UN — and which nations tend to vote together or against each other. Powered by UN General Assembly voting records."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Tools', href: '/tools' },
          { label: 'UN Voting Analyzer' },
        ]}
        tag="UN Analysis"
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-24 text-center">
        <div
          className="rounded-2xl border p-12"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}
        >
          <div className="text-6xl mb-5">🗳️</div>
          <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
            Coming Soon
          </h2>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            We&apos;re building a full UN voting records database. You&apos;ll be able to see how
            any country votes on key resolutions, compare voting alignment between nations, and track
            how positions have shifted over time.
          </p>
        </div>
      </div>
    </div>
  );
}
