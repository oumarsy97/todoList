import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import type { Priority } from '../types';

export default function CreateTaskScreen() {
  const navigate = useNavigate();
  const { addTask } = useApp();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<Priority | undefined>(undefined);

  const handleSubmit = () => {
    if (!title.trim()) return;
    
    addTask({
      title: title.trim(),
      description: description.trim(),
      completed: false,
      dueDate: dueDate || undefined,
      priority: priority,
    });
    
    navigate('/');
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#f9f9f9] dark:bg-[#101622]">
      <header className="flex items-center justify-between bg-white dark:bg-[#1a202c] p-4 border-b border-gray-200 dark:border-gray-800">
        <button onClick={() => navigate('/')} className="flex h-10 w-10 items-center justify-center dark:text-white">
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        <h2 className="flex-1 text-center text-lg font-bold dark:text-white">Nouvelle Tâche</h2>
        <button onClick={() => navigate('/')} className="flex h-10 w-10 items-center justify-center dark:text-white">
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>
      </header>

      <main className="flex-1 space-y-4 p-4">
        <label className="flex flex-col">
          <p className="pb-2 text-base font-medium dark:text-white">Titre</p>
          <input
            autoFocus
            className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1a202c] dark:text-white p-4 focus:border-[#2b6cee] focus:ring-2 focus:ring-[#2b6cee]/20 focus:outline-none"
            placeholder="Ex: Faire les courses"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label className="flex flex-col">
          <p className="pb-2 text-base font-medium dark:text-white">Description</p>
          <textarea
            className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1a202c] dark:text-white p-4 focus:border-[#2b6cee] focus:ring-2 focus:ring-[#2b6cee]/20 focus:outline-none resize-none"
            placeholder="Ex: Acheter du lait, des œufs"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <label className="flex flex-col">
          <p className="pb-2 text-base font-medium dark:text-white">Échéance</p>
          <input
            type="date"
            className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1a202c] dark:text-white p-4 focus:border-[#2b6cee] focus:ring-2 focus:ring-[#2b6cee]/20 focus:outline-none"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </label>

        <div className="flex flex-col">
          <p className="pb-2 text-base font-medium dark:text-white">Priorité</p>
          <div className="grid grid-cols-3 gap-2 rounded-lg bg-slate-100 dark:bg-slate-700/50 p-1">
            <button
              onClick={() => setPriority(undefined)}
              className={`rounded-md py-2.5 text-sm font-medium transition-all ${
                priority === undefined ? 'bg-white dark:bg-slate-600 dark:text-white text-[#2b6cee] shadow-sm' : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              Normal
            </button>
            <button
              onClick={() => setPriority('medium')}
              className={`rounded-md py-2.5 text-sm font-medium transition-all ${
                priority === 'medium' ? 'bg-white dark:bg-slate-600 dark:text-white text-[#2b6cee] shadow-sm' : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              Moyen
            </button>
            <button
              onClick={() => setPriority('high')}
              className={`rounded-md py-2.5 text-sm font-medium transition-all ${
                priority === 'high' ? 'bg-white dark:bg-slate-600 text-red-600 dark:text-red-400 shadow-sm' : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              🔴 Urgent
            </button>
          </div>
        </div>
      </main>

      <div className="p-4">
        <button 
          onClick={handleSubmit}
          disabled={!title.trim()}
          className="w-full h-14 rounded-lg bg-[#2b6cee] text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
        >
          Créer la tâche
        </button>
      </div>
    </div>
  );
}