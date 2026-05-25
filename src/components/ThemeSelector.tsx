import React, { useState, useRef, useEffect } from 'react';
import { Theme } from '../types';
import { Paintbrush, Trash2, Check } from 'lucide-react';
import Popover from './Popover';

interface ThemeSelectorProps {
  themes: Theme[];
  selectedTheme: Theme;
  onThemeChange: (theme: Theme) => void;
  onDeleteTheme?: (themeId: string) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ themes, selectedTheme, onThemeChange, onDeleteTheme }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="toolbar-btn"
        title="选择主题风格"
      >
        <Paintbrush className="w-3.5 h-3.5" />
        <span>{selectedTheme.name}</span>
        <svg className="w-3 h-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <Popover anchorRef={btnRef} open={true} onClose={() => setOpen(false)} className="w-60 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden popover-enter">
          <div className="px-4 py-3 border-b border-slate-100">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">选择主题</p>
          </div>
          <ul className="py-2 max-h-72 overflow-y-auto px-2">
            {themes.map((theme) => {
              const isCustom = theme.id.startsWith('custom-');
              const isSelected = selectedTheme.id === theme.id;
              return (
                <li key={theme.id} className="relative group">
                  <button
                    onClick={() => {
                      onThemeChange(theme);
                      setOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2.5 text-sm rounded-lg transition-all duration-100 flex items-center gap-3 ${
                      isSelected
                        ? 'bg-emerald-50 text-emerald-800'
                        : 'hover:bg-slate-50 text-slate-600'
                    }`}
                    title={theme.description}
                  >
                    <span
                      className="w-4 h-4 rounded-full border-2 border-white shadow-sm flex-shrink-0 ring-1 ring-slate-200"
                      style={{ backgroundColor: theme.styles.primaryColor }}
                    />
                    <span className="flex-1 truncate font-medium">{theme.name}</span>
                    {isSelected && <Check className="w-4 h-4 text-emerald-600" />}
                  </button>
                  {isCustom && onDeleteTheme && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteTheme(theme.id);
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-slate-300 hover:text-red-500 rounded-md opacity-0 group-hover:opacity-100 transition-all"
                      title="删除主题"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </Popover>
      )}
    </div>
  );
};

export default ThemeSelector;
