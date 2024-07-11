import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { getProducts } from "@/utils/products";
export const productsRouter = createTRPCRouter({
	getProducts: publicProcedure.query(({ ctx, input }) => {
		return getProducts();
	}),
});
