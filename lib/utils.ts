import { RELEASE_STEPS } from "./constants";
import type { ReleaseStatus } from "./types";

export function computeStatus(completedSteps: number[]): ReleaseStatus {
  if (completedSteps.length === 0) return "planned";
  if (completedSteps.length === RELEASE_STEPS.length) return "done";
  return "ongoing";
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
