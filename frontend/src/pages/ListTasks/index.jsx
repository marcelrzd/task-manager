import { ToastContainer, toast } from "react-toastify";

import React, { useState, useEffect } from "react";
import axios from "axios";
import LabelModal from "../../components/LabelModal";

function ListTasks() {
  const [tasks, setTasks] = useState([]);
  const [labelFilter, setLabelFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortDirection, setSortDirection] = useState("ascending");

  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // update label
  const handleOpenModal = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
    setShowModal(false);
  };

  const handleLabelChange = async (newLabel) => {
    if (selectedTask) {
      try {
        const response = await axios.patch(
          `http://localhost:8000/update-task/${selectedTask.id}/`,
          {
            label: newLabel,
          }
        );

        if (response.status === 200) {
          // Update local state or refetch the list of tasks if you're keeping them in a state
          setSelectedTask((prevTask) => ({ ...prevTask, label: newLabel }));
          toast.success(
            "'" + selectedTask.name + "' label updated successfully!"
          );
        }
      } catch (error) {
        console.error("Error updating label:", error);
        toast.error("Error updating label");
      }
    }
    fetchTasks();
  };

  // Listing tasks
  const fetchTasks = async (label = labelFilter) => {
    let url = "http://localhost:8000/task-list/";
    if (label) {
      url += `?label=${label}`;
    }
    const response = await axios.get(url);
    setTasks(response.data);
  };

  useEffect(() => {
    const direction = sortDirection === "ascending" ? "" : "-"; // Django ORM uses "-" prefix for descending
    axios
      .get(
        `http://localhost:8000/task-list/${
          sortBy ? `?sort=${direction}${sortBy}` : ""
        }`
      )
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, [sortBy, sortDirection]);

  function handleSort(field) {
    if (sortBy === field) {
      setSortDirection((prev) =>
        prev === "ascending" ? "descending" : "ascending"
      );
    } else {
      setSortBy(field);
      setSortDirection("ascending");
    }
  }

  const handleLabelFilterChange = (e) => {
    const newLabel = e.target.value;
    setLabelFilter(newLabel);
    fetchTasks(newLabel); // Pass the new label directly
  };

  // Ensure to fetch tasks when the component mounts
  useEffect(() => {
    fetchTasks();
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
      <div className="mb-4 inline-block">
        <label
          htmlFor="labelFilter"
          className="block text-sm font-medium text-gray-700"
        >
          Filter by Label
        </label>
        <select
          id="labelFilter"
          onChange={handleLabelFilterChange}
          className="mt-1 block w-[200px] pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">All</option>
          <option value="Urgent">Urgent</option>
          <option value="Can be postponed">Can be postponed</option>
          <option value="Not important">Not important</option>
        </select>
      </div>

      <table className="min-w-full bg-white shadow-md rounded mb-4">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="w-1/1 text-left py-3 px-4 uppercase font-semibold text-sm">
              ID
            </th>
            <th className="w-1/6 text-left py-3 px-4 uppercase font-semibold text-sm">
              Name
            </th>
            <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
              Description
            </th>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
              Type{" "}
              <span
                className="cursor-pointer"
                onClick={() => handleSort("task_type")}
              >
                {sortBy === "task_type"
                  ? sortDirection === "ascending"
                    ? "↑"
                    : "↓"
                  : "↕"}
              </span>
            </th>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
              due date{" "}
              <span
                className="cursor-pointer"
                onClick={() => handleSort("due_date")}
              >
                {sortBy === "due_date"
                  ? sortDirection === "ascending"
                    ? "↑"
                    : "↓"
                  : "↕"}
              </span>
            </th>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
              Label{" "}
              <span
                className="cursor-pointer"
                onClick={() => handleSort("label")}
              >
                {sortBy === "label"
                  ? sortDirection === "ascending"
                    ? "↑"
                    : "↓"
                  : "↕"}
              </span>
            </th>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <tr key={task.id}>
                <td className="w-1/1 text-left py-3 px-4">{task.id}</td>
                <td className="w-1/6 text-left py-3 px-4">{task.name}</td>
                <td className="w-1/3 text-left py-3 px-4">
                  {task.description}
                </td>
                <td className="text-left w-1/12 py-3 px-4">{task.task_type}</td>
                <td className="text-left py-3 px-4">
                  {task.formatted_due_date}
                </td>
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
                    className="text-red-500 hover:text-red-700 px-4  border-red-500"
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleOpenModal(task)}
                  >
                    Change Label
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4">
                No tasks available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {selectedTask && (
        <LabelModal
          isOpen={showModal}
          onClose={handleCloseModal}
          onSubmit={handleLabelChange}
          currentLabel={selectedTask.label}
        />
      )}
    </div>

    // Modal code
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
