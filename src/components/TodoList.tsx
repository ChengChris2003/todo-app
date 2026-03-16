import { Todo } from '../types/todo';
import { EmptyState } from './EmptyState';
import { TodoCard } from './TodoCard';

interface TodoListProps {
  todos: Todo[];
  hasTodos: boolean;
  onToggle: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

export function TodoList({ todos, hasTodos, onToggle, onEdit, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return <EmptyState hasTodos={hasTodos} />;
  }

  return (
    <section className="grid gap-4">
      {todos.map((todo) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
}

