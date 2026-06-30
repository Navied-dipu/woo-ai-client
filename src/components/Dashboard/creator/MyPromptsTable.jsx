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
      setPromptsList((prev) => prev.filter((p) => p._id !== promptId));
      alert("Prompt deleted successfully!");
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
            {promptsList.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-10 text-gray-500">
                  No prompts found.
                </td>
              </tr>
            ) : (
              promptsList.map((prompt, index) => (
                <tr key={prompt._id || index} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={prompt.thumbnail || "https://placehold.co/50x50"}
                        alt={prompt.title || "Prompt thumbnail"}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-semibold">{prompt.title || "Untitled Prompt"}</h3>
                        <p className="text-sm text-gray-500">
                          {prompt.description?.slice(0, 80) || "No description"}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        prompt.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : prompt.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {prompt.status || "pending"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-3 text-xl">
                      {/* VIEW BUTTON */}
                      <Link href={`/allprompts/${prompt._id}`} title="View Prompt" className="text-blue-500 hover:text-blue-700">
                        👁️
                      </Link>

                      {/* EDIT BUTTON */}
                      <Link href={`/dashboard/creator/my-prompts/${prompt._id}`} title="Edit Prompt" className="text-green-500 hover:text-green-700">
                        ✏️
                      </Link>

                      {/* DELETE BUTTON */}
                      <button
                        onClick={() => handleDelete(prompt._id)}
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