import { tasksData } from "@constants/staticData";

const handleDragStart = (e, task) => {
  e.dataTransfer.setData("taskId", task.project_id);
  e.dataTransfer.setData("taskName", task.name);
};

const handleDragOver = (e) => {
  e.preventDefault();
};

const handleDrop = (e, newStatus, tasks, setTasks) => {
    e.preventDefault();
    const taskId = parseInt(e.dataTransfer.getData('taskId'));
    const taskName = e.dataTransfer.getData('taskName');
    
    // Find the task that was dragged
    const updatedTasks = tasks.map(task => {
      if (task.project_id === taskId && task.name === taskName) {
        console.log(`Task "${task.name}" moved to ${newStatus}`);
        return { ...task, status: newStatus };
      }
      return task;
    });
    
    setTasks(updatedTasks);
  };

  

export { handleDragStart, handleDragOver , handleDrop};
