import { FilterStatus, SortBy } from '../types/todo';

interface TodoFiltersProps {
  filter: FilterStatus;
  sortBy: SortBy;
  onFilterChange: (value: FilterStatus) => void;
  onSortChange: (value: SortBy) => void;
}

const filters: Array<{ label: string; value: FilterStatus }> = [
  { label: '全部', value: 'all' },
  { label: '未完成', value: 'active' },
  { label: '已完成', value: 'completed' },
];

export function TodoFilters({
  filter,
  sortBy,
  onFilterChange,
  onSortChange,
}: TodoFiltersProps) {
  return (
    <section className="rounded-[20px] border border-white/70 bg-white/80 p-3 shadow-soft backdrop-blur sm:rounded-[24px] sm:p-4 lg:rounded-[30px] lg:p-5">
      <div className="flex flex-col gap-2.5 sm:gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {filters.map((item) => {
            const isActive = item.value === filter;
            return (
              <button
                key={item.value}
                type="button"
                onClick={() => onFilterChange(item.value)}
                className={`min-h-10 rounded-full px-3.5 py-1.5 text-xs font-medium transition sm:min-h-11 sm:px-4 sm:py-2 sm:text-sm ${
                  isActive
                    ? 'bg-accent text-white shadow-soft'
                    : 'border border-line bg-panel text-ink hover:border-accent/30 hover:bg-accent-soft/60'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="w-full sm:w-[220px]">
          <label className="relative block">
            <span className="sr-only">任务排序</span>
            <select
              value={sortBy}
              onChange={(event) => onSortChange(event.target.value as SortBy)}
              className="min-h-10 w-full appearance-none rounded-xl border border-line bg-panel px-3.5 py-2 text-sm text-ink outline-none transition focus:border-accent/40 focus:ring-4 focus:ring-accent/10 sm:min-h-11 sm:rounded-2xl sm:px-4 sm:py-3"
            >
              <option value="deadline">按截止日期排序</option>
              <option value="priority">按优先级排序</option>
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-muted">
              <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current">
                <path d="M5.25 7.5 10 12.25 14.75 7.5" />
              </svg>
            </span>
          </label>
        </div>
      </div>
    </section>
  );
}
