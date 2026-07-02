import { redirect } from "next/navigation";
import { getUserToken } from "./session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const serverFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`, { cache: "no-store" });

  return handleStatusCode(res);
};

export const authHeader = async () => {
  const token = await getUserToken();
  const header = token
    ? {
        authorization: `Bearer ${token}`,
      }
    : {};
  return header;
};

export const serverMutation = async (path, data, method = "POST") => {
  const res = await fetch(`${baseUrl}${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      ...(await authHeader()),
    },
    // FIX HERE: Do not attach a body string if data is null/undefined
    ...(data && { body: JSON.stringify(data) }),
  });
  return handleStatusCode(res);
};
// 1. Handle HTTP errors directly before parsing JSON
// handle 401, 404, 403
const handleStatusCode = (res) => {
  if (res.status === 401) {
    redirect("/unauthorized");
  } else if (res.status === 403) {
    redirect("/forbidden");
  }

  return res.json();
};
