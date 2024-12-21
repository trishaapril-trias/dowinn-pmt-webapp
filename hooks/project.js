import { getData, patchData, postData } from "@utils/api/api";

const url = process.env.NEXT_PUBLIC_DOWINN_API_URL;

export async function addProject(formData) {
  try {
    const data = {
      user_id: formData.userid,
      name: formData.name,
      description: formData.description,
    };

    const response = await postData(`${url}/test02/create_project`, data);

    if (response.data !== "No Member Found") {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error.message);
  }
}
export async function editProject(formData, id) {
  try {
    const data = {
      id: id,
      name: formData.name,
      description: formData.description,
    };

    console.log(data)

    const response = await patchData(`${url}/test02/patch_project`, data);

    return {valid: true}
    
  } catch (error) {
    console.error(error.message);
  }
}

export async function getAllProjectData() {
  try {
    const response = await getData(`${url}/test02/get_all_project`);

    if (response.data.length != 0) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error.message);
  }
}
