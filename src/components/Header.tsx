import React from 'react';
import { Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="h-16 flex items-center justify-between px-6 bg-white/80 backdrop-blur-sm border-b border-slate-100">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold text-slate-800 tracking-tight">WxFormat</span>
        </div>
        <nav className="hidden md:flex items-center gap-1 ml-8">
          <a href="#" className="px-4 py-1.5 text-sm font-medium text-white bg-slate-800 rounded-full">编辑器</a>
          <a href="#" className="px-4 py-1.5 text-sm font-medium text-slate-500 hover:text-slate-700 rounded-full hover:bg-slate-50 transition-colors">主题</a>
          <a href="#" className="px-4 py-1.5 text-sm font-medium text-slate-500 hover:text-slate-700 rounded-full hover:bg-slate-50 transition-colors">模板</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
