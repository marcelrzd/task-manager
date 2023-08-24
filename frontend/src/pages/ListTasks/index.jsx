import { ToastContainer, toast } from "react-toastify";

import React, { useState, useEffect } from "react";
import axios from "axios";

function ListTasks() {
  const [tasks, setTasks] = useState([]);

  // Listing taskas
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/task-list/");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching the tasks", error);
      }
    }
    fetchData();
  }, []);

  //   Delete tasks
  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/delete-task/${taskId}/`);
      setTasks(tasks.filter((task) => task.id !== taskId));
      toast.success("Task deleted successfully!");
    } catch (error) {
      console.error("Error deleting the task", error);
      toast.error("Error deleting the task.");
    }
  };

  return (
    <div className="p-4">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <h1 className="text-2xl mb-4">Tasks</h1>
      <table className="min-w-full bg-white shadow-md rounded mb-4">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="w-1/1 text-left py-3 px-4 uppercase font-semibold text-sm">
              ID
            </th>
            <th className="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm">
              Name
            </th>
            <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
              Description
            </th>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
              Type
            </th>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
              Due Date
            </th>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
              Label
            </th>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {tasks.map((task) => (
            <tr key={task.id}>
              <td className="w-1/1 text-left py-3 px-4">{task.id}</td>
              <td className="w-1/4 text-left py-3 px-4">{task.name}</td>
              <td className="w-1/3 text-left py-3 px-4">{task.description}</td>
              <td className="text-left py-3 px-4">{task.task_type}</td>
              <td className="text-left py-3 px-4">{task.due_date}</td>
              <td className="text-left py-3 px-4">
                <span
                  className={`inline-block text-xs py-1 px-2 rounded ${labelClasses(
                    task.label
                  )}`}
                >
                  {task.label ? task.label : "N/A"}
                </span>
              </td>
              <td className="text-left py-3 px-4">
                <button
                  onClick={() => handleDelete(task.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function labelClasses(label) {
  switch (label) {
    case "Urgent":
      return "bg-red-300 text-red-800";
    case "Can be postponed":
      return "bg-yellow-300 text-yellow-900";
    case "Not important":
      return "bg-green-300 text-green-900";
    default:
      return "";
  }
}

export default ListTasks;
