import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";
export const neonSignRouter = createTRPCRouter({
  getMultipleById: publicProcedure
    .input(z.object({ ids: z.number().array() }))
    .query(({ ctx, input }) => {
      const { ids } = input;
      return ctx.db.neonSign.findMany({ where: { id: { in: ids } } });
    }),
  getById: publicProcedure
    .input(z.object({ itemId: z.number() }))
    .query(({ ctx, input }) => {
      const { itemId } = input;
      return ctx.db.neonSign.findFirst({ where: { id: itemId } });
    }),
  pagination: publicProcedure
    .input(
      z.object({
        cursor: z.number().min(1),
        limit: z.number().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 9;
      const { cursor } = input;
      const items = await ctx.db.neonSign.findMany({
        cursor: cursor ? { id: cursor } : undefined,
        take: limit + 1,
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem!.id;
      }
      return {
        items,
        nextCursor,
      };
    }),
  getRandom: publicProcedure.query(({ ctx }) => {
    const random = Math.floor(Math.random() * 20) + 1;
    return ctx.db.neonSign.findFirst({ where: { id: random } });
  }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.neonSign.findMany();
  }),
});
