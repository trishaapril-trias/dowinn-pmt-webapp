"use client";

import React, { useEffect, useState } from "react";
import Link from "@node_modules/next/link";
import LogsCards from "@components/cards/LogsCard";
import TaskCard from "@components/cards/TaskCard";

import {
  handleDragOver,
  handleDragStart,
  handleDrop,
} from "@utils/handlers/Tasks";
import { useParams } from "@node_modules/next/navigation";
import { getAllTasksData } from "@hooks/tasks";
import { getAllLogsData } from "@hooks/logs";
import { IoCloseOutline, IoOpenOutline } from "react-icons/io5";
import TaskModal from "@components/modals/TaskModal";

const ProjectTask = () => {
  const params = useParams();
  const { projectID } = params;

  // ADD TASK MODAL
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [tasks, setTasks] = useState([]);
  const [logs, setLogs] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [showLogs, setShowLogs] = useState(false);
  const [editData, setEditData] = useState("");

  const toggleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  const toggleLogs = () => {
    setShowLogs((prev) => !prev);
  };

  const getAllTasks = async () => {
    const response = await getAllTasksData(parseInt(projectID));
    setTasks(response);
  };

  const getAllLogs = async () => {
    const response = await getAllLogsData();
    setLogs(response);
  };

  const handleEditTask = (task) => {
    setEditData(task);
    setIsModalOpen(true);
  }

  useEffect(() => {
    getAllTasks();
    getAllLogs();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row w-full gap-4 p-3 sm:p-4 md:p-6 h-screen overflow-y-auto">
      {/* Left section */}
      <div className="flex-grow">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center  sm:mb-6 gap-3">
          <h1 className="text-2xl sm:text-3xl md:text-4xl orange_gradient text-center sm:text-left">
            <b>PROJECT {projectID} - TASKS</b>
          </h1>
          <div className="flex gap-3">
            <Link
              href="/project"
              className="outline_btn px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-200 rounded text-sm whitespace-nowrap"
            >
              Back
            </Link>
            <button
              type="button"
              onClick={openModal}
              className="px-4 sm:px-5 py-1.5 sm:py-2.5 bg-gray-200 rounded-full text-sm text-white bg-gradient-to-tr from-secondary-orange to-primary-orange whitespace-nowrap"
            >
              Add Task
            </button>
          </div>
        </div>

        <TaskModal
          isOpen={isModalOpen}
          onClose={closeModal}
          projectID={projectID}
          getAllTasks={getAllTasks}
          getAllLogs={getAllLogs}
          editData={editData}
          setEditData={setEditData}
        />

        {/* Columns container - Stack on mobile, row on larger screens */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* TODO Column */}
          <div
            className="flex-1 border border-gray-300 rounded-lg"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "Todo", tasks, setTasks, getAllTasks, getAllLogs)}
          >
            <h2 className="font-medium border-b border-gray-300 bg-gray-200/50 text-black/80 rounded-t-lg mb-4 p-3 sm:p-4">
              TODO
            </h2>
            <div className="min-h-[150px] p-2">
              {tasks
                .filter((task) => task.status === "Todo")
                .map((task) => (
                  <TaskCard
                    key={`${task.project_id}-${task.name}`}
                    task={task}
                    onDragStart={handleDragStart}
                    handleEditTask={handleEditTask}
                  />
                ))}
            </div>
          </div>

          {/* IN PROGRESS Column */}
          <div
            className="flex-1 border border-gray-300 rounded-lg"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "In Progress", tasks, setTasks, getAllTasks, getAllLogs)}
          >
            <h2 className="font-medium border-b border-gray-300 bg-gray-200/50 text-black/80 rounded-t-lg mb-4 p-3 sm:p-4">
              IN PROGRESS
            </h2>
            <div className="min-h-[150px] p-2">
              {tasks
                .filter((task) => task.status === "In Progress")
                .map((task) => (
                  <TaskCard
                    key={`${task.project_id}-${task.name}`}
                    task={task}
                    onDragStart={handleDragStart}
                    handleEditTask={handleEditTask}
                  />
                ))}
            </div>
          </div>

          {/* DONE Column */}
          <div
            className="flex-1 border border-gray-300 rounded-lg"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "Done", tasks, setTasks, getAllTasks, getAllLogs)}
          >
            <h2 className="font-medium border-b border-gray-300 bg-gray-200/50 text-black/80 rounded-t-lg mb-4 p-3 sm:p-4">
              DONE
            </h2>
            <div className="min-h-[150px] p-2">
              {tasks
                .filter((task) => task.status === "Done")
                .map((task) => (
                  <TaskCard
                    key={`${task.project_id}-${task.name}`}
                    task={task}
                    onDragStart={handleDragStart}
                    handleEditTask={handleEditTask}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right section - Logs */}
      {/* Mobile: Toggle button for logs */}
      <div className="lg:hidden w-full flex justify-center ">
        <button
          onClick={toggleLogs}
          className="px-4 py-2 text-white bg-gradient-to-t from-primary-orange to-secondary-orange rounded-full text-sm"
        >
          {showLogs ? 'Hide Logs' : 'Show Logs'}
        </button>
      </div>

      {/* Logs section - Hidden by default on mobile, shown with toggle */}
      <div className={`w-full lg:w-64 h-fit border border-gray-300 rounded-lg ${!showLogs && 'hidden lg:block'}`}>
        <h2 className="font-medium p-3 sm:p-4 border-b border-gray-300 bg-gradient-to-tr from-secondary-orange to-primary-orange text-white rounded-t-lg">
          Logs
        </h2>
        <div
          className={`grid grid-cols-1 mt-0 overflow-y-auto transition-all duration-300 ${
            showAll ? "max-h-[500px]" : "max-h-[300px]"
          }`}
        >
          {logs.map((log, index) => (
            <LogsCards key={index} log={log} />
          ))}
        </div>
        <div
          className="flex justify-center items-center gap-3 bg-gray-200/60 rounded-b-lg cursor-pointer p-3 text-black/80 font-semibold"
          onClick={toggleShowAll}
        >
          {showAll ? (
            <>
              <IoCloseOutline />
              <p>See Less</p>
            </>
          ) : (
            <>
              <IoOpenOutline />
              <p>See More</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectTask;