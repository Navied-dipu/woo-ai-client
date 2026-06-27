
import PromptCard from "@/components/Dashboard/PromptCard";
import { getPrompts } from "@/lib/api/prompts";

const page = async () => {
    let prompts = [];
    try {
        const data = await getPrompts();
        // Handle different API response shapes: array, { data: [] }, { prompts: [] }
        if (Array.isArray(data)) {
            prompts = data;
        } else if (Array.isArray(data?.data)) {
            prompts = data.data;
        } else if (Array.isArray(data?.prompts)) {
            prompts = data.prompts;
        }
    } catch (err) {
        console.error("Failed to fetch prompts:", err);
    }

    return (
        <div className="p-8 bg-black min-h-screen">
            {prompts.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                    <p className="text-zinc-400 text-lg">No prompts found or failed to load.</p>
                    <p className="text-zinc-600 text-sm mt-2">Make sure your backend is running on the correct port.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                    {prompts.map((item) => (
                        <PromptCard key={item._id} prompt={item} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default page;