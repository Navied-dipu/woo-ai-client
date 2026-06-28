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

    // Status mapping for visual styling
    const getStatusDetails = (status) => {
        switch (status?.toLowerCase()) {
            case 'approved':
                return { color: 'text-emerald-500', label: 'Approved' };
            case 'rejected':
                return { color: 'text-rose-500', label: 'Rejected' };
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
        <div className="w-full bg-[#121214] text-neutral-200 p-6 rounded-lg">
            <Table className="bg-transparent border-none">
                <Table.ScrollContainer>
                    <Table.Content aria-label="Prompt management table">
                        <Table.Header>
                            {/* Primary identifying column */}
                            <Table.Column isRowHeader className="text-neutral-400 font-medium pb-4 border-b border-neutral-800">
                                Prompt Title
                            </Table.Column>

                            <Table.Column className="text-neutral-400 font-medium pb-4 border-b border-neutral-800">
                                Category
                            </Table.Column>

                            <Table.Column className="text-neutral-400 font-medium pb-4 border-b border-neutral-800">
                                AI Tool
                            </Table.Column>

                            <Table.Column className="text-neutral-400 font-medium pb-4 border-b border-neutral-800">
                                Difficulty
                            </Table.Column>

                            <Table.Column className="text-neutral-400 font-medium pb-4 border-b border-neutral-800">
                                Copies
                            </Table.Column>

                            <Table.Column className="text-neutral-400 font-medium pb-4 border-b border-neutral-800">
                                Visibility
                            </Table.Column>

                            <Table.Column className="text-neutral-400 font-medium pb-4 border-b border-neutral-800">
                                Status
                            </Table.Column>

                            <Table.Column className="text-neutral-400 font-medium pb-4 border-b border-neutral-800 text-right">
                                Actions
                            </Table.Column>
                        </Table.Header>
                        <Table.Body>
                            {prompts?.map((prompt) => {
                                const promptId = prompt._id?.$oid || prompt._id;
                                const statusInfo = getStatusDetails(prompt.status);

                                return (
                                    <Table.Row key={promptId} className="border-b border-neutral-800/50 hover:bg-neutral-900/30 transition-colors">
                                        {/* Prompt Avatar & Title */}
                                        <Table.Cell className="py-4 align-middle">
                                            <div className="flex items-center gap-3">
                                                {prompt.thumbnail ? (
                                                    <img 
                                                        src={prompt.thumbnail} 
                                                        alt={prompt.title} 
                                                        className="w-9 h-9 object-cover rounded bg-neutral-800"
                                                    />
                                                ) : (
                                                    <div className="w-9 h-9 flex items-center justify-center bg-neutral-800 text-neutral-300 rounded font-semibold text-sm tracking-wider">
                                                        {getInitials(prompt.title)}
                                                    </div>
                                                )}
                                                <span className="font-medium text-neutral-200">{prompt.title}</span>
                                            </div>
                                        </Table.Cell>

                                        {/* Category Pill */}
                                        <Table.Cell className="py-4 align-middle">
                                            <span className="px-3 py-1 bg-neutral-800/60 text-neutral-400 rounded-full text-xs capitalize">
                                                {prompt.category}
                                            </span>
                                        </Table.Cell>

                                        {/* AI Tool */}
                                        <Table.Cell className="py-4 align-middle text-neutral-400">
                                            {prompt.aiTool}
                                        </Table.Cell>

                                        {/* Difficulty */}
                                        <Table.Cell className="py-4 align-middle text-neutral-400 capitalize">
                                            {prompt.difficulty}
                                        </Table.Cell>

                                        {/* Copy Count */}
                                        <Table.Cell className="py-4 align-middle text-neutral-400">
                                            {prompt.copyCount ?? 0}
                                        </Table.Cell>

                                        {/* Visibility */}
                                        <Table.Cell className="py-4 align-middle text-neutral-400 capitalize">
                                            {prompt.visibility}
                                        </Table.Cell>

                                        {/* Status Dot */}
                                        <Table.Cell className="py-4 align-middle">
                                            <div className="flex items-center gap-2">
                                                <CircleArrowDownFill className={`w-2 h-2 ${statusInfo.color}`} />
                                                <span className={`text-sm font-medium ${statusInfo.color}`}>
                                                    {statusInfo.label}
                                                </span>
                                            </div>
                                        </Table.Cell>
                                    
                                        {/* Actions Panel */}
                                        <Table.Cell className="py-4 align-middle text-right">
                                            <div className="flex justify-end gap-2">
                                                {prompt.status?.toLowerCase() !== 'approved' && (
                                                    <Button
                                                        size="sm"
                                                        variant="light"
                                                        onClick={() => handleApprove(promptId)}
                                                        className="bg-emerald-950/30 hover:bg-emerald-900/50 text-emerald-500 border border-emerald-900/60 rounded px-3 py-1 text-xs font-medium transition-colors"
                                                    >
                                                        Approve
                                                    </Button>
                                                )}
                                                {prompt.status?.toLowerCase() !== 'rejected' && (
                                                    <Button
                                                        size="sm"
                                                        variant="light"
                                                        onClick={() => handleReject(promptId)}
                                                        className="bg-rose-950/20 hover:bg-rose-900/40 text-rose-500 border border-rose-900/40 rounded px-3 py-1 text-xs font-medium transition-colors"
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