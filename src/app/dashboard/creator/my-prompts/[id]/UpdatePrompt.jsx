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
// Change this to your actual update action if you have one
import { updatePromptByUser } from "@/lib/action/prompts";

export default function UpdatePrompts({ prompt }) {
    // 1. Initialize State with the existing prompt values
    const [formData, setFormData] = useState({
        title: prompt?.title || "",
        description: prompt?.description || "",
        content: prompt?.content || "",
        category: prompt?.category || "",
        aiTool: prompt?.aiTool || "",
        tags: prompt?.tags || "",
        difficulty: prompt?.difficulty || "beginner",
        visibility: prompt?.visibility || "public",
        thumbnail: null,              // Holds new uploaded File locally if changed
        thumbnailUrl: prompt?.thumbnail || "", // Remembers existing image URL
        copyCount: prompt?.copyCount || 0,
        status: prompt?.status || "pending",
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

        // Keep the old hosted image URL by default
        let finalThumbnailUrl = formData.thumbnailUrl;

        // 2. Only upload to ImgBB if the user selected a NEW thumbnail file
        if (formData.thumbnail) {
            const imgData = new FormData();
            imgData.append("image", formData.thumbnail);

            const IMGBB_API_KEY = "d927b80d9cb8079967b7e6672eaad49e";

            try {
                const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                    method: "POST",
                    body: imgData,
                });

                const result = await response.json();

                if (result.success) {
                    finalThumbnailUrl = result.data.url;
                    console.log("New image uploaded successfully:", finalThumbnailUrl);
                } else {
                    console.error("ImgBB upload failed:", result.error);
                    toast.error("Failed to upload image.");
                    setIsUploading(false);
                    return;
                }
            } catch (error) {
                console.error("Error uploading to ImgBB:", error);
                toast.error("An error occurred during image upload.");
                setIsUploading(false);
                return;
            }
        }

        // 3. Prepare final data payload with the prompt ID for tracking mutations
        const { thumbnail, thumbnailUrl, ...cleanUpdates } = formData;
        const updatedFields = {
            ...cleanUpdates,
            thumbnail: finalThumbnailUrl,
        };

        try {
            const promptId = prompt._id || prompt.id;

            // FIX HERE: Pass BOTH parameters explicitly
            const res = await updatePromptByUser(promptId, updatedFields);

            if (res) {
                toast.success("Prompt updated successfully!");
            }
        } catch (error) {
            console.error("Update failed:", error);
            toast.error("Something went wrong updating the prompt.");
        } finally {
            setIsUploading(false);
        }
    };

    const fieldClass = "flex flex-col gap-1.5";
    const labelClass = "text-slate-300 font-medium text-sm";
    const inputClass =
        "w-full bg-[#130b2b]/60 border border-purple-900/40 backdrop-blur-md text-white placeholder:text-slate-500 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 hover:border-purple-500/60 transition-colors";

    return (
        <div className="min-h-screen bg-[#070214] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1d0b3a] via-[#070214] to-[#020007] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <Card className="w-full max-w-2xl bg-[#0d0624]/80 border border-purple-500/20 backdrop-blur-xl shadow-[0_0_50px_-12px_rgba(168,85,247,0.2)] p-4 sm:p-6 text-white">

                <Card.Header className="flex flex-col gap-1 items-start border-b border-purple-500/10 pb-4">
                    <Card.Title className="text-2xl sm:text-3xl font-extrabold tracking-wide bg-gradient-to-r from-white via-slate-200 to-purple-400 bg-clip-text text-transparent">
                        Update Prompt
                    </Card.Title>
                    <Card.Description className="text-xs sm:text-sm text-slate-400 mt-1">
                        Editing existing prompt configuration details.
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
                                        {formData.thumbnail
                                            ? `✓ ${formData.thumbnail.name}`
                                            : formData.thumbnailUrl
                                                ? "✓ Keeping existing image (Click to change)"
                                                : "Click or Drag to upload thumbnail image"}
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
                            {isUploading ? "Updating..." : "Save Changes"}
                        </Button>
                    </form>
                </Card.Content>
            </Card>
        </div>
    );
}