'use client';

import React from 'react';
import { Table, Button } from '@heroui/react';
// Assuming gravity-ui/icons are installed and imported like this
import { CircleArrowDownFill } from '@gravity-ui/icons';
import { updatePrompt } from '@/lib/action/prompts';

const PromptsTable = ({ prompts }) => {

    const handleApprove = async (id) => {
        const result = await updatePrompt(id, { status: 'Approved' });
        if (result?.modifiedCount) {
            console.log(`Approved prompt with ID: ${id}`, result);
        }
    };

    const handleReject = async (id) => {
        const result = await updatePrompt(id, { status: 'Rejected' });
    };

    // Status mapping for visual styling match to marketplace aesthetics
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

    // Helper to generate initials for the placeholder icon using prompt title
    const getInitials = (title) => {
        return title ? title.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'PR';
    };

    return (
        <div className="w-full bg-white text-neutral-800 p-6 rounded-2xl border border-neutral-100 shadow-sm">
            <Table className="bg-transparent border-none">
                <Table.ScrollContainer>
                    <Table.Content aria-label="Prompt management table">
                        <Table.Header>
                            {/* Primary identifying column */}
                            <Table.Column isRowHeader className="text-neutral-500 font-semibold pb-4 border-b border-neutral-100 text-xs tracking-wider uppercase bg-neutral-50/50 p-4">
                                Prompt Title
                            </Table.Column>

                            <Table.Column className="text-neutral-500 font-semibold pb-4 border-b border-neutral-100 text-xs tracking-wider uppercase bg-neutral-50/50 p-4">
                                Category
                            </Table.Column>

                            <Table.Column className="text-neutral-500 font-semibold pb-4 border-b border-neutral-100 text-xs tracking-wider uppercase bg-neutral-50/50 p-4">
                                AI Tool
                            </Table.Column>

                            <Table.Column className="text-neutral-500 font-semibold pb-4 border-b border-neutral-100 text-xs tracking-wider uppercase bg-neutral-50/50 p-4">
                                Difficulty
                            </Table.Column>

                            <Table.Column className="text-neutral-500 font-semibold pb-4 border-b border-neutral-100 text-xs tracking-wider uppercase bg-neutral-50/50 p-4">
                                Copies
                            </Table.Column>

                            <Table.Column className="text-neutral-500 font-semibold pb-4 border-b border-neutral-100 text-xs tracking-wider uppercase bg-neutral-50/50 p-4">
                                Visibility
                            </Table.Column>

                            <Table.Column className="text-neutral-500 font-semibold pb-4 border-b border-neutral-100 text-xs tracking-wider uppercase bg-neutral-50/50 p-4">
                                Status
                            </Table.Column>

                            <Table.Column className="text-neutral-500 font-semibold pb-4 border-b border-neutral-100 text-xs tracking-wider uppercase bg-neutral-50/50 p-4 text-right">
                                Actions
                            </Table.Column>
                        </Table.Header>
                        <Table.Body>
                            {prompts?.map((prompt) => {
                                const promptId = prompt._id?.$oid || prompt._id;
                                const statusInfo = getStatusDetails(prompt.status);

                                return (
                                    <Table.Row key={promptId} className="border-b border-neutral-100 hover:bg-neutral-50/70 transition-colors">
                                        {/* Prompt Avatar & Title */}
                                        <Table.Cell className="py-4 px-4 align-middle">
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
                                        </Table.Cell>

                                        {/* Category Pill */}
                                        <Table.Cell className="py-4 px-4 align-middle">
                                            <span className="px-3 py-1 bg-neutral-100 text-neutral-600 rounded-full text-xs font-medium capitalize">
                                                {prompt.category}
                                            </span>
                                        </Table.Cell>

                                        {/* AI Tool */}
                                        <Table.Cell className="py-4 px-4 align-middle text-neutral-600 text-sm font-medium">
                                            {prompt.aiTool}
                                        </Table.Cell>

                                        {/* Difficulty */}
                                        <Table.Cell className="py-4 px-4 align-middle text-neutral-600 text-sm capitalize">
                                            {prompt.difficulty}
                                        </Table.Cell>

                                        {/* Copy Count */}
                                        <Table.Cell className="py-4 px-4 align-middle text-neutral-600 text-sm font-medium">
                                            {prompt.copyCount ?? 0}
                                        </Table.Cell>

                                        {/* Visibility */}
                                        <Table.Cell className="py-4 px-4 align-middle text-neutral-600 text-sm capitalize">
                                            {prompt.visibility}
                                        </Table.Cell>

                                        {/* Status Dot */}
                                        <Table.Cell className="py-4 px-4 align-middle">
                                            <div className="flex items-center gap-2">
                                                <CircleArrowDownFill className={`w-2 h-2 ${statusInfo.color}`} />
                                                <span className={`text-xs font-semibold ${statusInfo.color}`}>
                                                    {statusInfo.label}
                                                </span>
                                            </div>
                                        </Table.Cell>

                                        {/* Actions Panel */}
                                        <Table.Cell className="py-4 px-4 align-middle text-right">
                                            <div className="flex justify-end gap-2">
                                                {prompt.status?.toLowerCase() !== 'approved' && (
                                                    <Button
                                                        size="sm"
                                                        variant="light"
                                                        onClick={() => handleApprove(promptId)}
                                                        className="bg-[#0080FF] hover:bg-[#0070DF] text-white shadow-sm rounded-xl px-4 py-1.5 text-xs font-semibold transition-colors"
                                                    >
                                                        Approve
                                                    </Button>
                                                )}
                                                {prompt.status?.toLowerCase() !== 'rejected' && (
                                                    <Button
                                                        size="sm"
                                                        variant="light"
                                                        onClick={() => handleReject(promptId)}
                                                        className="bg-neutral-50 hover:bg-rose-50 text-neutral-600 hover:text-rose-600 border border-neutral-200/80 hover:border-rose-200 rounded-xl px-4 py-1.5 text-xs font-semibold transition-colors"
                                                    >
                                                        Reject
                                                    </Button>
                                                )}
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                );
                            })}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
            </Table>
        </div>
    );
};

export default PromptsTable;