import type { InferSelectModel } from "drizzle-orm";
import type { releases } from "@/db/schema";

export type Release = InferSelectModel<typeof releases>;
export type ReleaseStatus = "planned" | "ongoing" | "done";
