import React from "react";
import CreateTask from "./components/createTask";
import TaskForm from "./components/TaskForm";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <TaskForm />
      </div>
    </div>
  );
}
