import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { env } from "@/env.mjs";
import { getProducts } from "@/utils/products";
import { convertToSubcurrency } from "@/utils/utils";
import { Resend } from "resend";

const resend = new Resend(env.RESEND_API_KEY);

const stripe = require("stripe")(env.STRIPE_SECRET_KEY);
export const stripeRouter = createTRPCRouter({
	getClientSecret: publicProcedure
		.input(
			z.array(z.object({ id: z.string(), quantity: z.number().positive() })),
		)
		.query(async ({ ctx, input }) => {
			try {
				let amount = 0;
				const products = await getProducts();

				for (const entry of input) {
					const product = products.find((p) => p.id.toString() === entry.id);
					if (!product) continue;
					amount += entry.quantity * product.price;
				}

				const paymentIntent = await stripe.paymentIntents.create({
					amount: convertToSubcurrency(amount),
					currency: "eur",
					automatic_payment_methods: { enabled: true },
				});

				return {
					clientSecret: paymentIntent.client_secret,
					totalAmount: amount.toFixed(2),
				};
			} catch (error) {
				console.error("Internal Error:", error);
				// Handle other errors (e.g., network issues, parsing errors)
				return { error: `Internal Server Error: ${error}`, status: 500 };
			}
		}),
	saveDetails: publicProcedure
		.input(
			z.object({
				products: z.array(
					z.object({ id: z.string(), quantity: z.number().positive() }),
				),
				paymentIntent: z.string(),
			}),
		)
		.mutation(({ ctx, input }) => {
			let productsPrepared = "";

			for (const product of input.products) {
				productsPrepared += `id: ${product.id}, quantity: ${product.quantity}\t`;
			}

			resend.emails.send({
				from: "onboarding@resend.dev",
				to: "roawide3@gmail.com",
				subject: `STIPE ORDER: ${input.paymentIntent}`,
				html: `<h1>${input.paymentIntent}<h1><p>${productsPrepared}</p>`,
			});
		}),
});
