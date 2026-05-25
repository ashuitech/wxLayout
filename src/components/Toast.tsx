import React, { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onClose, 2500);
    return () => clearTimeout(t);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed top-5 right-5 z-[9999] toast-enter">
      <div className="flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-lg bg-white border border-slate-100 text-sm text-slate-700">
        <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
        </div>
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
