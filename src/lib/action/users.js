// 'use server'
// import { headers } from "next/headers";
// import { auth } from "../auth"
// import { revalidatePath } from "next/cache";

// export const updateUserRole = async (userId, role) => {
//     const data = await auth.api.setRole({
//         body: {
//             userId: userId,
//             role: role
//         },
//         headers: await headers()
//     })

//     // revalidatePath('/dashboard/admin/users');

//     return data;
// }
export const updateTemplateData = async (userId, updatePayload) => {
  return serverMutation(`/api/users/${userId}`, updatePayload, 'PATCH');
};