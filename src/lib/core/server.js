import { redirect } from "next/navigation";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const serverMutation = async (path, data, method = "POST") => {
  const res = await fetch(`${baseUrl}${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      // ...(await authHeader()),
    },
    body: JSON.stringify(data),
  });

  // 1. Handle HTTP errors directly before parsing JSON
  if (!res.ok) {
    if (res.status === 401 || res.status === 403) {
      // Return a structured object so the caller knows to redirect
      return { errorType: "AUTH_FAILURE", status: res.status };
    }
    
    // Catch other errors (500, 404, etc.) Safely check if text/json exists
    const errorText = await res.text().catch(() => "Unknown error");
    throw new Error(`Server returned ${res.status}: ${errorText}`);
  }

  // 2. Safely parse and return successful JSON data
  return await res.json();
};