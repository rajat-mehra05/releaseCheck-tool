export const APP_NAME = "ReleaseCheck";
export const APP_TAGLINE = "Your all-in-one release checklist tool";

export const TRPC_ENDPOINT = "/api/trpc";

export const TOAST_DURATION_MS = 5000;

export const RELEASE_STEPS = [
  "All relevant GitHub pull requests have been merged",
  "CHANGELOG.md files have been updated",
  "All tests are passing",
  "Releases in GitHub created",
  "Deployed in demo",
  "Tested thoroughly in demo",
  "Deployed in production",
] as const;
