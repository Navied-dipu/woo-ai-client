"use server";
import { serverMutation } from "../core/server";

export const updateTemplateData = async (userId, updatePayload) => {
  return serverMutation(`/api/users/${userId}`, updatePayload, "PATCH");
};