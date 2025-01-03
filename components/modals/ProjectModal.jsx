import { getCookie } from "cookies-next/client";
import React, { useState } from "react";
import { handleAddProject, handleEditProject } from "@utils/handlers/Projects";

const ProjectModal = ({ isOpen, onClose, getAllProjects, editData, setEditData }) => {
  if (!isOpen) return null;
  const user = getCookie("user_id");

  const [formData, setFormData] = useState({
    userid: user,
    name: editData.name ? editData.name : "",
    description: editData.description ? editData.description : "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.userid) {
      newErrors.userid = "User ID is required";
    } else if (formData.userid.length < 3) {
      newErrors.userid = "User ID must be at least 3 characters";
    }

    if (!formData.name) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!formData.description) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < 3) {
      newErrors.description = "Description must be at least 3 characters";
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

   await handleAddProject(formData)
   onClose();
   getAllProjects();
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    await handleEditProject(formData, editData.id)
    onClose();
    getAllProjects();
    setEditData("")
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="orange_gradient text-xl font-semibold mb-4">
          <b>{editData ? "Edit" : "Add"} Project</b>
        </h2>
        <form onSubmit={editData ? handleSubmitEdit : handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="userid"
              className="block text-sm font-medium text-gray-700"
            >
              User ID
            </label>
            <input
              id="userid"
              name="userid"
              type="text"
              placeholder="Enter your userid"
              value={formData.userid}
              onChange={handleChange}
              disabled={true}
              className={`w-full px-4 py-2 bg-gray-200 cursor-not-allowed border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.userid ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.userid && (
              <p className="text-sm text-red-500">{errors.userid}</p>
            )}
          </div>

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
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              type="text"
              value={formData.description}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter text here..."
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description}</p>
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
            onClick={() => {onClose(); setEditData("")}}
            className=" w-full px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-slate-400 focus:outline-none focus:ring-2  disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProjectModal;
