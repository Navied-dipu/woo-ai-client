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
        <div className="w-full bg-white text-neutral-800 p-6 rounded-2xl border border-neutral-100 shadow-sm overflow-x-auto">
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
                            <tr key={promptId} className="border-b border-neutral-100 hover:bg-neutral-50/70 transition-colors">
                                {/* Prompt Avatar & Title */}
                                <td className="py-4 px-4 align-middle">
                                    <div className="flex items-center gap-3">
                                        {prompt.thumbnail ? (
                                            <img
                                                src={prompt.thumbnail}
                                                alt={prompt.title}
                                                className="w-10 h-10 object-cover rounded-xl bg-neutral-100 border border-neutral-200/60"
                                            />
                                        ) : (
                                            <div className="w-10 h-10 flex items-center justify-center bg-neutral-100 text-neutral-600 border border-neutral-200/60 rounded-xl font-bold text-xs tracking-wider">
                                                {getInitials(prompt.title)}
                                            </div>
                                        )}
                                        <span className="font-semibold text-neutral-900 text-sm">{prompt.title}</span>
                                    </div>
                                </td>

                                {/* Category Pill */}
                                <td className="py-4 px-4 align-middle">
                                    <span className="px-3 py-1 bg-neutral-100 text-neutral-600 rounded-full text-xs font-medium capitalize">
                                        {prompt.category}
                                    </span>
                                </td>

                                {/* AI Tool */}
                                <td className="py-4 px-4 align-middle text-neutral-600 text-sm font-medium">
                                    {prompt.aiTool}
                                </td>

                                {/* Difficulty */}
                                <td className="py-4 px-4 align-middle text-neutral-600 text-sm capitalize">
                                    {prompt.difficulty}
                                </td>

                                {/* Copy Count */}
                                <td className="py-4 px-4 align-middle text-neutral-600 text-sm font-medium">
                                    {prompt.copyCount ?? 0}
                                </td>

                                {/* Visibility */}
                                <td className="py-4 px-4 align-middle text-neutral-600 text-sm capitalize">
                                    {prompt.visibility}
                                </td>

                                {/* Status */}
                                <td className="py-4 px-4 align-middle">
                                    <div className="flex items-center gap-2">
                                        <CircleArrowDownFill className={`w-2 h-2 ${statusInfo.color}`} />
                                        <span className={`text-xs font-semibold ${statusInfo.color}`}>
                                            {statusInfo.label}
                                        </span>
                                    </div>
                                </td>

                                {/* Actions */}
                                <td className="py-4 px-4 align-middle text-right">
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
    );
};

export default PromptsTable;