import React, { useEffect, useState } from 'react';

export default function CreateTask() {
  const [data, setData] = useState({
    title: "",
    description: "",
    priority: "low",
    completed: false
  });

  const [search, setSearch] = useState("");
  const [tasks, setTasks] = useState<any[]>(() => {
    const saved = localStorage.getItem("task-list");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("task-list", JSON.stringify(tasks));
  }, [tasks]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add a unique ID using Date.now() or crypto.randomUUID()
    setTasks([...tasks, { ...data, id: crypto.randomUUID() }]);
    setData({ title: "", description: "", priority: "low", completed: false });
  };

  const toggleComplete = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleDelete = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase()) ||
    task.priority.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* --- LEFT COLUMN: FORM --- */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-8">
            <h2 className="text-2xl font-bold mb-6 text-emerald-800">Create Task</h2>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-semibold mb-1 text-slate-600">Task Title</label>
                <input
                  required
                  type="text"
                  placeholder="What needs to be done?"
                  value={data.title}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  onChange={(e) => setData({...data, title: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1 text-slate-600">Description</label>
                <textarea
                  placeholder="Add some details..."
                  value={data.description}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all h-24 resize-none"
                  onChange={(e) => setData({...data, description: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1 text-slate-600">Priority Level</label>
                <select
                  value={data.priority}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer"
                  onChange={(e) => setData({...data, priority: e.target.value})}
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

        {/* --- RIGHT COLUMN: LIST --- */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Your Tasks</h1>
            <div className="relative group">
              <input
                type="text"
                placeholder="Search tasks..."
                className="pl-10 pr-4 py-2 w-full md:w-64 rounded-full border border-slate-200 bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all shadow-sm"
                onChange={(e) => setSearch(e.target.value)}
              />
              <span className="absolute left-3 top-2.5 text-slate-400">🔍</span>
            </div>
          </div>

          {/* Task Grid/List */}
          <div className="space-y-4">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((item) => (
                <div
                  key={item.id}
                  className={`group flex items-center justify-between p-4 rounded-2xl border transition-all hover:shadow-md ${
                    item.completed ? 'bg-slate-50 border-slate-200 opacity-75' : 'bg-white border-white shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleComplete(item.id)}
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
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-200">
                <p className="text-slate-400 font-medium">No tasks found. Time to relax! ☕</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
