"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { createPrompt } from "@/lib/action/prompts";

export default function CreatePrompts({ user }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    category: "",
    aiTool: "",
    tags: "",
    difficulty: "beginner",
    visibility: "public",
    thumbnail: null,
    copyCount: 0,
    status: "pending",
  });

  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleChange("thumbnail", e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    let thumbnailUrl = "";

    if (formData.thumbnail) {
      const imgData = new FormData();
      imgData.append("image", formData.thumbnail);

      const IMGBB_API = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

      try {
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API}`, {
          method: "POST",
          body: imgData,
        });

        const result = await response.json();

        if (result.success) {
          thumbnailUrl = result.data.url;
          console.log("Image uploaded to ImgBB successfully:", thumbnailUrl);
        } else {
          console.error("ImgBB upload failed:", result.error);
          alert("Failed to upload image. Please try again.");
          setIsUploading(false);
          return;
        }
      } catch (error) {
        console.error("Error uploading to ImgBB:", error);
        alert("An error occurred during image upload.");
        setIsUploading(false);
        return;
      }
    }

    const finalPayload = {
      ...formData,
      thumbnail: thumbnailUrl,
      userId: user?.id,
    };

    try {
      const res = await createPrompt(finalPayload);
      if (res?.insertedId) {
        toast.success("Prompt posted successfully!");
        setFormData({
          title: "",
          description: "",
          content: "",
          category: "",
          aiTool: "",
          tags: "",
          difficulty: "beginner",
          visibility: "public",
          thumbnail: null,
          copyCount: 0,
          status: "pending",
        });
        e.target.reset();
      }
    } catch (err) {
      console.error("Submission failed:", err);
      toast.error("Failed to post prompt.");
    } finally {
      setIsUploading(false);
    }
  };

  const fieldClass = "flex flex-col gap-1.5";
  const labelClass = "text-slate-300 font-medium text-sm";
  const inputClass =
    "w-full bg-[#130b2b]/60 border border-purple-900/40 backdrop-blur-md text-white placeholder:text-slate-500 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 hover:border-purple-500/60 transition-colors";

  return (
    <div className="w-full bg-[#0d0624]/80 border border-purple-500/20 backdrop-blur-xl shadow-[0_0_50px_-12px_rgba(168,85,247,0.2)] p-4 sm:p-6 text-white rounded-2xl">
      <div className="flex flex-col gap-1 items-start border-b border-purple-500/10 pb-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-wide bg-gradient-to-r from-white via-slate-200 to-purple-400 bg-clip-text text-transparent">
          Create New Prompt
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          New entries auto-default to <span className="text-yellow-400 font-medium">pending</span> status for moderation clearance.
        </p>
      </div>

      <div className="mt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className={fieldClass}>
            <label className={labelClass}>Title</label>
            <input
              required
              placeholder="Enter prompt title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Description */}
          <div className={fieldClass}>
            <label className={labelClass}>Description</label>
            <textarea
              required
              placeholder="Describe your prompt"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className={inputClass}
              rows={3}
            />
          </div>

          {/* Prompt Content */}
          <div className={fieldClass}>
            <label className={labelClass}>Prompt Content</label>
            <textarea
              required
              placeholder="Enter the actual prompt content"
              value={formData.content}
              onChange={(e) => handleChange("content", e.target.value)}
              className={inputClass}
              rows={5}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Category */}
            <div className={fieldClass}>
              <label className={labelClass}>Category</label>
              <input
                required
                placeholder="e.g. Marketing, Code"
                value={formData.category}
                onChange={(e) => handleChange("category", e.target.value)}
                className={inputClass}
              />
            </div>

            {/* AI Tool */}
            <div className={fieldClass}>
              <label className={labelClass}>AI Tool</label>
              <input
                required
                placeholder="e.g. ChatGPT, Claude"
                value={formData.aiTool}
                onChange={(e) => handleChange("aiTool", e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          {/* Tags */}
          <div className={fieldClass}>
            <label className={labelClass}>Tags</label>
            <input
              placeholder="react, nextjs, ai"
              value={formData.tags}
              onChange={(e) => handleChange("tags", e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Difficulty Select */}
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Difficulty</label>
            <select
              value={formData.difficulty}
              onChange={(e) => handleChange("difficulty", e.target.value)}
              className="bg-[#130b2b]/60 border border-purple-900/40 hover:border-purple-500/60 text-white rounded-xl h-12 backdrop-blur-md px-3 flex items-center justify-between text-sm outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            >
              <option value="beginner" className="bg-[#0d0624]">Beginner</option>
              <option value="intermediate" className="bg-[#0d0624]">Intermediate</option>
              <option value="pro" className="bg-[#0d0624]">Pro</option>
            </select>
          </div>

          {/* Visibility */}
          <div className="flex flex-col gap-2">
            <label className={labelClass}>Visibility</label>
            <div className="flex gap-4">
              <label className="text-xs sm:text-sm text-slate-300 flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="visibility"
                  value="public"
                  checked={formData.visibility === "public"}
                  onChange={(e) => handleChange("visibility", e.target.value)}
                  className="accent-purple-500"
                />
                Public
              </label>
              <label className="text-xs sm:text-sm text-slate-300 flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="visibility"
                  value="private"
                  checked={formData.visibility === "private"}
                  onChange={(e) => handleChange("visibility", e.target.value)}
                  className="accent-purple-500"
                />
                Private
              </label>
            </div>
          </div>

          {/* Thumbnail Upload */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-300">Thumbnail Image</label>
            <div className="relative group flex items-center justify-center w-full bg-[#130b2b]/40 border border-dashed border-purple-900/60 hover:border-cyan-500/60 rounded-xl p-4 transition-all duration-300 cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isUploading}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed"
              />
              <div className="text-center pointer-events-none">
                <p className="text-xs sm:text-sm text-purple-400 font-semibold group-hover:text-cyan-400 transition-colors">
                  {formData.thumbnail ? `✓ ${formData.thumbnail.name}` : "Click or Drag to upload thumbnail image"}
                </p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isUploading}
            className="w-full mt-4 bg-gradient-to-r from-[#b3ff00] to-[#88cc00] text-black font-extrabold text-base tracking-wider shadow-[0_0_25px_rgba(179,255,0,0.35)] hover:shadow-[0_0_35px_rgba(179,255,0,0.6)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed py-3 rounded-xl"
          >
            {isUploading ? "Uploading & Submitting..." : "Submit Prompt"}
          </button>
        </form>
      </div>
    </div>
  );
}