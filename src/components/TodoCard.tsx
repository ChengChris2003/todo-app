import { formatDate, isOverdue } from '../utils/date';
import { Todo } from '../types/todo';

interface TodoCardProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

const priorityStyles = {
  low: 'bg-slate-100 text-priority-low',
  medium: 'bg-amber-50 text-priority-medium',
  high: 'bg-rose-50 text-priority-high',
};

const priorityLabel = {
  low: '低优先级',
  medium: '中优先级',
  high: '高优先级',
};

export function TodoCard({ todo, onToggle, onEdit, onDelete }: TodoCardProps) {
  const overdue = !todo.completed && isOverdue(todo.deadline);

  return (
    <article
      className={`rounded-[28px] border p-5 shadow-soft transition ${
        todo.completed
          ? 'border-white/80 bg-white/70'
          : 'border-white/90 bg-white/90 hover:-translate-y-0.5 hover:shadow-card'
      }`}
    >
      <div className="flex items-start gap-4">
        <button
          type="button"
          onClick={() => onToggle(todo.id)}
          className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition ${
            todo.completed
              ? 'border-accent bg-accent text-white'
              : 'border-line bg-panel text-transparent hover:border-accent'
          }`}
          aria-label={todo.completed ? '标记为未完成' : '标记为已完成'}
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4 fill-none stroke-current stroke-[2.2]">
            <path d="m5 10 3 3 7-7" />
          </svg>
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              <h3
                className={`text-lg font-semibold leading-7 text-ink ${
                  todo.completed ? 'text-muted line-through decoration-[1.5px]' : ''
                }`}
              >
                {todo.title}
              </h3>
              {todo.description ? (
                <p className="mt-2 text-sm leading-6 text-muted">{todo.description}</p>
              ) : (
                <p className="mt-2 text-sm italic leading-6 text-muted/75">暂无描述</p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${priorityStyles[todo.priority]}`}
              >
                {priorityLabel[todo.priority]}
              </span>
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                  overdue ? 'bg-rose-50 text-priority-high' : 'bg-stone-100 text-muted'
                }`}
              >
                {todo.deadline ? formatDate(todo.deadline) : '无截止日期'}
              </span>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-medium tracking-[0.2em] text-muted">
              {todo.completed ? '已完成' : overdue ? '已逾期' : '进行中'}
            </p>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onEdit(todo)}
                className="rounded-full border border-line px-4 py-2 text-sm font-medium text-ink transition hover:border-accent/30 hover:bg-accent-soft/55"
              >
                编辑
              </button>
              <button
                type="button"
                onClick={() => onDelete(todo.id)}
                className="rounded-full border border-transparent bg-stone-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-priority-high"
              >
                删除
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
