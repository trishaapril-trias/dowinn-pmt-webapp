import Link from "@node_modules/next/link";
import { ArrowRight, Edit2 } from "lucide-react";



const ProjectCard = ({ proj, handleEditProject }) => {
  
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-600 dark:text-gray-200">
            {proj.name}
          </h2>
          <div className="space-x-2">
            <button
            type="button"
              onClick={() => handleEditProject(proj)}
              className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors bg-gray-100 p-2 rounded-full"
            >
              <Edit2 className="h-5 w-5" />
            </button>
            <Link href={`/project/${proj.id}`}>
              <button className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors bg-gray-200 p-2 rounded-full">
                <ArrowRight className="h-5 w-5" />
              </button>
            </Link>
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          {proj.description}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
             {proj.count.todo} - Todo
            </span>
          </div>
          <div className="flex items-center">
            <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-800">
            {proj.count.inprogress} - In Progress
            </span>
          </div>
          <div className="flex items-center">
            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-800">
            {proj.count.done} - Done
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
