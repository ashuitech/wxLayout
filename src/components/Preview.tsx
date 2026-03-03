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
    <div className="flex-1 overflow-auto bg-gray-100 p-4">
      <div
        ref={containerRef}
        className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm min-h-full"
        style={{
          minHeight: 'calc(100vh - 200px)',
          padding: '20px'
        }}
      />
    </div>
  );
};

export default Preview;