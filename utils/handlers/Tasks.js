import { tasksData } from "@constants/staticData";
import { addLogs } from "@hooks/logs";
import { addTasks, editTasks } from "@hooks/tasks";
import toast from "@node_modules/react-hot-toast/dist";



const handleDragStart = (e, task) => {
  e.dataTransfer.setData("taskId", task.project_id);
  e.dataTransfer.setData("taskName", task.name);
};

const handleDragOver = (e) => {
  e.preventDefault();
};

const handleLogs = async (data) => {
  const response = await addLogs(data);
};

const handleDropEdit = async (data) => {
  const response = await editTasks(data);
}

const handleDrop = (e, newStatus, tasks, setTasks, getAllTasks, getAllLogs) => {
  e.preventDefault();
  const taskId = parseInt(e.dataTransfer.getData("taskId"));
  const taskName = e.dataTransfer.getData("taskName");

  // Find the task that was dragged
  const updatedTasks = tasks.map(async (task) => {
    if (task.project_id === taskId && task.name === taskName) {

      // Handle Edit
      const dataEdit = {
        task_id: task.id,
        name: task.name,
        status: newStatus,
        contents: task.contents
      };
      await handleDropEdit(dataEdit);
      getAllTasks();

      // Handle Logs
      const dataLog = {
        id: task.id,
        old: task.status,
        new: newStatus,
      };
      await handleLogs(dataLog);
      getAllLogs();
      return { ...task, status: newStatus };
    }
    return task;
  });

  setTasks(updatedTasks);
};


const handleAddTask = async (projectID, formData) => {
  const data = {
    project_id: parseInt(projectID),
    name: formData.name,
    status: formData.status,
    contents: formData.contents,
  };

  const response = await addTasks(data);
  if (response != null) {
    toast.success("Task Added Successfully");
  } else {
    toast.error("No Project Found");
  }
}

const handleEditTask = async (editData, formData) => {
  const data = {
    task_id: editData.id,
    name: formData.name,
    status: formData.status,
    contents: formData.contents
  }

  const response = await editTasks(data);
  if (response) {
    if(editData === formData.status){
      const log = {
        id: editData.id,
        old: editData.status,
        new: formData.status,
      };
       handleLogs(log);
    }
    
    toast.success("Edited Successfully");
  } else {
    toast.error("No Task Found");
  }

}



export { handleDragStart, handleDragOver, handleDrop, handleLogs, handleAddTask, handleEditTask };
