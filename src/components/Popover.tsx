import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface PopoverProps {
  anchorRef: React.RefObject<HTMLElement>;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const Popover: React.FC<PopoverProps> = ({ anchorRef, open, onClose, children, className }) => {
  const popRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!popRef.current) return;
      if (popRef.current.contains(e.target as Node)) return;
      if (anchorRef.current && anchorRef.current.contains(e.target as Node)) return;
      onClose();
    };
    if (open) {
      document.addEventListener('mousedown', close);
      const esc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
      document.addEventListener('keydown', esc);
      return () => {
        document.removeEventListener('mousedown', close);
        document.removeEventListener('keydown', esc);
      };
    }
  }, [open, onClose, anchorRef]);

  useLayoutEffect(() => {
    if (!open || !anchorRef.current) return;
    const rect = anchorRef.current.getBoundingClientRect();
    const pop = popRef.current;
    const margin = 8;
    let top = rect.bottom + margin;
    let left = rect.left;
    if (pop) {
      const height = pop.offsetHeight;
      const width = pop.offsetWidth;
      if (top + height > window.innerHeight) {
        top = rect.top - height - margin;
      }
      if (left + width > window.innerWidth) {
        left = Math.max(8, window.innerWidth - width - 8);
      }
    }
    setPos({ top, left });
  }, [open, anchorRef, children]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      ref={popRef}
      className={className || 'bg-white border border-slate-200 rounded-xl shadow-xl'}
      style={{ position: 'fixed', top: pos.top, left: pos.left, zIndex: 1000 }}
    >
      {children}
    </div>,
    document.body
  );
};

export default Popover;
