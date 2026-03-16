import { useMemo, useState } from 'react';
import { EmptyState } from './components/EmptyState';
import { StatCard } from './components/StatCard';
import { TodoFilters } from './components/TodoFilters';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { useTodos } from './hooks/useTodos';
import { FilterStatus, SortBy, Todo } from './types/todo';
import { getVisibleTodos } from './utils/todo';

function App() {
  const { todos, editingTodo, submitTodo, toggleTodo, deleteTodo, startEdit, cancelEdit } =
    useTodos();
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [sortBy, setSortBy] = useState<SortBy>('deadline');
  const [search, setSearch] = useState('');

  const visibleTodos = useMemo(
    () => getVisibleTodos(todos, filter, search, sortBy),
    [filter, search, sortBy, todos],
  );

  const totalCount = todos.length;
  const completedCount = todos.filter((todo) => todo.completed).length;
  const activeCount = totalCount - completedCount;

  function handleStartEdit(todo: Todo) {
    startEdit(todo);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="min-h-screen bg-canvas bg-hero-glow text-ink">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-14">
        <header className="flex flex-col gap-5 rounded-[28px] border border-white/70 bg-panel/80 px-6 py-5 shadow-soft backdrop-blur lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="font-display text-3xl leading-tight text-ink">待办清单</h1>
            <p className="mt-2 text-sm leading-6 text-muted">
              把今天要做的事收拢在一个安静、清晰的界面里。
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <StatCard label="全部任务" value={totalCount} />
            <StatCard label="未完成" value={activeCount} tone="accent" />
            <StatCard label="已完成" value={completedCount} />
          </div>
        </header>

        <main className="mt-6 grid gap-8 lg:grid-cols-[420px_minmax(0,1fr)] lg:items-start">
          <div className="lg:sticky lg:top-8">
            <TodoForm
              editingTodo={editingTodo}
              onSubmit={submitTodo}
              onCancelEdit={cancelEdit}
            />
          </div>

          <div className="grid gap-5">
            <TodoFilters
              filter={filter}
              sortBy={sortBy}
              search={search}
              onFilterChange={setFilter}
              onSortChange={setSortBy}
              onSearchChange={setSearch}
            />

            {totalCount === 0 ? (
              <EmptyState hasTodos={false} />
            ) : (
              <TodoList
                todos={visibleTodos}
                hasTodos={totalCount > 0}
                onToggle={toggleTodo}
                onEdit={handleStartEdit}
                onDelete={deleteTodo}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
