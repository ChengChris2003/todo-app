import { FormEvent, useEffect, useState } from 'react';
import { Priority, Todo, TodoInput } from '../types/todo';

interface TodoFormProps {
  editingTodo: Todo | null;
  onSubmit: (input: TodoInput) => void;
  onCancelEdit: () => void;
}

const emptyForm: TodoInput = {
  title: '',
  description: '',
  deadline: '',
  priority: 'medium',
};

const priorities: Array<{ label: string; value: Priority }> = [
  { label: '低', value: 'low' },
  { label: '中', value: 'medium' },
  { label: '高', value: 'high' },
];

export function TodoForm({ editingTodo, onSubmit, onCancelEdit }: TodoFormProps) {
  const [form, setForm] = useState<TodoInput>(emptyForm);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingTodo) {
      setForm({
        title: editingTodo.title,
        description: editingTodo.description,
        deadline: editingTodo.deadline,
        priority: editingTodo.priority,
      });
      setError('');
      return;
    }

    setForm(emptyForm);
    setError('');
  }, [editingTodo]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.title.trim()) {
      setError('请输入任务标题');
      return;
    }

    onSubmit({
      title: form.title,
      description: form.description,
      deadline: form.deadline,
      priority: form.priority,
    });

    if (!editingTodo) {
      setForm(emptyForm);
    }

    setError('');
  }

  return (
    <section className="rounded-[30px] border border-white/70 bg-white/95 p-6 shadow-card backdrop-blur animate-rise">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium tracking-[0.24em] text-muted">任务编辑</p>
          <h2 className="mt-2 font-display text-2xl text-ink">
            {editingTodo ? '修改任务' : '新增任务'}
          </h2>
        </div>
        <button
          type="button"
          onClick={onCancelEdit}
          className="rounded-full border border-line px-4 py-2 text-sm font-medium text-ink transition hover:border-accent/30 hover:bg-accent-soft/60"
        >
          关闭
        </button>
      </div>

      <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 lg:grid-cols-[1.25fr_0.9fr]">
          <label className="grid gap-2">
            <span className="text-sm font-medium text-ink">标题</span>
            <input
              type="text"
              value={form.title}
              onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
              placeholder="例如：整理本周计划、提交方案、预约体检"
              className="w-full rounded-2xl border border-line bg-panel px-4 py-3 text-sm text-ink outline-none transition placeholder:text-muted focus:border-accent/40 focus:ring-4 focus:ring-accent/10"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-ink">截止日期</span>
            <input
              type="date"
              value={form.deadline}
              onChange={(event) =>
                setForm((current) => ({ ...current, deadline: event.target.value }))
              }
              className="w-full rounded-2xl border border-line bg-panel px-4 py-3 text-sm text-ink outline-none transition focus:border-accent/40 focus:ring-4 focus:ring-accent/10"
            />
          </label>
        </div>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-ink">描述</span>
          <textarea
            rows={4}
            value={form.description}
            onChange={(event) =>
              setForm((current) => ({ ...current, description: event.target.value }))
            }
            placeholder="补充一些背景信息，方便之后快速进入状态。"
            className="w-full resize-none rounded-2xl border border-line bg-panel px-4 py-3 text-sm text-ink outline-none transition placeholder:text-muted focus:border-accent/40 focus:ring-4 focus:ring-accent/10"
          />
        </label>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-sm font-medium text-ink">优先级</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {priorities.map((item) => {
                const isActive = form.priority === item.value;
                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() =>
                      setForm((current) => ({
                        ...current,
                        priority: item.value,
                      }))
                    }
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                      isActive
                        ? 'bg-ink text-white shadow-soft'
                        : 'border border-line bg-panel text-ink hover:border-accent/30 hover:bg-accent-soft/50'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col items-start gap-3 lg:items-end">
            {error ? <p className="text-sm font-medium text-priority-high">{error}</p> : null}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onCancelEdit}
                className="rounded-full border border-line px-5 py-3 text-sm font-medium text-ink transition hover:border-accent/30 hover:bg-accent-soft/55"
              >
                取消
              </button>
              <button
                type="submit"
                className="rounded-full bg-ink px-5 py-3 text-sm font-medium text-white transition hover:bg-accent focus:outline-none focus:ring-4 focus:ring-accent/15"
              >
                {editingTodo ? '确认修改' : '确认新增'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
