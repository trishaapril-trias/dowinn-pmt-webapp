"use client";
import React, { useState } from "react";
import Link from "@node_modules/next/link";
import LogsCards from "@components/cards/LogsCard";
import TaskCard from "@components/cards/TaskCard";
import AddTask from "@components/modals/AddTasks";
import { logsData, tasksData } from "@constants/staticData";

import { handleDragOver, handleDragStart, handleDrop } from "@utils/handlers/Tasks";







const ProjectTask = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [tasks, setTasks] = useState(tasksData);


  return (
   
    <div className="flex w-full gap-4 p-6 h-screen ">
      {/* Left section */}
      <div className="flex-grow">
       
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-lg font-medium text-gray-700">
            PROJECT 1 - TASKS
          </h1>
          <div className="flex gap-3">
            <Link
              href="/project"
              className="outline_btn px-4 py-2 bg-gray-200 rounded text-sm"
            >
              Back
            </Link>
            <button
              type="button"
              onClick={openModal}
              className="black_btn px-4 py-2 bg-gray-200 rounded text-sm"
            >
              Add Task
            </button>
          </div>
        </div>
        <AddTask isOpen={isModalOpen} onClose={closeModal} />
        {/* Columns container */}
        <div className="flex gap-4">
          {/* TODO Column */}
          <div 
            className="flex-1 border border-gray-300 rounded-lg"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "Todo", tasks, setTasks)}
          >
            <h2 className="font-medium border-b border-gray-300 bg-gray-200/50 text-black/80 rounded-t-lg  mb-4 p-4">TODO</h2>
            <div className="min-h-[200px]">
              {tasks
                .filter(task => task.status === "Todo")
                .map(task => (
                  <TaskCard
                    key={`${task.project_id}-${task.name}`}
                    task={task}
                    onDragStart={handleDragStart}
                  />
                ))
              }
            </div>
          </div>

          {/* IN PROGRESS Column */}
          <div 
            className="flex-1 border border-gray-300 rounded-lg"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "InProgress", tasks, setTasks)}
          >
            <h2 className="font-medium border-b border-gray-300 bg-gray-200/50 text-black/80 rounded-t-lg  mb-4 p-4">IN PROGRESS</h2>
            <div className="min-h-[200px]">
              {tasks
                .filter(task => task.status === "InProgress")
                .map(task => (
                  <TaskCard
                    key={`${task.project_id}-${task.name}`}
                    task={task}
                    onDragStart={handleDragStart}
                  />
                ))
              }
            </div>
          </div>

          {/* DONE Column */}
          <div 
            className="flex-1 border border-gray-300 rounded-lg"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "Done", tasks, setTasks)}
          >
            <h2 className="font-medium border-b border-gray-300 bg-gray-200/50 text-black/80 rounded-t-lg  mb-4 p-4">DONE</h2>
            <div className="min-h-[200px]">
              {tasks
                .filter(task => task.status === "Done")
                .map(task => (
                  <TaskCard
                    key={`${task.project_id}-${task.name}`}
                    task={task}
                    onDragStart={handleDragStart}
                  />
                ))
              }
            </div>
          </div>
        </div>
      </div>

     {/* Right section - Logs */}
     <div className="w-64 border border-gray-300 rounded-lg">
        <h2 className="font-medium  p-4 border-b border-gray-300 bg-black/80 text-white rounded-t-lg">
          Logs
        </h2>
        <div className="grid grid-cols-1 mt-0">
          {logsData.map((log, index) => (
            <LogsCards key={index} log={log} />
          ))}
        </div>
      </div>
    </div>
   
  );
};

export default ProjectTask;
