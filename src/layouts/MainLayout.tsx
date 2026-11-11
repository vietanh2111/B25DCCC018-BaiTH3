import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { useTheme } from '../contexts/ThemeContext';

export const MainLayout: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
};