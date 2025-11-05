import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';

export default function TaskListScreen() {
  const navigate = useNavigate();
  const { tasks, toggleTaskComplete } = useApp();
  const [sortAscending, setSortAscending] = useState(true);

  // Trier les tâches selon l'ordre
  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => {
      if (sortAscending) {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
  }, [tasks, sortAscending]);

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#f6f6f8] dark:bg-[#101622] text-gray-800 dark:text-gray-200">
      <header className="sticky top-0 z-10 flex items-center justify-between bg-[#f6f6f8]/80 dark:bg-[#101622]/80 backdrop-blur-sm p-4 pb-2 border-b border-gray-200 dark:border-gray-800">
        <button 
          onClick={() => navigate('/settings')}
          className="flex h-12 w-12 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
        >
          <span className="material-symbols-outlined text-2xl">menu</span>
        </button>
        <h1 className="text-lg font-bold flex-1 text-center">Mes Tâches</h1>
        <button 
          onClick={() => setSortAscending(!sortAscending)}
          className="flex h-12 w-12 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
        >
          <span className="material-symbols-outlined text-2xl">filter_list</span>
        </button>
      </header>

      <main className="flex-grow p-4">
        <div className="space-y-3">
          {sortedTasks.map((task) => (
            <div 
              key={task.id}
              className="flex items-center gap-4 bg-white dark:bg-gray-800/50 p-4 rounded-xl shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate(`/task/${task.id}`)}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={(e) => {
                  e.stopPropagation();
                  toggleTaskComplete(task.id);
                }}
                className="h-5 w-5 rounded-md border-2 border-gray-300 dark:border-gray-600 cursor-pointer"
              />
              <p className={`text-base flex-1 truncate ${task.completed ? 'line-through text-gray-400 dark:text-gray-600' : ''}`}>
                {task.title}
              </p>
              <div className="flex items-center gap-2">
                {task.priority === 'high' && (
                  <div className="h-2 w-2 rounded-full bg-red-500"></div>
                )}
              </div>
            </div>
          ))}

          {sortedTasks.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20">
              <span className="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-700">task_alt</span>
              <h3 className="mt-4 text-lg font-medium">Votre liste est vide</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Appuyez sur + pour ajouter une tâche.</p>
            </div>
          )}
        </div>
      </main>

      <button 
        onClick={() => navigate('/create')}
        className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#2b6cee] text-white shadow-lg hover:bg-[#2b6cee]/90"
      >
        <span className="material-symbols-outlined text-3xl">add</span>
      </button>
    </div>
  );
}