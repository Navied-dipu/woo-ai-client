import { serverFetch } from "../core/server";

export const getPrompts = async () => {
  return serverFetch("/api/prompts");
};
export const getPromptsId = async (id) => {
  return serverFetch(`/api/prompts/${id}`);
};
// Located in @/lib/api/prompts or wherever you keep it
// Remove the curly braces around userId
// export const getSavedPrompts = async (userId) => {
//   const res = await serverFetch(`/api/saved/${userId}`);
//   return res;
// };
export const getSavedPrompts = async (userId) => {
  const res = await serverFetch(`/api/saved/${userId}`);
  return res;
};
