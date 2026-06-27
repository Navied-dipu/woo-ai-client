import { serverFetch } from "../core/server";

export const getPrompts = async () => {
  return serverFetch("/api/prompts");
};
export const getPromptsId = async (id) => {
  return serverFetch(`/api/prompts/${id}`);
};