import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";
export const neonSignRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ itemId: z.number() }))
    .query(({ ctx, input }) => {
      const { itemId } = input;
      return ctx.db.neonSign.findFirst({ where: { id: itemId } });
    }),
  getRandom: publicProcedure.query(({ ctx }) => {
    const random = Math.floor(Math.random() * 20) + 1;
    return ctx.db.neonSign.findFirst({ where: { id: random } });
  }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.neonSign.findMany();
  }),
});
