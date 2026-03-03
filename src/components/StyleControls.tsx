import React from 'react';
import { StyleSettings } from '../types';
import { Type, Layout, Palette as PaletteIcon } from 'lucide-react';

interface StyleControlsProps {
  settings: StyleSettings;
  onChange: (settings: StyleSettings) => void;
}

const StyleControls: React.FC<StyleControlsProps> = ({ settings, onChange }) => {
  return (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2">
        <PaletteIcon className="w-5 h-5 text-gray-600" />
        <label className="text-sm font-medium text-gray-700">强调色</label>
        <input
          type="color"
          value={settings.accentColor}
          onChange={(e) => onChange({ ...settings, accentColor: e.target.value })}
          className="w-8 h-8 rounded cursor-pointer border-2 border-gray-300"
        />
        <input
          type="text"
          value={settings.accentColor}
          onChange={(e) => onChange({ ...settings, accentColor: e.target.value })}
          className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="#000000"
        />
      </div>

      <div className="flex items-center gap-2">
        <Layout className="w-5 h-5 text-gray-600" />
        <label className="text-sm font-medium text-gray-700">段落间距</label>
        <div className="flex gap-1">
          {(['compact', 'standard', 'loose'] as const).map((spacing) => (
            <button
              key={spacing}
              onClick={() => onChange({ ...settings, paragraphSpacing: spacing })}
              className={`px-3 py-1.5 text-sm rounded transition-colors ${
                settings.paragraphSpacing === spacing
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {spacing === 'compact' ? '紧凑' : spacing === 'standard' ? '标准' : '宽松'}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Type className="w-5 h-5 text-gray-600" />
        <label className="text-sm font-medium text-gray-700">字号</label>
        <div className="flex gap-1">
          {(['small', 'medium', 'large'] as const).map((size) => (
            <button
              key={size}
              onClick={() => onChange({ ...settings, fontSize: size })}
              className={`px-3 py-1.5 text-sm rounded transition-colors ${
                settings.fontSize === size
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {size === 'small' ? '小' : size === 'medium' ? '中' : '大'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StyleControls;