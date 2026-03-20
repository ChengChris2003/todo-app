import { FilterStatus, Priority, SortBy, Todo, TodoInput } from '../types/todo';

const priorityRank: Record<Priority, number> = {
  high: 0,
  medium: 1,
  low: 2,
};

export function createTodo(input: TodoInput): Todo {
  const timestamp = new Date().toISOString();

  return {
    id: crypto.randomUUID(),
    title: input.title.trim(),
    description: input.description.trim(),
    deadline: input.deadline,
    priority: input.priority,
    completed: false,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

export function updateTodoItem(todo: Todo, input: TodoInput): Todo {
  return {
    ...todo,
    title: input.title.trim(),
    description: input.description.trim(),
    deadline: input.deadline,
    priority: input.priority,
    updatedAt: new Date().toISOString(),
  };
}

export function getVisibleTodos(
  todos: Todo[],
  filter: FilterStatus,
  sortBy: SortBy,
): Todo[] {
  const filtered = todos.filter((todo) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'active' && !todo.completed) ||
      (filter === 'completed' && todo.completed);

    return matchesFilter;
  });

  return [...filtered].sort((a, b) => {
    if (sortBy === 'deadline') {
      if (a.deadline && b.deadline) {
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      }
      if (a.deadline) {
        return -1;
      }
      if (b.deadline) {
        return 1;
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }

    const priorityCompare = priorityRank[a.priority] - priorityRank[b.priority];
    if (priorityCompare !== 0) {
      return priorityCompare;
    }

    if (a.deadline && b.deadline) {
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    }

    if (a.deadline) {
      return -1;
    }

    if (b.deadline) {
      return 1;
    }

    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}
