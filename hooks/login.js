
import { setCookie } from "cookies-next/client";
import { postData } from "@utils/api/api";

const url = process.env.NEXT_PUBLIC_DOWINN_API_URL;

export async function checkLogin (formData) {
  try {
    const data = {
        user_id: formData.username,
        password: formData.password
    }
    
    const response = await postData(`${url}/testlogin`, data);

    if(response.data === "ok"){
        setCookie("user_id", data.user_id, {})
        return response.data;
    }else{
      return null
    }
  } catch (error) {
    console.error(error.message);
  }
};





