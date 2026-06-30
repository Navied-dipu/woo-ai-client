import PromptCard from "@/components/Dashboard/PromptCard";
import { getPrompts } from "@/lib/api/prompts";

export const dynamic = 'force-dynamic';

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

        // 🔥 FILTER: Only show prompts approved by admin
        // Case-insensitive: handles "approved", "Approved", "APPROVED" from backend
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                    {prompts.map((item) => {
                        // Safely resolve MongoDB _id — could be a plain string or { $oid: "..." }
                        const id = item._id?.$oid || item._id;
                        return <PromptCard key={id} prompt={{ ...item, _id: id }} />;
                    })}
                </div>
            )}
        </div>
    );
};

export default page;