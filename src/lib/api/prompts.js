import { serverFetch } from "../core/server";

export const getPrompts = async () => {
  return serverFetch("/api/prompts");
};
// Fetch a single prompt by ID → returns a single prompt object
export const getPromptById = async (id) => {
  const res = await serverFetch(`/api/prompts/${id}`);
  return await res;
};

// Fetch multiple prompts by an array of IDs → returns an array of prompt objects
export const getPromptsByIds = async (ids = []) => {
  if (ids.length === 0) return [];
  const results = await Promise.all(
    ids.map((id) => serverFetch(`/api/prompts/${id}`))
  );
  return results;
};

export const getSavedPrompts = async (userId) => {
  const res = await serverFetch(`/api/saved/${userId}`);
  return res;
};
export const getPromptsByUserId = async (userId) => {
  const res = await serverFetch(`/api/prompts/user/${userId}`);
  return res;
};
