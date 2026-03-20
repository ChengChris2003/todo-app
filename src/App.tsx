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
  const [sortBy, setSortBy] = useState<SortBy>('priority');
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const visibleTodos = useMemo(
    () => getVisibleTodos(todos, filter, search, sortBy),
    [filter, search, sortBy, todos],
  );

  const totalCount = todos.length;
  const completedCount = todos.filter((todo) => todo.completed).length;
  const activeCount = totalCount - completedCount;

  function handleOpenCreateModal() {
    cancelEdit();
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    cancelEdit();
    setIsModalOpen(false);
  }

  function handleSubmitForm(input: Parameters<typeof submitTodo>[0]) {
    submitTodo(input);
    setIsModalOpen(false);
  }

  function handleStartEdit(todo: Todo) {
    startEdit(todo);
    setIsModalOpen(true);
  }

  return (
    <div className="min-h-screen bg-canvas bg-hero-glow text-ink">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-14">
        <header className="flex flex-col gap-5 rounded-[28px] border border-white/70 bg-panel/80 px-6 py-5 shadow-soft backdrop-blur">
          <div>
            <h1 className="font-display text-3xl leading-tight text-ink">待办清单</h1>
            <p className="mt-2 text-sm leading-6 text-muted">
              把今天要做的事收拢在一个安静、清晰的界面里。
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="全部任务" value={totalCount} />
            <StatCard label="未完成" value={activeCount} tone="accent" />
            <StatCard label="已完成" value={completedCount} />
            <button
              type="button"
              onClick={handleOpenCreateModal}
              className="rounded-3xl border border-ink/90 bg-ink px-5 py-4 text-left text-white shadow-soft transition hover:bg-accent"
            >
              <p className="text-sm text-white/75">任务操作</p>
              <p className="mt-2 text-2xl font-semibold">+ 新增任务</p>
            </button>
          </div>
        </header>

        <main className="mx-auto mt-6 max-w-6xl">
          <div className="grid gap-4">
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

      {isModalOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/45 p-4"
          onClick={handleCloseModal}
        >
          <div
            className="max-h-[88vh] w-full max-w-3xl overflow-auto"
            onClick={(event) => event.stopPropagation()}
          >
            <TodoForm
              editingTodo={editingTodo}
              onSubmit={handleSubmitForm}
              onCancelEdit={handleCloseModal}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
