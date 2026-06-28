import { getPrompts } from "@/lib/api/prompts";
import Link from "next/link";

export default async function PromptDetailsPage({ params }) {
    const { id } = await params; // Next.js 15 params is a promise
    
    // The backend /api/prompts/:id seems to be returning an empty string right now
    // So as a workaround, we will fetch all prompts and find the matching one
    const allPrompts = await getPrompts().catch(() => []);
    const matchingPrompt = allPrompts?.find((p) => p._id === id);
    const data = matchingPrompt ? matchingPrompt : null;
    if (!data) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold mb-4">Prompt Not Found</h1>
                <Link href="/allprompts" className="text-[#9eff00] hover:underline">
                    &larr; Back to all prompts
                </Link>
            </div>
        );
    }

    const { prompt } = data;
    const { title, description, category, aiTool, thumbnail, content } = prompt || {};

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-4xl mx-auto mt-10 space-y-8">
                {/* Back Button */}
                <Link href="/allprompts" className="text-zinc-400 hover:text-white mb-6 inline-block">
                    &larr; Back to all prompts
                </Link>
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* Thumbnail */}
                    <div className="w-full md:w-1/2 aspect-video rounded-xl overflow-hidden border border-zinc-800 shadow-2xl relative bg-zinc-900">
                        <img 
                            src={thumbnail || "https://via.placeholder.com/600"} 
                            alt={title || "Thumbnail"} 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    
                    {/* Info */}
                    <div className="w-full md:w-1/2 space-y-4">
                        <div className="flex gap-2 mb-2">
                            <span className="px-3 py-1 text-xs rounded-full bg-zinc-800 text-zinc-300">
                                {category}
                            </span>
                            <span className="px-3 py-1 text-xs rounded-full bg-zinc-800 text-zinc-300">
                                {aiTool}
                            </span>
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight text-white">{title}</h1>
                        <p className="text-lg text-zinc-400">{description}</p>
                    </div>
                </div>

                {/* Content Section */}
                <div className="mt-12 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                    <h2 className="text-xl font-semibold mb-4 text-[#9eff00]">Prompt Content</h2>
                    <pre className="whitespace-pre-wrap font-mono text-sm text-zinc-300 bg-black p-4 rounded-xl border border-zinc-800 overflow-x-auto">
                        {content || "No content provided."}
                    </pre>
                </div>
            </div>
        </div>
    );
}
