import React, { useEffect, useState } from 'react';
import { Task } from './components/types';
import TaskForm from './components/TaskForm';
import TaskItem from './components/TaskItem';
import SearchBar from './components/SearchBar';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("task-list");
    return saved ? JSON.parse(saved) : [];
  });
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("task-list", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (taskData: Omit<Task, 'id'>) => {
    setTasks([...tasks, { ...taskData, id: crypto.randomUUID() }]);
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
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <TaskForm onAddTask={handleAddTask} />
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Your Tasks</h1>
            <SearchBar onSearch={setSearch} />
          </div>

          <div className="space-y-4">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((item) => (
                <TaskItem
                  key={item.id}
                  item={item}
                  onToggle={toggleComplete}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-200 text-slate-400">
                No tasks found. Time to relax! ☕
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
