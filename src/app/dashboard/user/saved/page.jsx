// savePromptspage.jsx
import React from 'react';
import SavedPromptsTable from './savePromptsTable';
import { getUserSession } from '@/lib/core/session';
import { getPrompts, getPromptsId, getSavedPrompts } from '@/lib/api/prompts';

const savePromptspage = async () => {
    const currentUser = await getUserSession();

    // 1. Authenticate user safety check
    if (!currentUser || !currentUser.id) {
        return <div className="p-6 text-center">Please log in to view saved prompts.</div>;
    }

    try {
        // 2. Fetch the bookmark relations array for this user
        let savedRelations = await getSavedPrompts(currentUser.id) || [];
        // If the backend returns an object with a data field or something else, handle it safely
        if (!Array.isArray(savedRelations)) {
            savedRelations = savedRelations.data || savedRelations.saved || [];
        }

        console.log("Raw saved relations from backend:", savedRelations);

        if (!Array.isArray(savedRelations) || savedRelations.length === 0) {
            return <div className="p-6 text-center">You haven't saved any prompts yet!</div>;
        }

        // 2.5 Workaround: Fetch all prompts since /api/prompts/:id is currently returning empty string
        let allPrompts = await getPrompts().catch(() => []);
        if (!Array.isArray(allPrompts)) {
            allPrompts = allPrompts.data || allPrompts.prompts || [];
        }
        if (!Array.isArray(allPrompts)) allPrompts = [];

        // 3. Resolve details for all bookmark items concurrently
        const bookMarkPrompts = savedRelations.map((relation) => {
            try {
                // The relation could be a string (the ID itself) or an object
                const promptId = typeof relation === 'string' ? relation : (relation?.promptId || relation?.promptid || relation?.prompt || relation?._id);

                if (!promptId) return null;

                const matchingPrompt = allPrompts?.find((p) => String(p._id) === String(promptId) || String(p.id) === String(promptId));

                if (!matchingPrompt) return null;

                const promptData = matchingPrompt.prompt || matchingPrompt;

                // 4. Transform and flatten data format for easy Client Component consumption
                return {
                    id: matchingPrompt._id?.$oid || matchingPrompt._id || promptId,
                    title: promptData?.title || "Untitled",
                    description: promptData?.description || "",
                    category: promptData?.category || "General",
                    aiTool: promptData?.aiTool || "N/A",
                    thumbnail: promptData?.thumbnail || "",
                    savedAt: relation?.createdAt || new Date().toISOString()
                };
            } catch (err) {
                console.error(`Failed mapping prompt:`, err);
                return null;
            }
        });

        // 5. Filter out broken/missing prompts
        const validPrompts = bookMarkPrompts.filter(prompt => prompt !== null);
        console.log("Processed valid prompts to display:", validPrompts);

        return (
            <div className="container mx-auto p-6">
                <h1 className="text-2xl font-bold mb-4">Your Saved Prompts</h1>
                {/* 6. Send the cleanly structured array down to your layout */}
                <SavedPromptsTable currentUser={currentUser} savedPrompts={validPrompts} />
            </div>
        );

    } catch (error) {
        console.error("Critical page execution breakdown:", error);
        return <div className="p-6 text-center text-red-500">Failed to load saved prompts. Please try again later.</div>;
    }
};

export default savePromptspage;