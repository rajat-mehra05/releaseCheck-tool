import { z } from "zod/v4";
import { desc, eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "../init";
import { db } from "@/db";
import { releases } from "@/db/schema";

export const releasesRouter = router({
  list: publicProcedure.query(async () => {
    return db.select().from(releases).orderBy(desc(releases.date));
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const [release] = await db
        .select()
        .from(releases)
        .where(eq(releases.id, input.id));
      if (!release) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Release not found" });
      }
      return release;
    }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        date: z.string().min(1),
        additionalInfo: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const existingReleases = await db
        .select({ id: releases.id })
        .from(releases)
        .where(eq(releases.name, input.name));
      if (existingReleases.length > 0) {
        throw new TRPCError({
          code: "CONFLICT",
          message: `A release named "${input.name}" already exists. Please use a different version name.`,
        });
      }
      const [release] = await db
        .insert(releases)
        .values({
          name: input.name,
          date: input.date,
          additionalInfo: input.additionalInfo ?? null,
        })
        .returning();
      return release;
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().min(1).optional(),
        date: z.string().min(1).optional(),
        additionalInfo: z.string().optional(),
        completedSteps: z.array(z.number()).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      const [release] = await db
        .update(releases)
        .set({ ...data, updatedAt: new Date().toISOString() })
        .where(eq(releases.id, id))
        .returning();
      if (!release) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Release not found" });
      }
      return release;
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await db.delete(releases).where(eq(releases.id, input.id));
      return { success: true };
    }),
});
