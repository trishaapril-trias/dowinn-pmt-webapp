"use client";

import ProjectCard from "@components/cards/ProjectCard";
import ProjectModal from "@components/modals/ProjectModal";
import { getAllProjectData } from "@hooks/project";
import { FaBoxOpen } from "@node_modules/react-icons/fa";
import { getTaskCount } from "@utils/handlers/Tasks";
import React, { useEffect, useState } from "react";

const Project = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [projectData, setProjectData] = useState([]);
  const [editData, setEditData] = useState("");
  const [tasks, setTasks] = useState("");

  const getAllProjects = async () => {
    const response = await getAllProjectData();
    setProjectData(response);
  };


  const handleEditProject = (project) => {
    setEditData(project);
    setIsModalOpen(true);
  };

  useEffect(() => {
    getAllProjects();
    
  }, []);

  return (
    <div className="w-full flex-start flex-col">
      {/* Header section with responsive padding and layout */}
      <div className="flex flex-col sm:flex-row justify-between items-center w-full px-4 sm:px-6 md:px-10 py-4 sm:py-6 gap-4 sm:gap-0">
        <div>
          <h1 className="text-3xl sm:text-4xl orange_gradient text-center sm:text-left">
            <b>PROJECTS</b>
          </h1>
        </div>

        <div>
          <button
            type="button"
            onClick={openModal}
            className="black_btn p-2 sm:p-3 w-full sm:w-auto"
          >
            Add Project
          </button>
        </div>
      </div>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={closeModal}
        getAllProjects={getAllProjects}
        editData={editData}
        setEditData={setEditData}
      />

      {/* Responsive grid layout */}

      {projectData != null ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-4 sm:p-6 md:p-10 gap-4 w-full">
          {projectData.map((proj, index) => (
            <ProjectCard
              key={index}
              proj={proj}
              handleEditProject={handleEditProject}
            />
          ))}
        </div>
      ) : (
        <div className="flex w-full mt-20 flex-col justify-center items-center">
          <FaBoxOpen className="text-[100px] text-gray-500" />
          <p className=" text-2xl font-semibold text-gray-500">No Available Project</p>
          <p className=" text-lg text-gray-500">Create New Project</p>
        </div>
      )}
    </div>
  );
};

export default Project;
