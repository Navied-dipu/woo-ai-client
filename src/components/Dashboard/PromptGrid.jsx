"use client";

import { useState, useMemo, useEffect } from "react";
import { Pagination } from "@heroui/react";
import PromptCard from "./PromptCard";

// ==========================================
// SVG Icon Components
// ==========================================
const SearchIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-4 h-4 text-neutral-400 transition-colors group-focus-within:text-[#0080FF]"
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.604 10.604z" />
    </svg>
);

const ChevronIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-3.5 h-3.5 text-neutral-400"
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
);

// ==========================================
// Main Grid Component
// ==========================================
export default function PromptGrid({ initialPrompts = [] }) {
    // 1. Core State
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedAiTool, setSelectedAiTool] = useState("all");
    const [selectedCategory, setSelectedCategory] = useState("all");

    // 2. Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // Adjust this number to change cards per page

    // 3. Extract Unique AI Tools for filter dropdown
    const aiTools = useMemo(() => {
        const tools = initialPrompts.map((p) => p.aiTool).filter(Boolean);
        return ["all", ...new Set(tools)];
    }, [initialPrompts]);

    // 4. Extract Unique Categories for filter dropdown
    const categories = useMemo(() => {
        const cats = initialPrompts.map((p) => p.category).filter(Boolean);
        return ["all", ...new Set(cats)];
    }, [initialPrompts]);

    // 5. Filter the source dataset based on user inputs
    const filteredPrompts = useMemo(() => {
        return initialPrompts.filter((prompt) => {
            const matchesSearch =
                !searchQuery ||
                prompt.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                prompt.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                prompt.tags?.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesAiTool =
                selectedAiTool === "all" || prompt.aiTool === selectedAiTool;

            const matchesCategory =
                selectedCategory === "all" || prompt.category === selectedCategory;

            return matchesSearch && matchesAiTool && matchesCategory;
        });
    }, [searchQuery, selectedAiTool, selectedCategory, initialPrompts]);

    // 6. Reset back to page 1 automatically if the user types or alters filters
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedAiTool, selectedCategory]);

    // 7. Extract the exact slice of items required for the active page
    const paginatedPrompts = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return filteredPrompts.slice(start, end);
    }, [filteredPrompts, currentPage, itemsPerPage]);

    // 8. Dynamic Page Counter calculation
    const totalPages = Math.ceil(filteredPrompts.length / itemsPerPage);

    return (
        <div className="space-y-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Control Bar Layout (Search & Dropdowns) */}
            <div className="flex flex-col md:flex-row gap-3 w-full bg-white p-3 rounded-2xl border border-neutral-100 shadow-sm">

                {/* Search Input */}
                <div className="flex-1 group flex items-center gap-2 bg-neutral-50/70 border border-neutral-200/60 hover:border-neutral-300/80 focus-within:border-[#0080FF] transition-all duration-200 rounded-xl h-10 px-3.5">
                    <SearchIcon />
                    <input
                        type="text"
                        placeholder="Search prompts, tags, descriptions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="text-neutral-800 placeholder:text-neutral-400 text-xs bg-transparent outline-none border-none flex-1"
                    />
                </div>

                {/* AI Tool Dropdown */}
                <div className="w-full md:w-48">
                    <select
                        aria-label="Filter by AI Tool"
                        value={selectedAiTool}
                        onChange={(e) => setSelectedAiTool(e.target.value)}
                        className="bg-neutral-50/70 border border-neutral-200/60 hover:border-neutral-300/80 focus:border-[#0080FF] text-neutral-700 hover:text-neutral-900 rounded-xl px-3.5 h-10 w-full transition-all duration-200 outline-none text-xs capitalize font-semibold tracking-wide appearance-none cursor-pointer"
                    >
                        {aiTools.map((tool) => (
                            <option key={tool} value={tool} className="text-neutral-800 bg-white">
                                {tool === "all" ? "All AI Tools" : tool}
                            </option>
                        ))}
                    </select>
                    {/* Native select arrow adjustment */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-neutral-400">
                        <ChevronIcon />
                    </div>
                </div>

                {/* Category Dropdown */}
                <div className="w-full md:w-48">
                    <select
                        aria-label="Filter by Category"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="bg-neutral-50/70 border border-neutral-200/60 hover:border-neutral-300/80 focus:border-[#0080FF] text-neutral-700 hover:text-neutral-900 rounded-xl px-3.5 h-10 w-full transition-all duration-200 outline-none text-xs capitalize font-semibold tracking-wide appearance-none cursor-pointer"
                    >
                        {categories.map((cat) => (
                            <option key={cat} value={cat} className="text-neutral-800 bg-white">
                                {cat === "all" ? "All Categories" : cat}
                            </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-neutral-400">
                        <ChevronIcon />
                    </div>
                </div>
            </div>

            {/* Grid Viewport */}
            {filteredPrompts.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[35vh] text-center bg-neutral-50/50 border border-neutral-100 rounded-2xl p-6 shadow-sm">
                    <p className="text-neutral-800 text-sm font-semibold">No results found</p>
                    <p className="text-neutral-400 text-xs mt-1">Try tweaking your filters or search criteria.</p>
                </div>
            ) : (
                <div className="space-y-8 flex flex-col items-center">

                    {/* Elements Grid (Displays only items for current page) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center w-full">
                        {paginatedPrompts.map((item) => {
                            const id = item._id?.$oid || item._id || item.id;
                            return <PromptCard key={id} prompt={{ ...item, _id: id }} />;
                        })}
                    </div>

                    {/* Pagination Footer (Only visible if more than 1 page exists) */}
                    {totalPages > 1 && (
                        <div className="flex justify-center pt-4">
                            <Pagination
                                showControls
                                color="primary"
                                page={currentPage}
                                total={totalPages}
                                onChange={(page) => {
                                    setCurrentPage(page); // Changes active page state
                                    window.scrollTo({ top: 0, behavior: "smooth" }); // Scrolls viewport smoothly back up
                                }}
                                classNames={{
                                    wrapper: "gap-1 shadow-none bg-transparent",
                                    item: "w-8 h-8 text-xs font-medium rounded-xl border border-neutral-200/60 text-neutral-600 bg-white hover:bg-neutral-50 data-[active=true]:bg-[#0080FF] data-[active=true]:text-white data-[active=true]:border-[#0080FF]",
                                    cursor: "bg-[#0080FF] rounded-xl"
                                }}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}