import React from 'react';
import { Theme } from '../types';
import { Palette } from 'lucide-react';

interface ThemeSelectorProps {
  themes: Theme[];
  selectedTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ themes, selectedTheme, onThemeChange }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 text-gray-700">
        <Palette className="w-5 h-5" />
        <span className="font-medium">主题风格</span>
      </div>
      <div className="flex gap-2">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => onThemeChange(theme)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedTheme.id === theme.id
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            title={theme.description}
          >
            {theme.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;