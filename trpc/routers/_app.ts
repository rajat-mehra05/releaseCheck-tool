import { router } from "../init";
import { releasesRouter } from "./releases";

export const appRouter = router({
  releases: releasesRouter,
});

export type AppRouter = typeof appRouter;
