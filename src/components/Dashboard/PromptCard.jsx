"use client";

import { Card, Button, Chip } from "@heroui/react";
import Link from "next/link";

export default function PromptCard({ prompt }) {
    if (!prompt) return null;
    const { _id, title, description, category, aiTool, thumbnail } = prompt;

    return (
        <Card
            isPressable
            className="w-full max-w-[300px] bg-white border border-neutral-100 text-neutral-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-neutral-200/80 transition-all duration-300 hover:-translate-y-1"
        >
            {/* Thumbnail Image Section */}
            <div className="p-0 relative aspect-square overflow-hidden bg-neutral-50">
                <img
                    alt={title || "Thumbnail"}
                    className="w-full h-full object-cover rounded-none transition-transform duration-500 hover:scale-105"
                    src={thumbnail || "https://via.placeholder.com/300"}
                />
                
                {/* Subtle light overlay for uniform image backgrounds */}
                <div className="absolute inset-0 bg-neutral-900/5 opacity-40 mix-blend-multiply" />
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3 z-10">
                    <Chip
                        size="sm"
                        className="bg-white/80 backdrop-blur-md text-neutral-700 border border-neutral-200/40 font-semibold capitalize text-[11px] px-1 shadow-sm"
                    >
                        {category}
                    </Chip>
                </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-col items-start p-5 gap-3 bg-white">
                <div className="w-full space-y-2">
                    {/* AI Tool Branding */}
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-md border border-neutral-200/40">
                            {aiTool}
                        </span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-base font-bold tracking-tight text-neutral-900 line-clamp-1 hover:text-[#0080FF] transition-colors">
                        {title}
                    </h3>
                    <p className="text-sm text-neutral-500 line-clamp-2 leading-relaxed">
                        {description}
                    </p>
                </div>

                {/* View Details Button */}
                <Link href={`/allprompts/${_id}`} className="w-full mt-2">
                    <Button
                        className="w-full bg-[#0080FF] text-white font-semibold hover:bg-[#0070DF] transition-all rounded-xl shadow-sm"
                        size="md"
                    >
                        View Details
                    </Button>
                </Link>
            </div>
        </Card>
    );
}