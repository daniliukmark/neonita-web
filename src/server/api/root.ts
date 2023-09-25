import { createTRPCRouter } from "@/server/api/trpc";
import { neonSignRouter } from "./routers/neonSign";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  neonSign: neonSignRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
