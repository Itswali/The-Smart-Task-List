import React, { useState } from 'react'

export default function CreateTask() {
const [isCompleted, setIsCompleted] = useState(false);

const [data, setData]= useState({
  title: "",
  description: "",
  priority: "low",
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
  });
};

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
      <div className='ring-1 ring-black m-3 p-3' key={index}>
        <h3>{item.title}</h3>
        <h3>{item.description}</h3>
        <h3>{item.priority}</h3>
      </div>

      ))}
    </div>
  )
}
