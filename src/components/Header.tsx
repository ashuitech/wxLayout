import React from 'react';
import { Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Sparkles className="w-8 h-8" />
          <div>
            <h1 className="text-2xl font-bold">微信公众号自动排版工具</h1>
            <p className="text-sm text-blue-100">Markdown 一键转换为微信公众号完美格式</p>
          </div>
        </div>
        <div className="text-sm text-blue-100">
          支持GFM标准 · 5套专业主题 · 实时预览
        </div>
      </div>
    </header>
  );
};

export default Header;