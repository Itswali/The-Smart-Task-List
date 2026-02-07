import React from 'react';

export default function SearchBar({ onSearch }: { onSearch: (val: string) => void }) {
  return (
    <div className="relative group">
      <input
        type="text"
        placeholder="Search tasks..."
        className="pl-10 pr-4 py-2 w-full md:w-64 rounded-full border border-slate-200 bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all shadow-sm"
        onChange={(e) => onSearch(e.target.value)}
      />
      <span className="absolute left-3 top-2.5 text-slate-400">🔍</span>
    </div>
  );
}
