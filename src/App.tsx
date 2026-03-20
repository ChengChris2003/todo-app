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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const visibleTodos = useMemo(() => getVisibleTodos(todos, filter, sortBy), [filter, sortBy, todos]);

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
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-14">
        <header className="flex flex-col gap-3 rounded-[20px] border border-white/70 bg-panel/80 px-3.5 py-3 shadow-soft backdrop-blur sm:gap-4 sm:rounded-[24px] sm:px-4 sm:py-4 lg:rounded-[28px] lg:px-6 lg:py-5">
          <div>
            <h1 className="font-display text-xl leading-tight text-ink sm:text-2xl lg:text-3xl">
              待办清单
            </h1>
            <p className="mt-1 text-xs leading-5 text-muted sm:mt-1.5 sm:text-sm sm:leading-6">
              把今天要做的事收拢在一个安静、清晰的界面里。
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3 lg:grid-cols-4">
            <StatCard label="全部任务" value={totalCount} />
            <StatCard label="未完成" value={activeCount} tone="accent" />
            <StatCard label="已完成" value={completedCount} />
            <button
              type="button"
              onClick={handleOpenCreateModal}
              className="col-span-3 flex min-h-11 items-center justify-center rounded-2xl border border-accent/25 bg-accent-soft px-3.5 py-2.5 text-sm font-semibold text-accent shadow-soft transition hover:border-accent/35 hover:bg-accent/15 sm:col-span-1 sm:min-h-12 sm:rounded-3xl sm:px-4 sm:py-3 sm:text-base"
            >
              + 新增任务
            </button>
          </div>
        </header>

        <main className="mx-auto mt-2.5 max-w-6xl sm:mt-4">
          <div className="grid gap-3 sm:gap-4">
            <TodoFilters
              filter={filter}
              sortBy={sortBy}
              onFilterChange={setFilter}
              onSortChange={setSortBy}
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
          className="fixed inset-0 z-50 flex items-end justify-center bg-stone-950/45 p-1.5 sm:items-center sm:p-4"
          onClick={handleCloseModal}
        >
          <div
            className="max-h-[92vh] w-full max-w-3xl overflow-auto"
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
