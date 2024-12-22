import { getData, postData } from "@utils/api/api";

const url = process.env.NEXT_PUBLIC_DOWINN_API_URL;

export async function addTasks(formData, projectID) {
  try {
    const data = {
      project_id: parseInt(projectID),
      name: formData.name,
      status: formData.status,
      contents: formData.contents,
    };
    const response = await postData(`${url}/test03/create_task`, data);

    if (response.data !== "No Project Found") {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error.message);
  }
}

export async function getAllTasksData(id) {
  try {
    const response = await getData(`${url}/test03/get_all_task`);

    if (response.data.length != 0) {
      const filteredTasks = response.data.filter(
        (task) => task.project_id === id
      );

      return filteredTasks;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error.message);
  }
}
