import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const neonSignRouter = createTRPCRouter({
  getById: publicProcedure.query(({ ctx }) => {
    return ctx.db.neonSign.findMany();
  }),
  getRandom: publicProcedure.query(({ ctx }) => {
    const random = Math.floor(Math.random() * 20) + 1;
    return ctx.db.neonSign.findFirst({ where: { id: random } });
  }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.neonSign.findMany();
  }),
});
