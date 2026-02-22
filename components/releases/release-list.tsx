"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, Trash2 } from "lucide-react";
import { cn } from "@/lib/cn";
import { formatDate } from "@/lib/utils";
import type { Release } from "@/lib/types";
import { Modal } from "@/components/ui/modal";
import { EmptyState } from "@/components/ui/empty-state";
import { StatusBadge } from "./status-badge";

interface ReleaseListProps {
  releases: Release[];
  onDelete?: (id: number) => void;
}

export function ReleaseList({ releases, onDelete }: ReleaseListProps) {
  const [deleteTarget, setDeleteTarget] = useState<Release | null>(null);

  if (releases.length === 0) {
    return <EmptyState />;
  }

  return (
    <>
      <div className="overflow-x-auto border border-gray-200 dark:border-neutral-800 rounded-lg">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-neutral-800">
              <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-neutral-300">
                Release
              </th>
              <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-neutral-300">
                Date
              </th>
              <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-neutral-300">
                Status
              </th>
              <th className="px-4 py-3" />
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {releases.map((release) => (
              <tr
                key={release.id}
                className={cn(
                  "border-b last:border-b-0 border-gray-100 dark:border-neutral-800/50",
                  "hover:bg-gray-50 dark:hover:bg-neutral-800/30 transition-colors"
                )}
              >
                <td className="px-4 py-3 text-gray-700 dark:text-neutral-300">
                  {release.name}
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-neutral-300">
                  {formatDate(release.date)}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge completedSteps={release.completedSteps} />
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/releases/${release.id}`}
                    className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
                  >
                    View
                    <Eye className="h-4 w-4" />
                  </Link>
                </td>
                <td className="px-4 py-3">
                  {onDelete && (
                    <button
                      onClick={() => setDeleteTarget(release)}
                      className="inline-flex items-center gap-1.5 text-gray-500 hover:text-red-600 dark:text-neutral-400 dark:hover:text-red-400 transition-colors cursor-pointer"
                    >
                      Delete
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title={`Delete ${deleteTarget?.name}?`}
        confirmLabel="Delete"
        destructive
        onConfirm={() => {
          if (deleteTarget && onDelete) {
            onDelete(deleteTarget.id);
          }
        }}
      >
        This action cannot be undone. The release and all its progress will be permanently
        removed.
      </Modal>
    </>
  );
}
