import React from 'react';
import { LayoutGrid } from 'lucide-react';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-[68px] flex flex-col items-center py-4 gap-2 bg-white/60 border-r border-slate-100">
      <button
        className="sidebar-icon active"
        title="编辑器"
      >
        <LayoutGrid className="w-5 h-5" />
      </button>
    </aside>
  );
};

export default Sidebar;
