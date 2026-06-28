"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Avatar,
  Button,
  Chip,
  Tooltip,
} from "@heroui/react";
import { deleteSavedPrompt } from "@/lib/action/prompts";

const columns = [
  { key: "prompt", label: "PROMPT" },
  { key: "category", label: "CATEGORY" },
  { key: "aiTool", label: "AI TOOL" },
  { key: "savedAt", label: "SAVED AT" },
  { key: "actions", label: "ACTIONS" },
];

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

export default function SavedPromptsTable({
  currentUser,
  savedPrompts = [],
}) {
  const [prompts, setPrompts] = useState([]);
  const [isDeleting, setIsDeleting] = useState(null);

  useEffect(() => {
    const validPrompts = Array.isArray(savedPrompts)
      ? savedPrompts.filter(
          (item) => item && (item.id || item._id)
        )
      : [];

    setPrompts(validPrompts);
  }, [savedPrompts]);

  const handleDelete = useCallback(
    async (promptId) => {
      if (
        !confirm(
          "Are you sure you want to remove this saved prompt?"
        )
      ) {
        return;
      }

      setIsDeleting(promptId);

      try {
        const result = await deleteSavedPrompt(
          currentUser.id,
          promptId
        );

        if (!result?.error || result?.success) {
          setPrompts((prev) =>
            prev.filter(
              (item) =>
                (item.id || item._id) !== promptId
            )
          );
        } else {
          alert("Failed to delete prompt.");
        }
      } catch (error) {
        console.error(error);
        alert("Error deleting prompt.");
      } finally {
        setIsDeleting(null);
      }
    },
    [currentUser]
  );

  const renderCell = useCallback(
    (prompt, columnKey) => {
      const promptId = prompt.id || prompt._id;

      switch (columnKey) {
        case "prompt":
          return (
            <div className="flex items-center gap-3">
              <Avatar
                src={prompt.thumbnail}
                name={prompt.title}
                size="sm"
                radius="lg"
              />
              <div className="flex flex-col">
                <span className="font-semibold">
                  {prompt.title}
                </span>
                <span className="text-xs text-default-400 truncate max-w-[200px]">
                  {prompt.description}
                </span>
              </div>
            </div>
          );

        case "category":
          return (
            <Chip size="sm" variant="flat">
              {prompt.category}
            </Chip>
          );

        case "aiTool":
          return prompt.aiTool;

        case "savedAt":
          return prompt.savedAt
            ? new Date(
                prompt.savedAt
              ).toLocaleDateString()
            : "-";

        case "actions":
          return (
            <Tooltip content="Delete" color="danger">
              <Button
                isIconOnly
                size="sm"
                color="danger"
                variant="light"
                isLoading={isDeleting === promptId}
                onClick={() =>
                  handleDelete(promptId)
                }
              >
                <TrashIcon />
              </Button>
            </Tooltip>
          );

        default:
          return null;
      }
    },
    [handleDelete, isDeleting]
  );

  return (
    <Table aria-label="Saved prompts table">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.key}>
            {column.label}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody
        items={prompts}
        emptyContent="No saved prompts found."
      >
        {(item) => (
          <TableRow key={item.id || item._id}>
            {(columnKey) => (
              <TableCell>
                {renderCell(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}