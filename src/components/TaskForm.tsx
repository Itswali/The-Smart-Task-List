import React, { useRef, useState, useEffect } from 'react';
import { Task } from './types';

interface TaskFormProps {
  onAddTask: (task: Omit<Task, 'id'>) => void;
}

export default function TaskForm({ onAddTask }: TaskFormProps) {
  const [data, setData] = useState<Omit<Task, 'id'>>({
    title: "",
    description: "",
    priority: "low",
    completed: false
  });
  useEffect(() => {
    titleInputRef.current?.focus();
  }, []);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTask(data);
    setData({ title: "", description: "", priority: "low", completed: false });

  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-8">
      <h2 className="text-2xl font-bold mb-6 text-emerald-800">Create Task</h2>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <input
          required
          type="text"
          placeholder="Task Title"
          value={data.title}
          ref={titleInputRef}
          className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={data.description}
          className="w-full p-3 rounded-xl border border-slate-200 h-24 resize-none outline-none focus:ring-2 focus:ring-emerald-500"
          onChange={(e) => setData({ ...data, description: e.target.value })}
        />
        <select
          value={data.priority}
          className="w-full p-3 rounded-xl border border-slate-200 bg-white cursor-pointer outline-none focus:ring-2 focus:ring-emerald-500"
          onChange={(e) => setData({ ...data, priority: e.target.value as 'low' | 'medium' | 'high' })}
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <button type="submit" className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg active:scale-95 transition-all">
          Add Task
        </button>
      </form>
    </div>
  );
}
