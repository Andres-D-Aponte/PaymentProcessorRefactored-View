import React, { useState } from 'react';
import { FiSettings } from 'react-icons/fi';
import ThemeSelector from './components/ThemeSelector';
import PaymentForm from './components/PaymentForm';

//PARA CONSULTAR LOS COLORES POSIBLE
//https://tailwindcss.com/docs/background-color
const themes = {
  light: 'bg-gray-100',
  dark: 'bg-gray-800',
  blue: 'bg-blue-100',
  green: 'bg-green-100',
  purple: 'bg-purple-100',
  orange: 'bg-orange-100'
};

function App() {
  const [currentTheme, setCurrentTheme] = useState('light');
  const [showThemeSelector, setShowThemeSelector] = useState(false);

  return (
    <div className={`min-h-screen ${themes[currentTheme as keyof typeof themes]} transition-colors duration-300`}>
      <div className="container mx-auto px-4 py-8">
        <div className="relative">
          <button
            onClick={() => setShowThemeSelector(!showThemeSelector)}
            className="fixed top-4 right-4 p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow"
            aria-label="Theme settings"
          >
            <FiSettings className="w-6 h-6" />
          </button>
          
          {showThemeSelector && (
            <ThemeSelector
              currentTheme={currentTheme}
              onThemeChange={setCurrentTheme}
              themes={Object.keys(themes)}
              onClose={() => setShowThemeSelector(false)}
            />
          )}
        </div>

        <PaymentForm />
      </div>
    </div>
  );
}

export default App;