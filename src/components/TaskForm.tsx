import React, { useState } from "react";

export default function TaskForm() {
  interface Task {
    id: string;
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    completed: boolean;
  }
  const [data, setData] = useState<Omit<Task, 'id'>>({
    title: "",
    description: "",
    priority: "low",
    completed: false
  });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // setTasks([...tasks, { ...data, id: crypto.randomUUID() }]);
      setData({ title: "", description: "", priority: "low", completed: false });
    };
  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-8">
        <h2 className="text-2xl font-bold mb-6 text-emerald-800">
          Create Task
        </h2>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold mb-1 text-slate-600">
              Task Title
            </label>
            <input
              required
              type="text"
              placeholder="What needs to be done?"
              value={data.title}
              className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1 text-slate-600">
              Description
            </label>
            <textarea
              placeholder="Add some details..."
              value={data.description}
              className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all h-24 resize-none"
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1 text-slate-600">
              Priority Level
            </label>
            <select
              value={data.priority}
              className="w-full p-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer"
              onChange={(e) =>
                setData({
                  ...data,
                  priority: e.target.value as "low" | "medium" | "high",
                })
              }
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 transition-all active:scale-95"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}
