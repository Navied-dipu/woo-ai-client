"use client";

import React, { useState } from "react";
import { Bookmark, Flag, Copy, Star } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toggleBookmark, updateCopyCount } from "@/lib/action/prompts";
import { useRouter } from "next/navigation";

export default function PromptDetails({ prompts, currentUser }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [localCopies, setLocalCopies] = useState(0);
  const router = useRouter();

  if (!prompts) return (
    <div className="text-center text-slate-400 p-8">Loading specifications...</div>
  );

  const { _id, title, description, category, aiTool, content, instructions, difficulty, visibility } = prompts;
  const promptId = _id?.$oid || _id;

  const handleBookmarkToggle = async () => {
    if (!currentUser) {
      return toast.error("Please log in to bookmark.", { theme: "dark" });
    }
    const previousState = isBookmarked;
    setIsBookmarked(!previousState);
    try {
      await toggleBookmark(promptId, currentUser.id);
      toast.success(!previousState ? "Prompt bookmarked" : "Bookmark removed", { theme: "dark" });
      router.refresh();
    } catch (err) {
      setIsBookmarked(previousState);
      toast.error("Failed to update bookmark. Please try again.", { theme: "dark" });
    }
  };

  const handleCopyText = async () => {
    if (!content) return toast.error("No content to copy.");
    try {
      await navigator.clipboard.writeText(content);
      await updateCopyCount(promptId);
      setLocalCopies(prev => prev + 1);
      toast.success("Prompt copied to clipboard", { theme: "dark" });
    } catch (err) {
      toast.error("Failed to copy content.");
    }
  };

  return (
    <div className="min-h-screen bg-[#070a13] text-slate-100 p-4 md:p-8 flex justify-center items-start selection:bg-purple-500/30">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT: Prompt Content & Instructions */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#0f1322] border border-slate-800/60 rounded-2xl p-6">
            <div className="p-0 space-y-6 overflow-visible">

              {/* Title & Actions */}
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <h1 className="text-xl md:text-3xl font-bold tracking-tight text-white">
                    {title}
                  </h1>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
                    {description}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="border border-slate-800 bg-[#161b30] text-slate-300 min-w-10 h-10 flex items-center justify-center rounded-lg hover:border-cyan-500 transition-colors"
                    onClick={handleBookmarkToggle}
                  >
                    <Bookmark size={17} className={isBookmarked ? "fill-cyan-400 text-cyan-400" : ""} />
                  </button>
                  <button
                    className="border border-slate-800 bg-[#161b30] text-slate-300 min-w-10 h-10 flex items-center justify-center rounded-lg hover:border-rose-500 transition-colors"
                    onClick={() => toast.warning("Report logged.", { theme: "dark" })}
                  >
                    <Flag size={17} />
                  </button>
                </div>
              </div>

              {/* Prompt Template */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-semibold text-slate-200">Prompt Template</h3>
                  <button
                    className="border border-slate-800 bg-[#161b30] text-slate-200 text-xs font-medium px-4 h-8 flex items-center gap-1.5 rounded-lg hover:border-slate-600 transition-colors"
                    onClick={handleCopyText}
                  >
                    <Copy size={13} />
                    Copy
                  </button>
                </div>
                <div className="p-5 rounded-xl bg-[#060913] border border-slate-900 font-mono text-sm leading-relaxed text-purple-400/90 whitespace-pre-wrap select-all">
                  {content || "No prompt content structured."}
                </div>
              </div>

              {/* Usage Instructions */}
              <div className="space-y-2 pt-2 border-t border-slate-800/40">
                <h3 className="text-sm font-semibold text-slate-200">Usage Instructions</h3>
                <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
                  {instructions}
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* RIGHT: Properties Sidebar */}
        <div className="space-y-6">
          <div className="bg-[#0f1322] border border-slate-800/60 rounded-2xl p-6">
            <div className="p-0 space-y-6">
              <h2 className="text-base font-bold text-white tracking-wide">Prompt Details</h2>

              <div className="space-y-4 text-xs font-medium">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">AI Engine</span>
                  <span className="bg-[#241a42] text-purple-300 font-bold px-2.5 h-6 inline-flex items-center text-[10px] tracking-wider rounded-md">
                    {aiTool?.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Category</span>
                  <span className="bg-[#112d32] text-cyan-300 font-bold px-2.5 h-6 inline-flex items-center text-[10px] tracking-wider rounded-md">
                    {category?.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Difficulty</span>
                  <span className="text-slate-200 font-semibold tracking-wider uppercase font-mono">{difficulty}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Visibility</span>
                  <span className="text-slate-200 font-semibold tracking-wider uppercase font-mono">{visibility}</span>
                </div>

                <div className="border-t border-slate-800/40 my-2 pt-2" />

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Copies Made</span>
                  <span className="text-slate-200 font-mono text-sm font-bold">{localCopies}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Bookmarks</span>
                  <span className="text-slate-200 font-mono text-sm">{isBookmarked ? 1 : 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Community Rating</span>
                  <div className="flex items-center gap-1.5">
                    <Star size={13} className="text-amber-500 fill-amber-500" />
                    <span className="text-slate-100 font-bold">5</span>
                    <span className="text-slate-500 font-normal">(2)</span>
                  </div>
                </div>
              </div>

              {/* Creator Info */}
              <div className="pt-4 border-t border-slate-800/40 space-y-3">
                <h3 className="text-xs font-bold text-slate-200 tracking-wider">Creator Information</h3>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#14192b] border border-slate-800/40">
                  <div className="w-9 h-9 rounded-full bg-slate-800 text-slate-300 font-bold flex items-center justify-center text-sm">
                    {typeof _id === "string" ? _id.charAt(0).toUpperCase() : "?"}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-slate-200 truncate">Prompt Engineer Creator</span>
                    <span className="text-[11px] font-mono text-slate-500 truncate">{_id}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
      <ToastContainer position="bottom-right" autoClose={2500} theme="dark" hideProgressBar />
    </div>
  );
}