// import { headers } from "next/headers";
// 'use server'
// import { auth } from "../auth";

import { serverFetch } from "../core/server";


// export const getUsersList = async () => {
//     const users = await auth.api.listUsers({
//         query: {
//             sortBy: "createdAt",
//             sortDirection: "desc"
//         },
//         // This endpoint requires session cookies.
//         headers: await headers(),
//     });
//     return users;
// }
export const getAllUsers = async () => {
  // Utilizing your server connection setup for GET requests
  return serverFetch('/api/users');
};