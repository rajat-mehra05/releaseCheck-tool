"use client";

import { Badge } from "@/components/ui/badge";
import { computeStatus } from "@/lib/utils";

interface StatusBadgeProps {
  completedSteps: number[];
  className?: string;
}

export function StatusBadge({ completedSteps, className }: StatusBadgeProps) {
  const status = computeStatus(completedSteps);
  return <Badge status={status} className={className} />;
}
