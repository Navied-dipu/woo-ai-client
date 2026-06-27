import { serverMutation } from "../core/server";

export const createPrompt = async (newPromptData) => {
  return serverMutation("/api/prompts", newPromptData);
};
export const updateCopyCount = async (id) => {
    const result = serverMutation(`/api/prompts/${id}/increment-copy`, {}, 'PATCH');
    return result;
}