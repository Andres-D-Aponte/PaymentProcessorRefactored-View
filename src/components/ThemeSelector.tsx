import React from 'react';

interface ThemeSelectorProps {
  currentTheme: string;
  themes: string[];
  onThemeChange: (theme: string) => void;
  onClose: () => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  currentTheme,
  themes,
  onThemeChange,
  onClose
}) => {
  return (
    <div className="absolute top-16 right-4 bg-white rounded-lg shadow-xl p-4 z-50">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold mb-2">Select Theme</h3>
        {themes.map((theme) => (
          <button
            key={theme}
            onClick={() => {
              onThemeChange(theme);
              onClose();
            }}
            className={`px-4 py-2 rounded-md capitalize ${
              currentTheme === theme
                ? 'bg-blue-500 text-white'
                : 'hover:bg-gray-100'
            }`}
          >
            {theme}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;