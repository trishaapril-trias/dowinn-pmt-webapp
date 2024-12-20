import Link from "@node_modules/next/link";
import React from "react";

const ProjectCards = ({proj}) => {
  return (
    <Link href={`/project/${proj.name}`}>
      <div className="flex flex-col h-full hover:bg-gray-200/50 border border-slate-300 p-5 rounded-lg text-center">
        <h2 className="text-2xl ">{proj.name}</h2>
        <p className="text-sm text-gray-500">{proj.description}</p>
      </div>
    </Link>
  );
};

export default ProjectCards;
