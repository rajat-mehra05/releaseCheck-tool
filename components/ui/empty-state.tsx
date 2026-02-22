"use client";

import { Package } from "lucide-react";
import { cn } from "@/lib/cn";

interface EmptyStateProps {
  title?: string;
  description?: string;
  className?: string;
}

export function EmptyState({
  title = "No releases yet",
  description = "Create your first release to get started.",
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 text-center",
        className
      )}
    >
      <div
        className={cn(
          "h-12 w-12 rounded-full flex items-center justify-center mb-4",
          "bg-gray-100 dark:bg-neutral-800"
        )}
      >
        <Package className="h-6 w-6 text-gray-400 dark:text-neutral-500" />
      </div>
      <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
        {title}
      </h3>
      <p className="text-sm text-gray-500 dark:text-neutral-400">{description}</p>
    </div>
  );
}