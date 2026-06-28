import { getPromptsId } from '@/lib/api/prompts';
import React from 'react';
import PromptDetails from './promptsDetails';
import { getUserSession } from '@/lib/core/session';


const Page = async ({ params }) => {
    const { id } = await params;
    const currentUser = await getUserSession(); // Replace with actual session retrieval logic
    console.log(currentUser.id)
    const promptsDetails = await getPromptsId(id);
    if (!promptsDetails) {
        return (
            <div className="min-h-screen bg-[#070a13] flex items-center justify-center text-slate-400">
                Prompt not found.
            </div>
        );
    }
    return (
        <div>
            <PromptDetails prompts={promptsDetails} currentUser={currentUser} />
        </div>
    );
};

export default Page;
