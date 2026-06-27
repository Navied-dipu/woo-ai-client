"use client";

import { Card, Button, Chip } from "@heroui/react";
import Link from "next/link";

export default function PromptCard({ prompt }) {
    if (!prompt) return null;
    const { _id, title, description, category, aiTool, thumbnail } = prompt;

    return (
        <Card
            isPressable
            className="w-full max-w-[300px] bg-zinc-900/90 border border-zinc-800 text-white rounded-2xl overflow-hidden shadow-xl hover:scale-[1.02] transition-transform duration-300"
        >
            {/* Thumbnail Image Section */}
            <div className="p-0 relative aspect-square overflow-hidden bg-black">
                <img
                    alt={title || "Thumbnail"}
                    className="w-full h-full object-cover rounded-none"
                    src={thumbnail || "https://via.placeholder.com/300"}
                />
                {/* Category Badge */}
                <div className="absolute top-3 left-3 z-10">
                    <Chip
                        size="sm"
                        className="bg-black/60 backdrop-blur-md text-zinc-300 border border-zinc-700 capitalize"
                    >
                        {category}
                    </Chip>
                </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-col items-start p-4 gap-3 bg-zinc-900">
                <div className="w-full space-y-1">
                    {/* AI Tool Branding */}
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded">
                            {aiTool}
                        </span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-lg font-semibold tracking-tight text-zinc-100 line-clamp-1">
                        {title}
                    </h3>
                    <p className="text-sm text-zinc-400 line-clamp-2">
                        {description}
                    </p>
                </div>

                {/* View Details Button */}
                <Link href={`/allprompts/${_id}`}>
                    <Button
                        as={Link}

                        className="w-full bg-[#9eff00] text-black font-semibold hover:bg-[#8ae600] transition-colors rounded-xl"
                        size="md"
                    >
                        View Details
                    </Button>
                </Link>
            </div>
        </Card>
    );
}