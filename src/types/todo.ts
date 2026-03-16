export type Priority = 'low' | 'medium' | 'high';

export type FilterStatus = 'all' | 'active' | 'completed';

export type SortBy = 'deadline' | 'priority';

export interface Todo {
  id: string;
  title: string;
  description: string;
  deadline: string;
  priority: Priority;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TodoInput {
  title: string;
  description: string;
  deadline: string;
  priority: Priority;
}

