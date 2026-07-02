"use client";

import { deletePromptByuser } from "@/lib/action/prompts";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function MyPromptsTable({ prompts: initialPrompts = [] }) {
  const router = useRouter();
  // Local state to manage changes visually without requiring a full page refresh
  const [promptsList, setPromptsList] = useState(initialPrompts);

  // --- ACTIONS ---

  const handleDelete = async (promptId) => {
    if (!confirm("Are you sure you want to delete this prompt?")) return;
    try {
      await deletePromptByuser(promptId);
      setPromptsList((prev) => prev.filter((p) => (p._id || p.id) !== promptId));
      alert("Prompt deleted successfully!");
    } catch (error) {
      console.error("Failed to delete prompt:", error);
      alert("Error deleting prompt.");
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 md:p-10 text-[#1A1A1A]">
      {/* Title Header Block */}
      <div className="mb-6 border-b border-gray-200 pb-6">
        <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">My Prompts</h2>
        <p className="text-sm text-gray-400 mt-1">Manage, evaluate, and edit your engineered AI prompts here.</p>
      </div>

      {/* Main Content Handler Container */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {promptsList.length === 0 ? (
          <div className="text-center py-16 text-gray-400 font-medium">
            No prompts found in your repository.
          </div>
        ) : (
          <>
            {/* --- MOBILE CARD CONTAINER (Visible below md viewports) --- */}
            <div className="block md:hidden divide-y divide-gray-100">
              {promptsList.map((prompt, index) => {
                const id = prompt._id || prompt.id;
                return (
                  <div key={`mobile-${id || index}`} className="p-4 space-y-4 bg-white hover:bg-gray-50/40 transition-colors">
                    {/* Top Meta Details Row */}
                    <div className="flex items-start gap-3">
                      <img
                        src={prompt.thumbnail || "https://placehold.co/50x50"}
                        alt={prompt.title || "Prompt thumbnail"}
                        className="w-12 h-12 rounded-xl object-cover flex-shrink-0 border border-gray-100"
                      />
                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-sm text-[#1A1A1A] truncate">{prompt.title || "Untitled Prompt"}</h3>
                        <p className="text-xs text-gray-400 line-clamp-2 mt-0.5">
                          {prompt.description || "No description provided."}
                        </p>
                      </div>
                    </div>

                    {/* Footer Row: Status & Actions */}
                    <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                      <div>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${
                            prompt.status === "approved"
                              ? "bg-green-50 text-green-700"
                              : prompt.status === "rejected"
                              ? "bg-red-50 text-red-700"
                              : "bg-yellow-50 text-yellow-700"
                          }`}
                        >
                          {prompt.status || "pending"}
                        </span>
                      </div>

                      {/* Action trigger group */}
                      <div className="flex items-center gap-3 text-xs font-semibold">
                        <Link href={`/allprompts/${id}`} className="text-gray-500 hover:text-gray-900 transition-colors p-1">
                          View
                        </Link>
                        <Link href={`/dashboard/creator/my-prompts/${id}`} className="text-[#0080FF] hover:underline p-1">
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(id)}
                          className="text-red-500 hover:text-red-700 font-semibold p-1 bg-transparent border-none cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* --- DESKTOP TABLE VIEW (Visible on larger md+ screens) --- */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-[#FDFDFD] border-b border-gray-100 text-gray-400 font-medium">
                    <th className="p-4 pl-6">Prompt Title</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 pr-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 font-medium">
                  {promptsList.map((prompt, index) => {
                    const id = prompt._id || prompt.id;
                    return (
                      <tr key={`desktop-${id || index}`} className="hover:bg-gray-50/70 transition-colors">
                        {/* Title block cell */}
                        <td className="p-4 pl-6 max-w-md">
                          <div className="flex items-center gap-4">
                            <img
                              src={prompt.thumbnail || "https://placehold.co/50x50"}
                              alt={prompt.title || "Prompt thumbnail"}
                              className="w-12 h-12 rounded-xl object-cover flex-shrink-0 border border-gray-100"
                            />
                            <div className="min-w-0">
                              <h3 className="font-bold text-[#1A1A1A] truncate">{prompt.title || "Untitled Prompt"}</h3>
                              <p className="text-xs text-gray-400 truncate mt-0.5 font-normal">
                                {prompt.description || "No description provided."}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Status chip cell */}
                        <td className="p-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${
                              prompt.status === "approved"
                                ? "bg-green-50 text-green-700"
                                : prompt.status === "rejected"
                                ? "bg-red-50 text-red-700"
                                : "bg-yellow-50 text-yellow-700"
                            }`}
                          >
                            {prompt.status || "pending"}
                          </span>
                        </td>

                        {/* Flat text action trigger cells */}
                        <td className="p-4 pr-6 text-right whitespace-nowrap">
                          <div className="flex justify-end items-center gap-4 font-semibold text-xs">
                            <Link href={`/allprompts/${id}`} title="View Prompt" className="text-gray-400 hover:text-gray-900 transition-colors">
                              View Asset
                            </Link>
                            <Link href={`/dashboard/creator/my-prompts/${id}`} title="Edit Prompt" className="text-[#0080FF] hover:underline">
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDelete(id)}
                              className="text-red-500 hover:text-red-700 bg-transparent border-none cursor-pointer"
                              title="Delete Prompt"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}