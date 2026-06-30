import { serverFetch } from "../core/server";

export const getPrompts = async () => {
  return serverFetch("/api/prompts");
};
export const getPromptsId = async (id) => {
  return serverFetch(`/api/prompts/${id}`);
};

export const getSavedPrompts = async (userId) => {
  const res = await serverFetch(`/api/saved/${userId}`);
  return res;
};
export const getPromptsByUserId = async (userId) => {
  const res = await serverFetch(`/api/prompts/user/${userId}`);
  return res;
};
