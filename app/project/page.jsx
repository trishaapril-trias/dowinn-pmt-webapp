"use client"
import ProjectCard from "@components/cards/ProjectCard";
import HeaderTitle from "@components/HeaderTitle";
import AddProject from "@components/modals/AddProject";
import { projectData } from "@constants/staticData";
import Link from "@node_modules/next/link";
import React, { useState } from "react";



const Project = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div className="w-full flex-start flex-col">
      <div className="flex justify-between items-center w-full px-10">
        <div>
          <h1 className="text-4xl orange_gradient"><b>PROJECTS</b></h1>
        </div>

        <div>
          <button
           type="button"
           onClick={openModal}
           className="black_btn p-3">Add Project</button>
        </div>
      </div>
      <AddProject isOpen={isModalOpen} onClose={closeModal} />
      <div className="grid grid-cols-3 p-10 gap-4">
        {projectData.map((proj, index) => (
          <ProjectCard key={index} proj={proj}/>
        ))}
      </div>
    </div>
  );
};

export default Project;
