'use client';

import PageHeader from '@/components/shared/PageHeader';

export default function ScenarioSimulatorPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <PageHeader
        title="Geopolitical Scenario Simulator"
        description="Play out geopolitical 'what-ifs' — like what happens to oil prices if a major conflict escalates, or how an alliance shift changes the balance of power."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Tools', href: '/tools' },
          { label: 'Scenario Simulator' },
        ]}
        tag="Scenario Analysis"
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-24 text-center">
        <div
          className="rounded-2xl border p-12"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}
        >
          <div className="text-6xl mb-5">🔮</div>
          <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
            Coming Soon
          </h2>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            The scenario simulator is our most ambitious tool yet. We&apos;re designing a system where
            you can set up &quot;what if&quot; scenarios — conflict escalation, sanctions, alliance
            shifts — and see modeled economic and geopolitical outcomes.
          </p>
        </div>
      </div>
    </div>
  );
}
