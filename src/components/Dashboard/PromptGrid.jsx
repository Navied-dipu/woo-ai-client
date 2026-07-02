"use client";

import { useState, useMemo } from "react";
import { Input, Select, ListBox, Pagination } from "@heroui/react"; // 1. Added Pagination here
import PromptCard from "./PromptCard";

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

export default function PromptGrid({ initialPrompts = [] }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedAiTool, setSelectedAiTool] = useState("all");
    const [selectedCategory, setSelectedCategory] = useState("all");
    
    // 2. Pagination State variables
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // Change this to how many cards you want per page

    const aiTools = useMemo(() => {
        const tools = initialPrompts.map((p) => p.aiTool).filter(Boolean);
        return ["all", ...new Set(tools)];
    }, [initialPrompts]);

    const categories = useMemo(() => {
        const cats = initialPrompts.map((p) => p.category).filter(Boolean);
        return ["all", ...new Set(cats)];
    }, [initialPrompts]);

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

    // 3. Reset to page 1 whenever a filter or search criteria changes
    useMemo(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedAiTool, selectedCategory]);

    // 4. Slice data to get only the current page's items
    const paginatedPrompts = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return filteredPrompts.slice(start, end);
    }, [filteredPrompts, currentPage, itemsPerPage]);

    // 5. Calculate total pages dynamically
    const totalPages = Math.ceil(filteredPrompts.length / itemsPerPage);

    return (
        <div className="space-y-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Control Bar Layout */}
            <div className="flex flex-col md:flex-row gap-3 w-full bg-white p-3 rounded-2xl border border-neutral-100 shadow-sm">
                
                {/* Search Bar Wrap */}
                <div className="flex-1 group">
                    <Input
                        type="text"
                        placeholder="Search prompts, tags, descriptions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        startContent={<SearchIcon />}
                        className="text-neutral-800 w-full"
                        classNames={{
                            input: "text-neutral-800 placeholder:text-neutral-400 text-xs bg-transparent outline-none border-none focus:ring-0 ml-1.5",
                            inputWrapper: [
                                "bg-neutral-50/70",
                                "border border-neutral-200/60",
                                "hover:border-neutral-300/80",
                                "focus-within:!border-[#0080FF]",
                                "transition-all duration-200",
                                "rounded-xl h-10 px-3.5"
                            ].join(" ")
                        }}
                    />
                </div>

                {/* AI Tool Dropdown Menu */}
                <div className="w-full md:w-48">
                    <Select
                        aria-label="Filter by AI Tool"
                        value={selectedAiTool}
                        onChange={setSelectedAiTool}
                        className="w-full"
                    >
                        <Select.Trigger className="bg-neutral-50/70 border border-neutral-200/60 hover:border-neutral-300/80 focus:border-[#0080FF] text-neutral-700 hover:text-neutral-900 rounded-xl flex justify-between items-center px-3.5 h-10 w-full transition-all duration-200 outline-none">
                            <span className="text-xs capitalize font-semibold tracking-wide">
                                {selectedAiTool === "all" ? "All AI Tools" : selectedAiTool}
                            </span>
                            <ChevronIcon />
                        </Select.Trigger>
                        
                        <Select.Popover className="bg-white border border-neutral-100 text-neutral-800 rounded-xl shadow-xl mt-1.5 p-1 min-w-[190px] z-50">
                            <ListBox className="p-1 gap-0.5">
                                {aiTools.map((tool) => (
                                    <ListBox.Item 
                                        id={tool} 
                                        key={tool}
                                        textValue={tool === "all" ? "All AI Tools" : tool} 
                                        className={[
                                            "capitalize text-neutral-600 text-xs px-3 py-2 rounded-lg cursor-pointer transition-all outline-none",
                                            selectedAiTool === tool ? "bg-neutral-50 text-[#0080FF] font-bold" : "hover:bg-neutral-50/80 hover:text-neutral-900"
                                        ].join(" ")}
                                    >
                                        {tool === "all" ? "All AI Tools" : tool}
                                    </ListBox.Item>
                                ))}
                            </ListBox>
                        </Select.Popover>
                    </Select>
                </div>

                {/* Category Dropdown Menu */}
                <div className="w-full md:w-48">
                    <Select
                        aria-label="Filter by Category"
                        value={selectedCategory}
                        onChange={setSelectedCategory}
                        className="w-full"
                    >
                        <Select.Trigger className="bg-neutral-50/70 border border-neutral-200/60 hover:border-neutral-300/80 focus:border-[#0080FF] text-neutral-700 hover:text-neutral-900 rounded-xl flex justify-between items-center px-3.5 h-10 w-full transition-all duration-200 outline-none">
                            <span className="text-xs capitalize font-semibold tracking-wide">
                                {selectedCategory === "all" ? "All Categories" : selectedCategory}
                            </span>
                            <ChevronIcon />
                        </Select.Trigger>
                        
                        <Select.Popover className="bg-white border border-neutral-100 text-neutral-800 rounded-xl shadow-xl mt-1.5 p-1 min-w-[190px] z-50">
                            <ListBox className="p-1 gap-0.5">
                                {categories.map((cat) => (
                                    <ListBox.Item 
                                        id={cat} 
                                        key={cat}
                                        textValue={cat === "all" ? "All Categories" : cat} 
                                        className={[
                                            "capitalize text-neutral-600 text-xs px-3 py-2 rounded-lg cursor-pointer transition-all outline-none",
                                            selectedCategory === cat ? "bg-neutral-50 text-[#0080FF] font-bold" : "hover:bg-neutral-50/80 hover:text-neutral-900"
                                        ].join(" ")}
                                    >
                                        {cat === "all" ? "All Categories" : cat}
                                    </ListBox.Item>
                                ))}
                            </ListBox>
                        </Select.Popover>
                    </Select>
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
                    {/* Render from paginatedPrompts instead of filteredPrompts */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center w-full">
                        {paginatedPrompts.map((item) => {
                            const id = item._id?.$oid || item._id || item.id;
                            return <PromptCard key={id} prompt={{ ...item, _id: id }} />;
                        })}
                    </div>

                    {/* 6. Pagination controls footer UI */}
                    {totalPages > 1 && (
                        <div className="flex justify-center pt-4">
                            <Pagination
                                isCompact
                                showControls
                                color="primary"
                                page={currentPage}
                                total={totalPages}
                                onChange={(page) => {
                                    setCurrentPage(page);
                                    window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll back to top on switch
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