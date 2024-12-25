
import {
  handleAddTask,
  handleEditTask,
} from "@utils/handlers/Tasks";
import React, { useState } from "react";

const TaskModal = ({
  isOpen,
  onClose,
  projectID,
  getAllTasks,
  getAllLogs,
  editData,
  setEditData,
}) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: editData ? editData.name : "",
    status: editData ? editData.status : "",
    contents: editData ? editData.contents : "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!formData.status) {
      newErrors.status = "Status is required";
    } else if (formData.status.length < 3) {
      newErrors.status = "Status must be at least 3 characters";
    }

    if (!formData.contents) {
      newErrors.contents = "Contents is required";
    } else if (formData.contents.length < 3) {
      newErrors.contents = "Contents must be at least 3 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    await handleAddTask(projectID, formData);
    getAllTasks();
    getAllLogs();
    onClose();
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    await handleEditTask(editData, formData);
    getAllTasks();
    getAllLogs();
    setEditData("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="orange_gradient text-xl font-semibold mb-4">
          <b> {editData ? "Edit" : "Add"} Task</b>
        </h2>
        <form
          onSubmit={editData ? handleSubmitEdit : handleSubmit}
          className="space-y-4"
        >
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.status ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="" disabled>
                Please Select...
              </option>
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            {errors.status && (
              <p className="text-sm text-red-500">{errors.status}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="contents"
              className="block text-sm font-medium text-gray-700"
            >
              Contents
            </label>
            <textarea
              id="contents"
              name="contents"
              value={formData.contents}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.contents ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter text here..."
            />
            {errors.contents && (
              <p className="text-sm text-red-500">{errors.contents}</p>
            )}
          </div>

          <button
            type="submit"
            className=" w-full px-4 py-2 text-white bg-[#F3940B] rounded-lg hover:bg-[#EE750B] focus:outline-none focus:ring-2  disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {editData ? "Save" : "Add"}
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              setEditData("");
            }}
            className=" w-full px-4 py-2 text-white bg-black/80 rounded-lg hover:bg-black/40 focus:outline-none focus:ring-2  disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
