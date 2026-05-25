import React, { useEffect, useRef } from 'react';

interface PreviewProps {
  html: string;
}

const Preview: React.FC<PreviewProps> = ({ html }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && html) {
      containerRef.current.innerHTML = html;
    }
  }, [html]);

  return (
    <div className="flex-1 overflow-auto p-5 bg-[#f8fafc]">
      <div
        ref={containerRef}
        className="max-w-[680px] mx-auto min-h-full"
      />
    </div>
  );
};

export default Preview;
