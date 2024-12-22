"use client";


import ProjectCard from "@components/cards/ProjectCard";
import AddProject from "@components/modals/AddProject";
import EditProject from "@components/modals/EditProject";
import { getAllProjectData } from "@hooks/project";
import React, { useEffect, useState } from "react";

const Project = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Add Project Modal
  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);

  // Edit Project Modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [projectData, setProjectData] = useState([]);
  const [editData, setEditData] = useState("");

  const getAllProjects = async () => {
    const response = await getAllProjectData();
    setProjectData(response);
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

      <AddProject 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        getAllProjects={getAllProjects}
      />

      {/* Responsive grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-4 sm:p-6 md:p-10 gap-4 w-full">
        {projectData.map((proj, index) => (
          <ProjectCard
            key={index}
            proj={proj}
            openEditModal={openEditModal}
            closeEditModal={closeEditModal}
            isEditModalOpen={isEditModalOpen}
            setEditData={setEditData}
          />
        ))}
      </div>

      <EditProject 
        isOpen={isEditModalOpen} 
        onClose={closeEditModal} 
        editData={editData} 
        getAllProjects={getAllProjects}
      />
    </div>
  );
};

export default Project;