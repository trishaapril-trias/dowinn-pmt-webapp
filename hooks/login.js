
import { postData } from "@utils/api/api";
import { login } from "@context/auth";
import { setCookie } from "@node_modules/cookies-next/lib/client";

const url = process.env.NEXT_PUBLIC_DOWINN_API_URL;

export async function checkLogin(formData) {
  try {
    const data = {
      user_id: formData.username,
      password: formData.password,
    };

    // Verify credentials
    const response = await postData(`${url}/testlogin`, data);

    if (response.data === "ok") {
      setCookie('user_id', data.user_id);
      await login(data.user_id);
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error.message);
  }
}
