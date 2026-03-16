import { useEffect, useState } from 'react';
import { Todo, TodoInput } from '../types/todo';
import { loadTodos, saveTodos } from '../utils/storage';
import { createTodo, updateTodoItem } from '../utils/todo';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => loadTodos());
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  function submitTodo(input: TodoInput) {
    if (editingTodo) {
      setTodos((current) =>
        current.map((todo) => (todo.id === editingTodo.id ? updateTodoItem(todo, input) : todo)),
      );
      setEditingTodo(null);
      return;
    }

    setTodos((current) => [createTodo(input), ...current]);
  }

  function toggleTodo(id: string) {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              updatedAt: new Date().toISOString(),
            }
          : todo,
      ),
    );
  }

  function deleteTodo(id: string) {
    setTodos((current) => current.filter((todo) => todo.id !== id));
    setEditingTodo((current) => (current?.id === id ? null : current));
  }

  function startEdit(todo: Todo) {
    setEditingTodo(todo);
  }

  function cancelEdit() {
    setEditingTodo(null);
  }

  return {
    todos,
    editingTodo,
    submitTodo,
    toggleTodo,
    deleteTodo,
    startEdit,
    cancelEdit,
  };
}

