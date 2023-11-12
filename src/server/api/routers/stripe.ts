import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { env } from "@/env.mjs";
const stripe = require("stripe")(env.PUBLIC_STRIPE_PUBLISHABLE_KEY);

export const stripeRouter = createTRPCRouter({
  getClientSecret: publicProcedure
    .input(z.object({ id: z.string(), quantity: z.number().positive() }))
    .query(async ({ ctx, input }) => {
      try {
        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
          line_items: [
            {
              // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
              price: "{{PRICE_ID}}",
              quantity: 1,
            },
          ],
          mode: "payment",
          success_url: `${req.headers.origin}/?success=true`,
          cancel_url: `${req.headers.origin}/?canceled=true`,
        });
        res.redirect(303, session.url);
      } catch (err) {
        res.status(err.statusCode || 500).json(err.message);
      }
    }),
});
