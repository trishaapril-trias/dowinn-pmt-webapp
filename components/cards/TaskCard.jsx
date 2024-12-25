import React from 'react'


const TaskCard = ({ task, onDragStart, handleEditTask }) => {
    return (
      <div
        draggable
        onDragStart={(e) => onDragStart(e, task)}
        onClick={() => {handleEditTask(task)}}
        className="bg-white p-4 rounded-lg shadow mb-3 cursor-move"
      >
        <h3 className="font-medium mb-2">{task.name}</h3>
        <p className="text-sm text-gray-600">{task.contents}</p>
      </div>
    );
  };

export default TaskCard