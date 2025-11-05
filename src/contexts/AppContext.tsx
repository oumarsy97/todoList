/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { ThemeProvider, useTheme } from './ThemeContext';
import type { Task } from '../types';

interface AppContextType {
  notifications: boolean;
  setNotifications: (enabled: boolean) => void;
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskComplete: (id: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

function AppContextProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Acheter du lait et des œufs',
      description: '',
      completed: false,
    },
    {
      id: '2',
      title: 'Préparer la présentation pour mardi',
      description: '',
      completed: false,
      priority: 'high',
    },
    {
      id: '3',
      title: 'Réviser la conception de l\'application',
      description: 'Vérifier la cohérence de la palette de couleurs et la typographie.',
      completed: false,
      priority: 'high',
      dueDate: '2024-12-15',
      category: 'Travail',
    },
  ]);

  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  const addTask = (task: Omit<Task, 'id'>) => {
    const newTask = { ...task, id: Date.now().toString() };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const toggleTaskComplete = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (task) updateTask(id, { completed: !task.completed });
  };

  return (
    <AppContext.Provider value={{
      notifications, 
      setNotifications,
      tasks, 
      addTask, 
      updateTask, 
      deleteTask, 
      toggleTaskComplete
    }}>
      {children}
    </AppContext.Provider>
  );
}

// Provider combiné qui wrap les deux contexts
export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <AppContextProvider>
        {children}
      </AppContextProvider>
    </ThemeProvider>
  );
}

// Hook qui combine les deux contexts
export function useApp() {
  const appContext = useContext(AppContext);
  const themeContext = useTheme();
  
  if (!appContext) {
    throw new Error('useApp must be used within AppProvider');
  }
  
  return {
    ...appContext,
    theme: themeContext.theme,
    setTheme: themeContext.setTheme,
    resolvedTheme: themeContext.resolvedTheme,
    isDark: themeContext.resolvedTheme === 'dark',
  };
}