"use client";

import React, { useState } from "react";
import { 
  Input, 
  Textarea, 
  Select, 
  SelectItem, 
  RadioGroup, 
  Radio, 
  Button, 
  Card, 
  CardBody, 
  CardHeader 
} from "@heroui/react";

export default function CreatePrompts() {
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

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        thumbnail: e.target.files[0],
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "thumbnail" && formData[key]) {
        dataToSend.append(key, formData[key]);
      } else {
        dataToSend.append(key, String(formData[key]));
      }
    });

    console.log("Submitting Theme-aligned Data:", formData);
  };

  // HeroUI Input/Select shared custom dark slot styles
  const inputStyles = {
    label: "text-slate-300 group-data-[filled=true]:text-purple-400 font-medium",
    input: [
      "bg-transparent",
      "text-white placeholder:text-slate-500",
    ],
    innerWrapper: "bg-transparent",
    inputWrapper: [
      "bg-[#130b2b]/60",
      "border-purple-900/40",
      "backdrop-blur-md",
      "hover:border-purple-500/60",
      "group-data-[focus=true]:border-cyan-400",
      "group-data-[focus=true]:ring-1",
      "group-data-[focus=true]:ring-cyan-400",
      "!cursor-text",
    ],
  };

  return (
    <div className="min-h-screen bg-[#070214] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1d0b3a] via-[#070214] to-[#020007] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      
      <Card className="w-full max-w-2xl bg-[#0d0624]/80 border border-purple-500/20 backdrop-blur-xl shadow-[0_0_50px_-12px_rgba(168,85,247,0.2)] p-2 sm:p-6 text-white">
        
        <CardHeader className="flex flex-col gap-1 items-start border-b border-purple-500/10 pb-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-wide bg-gradient-to-r from-white via-slate-200 to-purple-400 bg-clip-text text-transparent">
            Submit New Prompt
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            New prompts are marked as <span className="text-yellow-400 font-medium shadow-sm">pending</span> and undergo admin verification before reaching the live marketplace.
          </p>
        </CardHeader>

        <CardBody className="mt-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            {/* Prompt Title */}
            <Input
              isRequired
              label="Prompt Title"
              placeholder="e.g., Cyberpunk Character Generator"
              variant="bordered"
              classNames={inputStyles}
              value={formData.title}
              onValueChange={(val) => handleChange("title", val)}
            />

            {/* Prompt Description */}
            <Textarea
              isRequired
              label="Prompt Description"
              placeholder="Provide a breakdown of what this prompt yields..."
              variant="bordered"
              classNames={inputStyles}
              value={formData.description}
              onValueChange={(val) => handleChange("description", val)}
            />

            {/* Prompt Content */}
            <Textarea
              isRequired
              label="Prompt Content"
              placeholder="Paste the raw system instructions or prompt here..."
              variant="bordered"
              minRows={4}
              classNames={inputStyles}
              value={formData.content}
              onValueChange={(val) => handleChange("content", val)}
            />

            {/* Category & AI Tool (Responsive Grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                isRequired
                label="Category"
                placeholder="e.g., Development, Design"
                variant="bordered"
                classNames={inputStyles}
                value={formData.category}
                onValueChange={(val) => handleChange("category", val)}
              />

              <Input
                isRequired
                label="AI Tool"
                placeholder="e.g., ChatGPT, Midjourney"
                variant="bordered"
                classNames={inputStyles}
                value={formData.aiTool}
                onValueChange={(val) => handleChange("aiTool", val)}
              />
            </div>

            {/* Tags */}
            <Input
              label="Tags"
              placeholder="e.g., stable-diffusion, retro, neon"
              variant="bordered"
              classNames={inputStyles}
              value={formData.tags}
              onValueChange={(val) => handleChange("tags", val)}
            />

            {/* Difficulty Level */}
            <Select
              isRequired
              label="Difficulty Level"
              variant="bordered"
              classNames={{
                label: "text-slate-300 font-medium",
                trigger: "bg-[#130b2b]/60 border-purple-900/40 hover:border-purple-500/60 data-[open=true]:border-cyan-400 backdrop-blur-md",
                value: "text-white font-normal",
                popoverContent: "bg-[#0d0624] border border-purple-500/30 text-white",
              }}
              selectedKeys={[formData.difficulty]}
              onChange={(e) => handleChange("difficulty", e.target.value)}
            >
              <SelectItem key="beginner" className="text-white hover:bg-purple-900/40 focus:bg-purple-900/40">Beginner</SelectItem>
              <SelectItem key="intermediate" className="text-white hover:bg-purple-900/40 focus:bg-purple-900/40">Intermediate</SelectItem>
              <SelectItem key="pro" className="text-white hover:bg-purple-900/40 focus:bg-purple-900/40">Pro</SelectItem>
            </Select>

            {/* Visibility Options */}
            <RadioGroup
              label="Visibility Mode"
              orientation="horizontal"
              value={formData.visibility}
              onValueChange={(val) => handleChange("visibility", val)}
              classNames={{
                label: "text-slate-300 font-medium text-sm mb-1"
              }}
            >
              <Radio value="public" classNames={{ label: "text-xs sm:text-sm text-slate-300", wrapper: "border-purple-500 group-data-[selected=true]:border-cyan-400" }}>Public</Radio>
              <Radio value="private" classNames={{ label: "text-xs sm:text-sm text-slate-300", wrapper: "border-purple-500 group-data-[selected=true]:border-cyan-400" }}>Private</Radio>
            </RadioGroup>

            {/* Custom Styled Thumbnail Upload */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-300">Thumbnail Image</label>
              <div className="relative group flex items-center justify-center w-full bg-[#130b2b]/40 border border-dashed border-purple-900/60 hover:border-cyan-500/60 rounded-xl p-4 transition-all duration-300 cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="text-center pointer-events-none">
                  <p className="text-xs sm:text-sm text-purple-400 font-semibold group-hover:text-cyan-400 transition-colors">
                    {formData.thumbnail ? `✓ ${formData.thumbnail.name}` : "Click or Drag to upload thumbnail image"}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Supports PNG, JPG, or WEBP</p>
                </div>
              </div>
            </div>

            {/* Custom Submit Button matching the landing green/yellow glowing feel */}
            <Button 
              type="submit" 
              size="lg" 
              className="w-full mt-4 bg-gradient-to-r from-[#b3ff00] to-[#88cc00] text-black font-extrabold text-base tracking-wider shadow-[0_0_25px_rgba(179,255,0,0.35)] hover:shadow-[0_0_35px_rgba(179,255,0,0.6)] transition-all duration-300 hover:scale-[1.01]"
            >
              SUBMIT PROMPT FOR REVIEW
            </Button>

          </form>
        </CardBody>
      </Card>
    </div>
  );
}