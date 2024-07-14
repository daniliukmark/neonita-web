"use client";

import { useContext, useEffect, useState } from "react";
import { cartContext } from "../_context/cartContext";
import { Button } from "./ui/Button";
import Link from "next/link";
import { ShoppingCartItem } from "./Navbar";
import {
	AddressElement,
	Elements,
	useElements,
	PaymentElement,
	useStripe,
} from "@stripe/react-stripe-js";
import { convertToSubcurrency } from "@/utils/utils";
import { loadStripe } from "@stripe/stripe-js";
import { env } from "@/env.mjs";
import { api } from "@/utils/api";
import { useSearchParams } from "next/navigation";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card";

const stripe = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutForm(p: { lang: string }) {
	const searchParams = useSearchParams();
	const { cart, clearCart } = useContext(cartContext);
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [showPaymentMethods, setShowPaymentMethods] = useState(false);
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
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
			{!email && cart.cartItems.length > 0 && showPaymentMethods && (
				<GetEmail setEmail={setEmail} setName={setName} />
			)}
			{email && cart.cartItems.length > 0 && showPaymentMethods && (
				<>
					<Elements
						stripe={stripe}
						options={{
							mode: "payment",
							amount: convertToSubcurrency(cart.total),
							currency: "eur",
						}}
					>
						<StripeCheckout lang={p.lang} email={email} name={name} />
					</Elements>
				</>
			)}
		</>
	);
}

const formSchema = z.object({
	name: z.string().min(2).max(200),
	email: z.string().email(),
});

const GetEmail = (p: {
	setEmail: (value: string) => void;
	setName: (value: string) => void;
}) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
		},
	});
	const handleSubmit = (values: z.infer<typeof formSchema>) => {
		p.setEmail(values.email);
		p.setName(values.name);
	};

	return (
		<Card className="bg-stone-900">
			<CardHeader>
				<CardTitle>Enter Contact Details</CardTitle>
				<CardDescription>
					We will use it to contact you and keep you up to date with updates
					about the state of your order.
				</CardDescription>
			</CardHeader>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)}>
					<CardContent className="space-y-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input placeholder="Enter name" {...field} />
									</FormControl>
									<FormMessage className="text-red-500" />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder="Enter email" {...field} />
									</FormControl>
									<FormMessage className="text-red-500" />
								</FormItem>
							)}
						/>
					</CardContent>
					<CardFooter className="w-full">
						<div className="flex justify-end w-full">
							<Button className="mt-4" type="submit">
								Next
							</Button>
						</div>
					</CardFooter>
				</form>
			</Form>
		</Card>
	);
};

const StripeCheckout = (p: { lang: string; email: string; name: string }) => {
	const stripe = useStripe();
	const elements = useElements();

	const { cart } = useContext(cartContext);
	const [errorMessage, setErrorMessage] = useState<string>();

	const checkoutQuery = api.stripe.getClientSecret.useQuery(
		{ email: p.email, name: p.name, products: cart.cartItems },
		{
			cacheTime: 0,
		},
	);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!stripe || !elements) {
			return;
		}

		const { error: submitError } = await elements.submit();

		if (submitError) {
			setErrorMessage(submitError.message);
			return;
		}

		const { error } = await stripe.confirmPayment({
			elements,
			clientSecret: checkoutQuery.data?.clientSecret ?? "",
			confirmParams: {
				return_url: `${env.NEXT_PUBLIC_BASE_URL}/${p.lang}/shop/checkout?success=true&amount=${checkoutQuery.data?.totalAmount}`,
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
				<AddressElement options={{ mode: "shipping" }} />
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
