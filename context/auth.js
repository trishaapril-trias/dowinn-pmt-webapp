import { deleteCookie, setCookie } from "@node_modules/cookies-next/lib";
import { cookies } from "@node_modules/next/headers";
import { decryptData, encryptData } from "@utils/dataEncryption/dataEncryption";
import { postData } from "@utils/api/api";
import { useAuth } from "@hooks/useAuth";

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

export async function login(formdata) {
  const data = {
    user_id: formdata.user_id,
  };

  const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  // Encrypt data
  const session = await encryptData(data, expires);

  // Set cookie (client-side or server-side based on environment)
  if (typeof window === "undefined") {
    const cookieStore = cookies();
    cookieStore.set("session", session, { expires, httpOnly: true, path: "/" });
  } else {
    setCookie("session", session, { expires, path: "/" });
  }
}

export async function logout() {
  const expires = new Date(0)
  setCookie("session", "", { expires, path: "/" })
  deleteCookie("user_id")
}

export async function getSession() {
  const session = await cookies.get("session")?.value;
  if (!session) return null;
  return await decryptData(session);
}

