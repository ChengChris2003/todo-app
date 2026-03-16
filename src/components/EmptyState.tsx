interface EmptyStateProps {
  hasTodos: boolean;
}

export function EmptyState({ hasTodos }: EmptyStateProps) {
  return (
    <div className="rounded-[28px] border border-dashed border-line bg-white/70 px-8 py-16 text-center shadow-soft">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft text-accent">
        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-none stroke-current stroke-[1.7]">
          <path d="M8 6.75h10.5A1.75 1.75 0 0 1 20.25 8.5v10A1.75 1.75 0 0 1 18.5 20.25h-13A1.75 1.75 0 0 1 3.75 18.5v-13A1.75 1.75 0 0 1 5.5 3.75h10" />
          <path d="m9 11 2 2 6-6" />
        </svg>
      </div>
      <h3 className="mt-5 text-xl font-semibold text-ink">
        {hasTodos ? '当前条件下没有匹配的任务' : '还没有任何任务'}
      </h3>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted">
        {hasTodos
          ? '可以试试更换搜索关键词，或者切换筛选条件看看其他任务。'
          : '从左侧添加第一条任务，设置标题、描述、日期和优先级。'}
      </p>
    </div>
  );
}
