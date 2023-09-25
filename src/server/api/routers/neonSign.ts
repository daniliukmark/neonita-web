import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const neonSignRouter = createTRPCRouter({
  hello: publicProcedure.query(async () => {
    return {
      greeting: `Helloaaaa}`,
    };
  }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.neonSign.findMany();
  }),
});
