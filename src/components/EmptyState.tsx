interface EmptyStateProps {
  hasTodos: boolean;
}

export function EmptyState({ hasTodos }: EmptyStateProps) {
  return (
    <div className="rounded-[20px] border border-dashed border-line bg-white/70 px-4 py-8 text-center shadow-soft sm:rounded-[24px] sm:px-5 sm:py-10 lg:rounded-[28px] lg:px-8 lg:py-16">
      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent sm:h-11 sm:w-11 sm:rounded-2xl lg:h-14 lg:w-14">
        <svg viewBox="0 0 24 24" className="h-5.5 w-5.5 fill-none stroke-current stroke-[1.7] sm:h-6 sm:w-6 lg:h-7 lg:w-7">
          <path d="M8 6.75h10.5A1.75 1.75 0 0 1 20.25 8.5v10A1.75 1.75 0 0 1 18.5 20.25h-13A1.75 1.75 0 0 1 3.75 18.5v-13A1.75 1.75 0 0 1 5.5 3.75h10" />
          <path d="m9 11 2 2 6-6" />
        </svg>
      </div>
      <h3 className="mt-3.5 text-base font-semibold text-ink sm:mt-4 sm:text-lg lg:mt-5 lg:text-xl">
        {hasTodos ? '当前条件下没有匹配的任务' : '还没有任何任务'}
      </h3>
      <p className="mx-auto mt-2.5 max-w-md text-sm leading-6 text-muted">
        {hasTodos
          ? '可以切换筛选条件或排序方式查看其他任务。'
          : '从顶部新增任务，填写标题、描述、日期和优先级。'}
      </p>
    </div>
  );
}
