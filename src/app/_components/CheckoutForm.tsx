"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { cartContext } from "../_context/cartContext";
import { Button } from "./ui/Button";
import Link from "next/link";
import { ShoppingCartItem } from "./Navbar";
import { Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import { convertToSubcurrency } from "@/utils/utils";
import { loadStripe } from "@stripe/stripe-js";
import { env } from "@/env.mjs";
import { api } from "@/utils/api";
import { useSearchParams } from "next/navigation";

const stripe = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutForm(p: { lang: string }) {
	const searchParams = useSearchParams();
	const { cart, clearCart } = useContext(cartContext);
	const [showPaymentMethods, setShowPaymentMethods] = useState(false);
	const [isClient, setIsClient] = useState(false);

	const sendDetails = api.stripe.saveDetails.useMutation({
		onSuccess: () => {
			clearCart();
		},
	});

	useEffect(() => {
		setIsClient(true);
		if (
			searchParams.get("success") &&
			searchParams.get("payment_intent") &&
			cart.cartItems.length > 0
		) {
			sendDetails.mutate({
				products: cart.cartItems,
				paymentIntent: searchParams.get("payment_intent") ?? "error",
			});
		}
	}, []);

	const handleProceedPayment = () => {
		setShowPaymentMethods(true);
	};

	if (!isClient) return <></>;

	if (searchParams.get("success"))
		return (
			<div className="flex flex-col gap-8 bg-white p-4 rounded-lg w-full text-slate-900">
				<div>
					<h1 className="font-semibold text-2xl">Payment Successful</h1>
					<p>Total: {searchParams.get("amount")}€</p>
					<p>Payment number: {searchParams.get("payment_intent")}</p>
				</div>
				<div>
					<h1 className="font-semibold text-lg">Thank you for a purchase!</h1>
					<p>We will send you all the details as soon as possible.</p>
				</div>
				<Link href={`/${p.lang}/shop`}>
					<Button variant={"secondary"}>Go Back</Button>
				</Link>
			</div>
		);

	return (
		<>
			<h1 className="pb-2 font-semibold text-5xl">Checkout</h1>
			{cart.cartItems.length === 0 && !showPaymentMethods && (
				<p className="font-light">
					Add products of your choice to cart and they will show up here.{" "}
					<Link
						href="/shop"
						className="text-blue-600 hover:text-blue-500 visited::text-indigo-600 underline"
					>
						Go to Shop.
					</Link>
				</p>
			)}
			{cart.cartItems.length > 0 && !showPaymentMethods && (
				<>
					<div className="rounded-xl h-full max-h-[28rem] overflow-scroll scrollbar">
						{cart.cartItems.map((item, index) => {
							return (
								<ShoppingCartItem
									className="mb-4 h-32 sm:h-48"
									key={item.id}
									id={Number(item.id)}
									quantity={item.quantity}
								/>
							);
						})}
					</div>
					<div className="flex flex-row justify-between items-start px-4 py-4">
						<span className="text-base">Total: {cart.total.toFixed(2)}$</span>
						<Button
							onMouseDown={handleProceedPayment}
							variant={"default"}
							size={"sm"}
							className="rounded-full"
						>
							Proceed Payment -&gt;
						</Button>
					</div>
				</>
			)}
			{cart.cartItems.length > 0 && showPaymentMethods && (
				<>
					<Elements
						stripe={stripe}
						options={{
							mode: "payment",
							amount: convertToSubcurrency(cart.total),
							currency: "eur",
						}}
					>
						<StripeCheckout lang={p.lang} />
					</Elements>
				</>
			)}
		</>
	);
}

const StripeCheckout = (p: { lang: string }) => {
	const { cart } = useContext(cartContext);

	const stripe = useStripe();
	const elements = useElements();
	const checkoutQuery = api.stripe.getClientSecret.useQuery(cart.cartItems, {
		cacheTime: 0,
	});

	const [errorMessage, setErrorMessage] = useState<string>();
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setLoading(true);

		if (!stripe || !elements) {
			return;
		}

		const { error: submitError } = await elements.submit();

		if (submitError) {
			setErrorMessage(submitError.message);
			setLoading(false);
			return;
		}

		const { error } = await stripe.confirmPayment({
			elements,
			clientSecret: checkoutQuery.data?.clientSecret,
			confirmParams: {
				return_url: `http://www.localhost:3000/${p.lang}/shop/checkout?success=true&amount=${checkoutQuery.data?.totalAmount}`,
			},
		});

		if (error) {
			setErrorMessage(error.message);
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit} className="bg-white p-4 border rounded-lg">
				<PaymentElement />

				<div className="flex justify-end">
					<Button variant={"secondary"} className="mt-4" type="submit">
						Pay {checkoutQuery.data?.totalAmount}€
					</Button>
				</div>
			</form>
			<p>{errorMessage}</p>
		</>
	);
};
