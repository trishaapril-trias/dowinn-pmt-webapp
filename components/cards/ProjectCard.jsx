

import Link from "@node_modules/next/link";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import EditProject from "@components/modals/EditProject";


const ProjectCard = ({ proj, openEditModal, setEditData}) => {
  
  return (
    <>
      <div className="flex flex-col h-full hover:bg-gray-200/50 border border-slate-300 p-5 rounded-lg text-center">
        <h2 className="text-2xl ">{proj.name}</h2>
        <p className="text-sm text-gray-500">{proj.description}</p>
        <div className=" flex justify-between items-center">
          <div>
            <button type="button" onClick={() => {openEditModal(); setEditData(proj)}}>
              <FaEdit className=" text-secondary-orange" />
            </button>
          </div>
          <div>
            <Link href={`/project/${proj.id}`}>
              <BsFillArrowRightSquareFill className=" text-secondary-orange" />
            </Link>
          </div>
        </div>
      </div>

      
    </>
  );
};

export default ProjectCard;
