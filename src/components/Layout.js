import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import VoiceScreenshot from './VoiceScreenshot';

const Layout = ({ children }) => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className={darkMode ? 'dark bg-gray-900 text-white min-h-screen' : 'bg-gray-100 text-gray-900 min-h-screen'}>
      <VoiceScreenshot />

      {/* Header */}
      <header className="bg-indigo-600 dark:bg-gray-800 shadow-md py-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="text-3xl font-bold text-white hover:text-yellow-300 transition">
            SpeakInk Blog
          </Link>
          <nav className="space-x-4">
            <Link to="/" className="text-white hover:text-yellow-300 font-medium">Home</Link>
            <Link to="/admin" className="text-white hover:text-yellow-300 font-medium">Dashboard</Link>
          </nav>
          <button
            onClick={toggleTheme}
            className="ml-4 bg-yellow-400 dark:bg-gray-700 text-black dark:text-white font-semibold px-3 py-1 rounded-full shadow-md hover:scale-105 transition-transform"
            title="Toggle dark/light mode"
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="px-4 py-8 max-w-7xl mx-auto">{children}</main>

      {/* Footer */}
      <footer className="bg-indigo-600 dark:bg-gray-800 text-white py-4 mt-8 text-center">
        <p>
          &copy; {new Date().getFullYear()} SpeakInk Blog. Powered by Chinedu Ubamadu
        </p>
      </footer>
    </div>
  );
};

export default Layout;
