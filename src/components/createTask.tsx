import React, { useState } from 'react'

export default function CreateTask() {


const [data, setData]= useState({
  title: "",
  description: "",
  priority: "low",
  completed: false
});
const [tasks, setTasks] = useState<any[]>([]);

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  setTasks([...tasks, data]);

  console.log("task Submitted", data);
  setData({
    title: "",
  description: "",
  priority: "low",
  completed: false,
  });
};

const toggleComplete = (index: number) => {
  const updatedTasks = tasks.map((task, i) => {
    if(i === index) {
      return {...task, completed: !task.completed };
    }
    return task;
  });
  setTasks(updatedTasks);
}

const handleDelete = (index: number) => {
  const filteredTasks = tasks.filter((_, i) => i !== index);
  setTasks(filteredTasks);
}

  return (
    <div className='ring-1 bg-blue-200 ring-emerald-800 '>
      <form className='flex flex-col items-center gap-5' onSubmit={handleSubmit}>
        <label htmlFor="title" >Title:
          <input type="text" value={data.title} className='m-2 p-2 ring-1 ring-amber-400' onChange={(e) => setData({...data, title: e.target.value})}/>
        </label>
        <label htmlFor="description">Description:
          <input type="text" value={data.description} className='m-2 p-2 ring-1 ring-amber-400' onChange={(e) => setData({...data, description: e.target.value})} />
        </label>
        <select name="priority" value={data.priority} id="priority" onChange={(e) => setData({...data, priority: e.target.value})}>
          <option disabled>Select One</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit">Submit</button>
      </form>

      {tasks.map((item, index) => (
  <div key={index} className={`flex items-center justify-between border-b p-3 mb-2 ${item.completed ? 'bg-green-50' : 'bg-white'}`}>
    <div className='flex items-center gap-4'>
      {/* The Checkbox */}
      <input
        type="checkbox"
        checked={item.completed}
        onChange={() => toggleComplete(index)}
        className="w-5 h-5 cursor-pointer"
      />

      <div className={item.completed ? "line-through text-gray-400" : ""}>
        <h4 className='font-bold'>{item.title}</h4>
        <p className='text-sm'>{item.description}</p>
      </div>
    </div>

    <span className="text-xs font-semibold px-2 py-1 rounded bg-amber-100 uppercase">
      {item.priority}
    </span>
    <button onClick={() => handleDelete(index)}>X</button>
  </div>
))}
    </div>
  )
}
