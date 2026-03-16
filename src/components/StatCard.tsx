interface StatCardProps {
  label: string;
  value: number;
  tone?: 'default' | 'accent';
}

export function StatCard({ label, value, tone = 'default' }: StatCardProps) {
  const toneClass =
    tone === 'accent'
      ? 'border-accent/20 bg-accent text-white'
      : 'border-white/70 bg-white/80 text-ink';

  const labelClass = tone === 'accent' ? 'text-white/72' : 'text-muted';

  return (
    <div className={`rounded-3xl border px-5 py-4 shadow-soft backdrop-blur ${toneClass}`}>
      <div className={`text-sm font-medium ${labelClass}`}>{label}</div>
      <div className="mt-2 text-3xl font-semibold tracking-tight">{value}</div>
    </div>
  );
}

