import { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/v1/tasks",
        {
          headers: { Authorization: token },
        }
      );
      setTasks(res.data);
    } catch {
      toast.error("Failed to load tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    try {
      await axios.post(
        "http://localhost:4000/api/v1/tasks",
        { title, description: desc },
        { headers: { Authorization: token } }
      );

      setTitle("");
      setDesc("");
      toast.success("Task Added ✅");
      fetchTasks();
    } catch {
      toast.error("Error adding task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(
        `http://localhost:4000/api/v1/tasks/${id}`,
        { headers: { Authorization: token } }
      );
      toast.success("Deleted 🗑️");
      fetchTasks();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">

      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-5">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <ul>
          <li className="mb-4 cursor-pointer">📊 Overview</li>
          <li className="mb-4 cursor-pointer">📝 Tasks</li>
        </ul>
      </div>

      {/* Main */}
      <div className="flex-1 p-6">

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-indigo-600 p-4 rounded-xl">
            <h3>Total Tasks</h3>
            <p className="text-2xl">{tasks.length}</p>
          </div>

          <div className="bg-green-600 p-4 rounded-xl">
            <h3>Completed</h3>
            <p className="text-2xl">0</p>
          </div>

          <div className="bg-pink-600 p-4 rounded-xl">
            <h3>Pending</h3>
            <p className="text-2xl">{tasks.length}</p>
          </div>
        </div>

        {/* Add Task */}
        <div className="mb-6 flex gap-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            className="p-2 rounded text-black w-1/3"
          />
          <input
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Description"
            className="p-2 rounded text-black w-1/3"
          />
          <button
            onClick={addTask}
            className="bg-blue-500 px-4 rounded"
          >
            Add
          </button>
        </div>

        {/* Task List */}
        <div>
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-gray-800 p-4 mb-3 rounded flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg">{task.title}</h3>
                <p className="text-sm text-gray-400">
                  {task.description}
                </p>
              </div>

              <div className="flex gap-3">
                <FaEdit className="cursor-pointer text-yellow-400" />
                <FaTrash
                  className="cursor-pointer text-red-500"
                  onClick={() => deleteTask(task._id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}