import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import type { Priority } from '../types';

export default function TaskDetailsScreen() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { tasks, toggleTaskComplete, deleteTask } = useApp();
  const task = tasks.find((t) => t.id === id);

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

  const getPriorityLabel = (priority?: Priority) => {
    switch (priority) {
      case 'high': return 'Urgent';
      case 'medium': return 'Moyen';
      case 'low': return 'Faible';
      default: return 'Normal';
    }
  };

  const getPriorityColor = (priority?: Priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400';
      case 'medium': return 'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400';
      case 'low': return 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400';
      default: return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const handleDelete = () => {
    deleteTask(task.id);
    navigate('/');
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#F8F9FA] dark:bg-[#101622]">
      <div className="flex items-center bg-white dark:bg-[#1A202C] px-4 py-3 justify-between sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center justify-center h-10 w-10 text-[#212529] dark:text-[#F8F9FA]"
        >
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        <h2 className="text-lg font-semibold flex-1 text-center text-[#212529] dark:text-[#F8F9FA]">
          Détails de la tâche
        </h2>
        <button 
          onClick={handleDelete}
          className="flex items-center justify-center h-10 w-10 text-[#212529] dark:text-[#F8F9FA]"
        >
          <span className="material-symbols-outlined text-2xl">delete</span>
        </button>
      </div>

      <div className="flex-1 p-4 space-y-6">
        <h1 className="text-[#212529] dark:text-[#F8F9FA] text-2xl font-bold leading-tight">
          {task.title}
        </h1>

        <div className="flex items-center gap-3">
          <input
            className="h-5 w-5 rounded border-2 border-gray-300 dark:border-gray-600 bg-transparent text-[#007BFF] cursor-pointer focus:ring-2 focus:ring-[#007BFF] focus:ring-offset-0"
            type="checkbox"
            id="task-status"
            checked={task.completed}
            onChange={() => toggleTaskComplete(task.id)}
          />
          <label 
            htmlFor="task-status"
            className="text-base text-[#212529] dark:text-[#F8F9FA] cursor-pointer select-none"
          >
            {task.completed ? 'Terminé' : 'À faire'}
          </label>
        </div>

        {task.description && (
          <p className="text-[#6C757D] dark:text-[#A0AEC0] text-base leading-relaxed">
            {task.description}
          </p>
        )}

        <div className="space-y-3">
          {task.dueDate && (
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-6 text-[#6C757D] dark:text-[#A0AEC0]">
                <span className="material-symbols-outlined text-xl">calendar_today</span>
              </div>
              <p className="text-base text-[#212529] dark:text-[#F8F9FA]">
                {formatDate(task.dueDate)}
              </p>
            </div>
          )}

          {task.priority && (
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-6 text-[#6C757D] dark:text-[#A0AEC0]">
                <span className="material-symbols-outlined text-xl">flag</span>
              </div>
              <span className={`text-sm font-medium px-3 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                {getPriorityLabel(task.priority)}
              </span>
            </div>
          )}

          {task.category && (
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-6 text-[#6C757D] dark:text-[#A0AEC0]">
                <span className="material-symbols-outlined text-xl">bookmark</span>
              </div>
              <p className="text-base text-[#212529] dark:text-[#F8F9FA]">
                {task.category}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="sticky bottom-0 bg-white dark:bg-[#1A202C] p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex flex-col space-y-3">
          <button 
            onClick={() => navigate(`/edit/${task.id}`)}
            className="flex w-full items-center justify-center rounded-xl h-12 bg-[#007BFF] text-white text-base font-semibold hover:bg-[#0056b3] transition-colors"
          >
            Modifier la tâche
          </button>
          <button 
            onClick={handleDelete}
            className="flex w-full items-center justify-center rounded-xl h-12 bg-transparent text-[#DC3545] text-base font-semibold hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
          >
            Supprimer la tâche
          </button>
        </div>
      </div>
    </div>
  );
}