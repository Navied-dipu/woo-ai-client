"use server";
import { serverMutation } from "../core/server";

export const createPrompt = async (newPromptData) => {
  return serverMutation("/api/prompts", newPromptData);
};
export const updateCopyCount = async (id) => {
  const result = serverMutation(
    `/api/prompts/${id}/increment-copy`,
    {},
    "PATCH",
  );
  return result;
};
// Add this to your server actions file (e.g., @/lib/action/prompts)

export const toggleBookmark = async (promptId, userId) => {
  // If your serverMutation takes (url, body, method)
  return serverMutation("/api/saved", { promptId, userId }, "POST");
};
// lib/api/prompts.js

export const deleteSavedPrompt = async (userId, promptId) => {
  // Utilizing your serverMutation setup with the path and payload
  return serverMutation(`/api/saved/${userId}/${promptId}`, {}, "DELETE");
};
export const updatePrompt = async (promptId, payload) => {
  // Utilizing your serverMutation setup with the path and payload
  return serverMutation(`/api/prompts/${promptId}`, payload, "PATCH");
};

// Utilizing your serverMutation setup with the path and payload
// Ensure this matches how your serverMutation handles custom headers or body layouts
export const updatePromptByUser = async (promptId, updatedFields) => {
  // Pass the updated fields directly as the body payload
  return serverMutation(`/api/prompts/${promptId}`, updatedFields, "PATCH");
};

// Utilizing your serverMutation setup with the path and query parameters
export const deletePromptByuser = async (promptId) => {
  // Pass the promptId in the URL path, and null for the data argument
  return serverMutation(`/api/prompts/${promptId}`, null, "DELETE");
};
