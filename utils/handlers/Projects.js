import { addProject, editProject } from "@hooks/project";
import toast from "@node_modules/react-hot-toast/dist";

const handleAddProject = async (formData) => {
    const data = {
          user_id: formData.userid,
          name: formData.name,
          description: formData.description,
        };

        const response = await addProject(data);
        if (response != null) {
          toast.success("Project Added Successfully");
        
        } else {
          toast.error("No Member Found");
        }
}

const handleEditProject = async(formData, id) => {
    const data = {
        id: id,
        name: formData.name,
        description: formData.description,
      };
    const response = await editProject(data);
    if (response) {
      toast.success("Project Edited Successfully");
    } else {
      toast.error("Edit Unsuccessful");
    }
}

export {
    handleAddProject,
    handleEditProject
}