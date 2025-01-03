import { getCookie } from "@node_modules/cookies-next/lib";
import { getData, patchData, postData } from "@utils/api/api";
import { getTaskCount } from "@utils/handlers/Tasks";

const url = process.env.NEXT_PUBLIC_DOWINN_API_URL;

export async function addProject(data) {
  try {
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
export async function editProject(data) {
  try {
    const response = await patchData(`${url}/test02/patch_project`, data);

    return {valid: true}
    
  } catch (error) {
    console.error(error.message);
  }
}

export async function getAllProjectData() {
  try {
    const id = getCookie("id");
    
    const response = await getData(`${url}/test02/get_all_project`);
  
    const filterProject = response.data.filter((proj) => proj.user_id === parseInt(id))

   // Use Promise.all to resolve all the Promises in parallel
   const lookup = await Promise.all(
    filterProject.map(async (item) => {
      const count = await getTaskCount(item.id); // Await here to resolve the Promise
      return { ...item, count }; // Return the item with resolved count
    })
  );

    if (filterProject.length != 0) {
      return lookup;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error.message);
  }
}
