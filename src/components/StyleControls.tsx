import React, { useState, useRef } from 'react';
import { Theme, StyleSettings } from '../types';
import { SlidersHorizontal, Type, AlignLeft, Palette, Save, ChevronDown } from 'lucide-react';
import Popover from './Popover';

interface StyleControlsProps {
  settings: StyleSettings;
  onChange: (settings: StyleSettings) => void;
  theme: Theme;
  onThemeStylesChange: (styles: Theme['styles']) => void;
  onSaveCustomTheme: (name: string) => void;
}

const StyleControls: React.FC<StyleControlsProps> = ({
  settings,
  onChange,
  theme: _theme,
  onThemeStylesChange: _onThemeStylesChange,
  onSaveCustomTheme,
}) => {
  const [open, setOpen] = useState(false);
  const [saveOpen, setSaveOpen] = useState(false);
  const [themeName, setThemeName] = useState('');
  const btnRef = useRef<HTMLButtonElement>(null);
  const saveRef = useRef<HTMLButtonElement>(null);

  const updateSetting = <K extends keyof StyleSettings>(key: K, value: StyleSettings[K]) => {
    onChange({ ...settings, [key]: value });
  };

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen(v => !v)}
        className="toolbar-btn"
        title="样式设置"
      >
        <SlidersHorizontal className="w-3.5 h-3.5" />
        <span>样式</span>
        <ChevronDown className="w-3 h-3 opacity-50" />
      </button>

      <button
        ref={saveRef}
        type="button"
        onClick={() => setSaveOpen(v => !v)}
        className="toolbar-btn"
        title="保存为新主题"
      >
        <Save className="w-3.5 h-3.5" />
        <span>保存主题</span>
      </button>

      {open && (
        <Popover anchorRef={btnRef} open={true} onClose={() => setOpen(false)} className="w-72 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden popover-enter">
          <div className="px-4 py-3 border-b border-slate-100">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">样式设置</p>
          </div>
          <div className="p-4 space-y-4 max-h-80 overflow-y-auto">
            {/* Font size */}
            <div>
              <label className="text-xs font-medium text-slate-600 mb-1.5 flex items-center gap-1.5">
                <Type className="w-3.5 h-3.5" /> 字号
              </label>
              <div className="flex gap-1">
                {(['small', 'medium', 'large'] as const).map(size => (
                  <button
                    key={size}
                    onClick={() => updateSetting('fontSize', size)}
                    className={`flex-1 px-2 py-1.5 text-xs rounded-lg border transition-all ${
                      settings.fontSize === size
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700 font-medium'
                        : 'border-slate-200 text-slate-500 hover:border-slate-300'
                    }`}
                  >
                    {size === 'small' ? '小' : size === 'medium' ? '中' : '大'}
                  </button>
                ))}
              </div>
            </div>

            {/* Paragraph spacing */}
            <div>
              <label className="text-xs font-medium text-slate-600 mb-1.5 flex items-center gap-1.5">
                <AlignLeft className="w-3.5 h-3.5" /> 段落间距
              </label>
              <div className="flex gap-1">
                {(['compact', 'standard', 'loose'] as const).map(spacing => (
                  <button
                    key={spacing}
                    onClick={() => updateSetting('paragraphSpacing', spacing)}
                    className={`flex-1 px-2 py-1.5 text-xs rounded-lg border transition-all ${
                      settings.paragraphSpacing === spacing
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700 font-medium'
                        : 'border-slate-200 text-slate-500 hover:border-slate-300'
                    }`}
                  >
                    {spacing === 'compact' ? '紧凑' : spacing === 'standard' ? '标准' : '宽松'}
                  </button>
                ))}
              </div>
            </div>

            {/* Accent color */}
            <div>
              <label className="text-xs font-medium text-slate-600 mb-1.5 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5" /> 主题色
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={settings.accentColor}
                  onChange={(e) => updateSetting('accentColor', e.target.value)}
                  className="w-8 h-8 rounded-lg border border-slate-200 cursor-pointer"
                />
                <span className="text-xs text-slate-500 font-mono">{settings.accentColor}</span>
              </div>
            </div>

            {/* Code theme */}
            <div>
              <label className="text-xs font-medium text-slate-600 mb-1.5 block">代码块主题</label>
              <div className="flex gap-1">
                {(['light', 'dark', 'github'] as const).map(ct => (
                  <button
                    key={ct}
                    onClick={() => updateSetting('codeTheme', ct)}
                    className={`flex-1 px-2 py-1.5 text-xs rounded-lg border transition-all ${
                      settings.codeTheme === ct
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700 font-medium'
                        : 'border-slate-200 text-slate-500 hover:border-slate-300'
                    }`}
                  >
                    {ct === 'light' ? '浅色' : ct === 'dark' ? '深色' : 'GitHub'}
                  </button>
                ))}
              </div>
            </div>

            {/* First line indent */}
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-slate-600">首行缩进</label>
              <button
                onClick={() => updateSetting('firstLineIndent', !settings.firstLineIndent)}
                className={`w-9 h-5 rounded-full transition-all ${
                  settings.firstLineIndent ? 'bg-emerald-500' : 'bg-slate-200'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform ${
                  settings.firstLineIndent ? 'translate-x-[18px]' : 'translate-x-[2px]'
                }`} />
              </button>
            </div>
          </div>
        </Popover>
      )}

      {saveOpen && (
        <Popover anchorRef={saveRef} open={true} onClose={() => setSaveOpen(false)} className="w-60 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden popover-enter">
          <div className="p-4">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">保存为新主题</p>
            <input
              type="text"
              value={themeName}
              onChange={e => setThemeName(e.target.value)}
              placeholder="输入主题名称"
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 mb-3"
            />
            <button
              onClick={() => {
                onSaveCustomTheme(themeName);
                setThemeName('');
                setSaveOpen(false);
              }}
              className="btn-primary w-full justify-center"
            >
              <Save className="w-3.5 h-3.5" />
              保存
            </button>
          </div>
        </Popover>
      )}
    </>
  );
};

export default StyleControls;
