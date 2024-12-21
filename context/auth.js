import { deleteCookie, setCookie } from "@node_modules/cookies-next/lib";
import { cookies } from "@node_modules/next/headers";
import { decryptData, encryptData } from "@utils/dataEncryption/dataEncryption";

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
  const expires = new Date(0); // 10 minutes
  // Clear Session
  if (typeof window === "undefined") {
    const cookieStore = cookies();
    cookieStore.set("session", "", { expires, httpOnly: true, path: "/" });
  } else {
    setCookie("session", "", { expires, path: "/" });
    deleteCookie("user_id", "")
  }
}

export async function getSession() {
  const session = await cookies().get("session")?.value;
  if (!session) return null;
  return await decryptData(session);
}

export async function getLoggedIn() {
  try {
    const cookieStore = cookies();
    const session = await cookieStore.get("session");
    return !!session?.value;
  } catch (error) {
    console.error("Error checking login status:", error);
    return false;
  }
}
