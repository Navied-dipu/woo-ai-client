'use client';

import React from 'react';
import { CircleArrowDownFill } from '@gravity-ui/icons';
import { updatePrompt } from '@/lib/action/prompts';
import { useRouter } from 'next/navigation';

const PromptsTable = ({ prompts }) => {
    const router = useRouter();
    
    const handleApprove = async (id) => {
        const result = await updatePrompt(id, { status: 'Approved' });
        router.refresh();
        if (result?.modifiedCount) {
            console.log(`Approved prompt with ID: ${id}`, result);
        }
    };

    const handleReject = async (id) => {
        const result = await updatePrompt(id, { status: 'Rejected' });
        router.refresh();
    };

    const getStatusDetails = (status) => {
        switch (status?.toLowerCase()) {
            case 'approved':
                return { color: 'text-emerald-600', label: 'Approved' };
            case 'rejected':
                return { color: 'text-rose-600', label: 'Rejected' };
            case 'pending':
            default:
                return { color: 'text-amber-500', label: 'Pending' };
        }
    };

    const getInitials = (title) => {
        return title ? title.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'PR';
    };

    return (
        <div className="w-full bg-white text-neutral-800 p-4 sm:p-6 rounded-2xl border border-neutral-100 shadow-sm">
            
            {/* --- MOBILE/TABLET CARD VIEW (Hidden on large screens and up) --- */}
            <div className="block lg:hidden space-y-4">
                {prompts?.length === 0 ? (
                    <div className="text-center py-8 text-neutral-400 text-sm">No prompts available.</div>
                ) : (
                    prompts?.map((prompt) => {
                        const promptId = prompt._id?.$oid || prompt._id || prompt.id;
                        const statusInfo = getStatusDetails(prompt.status);

                        return (
                            <div key={`mobile-${promptId}`} className="border border-neutral-100 rounded-xl p-4 bg-neutral-50/30 space-y-3 shadow-sm">
                                {/* Header: Avatar, Title & Status Dot */}
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-center gap-3 min-w-0">
                                        {prompt.thumbnail ? (
                                            <img
                                                src={prompt.thumbnail}
                                                alt={prompt.title}
                                                className="w-10 h-10 object-cover rounded-xl bg-neutral-100 border border-neutral-200/60 flex-shrink-0"
                                            />
                                        ) : (
                                            <div className="w-10 h-10 flex items-center justify-center bg-neutral-100 text-neutral-600 border border-neutral-200/60 rounded-xl font-bold text-xs tracking-wider flex-shrink-0">
                                                {getInitials(prompt.title)}
                                            </div>
                                        )}
                                        <span className="font-semibold text-neutral-900 text-sm truncate">{prompt.title}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 flex-shrink-0 pt-1">
                                        <CircleArrowDownFill className={`w-2 h-2 ${statusInfo.color}`} />
                                        <span className={`text-xs font-semibold ${statusInfo.color}`}>{statusInfo.label}</span>
                                    </div>
                                </div>

                                {/* Metadata Grid */}
                                <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs pt-2 border-t border-neutral-100 text-neutral-600">
                                    <div><span className="text-neutral-400 block">Category</span> <span className="capitalize font-medium">{prompt.category || "—"}</span></div>
                                    <div><span className="text-neutral-400 block">AI Tool</span> <span className="font-medium">{prompt.aiTool || "—"}</span></div>
                                    <div><span className="text-neutral-400 block">Difficulty</span> <span className="capitalize font-medium">{prompt.difficulty || "—"}</span></div>
                                    <div><span className="text-neutral-400 block">Copies</span> <span className="font-medium">{prompt.copyCount ?? 0}</span></div>
                                    <div className="col-span-2"><span className="text-neutral-400 block">Visibility</span> <span className="capitalize font-medium">{prompt.visibility || "—"}</span></div>
                                </div>

                                {/* Actions Row */}
                                <div className="flex gap-2 justify-end pt-3 border-t border-neutral-100">
                                    {prompt.status?.toLowerCase() !== 'approved' && (
                                        <button
                                            onClick={() => handleApprove(promptId)}
                                            className="w-full sm:w-auto text-center bg-[#0080FF] hover:bg-[#0070DF] text-white shadow-sm rounded-xl px-4 py-2 text-xs font-semibold transition-colors"
                                        >
                                            Approve
                                        </button>
                                    )}
                                    {prompt.status?.toLowerCase() !== 'rejected' && (
                                        <button
                                            onClick={() => handleReject(promptId)}
                                            className="w-full sm:w-auto text-center bg-white hover:bg-rose-50 text-neutral-600 hover:text-rose-600 border border-neutral-200 hover:border-rose-200 rounded-xl px-4 py-2 text-xs font-semibold transition-colors"
                                        >
                                            Reject
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* --- DESKTOP TABLE VIEW (Visible on large screens and up) --- */}
            <div className="hidden lg:block overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm">
                    <thead>
                        <tr className="border-b border-neutral-100">
                            <th className="text-neutral-500 font-semibold pb-4 text-xs tracking-wider uppercase bg-neutral-50/50 p-4">Prompt Title</th>
                            <th className="text-neutral-500 font-semibold pb-4 text-xs tracking-wider uppercase bg-neutral-50/50 p-4">Category</th>
                            <th className="text-neutral-500 font-semibold pb-4 text-xs tracking-wider uppercase bg-neutral-50/50 p-4">AI Tool</th>
                            <th className="text-neutral-500 font-semibold pb-4 text-xs tracking-wider uppercase bg-neutral-50/50 p-4">Difficulty</th>
                            <th className="text-neutral-500 font-semibold pb-4 text-xs tracking-wider uppercase bg-neutral-50/50 p-4">Copies</th>
                            <th className="text-neutral-500 font-semibold pb-4 text-xs tracking-wider uppercase bg-neutral-50/50 p-4">Visibility</th>
                            <th className="text-neutral-500 font-semibold pb-4 text-xs tracking-wider uppercase bg-neutral-50/50 p-4">Status</th>
                            <th className="text-neutral-500 font-semibold pb-4 text-xs tracking-wider uppercase bg-neutral-50/50 p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prompts?.map((prompt) => {
                            const promptId = prompt._id?.$oid || prompt._id || prompt.id;
                            const statusInfo = getStatusDetails(prompt.status);

                            return (
                                <tr key={`table-${promptId}`} className="border-b border-neutral-100 hover:bg-neutral-50/70 transition-colors">
                                    <td className="py-4 px-4 align-middle">
                                        <div className="flex items-center gap-3 max-w-xs">
                                            {prompt.thumbnail ? (
                                                <img
                                                    src={prompt.thumbnail}
                                                    alt={prompt.title}
                                                    className="w-10 h-10 object-cover rounded-xl bg-neutral-100 border border-neutral-200/60 flex-shrink-0"
                                                />
                                            ) : (
                                                <div className="w-10 h-10 flex items-center justify-center bg-neutral-100 text-neutral-600 border border-neutral-200/60 rounded-xl font-bold text-xs tracking-wider flex-shrink-0">
                                                    {getInitials(prompt.title)}
                                                </div>
                                            )}
                                            <span className="font-semibold text-neutral-900 text-sm truncate">{prompt.title}</span>
                                        </div>
                                    </td>

                                    <td className="py-4 px-4 align-middle whitespace-nowrap">
                                        <span className="px-3 py-1 bg-neutral-100 text-neutral-600 rounded-full text-xs font-medium capitalize">
                                            {prompt.category}
                                        </span>
                                    </td>

                                    <td className="py-4 px-4 align-middle text-neutral-600 text-sm font-medium whitespace-nowrap">
                                        {prompt.aiTool}
                                    </td>

                                    <td className="py-4 px-4 align-middle text-neutral-600 text-sm capitalize whitespace-nowrap">
                                        {prompt.difficulty}
                                    </td>

                                    <td className="py-4 px-4 align-middle text-neutral-600 text-sm font-medium whitespace-nowrap">
                                        {prompt.copyCount ?? 0}
                                    </td>

                                    {/* <td className="py-4 px-4 align-middle text-neutral-600 text-sm capitalize whitespace-nowrap">
                                        {prompt.visibility}
                                    </td> */}

                                    <td className="py-4 px-4 align-middle whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <CircleArrowDownFill className={`w-2 h-2 ${statusInfo.color}`} />
                                            <span className={`text-xs font-semibold ${statusInfo.color}`}>
                                                {statusInfo.label}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="py-4 px-4 align-middle text-right whitespace-nowrap">
                                        <div className="flex justify-end gap-2">
                                            {prompt.status?.toLowerCase() !== 'approved' && (
                                                <button
                                                    onClick={() => handleApprove(promptId)}
                                                    className="bg-[#0080FF] hover:bg-[#0070DF] text-white shadow-sm rounded-xl px-4 py-1.5 text-xs font-semibold transition-colors"
                                                >
                                                    Approve
                                                </button>
                                            )}
                                            {prompt.status?.toLowerCase() !== 'rejected' && (
                                                <button
                                                    onClick={() => handleReject(promptId)}
                                                    className="bg-neutral-50 hover:bg-rose-50 text-neutral-600 hover:text-rose-600 border border-neutral-200/80 hover:border-rose-200 rounded-xl px-4 py-1.5 text-xs font-semibold transition-colors"
                                                >
                                                    Reject
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PromptsTable;