import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import type { Priority } from '../types';

export default function EditTaskScreen() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { tasks, updateTask } = useApp();
  
  const task = tasks.find((t) => t.id === id);

  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [dueDate, setDueDate] = useState(task?.dueDate || '');
  const [priority, setPriority] = useState<Priority | undefined>(task?.priority);

  if (!task) {
    return (
      <div className="flex min-h-screen items-center justify-center dark:bg-[#101622] dark:text-white">
        <div className="text-center">
          <p className="text-lg">Tâche non trouvée</p>
          <button 
            onClick={() => navigate('/')}
            className="mt-4 px-6 py-2 bg-[#2b6cee] text-white rounded-lg"
          >
            Retour
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = () => {
    if (!title.trim()) return;
    
    updateTask(task.id, {
      title: title.trim(),
      description: description.trim() || undefined,
      dueDate: dueDate || undefined,
      priority: priority,
    });
    
    navigate(`/task/${task.id}`);
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#f9f9f9] dark:bg-[#101622]">
      <div className="flex shrink-0 items-center justify-between bg-white dark:bg-[#1a202c] p-4 pb-2 border-b border-[#dbdfe6] dark:border-[#2d3748]">
        <div className="flex size-12 items-center justify-start">
          <button 
            onClick={() => navigate(`/task/${task.id}`)}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-[#111318] dark:text-white"
          >
            <span className="material-symbols-outlined text-2xl">arrow_back</span>
          </button>
        </div>
        <h2 className="flex-1 text-center text-lg font-bold text-[#111318] dark:text-white">
          Modifier la Tâche
        </h2>
        <div className="flex w-12 items-center justify-end">
          <button 
            onClick={() => navigate(`/task/${task.id}`)}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-[#111318] dark:text-white"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>
      </div>

      <main className="flex-1 space-y-4 p-4">
        <label className="flex flex-col">
          <p className="pb-2 text-base font-medium text-[#111318] dark:text-white">Titre</p>
          <input
            autoFocus
            className="flex w-full rounded-lg border border-[#dbdfe6] bg-white p-4 text-base text-[#111318] placeholder:text-[#616f89] focus:border-[#2b6cee] focus:outline-0 focus:ring-2 focus:ring-[#2b6cee]/20 dark:border-[#2d3748] dark:bg-[#1a202c] dark:text-white dark:placeholder:text-[#a0aec0]"
            placeholder="Ex: Faire les courses"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label className="flex flex-col">
          <p className="pb-2 text-base font-medium text-[#111318] dark:text-white">Description</p>
          <textarea
            className="flex w-full resize-none rounded-lg border border-[#dbdfe6] bg-white p-4 text-base text-[#111318] placeholder:text-[#616f89] focus:border-[#2b6cee] focus:outline-0 focus:ring-2 focus:ring-[#2b6cee]/20 dark:border-[#2d3748] dark:bg-[#1a202c] dark:text-white dark:placeholder:text-[#a0aec0]"
            placeholder="Ex: Acheter du lait, des œufs et du pain"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <label className="flex flex-col">
          <p className="pb-2 text-base font-medium text-[#111318] dark:text-white">Échéance</p>
          <input
            type="date"
            className="flex w-full rounded-lg border border-[#dbdfe6] bg-white p-4 text-base text-[#111318] placeholder:text-[#616f89] focus:border-[#2b6cee] focus:outline-0 focus:ring-2 focus:ring-[#2b6cee]/20 dark:border-[#2d3748] dark:bg-[#1a202c] dark:text-white [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-60 hover:[&::-webkit-calendar-picker-indicator]:opacity-100"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </label>

        <div className="flex flex-col">
          <p className="pb-2 text-base font-medium text-[#111318] dark:text-white">Priorité</p>
          <div className="grid grid-cols-3 gap-2 rounded-lg bg-slate-100 p-1 dark:bg-slate-700/50">
            <button
              type="button"
              onClick={() => setPriority(undefined)}
              className={`rounded-md py-2.5 text-sm font-medium transition-all ${
                priority === undefined
                  ? 'bg-white text-[#2b6cee] shadow-sm dark:bg-slate-600 dark:text-white'
                  : 'text-[#64748b] dark:text-[#94a3b8]'
              }`}
            >
              Normal
            </button>
            <button
              type="button"
              onClick={() => setPriority('medium')}
              className={`rounded-md py-2.5 text-sm font-medium transition-all ${
                priority === 'medium'
                  ? 'bg-white text-[#2b6cee] shadow-sm dark:bg-slate-600 dark:text-white'
                  : 'text-[#64748b] dark:text-[#94a3b8]'
              }`}
            >
              Moyen
            </button>
            <button
              type="button"
              onClick={() => setPriority('high')}
              className={`rounded-md py-2.5 text-sm font-medium transition-all ${
                priority === 'high'
                  ? 'bg-white text-red-600 shadow-sm dark:bg-slate-600 dark:text-red-400'
                  : 'text-[#64748b] dark:text-[#94a3b8]'
              }`}
            >
              🔴 Urgent
            </button>
          </div>
        </div>
      </main>

      <div className="sticky bottom-0 bg-[#f9f9f9] p-4 dark:bg-[#101622]">
        <button 
          onClick={handleSubmit}
          disabled={!title.trim()}
          className="flex h-14 w-full cursor-pointer items-center justify-center rounded-lg bg-[#2b6cee] px-5 text-base font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span className="truncate">Enregistrer les modifications</span>
        </button>
      </div>
    </div>
  );
}