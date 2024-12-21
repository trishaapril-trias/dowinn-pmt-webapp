"use client";

import AuthLayout from "@app/components/AuthLayout";
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
  const [editData, setEditData] = useState("")

  const getAllProjects = async () => {
    const response = await getAllProjectData();

    setProjectData(response);
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  return (

<div className="w-full flex-start flex-col">
      <div className="flex justify-between items-center w-full px-10">
        <div>
          <h1 className="text-4xl orange_gradient">
            <b>PROJECTS</b>
          </h1>
        </div>

        <div>
          <button type="button" onClick={openModal} className="black_btn p-3">
            Add Project
          </button>
        </div>
      </div>
      <AddProject isOpen={isModalOpen} onClose={closeModal} getAllProjects={getAllProjects}/>

      <div className="grid grid-cols-3 p-10 gap-4  w-full">
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
        <EditProject isOpen={isEditModalOpen} onClose={closeEditModal} editData={editData} getAllProjects={getAllProjects}/>
      </div>
    </div>


    
    
  );
};

export default Project;
