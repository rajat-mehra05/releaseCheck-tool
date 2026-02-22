"use client";

import { cn } from "@/lib/cn";
import type { ReleaseStatus } from "@/lib/types";

const statusConfig: Record<ReleaseStatus, { label: string; className: string }> = {
  planned: {
    label: "Planned",
    className: cn(
      "bg-gray-100 text-gray-600",
      "dark:bg-neutral-800 dark:text-neutral-400"
    ),
  },
  ongoing: {
    label: "Ongoing",
    className: cn(
      "bg-amber-50 text-amber-700",
      "dark:bg-amber-500/10 dark:text-amber-400"
    ),
  },
  done: {
    label: "Done",
    className: cn(
      "bg-green-50 text-green-700",
      "dark:bg-green-500/10 dark:text-green-400"
    ),
  },
};

interface BadgeProps {
  status: ReleaseStatus;
  className?: string;
}

export function Badge({ status, className }: BadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}