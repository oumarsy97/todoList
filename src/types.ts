export type Priority = 'low' | 'medium' | 'high';
export type Theme = 'light' | 'dark' | 'system';

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority?: Priority;
  dueDate?: string;
  category?: string;
}