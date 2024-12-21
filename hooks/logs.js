import { getData, postData } from "@utils/api/api";

const url = process.env.NEXT_PUBLIC_DOWINN_API_URL;

export async function addLogs(formData) {
  try {
    const data = {
        task_id: formData.id,
        old_status: formData.old,
        new_status: formData.new,
        remark: "content test"
    }
    
    const response = await postData(`${url}/test04/create_changelog`, data);

    return {valid: true}
  } catch (error) {
    console.error(error.message);
  }
}

export async function getAllLogsData() {
  try {
    const response = await getData(`${url}/test04/get_all_change_log`);

    if (response.data.length != 0) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error.message);
  }
}

