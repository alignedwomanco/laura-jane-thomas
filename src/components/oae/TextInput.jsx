import React, { useRef, useEffect } from 'react';

export default function TextInput({ value, onChange, placeholder, multiline = true, minRows = 5 }) {
  const ref = useRef(null);

  useEffect(() => {
    if (multiline && ref.current) {
      ref.current.style.height = 'auto';
      ref.current.style.height = Math.max(ref.current.scrollHeight, minRows * 26) + 'px';
    }
  }, [value, multiline, minRows]);

  if (!multiline) {
    return (
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded px-4 py-3 text-gray-800 bg-white focus:border-[#6B1F2A] focus:outline-none focus:ring-1 focus:ring-[#6B1F2A] transition-colors"
      />
    );
  }

  return (
    <textarea
      ref={ref}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={minRows}
      className="w-full border border-gray-300 rounded px-4 py-3 text-gray-800 bg-white focus:border-[#6B1F2A] focus:outline-none focus:ring-1 focus:ring-[#6B1F2A] transition-colors resize-none overflow-hidden"
    />
  );
}