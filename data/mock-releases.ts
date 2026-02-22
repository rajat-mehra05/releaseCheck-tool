import type { Release } from "@/lib/types";

export const mockReleases: Release[] = [
  {
    id: 1,
    name: "Version 2.1.0",
    date: "2026-03-15",
    additionalInfo: "Major feature release with new dashboard.",
    completedSteps: [0, 1, 2, 3, 4, 5, 6],
    createdAt: "2026-02-01T10:00:00Z",
    updatedAt: "2026-03-15T14:30:00Z",
  },
  {
    id: 2,
    name: "Version 2.0.1",
    date: "2026-03-01",
    additionalInfo: "Hotfix for login issue.",
    completedSteps: [0, 1, 2],
    createdAt: "2026-02-20T09:00:00Z",
    updatedAt: "2026-02-28T16:00:00Z",
  },
  {
    id: 3,
    name: "Version 2.2.0",
    date: "2026-04-01",
    additionalInfo: null,
    completedSteps: [],
    createdAt: "2026-02-22T08:00:00Z",
    updatedAt: "2026-02-22T08:00:00Z",
  },
  {
    id: 4,
    name: "Version 1.9.5",
    date: "2026-02-10",
    additionalInfo: "Security patches and dependency updates.",
    completedSteps: [0, 1, 2, 3, 4],
    createdAt: "2026-01-15T12:00:00Z",
    updatedAt: "2026-02-10T11:00:00Z",
  },
];
