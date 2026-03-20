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
    <div
      className={`rounded-xl border px-2.5 py-2 shadow-soft backdrop-blur sm:rounded-2xl sm:px-3 sm:py-2.5 ${toneClass}`}
    >
      <div className={`text-[10px] font-medium leading-none sm:text-xs ${labelClass}`}>{label}</div>
      <div className="mt-1 text-lg font-semibold leading-none tracking-tight sm:mt-1.5 sm:text-2xl">
        {value}
      </div>
    </div>
  );
}
