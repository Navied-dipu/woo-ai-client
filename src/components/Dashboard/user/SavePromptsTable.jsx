"use client";

import { deleteSavedPrompt } from "@/lib/action/prompts";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SavedPromptsTable({ prompts = [], userId }) {
    // console.log("Prompts received in table:", prompts);

    const router = useRouter();

    // --- ACTIONS ---
    const handleDelete = async (promptId) => {
        if (!confirm("Are you sure you want to delete this prompt?")) return;
        try {
            // userId is now properly received from props
            await deleteSavedPrompt(userId, promptId);
            
            alert("Prompt deleted successfully!");
            router.refresh(); // Triggers Server Component data refetch
        } catch (error) {
            console.error("Failed to delete prompt:", error);
            alert("Error deleting prompt.");
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto p-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold">My Prompts</h2>
                <p className="text-gray-500">Manage your AI prompts here.</p>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-4">Prompt Title</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {prompts.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="text-center py-10 text-gray-500">
                                    No prompts found.
                                </td>
                            </tr>
                        ) : (
                            prompts.map((promptItem, index) => (
                                <tr key={promptItem._id || index} className="border-t hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={promptItem.thumbnail || "https://placehold.co/50x50"}
                                                alt={promptItem.title || "Prompt thumbnail"}
                                                className="w-12 h-12 rounded-lg object-cover"
                                            />
                                            <div>
                                                <h3 className="font-semibold">{promptItem.title || "Untitled Prompt"}</h3>
                                                <p className="text-sm text-gray-500">
                                                    {promptItem.description?.slice(0, 80) || "No description"}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm ${
                                                promptItem.status === "approved"
                                                    ? "bg-green-100 text-green-700"
                                                    : promptItem.status === "rejected"
                                                    ? "bg-red-100 text-red-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                            }`}
                                        >
                                            {promptItem.status || "pending"}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex justify-center gap-3 text-xl">
                                            {/* VIEW BUTTON */}
                                            <Link href={`/allprompts/${promptItem._id || promptItem.id}`} title="View Prompt" className="text-blue-500 hover:text-blue-700">
                                                👁️
                                            </Link>

                                            {/* DELETE BUTTON */}
                                            <button
                                                onClick={() => handleDelete(promptItem._id || promptItem.id)}
                                                className="text-red-500 hover:text-red-700"
                                                title="Delete Prompt"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}