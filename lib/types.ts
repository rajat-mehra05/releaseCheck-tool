export type ReleaseStatus = "planned" | "ongoing" | "done";

export interface Release {
  id: number;
  name: string;
  date: string;
  additionalInfo: string | null;
  completedSteps: number[];
  createdAt: string;
  updatedAt: string;
}
