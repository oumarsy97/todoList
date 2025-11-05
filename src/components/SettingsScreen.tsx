import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';

export default function SettingsScreen() {
  const navigate = useNavigate();
  const { theme, setTheme, notifications, setNotifications } = useApp();

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#f6f6f8] dark:bg-[#101622]">
      <header className="flex h-14 items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1e293b] px-4">
        <button onClick={() => navigate('/')} className="flex h-10 w-10 items-center justify-center dark:text-white">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="flex-1 text-center text-lg font-bold dark:text-white">Préférences</h1>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 p-4 space-y-6">
        <section>
          <h2 className="text-base font-bold pb-3 dark:text-white">Notifications</h2>
          <div className="rounded-xl bg-white dark:bg-[#1e293b] p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2b6cee]/10 text-[#2b6cee]">
                  <span className="material-symbols-outlined">notifications</span>
                </div>
                <p className="dark:text-white">Activer les rappels</p>
              </div>
              <label className={`relative flex h-[31px] w-[51px] cursor-pointer items-center rounded-full p-0.5 transition-colors ${
                notifications ? 'bg-[#2b6cee]' : 'bg-gray-300 dark:bg-gray-700'
              }`}>
                <div className={`h-full w-[27px] rounded-full bg-white shadow transition-transform duration-300 ${
                  notifications ? 'translate-x-[20px]' : 'translate-x-0'
                }`}></div>
                <input
                  type="checkbox"
                  className="hidden"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                />
              </label>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-base font-bold pb-3 dark:text-white">Apparence</h2>
          <div className="rounded-xl bg-white dark:bg-[#1e293b] p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2b6cee]/10 text-[#2b6cee]">
                <span className="material-symbols-outlined">contrast</span>
              </div>
              <p className="dark:text-white">Thème</p>
            </div>
            <div className="grid grid-cols-3 gap-2 rounded-lg bg-slate-100 dark:bg-slate-700/50 p-1">
              <button
                onClick={() => setTheme('light')}
                className={`rounded-md py-2 text-sm font-medium transition-all ${
                  theme === 'light' ? 'bg-white dark:bg-slate-600 dark:text-white text-[#2b6cee] shadow-sm' : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                Clair
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`rounded-md py-2 text-sm font-medium transition-all ${
                  theme === 'dark' ? 'bg-white dark:bg-slate-600 dark:text-white text-[#2b6cee] shadow-sm' : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                Sombre
              </button>
              <button
                onClick={() => setTheme('system')}
                className={`rounded-md py-2 text-sm font-medium transition-all ${
                  theme === 'system' ? 'bg-white dark:bg-slate-600 dark:text-white text-[#2b6cee] shadow-sm' : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                Système
              </button>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-base font-bold pb-3 dark:text-white">À Propos</h2>
          <div className="rounded-xl bg-white dark:bg-[#1e293b] p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                  <span className="material-symbols-outlined">info</span>
                </div>
                <p className="dark:text-white">Version de l'application</p>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">1.0.0</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}