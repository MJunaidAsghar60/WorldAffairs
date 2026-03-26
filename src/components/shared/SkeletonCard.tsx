export default function SkeletonCard() {
  return (
    <div
      className="rounded-2xl border p-6 animate-pulse"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border-subtle)',
      }}
    >
      <div className="w-12 h-12 rounded-xl mb-4" style={{ backgroundColor: 'var(--border-subtle)' }} />
      <div className="h-5 w-2/3 rounded-md mb-2" style={{ backgroundColor: 'var(--border-subtle)' }} />
      <div className="h-4 w-full rounded-md mb-1.5" style={{ backgroundColor: 'var(--border-subtle)' }} />
      <div className="h-4 w-4/5 rounded-md mb-6" style={{ backgroundColor: 'var(--border-subtle)' }} />
      <div className="h-4 w-1/4 rounded-md" style={{ backgroundColor: 'var(--border-subtle)' }} />
    </div>
  );
}
