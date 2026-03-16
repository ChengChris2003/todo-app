import { FilterStatus, SortBy } from '../types/todo';

interface TodoFiltersProps {
  filter: FilterStatus;
  sortBy: SortBy;
  search: string;
  onFilterChange: (value: FilterStatus) => void;
  onSortChange: (value: SortBy) => void;
  onSearchChange: (value: string) => void;
}

const filters: Array<{ label: string; value: FilterStatus }> = [
  { label: '全部', value: 'all' },
  { label: '未完成', value: 'active' },
  { label: '已完成', value: 'completed' },
];

export function TodoFilters({
  filter,
  sortBy,
  search,
  onFilterChange,
  onSortChange,
  onSearchChange,
}: TodoFiltersProps) {
  return (
    <section className="rounded-[30px] border border-white/70 bg-white/80 p-5 shadow-soft backdrop-blur">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {filters.map((item) => {
            const isActive = item.value === filter;
            return (
              <button
                key={item.value}
                type="button"
                onClick={() => onFilterChange(item.value)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
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

        <div className="grid gap-3 sm:grid-cols-[1.5fr_220px]">
          <label className="relative block">
            <span className="sr-only">搜索任务</span>
            <input
              type="search"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="按标题搜索"
              className="w-full rounded-2xl border border-line bg-panel px-4 py-3 text-sm text-ink outline-none transition placeholder:text-muted focus:border-accent/40 focus:ring-4 focus:ring-accent/10"
            />
          </label>

          <label className="relative block">
            <span className="sr-only">任务排序</span>
            <select
              value={sortBy}
              onChange={(event) => onSortChange(event.target.value as SortBy)}
              className="w-full appearance-none rounded-2xl border border-line bg-panel px-4 py-3 text-sm text-ink outline-none transition focus:border-accent/40 focus:ring-4 focus:ring-accent/10"
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
