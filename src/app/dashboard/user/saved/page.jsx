// savePromptspage.jsx

import React from "react";
import SavedPromptsTable from "./savePromptsTable";
import { getUserSession } from "@/lib/core/session";
import { getPrompts, getSavedPrompts } from "@/lib/api/prompts";

export const dynamic = "force-dynamic";

const SavePromptsPage = async () => {
  const currentUser = await getUserSession();

  if (!currentUser?.id) {
    return (
      <div className="p-6 text-center">
        Please log in to view saved prompts.
      </div>
    );
  }

  try {
    const savedRelations = await getSavedPrompts(currentUser.id) || [];
    const allPrompts = await getPrompts() || [];

    const savedPrompts = savedRelations
      .map((relation) => {
        const promptId =
          relation?.promptId ||
          relation?.prompt ||
          relation;

        const prompt = allPrompts.find(
          (p) =>
            String(p._id) === String(promptId) ||
            String(p.id) === String(promptId)
        );

        if (!prompt) return null;

        return {
          id: prompt._id || prompt.id,
          title: prompt.title,
          description: prompt.description,
          category: prompt.category,
          aiTool: prompt.aiTool,
          thumbnail: prompt.thumbnail,
          savedAt:
            relation?.createdAt ||
            new Date().toISOString(),
        };
      })
      .filter(Boolean);

    if (savedPrompts.length === 0) {
      return (
        <div className="p-6 text-center">
          You haven't saved any prompts yet!
        </div>
      );
    }

    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-5">
          Saved Prompts
        </h1>

        <SavedPromptsTable
          currentUser={currentUser}
          savedPrompts={savedPrompts}
        />
      </div>
    );
  } catch (error) {
    console.error(error);

    return (
      <div className="p-6 text-center text-red-500">
        Failed to load saved prompts.
      </div>
    );
  }
};

export default SavePromptsPage;