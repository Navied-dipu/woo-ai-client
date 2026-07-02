"use client";

import { deleteSavedPrompt } from "@/lib/action/prompts";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SavedPromptsTable({ prompts = [], userId }) {
    const router = useRouter();

    // --- ACTIONS ---
    const handleDelete = async (promptId) => {
        if (!confirm("Are you sure you want to delete this prompt?")) return;
        try {
            await deleteSavedPrompt(userId, promptId);
            alert("Prompt deleted successfully!");
            router.refresh(); 
        } catch (error) {
            console.error("Failed to delete prompt:", error);
            alert("Error deleting prompt.");
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            {/* Header Section */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">My Prompts</h2>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">Manage your AI prompts and their current approval status.</p>
                </div>
            </div>

            {prompts.length === 0 ? (
                <div className="text-center py-16 border border-dashed border-gray-300 rounded-2xl text-gray-500 bg-white shadow-sm">
                    <p className="text-sm font-medium">No prompts found.</p>
                    <p className="text-xs text-gray-400 mt-1">When you create or save prompts, they will appear here.</p>
                </div>
            ) : (
                <>
                    {/* =========================================================
                        1. MOBILE VIEW: Stacked Grid Cards (< 640px)
                       ========================================================= */}
                    <div className="grid grid-cols-1 gap-4 sm:hidden">
                        {prompts.map((promptItem, index) => (
                            <div 
                                key={promptItem._id || index} 
                                className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-3.5"
                            >
                                <div className="flex items-start gap-3">
                                    <img
                                        src={promptItem.thumbnail || "https://placehold.co/50x50"}
                                        alt={promptItem.title || "Prompt thumbnail"}
                                        className="w-12 h-12 rounded-lg object-cover shrink-0 border border-gray-100"
                                    />
                                    <div className="min-w-0 flex-1">
                                        <h3 className="font-semibold text-gray-900 text-sm truncate">
                                            {promptItem.title || "Untitled Prompt"}
                                        </h3>
                                        <p className="text-xs text-gray-500 line-clamp-2 mt-0.5 leading-relaxed">
                                            {promptItem.description || "No description provided."}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                                    <span
                                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider ${
                                            promptItem.status === "approved"
                                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                                : promptItem.status === "rejected"
                                                ? "bg-rose-50 text-rose-700 border border-rose-200"
                                                : "bg-amber-50 text-amber-700 border border-amber-200"
                                        }`}
                                    >
                                        {promptItem.status || "pending"}
                                    </span>
                                    
                                    <div className="flex gap-2">
                                        <Link 
                                            href={`/allprompts/${promptItem._id || promptItem.id}`} 
                                            className="px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-lg text-blue-600 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                                        >
                                            View
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(promptItem._id || promptItem.id)}
                                            className="px-3 py-1.5 text-xs font-medium border border-transparent rounded-lg text-rose-600 hover:bg-rose-50 active:bg-rose-100 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* =========================================================
                        2. TABLET & WEB VIEW (>= 640px)
                        Uses adaptive padding and variable column constraints 
                       ========================================================= */}
                    <div className="hidden sm:block overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
                        <table className="w-full text-left border-collapse table-fixed">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    {/* Web gets 60% space for title, tablet adjusts cleanly */}
                                    <th className="px-4 py-3.5 md:px-6 font-semibold text-gray-700 text-xs sm:text-sm w-7/12 sm:w-6/12 md:w-7/12">
                                        Prompt Info
                                    </th>
                                    <th className="px-4 py-3.5 md:px-6 font-semibold text-gray-700 text-xs sm:text-sm w-3/12 sm:w-3/12 md:w-2/12">
                                        Status
                                    </th>
                                    <th className="px-4 py-3.5 md:px-6 font-semibold text-gray-700 text-xs sm:text-sm text-center w-2/12 sm:w-3/12 md:w-3/12">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200">
                                {prompts.map((promptItem, index) => (
                                    <tr key={promptItem._id || index} className="hover:bg-gray-50/60 transition-colors group">
                                        {/* Info Column */}
                                        <td className="px-4 py-4 md:px-6">
                                            <div className="flex items-center gap-3 md:gap-4 min-w-0">
                                                <img
                                                    src={promptItem.thumbnail || "https://placehold.co/50x50"}
                                                    alt={promptItem.title || "Prompt thumbnail"}
                                                    className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover shrink-0 border border-gray-100 shadow-xs"
                                                />
                                                <div className="min-w-0 flex-1">
                                                    <h3 className="font-semibold text-gray-900 text-xs sm:text-sm md:text-base truncate group-hover:text-blue-600 transition-colors">
                                                        {promptItem.title || "Untitled Prompt"}
                                                    </h3>
                                                    {/* Description drops layout lines on smaller tablets to preserve spatial balance */}
                                                    <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 truncate md:line-clamp-2 md:whitespace-normal leading-relaxed">
                                                        {promptItem.description || "No description provided."}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Status Badge Column */}
                                        <td className="px-4 py-4 md:px-6 whitespace-nowrap">
                                            <span
                                                className={`px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold uppercase sm:capitalize tracking-wider sm:tracking-normal ${
                                                    promptItem.status === "approved"
                                                        ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                                                        : promptItem.status === "rejected"
                                                        ? "bg-rose-50 text-rose-700 border border-rose-100"
                                                        : "bg-amber-50 text-amber-700 border border-amber-100"
                                                }`}
                                            >
                                                {promptItem.status || "pending"}
                                            </span>
                                        </td>

                                        {/* Action Handling Column */}
                                        <td className="px-4 py-4 md:px-6 whitespace-nowrap text-center">
                                            <div className="flex items-center justify-center gap-2 md:gap-4 text-xs sm:text-sm font-medium">
                                                <Link 
                                                    href={`/allprompts/${promptItem._id || promptItem.id}`} 
                                                    className="text-blue-600 hover:text-blue-800 px-2 py-1 rounded-md hover:bg-blue-50 transition-all"
                                                >
                                                    View
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(promptItem._id || promptItem.id)}
                                                    className="text-rose-600 hover:text-rose-800 px-2 py-1 rounded-md hover:bg-rose-50 transition-all"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
}