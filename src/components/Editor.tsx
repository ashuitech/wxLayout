import React from 'react';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <textarea
      value={value}
      onChange={handleChange}
      className="flex-1 w-full p-4 resize-none focus:outline-none font-mono text-sm leading-relaxed"
      placeholder="在此输入Markdown内容..."
      spellCheck={false}
    />
  );
};

export default Editor;