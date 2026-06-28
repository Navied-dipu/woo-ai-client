import { serverMutation } from "../core/server";

export const createPrompt = async (newPromptData) => {
  return serverMutation("/api/prompts", newPromptData);
};
export const updateCopyCount = async (id) => {
    const result = serverMutation(`/api/prompts/${id}/increment-copy`, {}, 'PATCH');
    return result;
}
// Add this to your server actions file (e.g., @/lib/action/prompts)

export const toggleBookmark = async (promptId, userId) => {
  // If your serverMutation takes (url, body, method)
  return serverMutation('/api/saved', { promptid: promptId, userid: userId }, 'POST');
};
// lib/api/prompts.js

export const deleteSavedPrompt = async (userId, promptId) => {
  // Utilizing your serverMutation setup with the path and payload
  return serverMutation('/api/saved/delete', { userid: userId, promptid: promptId }, 'DELETE');
};