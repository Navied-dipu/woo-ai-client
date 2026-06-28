// savePromptsTable.jsx
"use client";
import React, { useState } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Avatar, // Using Avatar + standard flex wrappers to prevent the <User> import crash
  Button,
  Tooltip
} from "@heroui/react";
import { deleteSavedPrompt } from '@/lib/action/prompts';


const TrashIcon = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98M8.5 4.97l.22-1.31C8.88 2.89 9 2 10.28 2h3.44c1.28 0 1.41.93 1.47 1.67l.22 1.3"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M18.85 9.14l-.65 10.07C18.11 20.73 18 22 16.2 22H7.8c-1.8 0-1.91-1.27-1.99-2.79L5.15 9.14M10.33 16.5h3.33M9.5 12.5h5"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </svg>
);

export default function SavedPromptsTable({ currentUser, savedPrompts = [] }) {
  const [prompts, setPrompts] = useState(savedPrompts);
  const [isDeleting, setIsDeleting] = useState(null);

  const handleDelete = async (promptId) => {
    if (!confirm("Are you sure you want to remove this saved prompt?")) return;

    setIsDeleting(promptId);
    try {
      // 1. Capture the response returned by your helper action
      const result = await deleteSavedPrompt(currentUser.id, promptId); 

      // 2. Validate condition safely based on common custom wrapper formats
      if (!result?.error || result?.success) {
        setPrompts(prev => prev.filter(item => item.id !== promptId));
      } else {
        alert("Failed to delete the prompt. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting prompt:", error);
      alert("An error occurred while deleting.");
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <Table aria-label="Saved prompts tracking table" shadow="sm">
      <TableHeader>
        <TableColumn>PROMPT</TableColumn>
        <TableColumn>CATEGORY</TableColumn>
        <TableColumn>AI TOOL</TableColumn>
        <TableColumn>SAVED AT</TableColumn>
        <TableColumn align="center">ACTIONS</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No saved prompts to display."}>
        {prompts.map((prompt) => (
          <TableRow key={prompt.id}>
            {/* Swapped <User> out for a bulletproof layout that matches visually */}
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar radius="lg" src={prompt.thumbnail} name={prompt.title} size="sm" />
                <div className="flex flex-col global-text-alignment">
                  <span className="text-sm font-semibold text-default-800 leading-tight">
                    {prompt.title}
                  </span>
                  <span className="text-xs text-default-400 max-w-[250px] truncate">
                    {prompt.description}
                  </span>
                </div>
              </div>
            </TableCell>

            <TableCell>
              <span className="capitalize text-sm px-2 py-1 bg-default-100 rounded text-default-600">
                {prompt.category}
              </span>
            </TableCell>

            <TableCell>
              <span className="text-sm font-medium text-default-500">
                {prompt.aiTool}
              </span>
            </TableCell>

            <TableCell>
              <span className="text-xs text-default-400">
                {new Date(prompt.savedAt).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            </TableCell>

            <TableCell>
              <div className="relative flex items-center justify-center gap-2">
                <Tooltip color="danger" content="Delete bookmark">
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    color="danger"
                    isLoading={isDeleting === prompt.id}
                    onClick={() => handleDelete(prompt.id)}
                  >
                    <TrashIcon className="text-lg" />
                  </Button>
                </Tooltip>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}