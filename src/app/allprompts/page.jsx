
import PromptGrid from "@/components/Dashboard/PromptGrid";
import { getPrompts } from "@/lib/api/prompts";

export const dynamic = 'force-dynamic';

const page = async () => {
    let prompts = [];
    try {
        const data = await getPrompts();
        
        if (Array.isArray(data)) {
            prompts = data;
        } else if (Array.isArray(data?.data)) {
            prompts = data.data;
        } else if (Array.isArray(data?.prompts)) {
            prompts = data.prompts;
        }

        // FILTER: Only pass items with approved state to the frontend dashboard
        prompts = prompts.filter(
            (item) => item.status?.toLowerCase() === "approved"
        );

    } catch (err) {
        console.error("Failed to fetch prompts:", err);
    }

    return (
        <div className="p-8 bg-black min-h-screen">
            {prompts.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                    <p className="text-zinc-400 text-lg">No approved prompts found.</p>
                    <p className="text-zinc-600 text-sm mt-2">Prompts will appear here once approved by an admin.</p>
                </div>
            ) : (
                <PromptGrid initialPrompts={prompts} />
            )}
        </div>
    );
};

export default page;