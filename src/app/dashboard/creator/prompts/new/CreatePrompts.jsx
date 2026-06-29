"use client";
import { useState } from "react";
import {
  TextField,
  Label,
  Input,
  TextArea,
  Select,
  ListBox,
  ListBoxItem,
  RadioGroup,
  Radio,
  Button,
  Card,
  toast,
} from "@heroui/react";
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
    thumbnail: null, // Holds the File object locally
    copyCount: 0,
    status: "pending",
  });

  // Track upload status
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

    // 1. Upload to ImgBB if an image file exists
    if (formData.thumbnail) {
      const imgData = new FormData();
      imgData.append("image", formData.thumbnail);

      // Replace with your real ImgBB API key or use process.env.NEXT_PUBLIC_IMGBB_API_KEY
      const IMGBB_API_KEY = "d927b80d9cb8079967b7e6672eaad49e"

      try {
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
          method: "POST",
          body: imgData,
        });

        const result = await response.json();

        if (result.success) {
          thumbnailUrl = result.data.url; // This is your hosted image URL
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

    // 2. Prepare final data with the hosted URL instead of the raw File object
    const finalPayload = {
      ...formData,
      thumbnail: thumbnailUrl,
      userId: user?.id,// Replaced with the online string URL
    };

    const dataToSend = new FormData();
    Object.keys(finalPayload).forEach((key) => {
      dataToSend.append(key, finalPayload[key]);
    });
    const res = await createPrompt(finalPayload);

    if (res.insertedId) {
      toast.success("Prompt posted successfully!");
      e.target.reset();
      // setIsRemote(false);
      // redirect("/dashboard/recruiter/jobs");
    }
    console.log("Form submitted successfully with hosted image:", finalPayload);

    // TODO: Send dataToSend or finalPayload to your backend API here

    setIsUploading(false);
  };

  // Shared field styling
  const fieldClass = "flex flex-col gap-1.5";
  const labelClass = "text-slate-300 font-medium text-sm";
  const inputClass =
    "w-full bg-[#130b2b]/60 border border-purple-900/40 backdrop-blur-md text-white placeholder:text-slate-500 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 hover:border-purple-500/60 transition-colors";

  return (
    <div className="min-h-screen bg-[#070214] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1d0b3a] via-[#070214] to-[#020007] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">

      <Card className="w-full max-w-2xl bg-[#0d0624]/80 border border-purple-500/20 backdrop-blur-xl shadow-[0_0_50px_-12px_rgba(168,85,247,0.2)] p-4 sm:p-6 text-white">

        <Card.Header className="flex flex-col gap-1 items-start border-b border-purple-500/10 pb-4">
          <Card.Title className="text-2xl sm:text-3xl font-extrabold tracking-wide bg-gradient-to-r from-white via-slate-200 to-purple-400 bg-clip-text text-transparent">
            Create New Prompt
          </Card.Title>
          <Card.Description className="text-xs sm:text-sm text-slate-400 mt-1">
            New entries auto-default to <span className="text-yellow-400 font-medium">pending</span> status for moderation clearance.
          </Card.Description>
        </Card.Header>

        <Card.Content className="mt-6">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Title */}
            <TextField isRequired className={fieldClass}>
              <Label className={labelClass}>Title</Label>
              <Input
                placeholder="Enter prompt title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className={inputClass}
              />
            </TextField>

            {/* Description */}
            <TextField isRequired className={fieldClass}>
              <Label className={labelClass}>Description</Label>
              <TextArea
                placeholder="Describe your prompt"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className={inputClass}
                rows={3}
              />
            </TextField>

            {/* Prompt Content */}
            <TextField isRequired className={fieldClass}>
              <Label className={labelClass}>Prompt Content</Label>
              <TextArea
                placeholder="Enter the actual prompt content"
                value={formData.content}
                onChange={(e) => handleChange("content", e.target.value)}
                className={inputClass}
                rows={5}
              />
            </TextField>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Category */}
              <TextField isRequired className={fieldClass}>
                <Label className={labelClass}>Category</Label>
                <Input
                  placeholder="e.g. Marketing, Code"
                  value={formData.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  className={inputClass}
                />
              </TextField>

              {/* AI Tool */}
              <TextField isRequired className={fieldClass}>
                <Label className={labelClass}>AI Tool</Label>
                <Input
                  placeholder="e.g. ChatGPT, Claude"
                  value={formData.aiTool}
                  onChange={(e) => handleChange("aiTool", e.target.value)}
                  className={inputClass}
                />
              </TextField>
            </div>

            {/* Tags */}
            <TextField className={fieldClass}>
              <Label className={labelClass}>Tags</Label>
              <Input
                placeholder="react, nextjs, ai"
                value={formData.tags}
                onChange={(e) => handleChange("tags", e.target.value)}
                className={inputClass}
              />
            </TextField>

            {/* Difficulty Select */}
            <Select
              selectedKey={formData.difficulty}
              onSelectionChange={(key) => handleChange("difficulty", key)}
              className="flex flex-col gap-1.5"
            >
              <Label className={labelClass}>Difficulty</Label>
              <Select.Trigger className="bg-[#130b2b]/60 border border-purple-900/40 hover:border-purple-500/60 data-[open]:border-cyan-400 text-white rounded-xl h-12 backdrop-blur-md px-3 flex items-center justify-between text-sm">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>

              <Select.Popover className="bg-[#0d0624] border border-purple-500/30 text-white rounded-xl shadow-xl">
                <ListBox>
                  <ListBoxItem id="beginner" textValue="Beginner" className="text-white hover:bg-purple-900/40 data-[focused]:bg-purple-900/40 cursor-pointer p-2 rounded-lg">
                    Beginner
                  </ListBoxItem>
                  <ListBoxItem id="intermediate" textValue="Intermediate" className="text-white hover:bg-purple-900/40 data-[focused]:bg-purple-900/40 cursor-pointer p-2 rounded-lg">
                    Intermediate
                  </ListBoxItem>
                  <ListBoxItem id="pro" textValue="Pro" className="text-white hover:bg-purple-900/40 data-[focused]:bg-purple-900/40 cursor-pointer p-2 rounded-lg">
                    Pro
                  </ListBoxItem>
                </ListBox>
              </Select.Popover>
            </Select>

            {/* Visibility */}
            <RadioGroup
              value={formData.visibility}
              onChange={(value) => handleChange("visibility", value)}
              orientation="horizontal"
              className="flex flex-col gap-2"
            >
              <Label className={labelClass}>Visibility</Label>
              <div className="flex gap-4">
                <Radio value="public" className="text-xs sm:text-sm text-slate-300">Public</Radio>
                <Radio value="private" className="text-xs sm:text-sm text-slate-300">Private</Radio>
              </div>
            </RadioGroup>

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

            <Button
              type="submit"
              size="lg"
              disabled={isUploading}
              className="w-full mt-4 bg-gradient-to-r from-[#b3ff00] to-[#88cc00] text-black font-extrabold text-base tracking-wider shadow-[0_0_25px_rgba(179,255,0,0.35)] hover:shadow-[0_0_35px_rgba(179,255,0,0.6)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? "Uploading & Submitting..." : "Submit Prompt"}
            </Button>
          </form>
        </Card.Content>
      </Card>
    </div>
  );
}