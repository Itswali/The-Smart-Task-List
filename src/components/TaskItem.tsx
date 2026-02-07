import React from 'react';
import { Task } from './types';

interface TaskItemProps {
  item: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskItem({ item, onToggle, onDelete }: TaskItemProps) {
  return (
    <div className={`group flex items-center justify-between p-4 rounded-2xl border transition-all hover:shadow-md ${
      item.completed ? 'bg-slate-50 border-slate-200 opacity-75' : 'bg-white border-white shadow-sm'
    }`}>
      <div className="flex items-center gap-4">
        <button
          onClick={() => onToggle(item.id)}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
            item.completed ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300 hover:border-emerald-500'
          }`}
        >
          {item.completed && <span className="text-white text-xs">✓</span>}
        </button>
        <div className={item.completed ? "line-through text-slate-400" : "text-slate-700"}>
          <h4 className="font-bold text-lg leading-tight">{item.title}</h4>
          <p className="text-sm opacity-80">{item.description}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
          item.priority === 'high' ? 'bg-red-100 text-red-600' :
          item.priority === 'medium' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'
        }`}>
          {item.priority}
        </span>
        <button onClick={() => onDelete(item.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
          ✕
        </button>
      </div>
    </div>
  );
}
