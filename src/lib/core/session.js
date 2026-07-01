import { headers } from "next/headers";
import { auth } from "../auth"; // Verify this points cleanly to your server betterAuth instance

export const getUserSession = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(), // Await the headers structure securely
    });

    return session?.user || null;
  } catch (error) {
    console.error("Error fetching server session:", error);
    return null;
  }
};
export const getUserToken = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.session?.token || null;
};
export const requireRole = async (role) => {
  const user = await getUserSession();
  if (!user) {
    redirect("/auth/signin");
  }
  if (user?.role !== role) {
    redirect("/unauthorized");
  }
  return user;
};
