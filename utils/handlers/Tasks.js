import { tasksData } from "@constants/staticData";
import { addLogs } from "@hooks/logs";
import toast from "@node_modules/react-hot-toast/dist";

const handleDragStart = (e, task) => {
  e.dataTransfer.setData("taskId", task.project_id);
  e.dataTransfer.setData("taskName", task.name);
};

const handleDragOver = (e) => {
  e.preventDefault();
};

  const handleLogs = async (data) => {
    const response = await addLogs(data)
    if(response){
      toast.success(`Task ID "${data.id}" moved from ${data.old} to ${data.new}`)
    }
    
  }

const handleDrop = (e, newStatus, tasks, setTasks) => {
    e.preventDefault();
    const taskId = parseInt(e.dataTransfer.getData('taskId'));
    const taskName = e.dataTransfer.getData('taskName');
    
    // Find the task that was dragged
    const updatedTasks = tasks.map(async (task) => {
      if (task.project_id === taskId && task.name === taskName) {
        const data = {
          id: task.id,
          old: task.status,
          new: newStatus,
        }
        await handleLogs(data)
        console.log(`Task "${task.name}" moved from ${task.status} to ${newStatus}`);
        return { ...task, status: newStatus };
      }
      return task;
    });
    
    setTasks(updatedTasks);
  };

  

export { handleDragStart, handleDragOver , handleDrop};
