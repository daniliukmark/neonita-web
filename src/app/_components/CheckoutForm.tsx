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
import { useTranslation } from "react-i18next";

// const stripe = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, {
// 	locale: "lt",
// });

export default function CheckoutForm(p: { lang: string }) {
	const searchParams = useSearchParams();
	const { t } = useTranslation("checkout");
	const { cart, clearCart } = useContext(cartContext);
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [showPaymentMethods, setShowPaymentMethods] = useState(false);
	const [isClient, setIsClient] = useState(false);

	const stripe = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, {
		locale: p.lang as "en" | "lt",
	});

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
					<h1 className="font-semibold text-2xl">{t("success.header")}</h1>
					<p>
						{t("success.total")}: {searchParams.get("amount")}€
					</p>
					<p>
						{t("success.pi_id")}: {searchParams.get("payment_intent")}
					</p>
				</div>
				<div>
					<h1 className="font-semibold text-lg">
						{t("success.message.header")}
					</h1>
					<p>{t("success.message.body")}</p>
				</div>
				<Link href={`/${p.lang}/shop`}>
					<Button variant={"secondary"}>{t("success.back")}</Button>
				</Link>
			</div>
		);

	return (
		<>
			<h1 className="pb-2 font-semibold text-5xl">{t("checkout")}</h1>
			{cart.cartItems.length === 0 && !showPaymentMethods && (
				<p className="font-light">
					{t("empty-cart.add-products")}{" "}
					<Link
						href="/shop"
						className="text-blue-600 hover:text-blue-500 visited::text-indigo-600 underline"
					>
						{t("empty-cart.go-to-shop")}
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
						<span className="text-base">
							{t("general.total")}: {cart.total.toFixed(2)}$
						</span>
						<Button
							onMouseDown={handleProceedPayment}
							variant={"default"}
							size={"sm"}
							className="rounded-full"
						>
							{t("general.proceed")} -&gt;
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
	const { t } = useTranslation("checkout");
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
				<CardTitle>{t("form.header")}</CardTitle>
				<CardDescription>{t("form.desc")}</CardDescription>
			</CardHeader>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)}>
					<CardContent className="space-y-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("form.name")}</FormLabel>
									<FormControl>
										<Input placeholder={t("form.enter-name")} {...field} />
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
									<FormLabel>{t("form.email")}</FormLabel>
									<FormControl>
										<Input placeholder={t("form.enter-email")} {...field} />
									</FormControl>
									<FormMessage className="text-red-500" />
								</FormItem>
							)}
						/>
					</CardContent>
					<CardFooter className="w-full">
						<div className="flex justify-end w-full">
							<Button className="mt-4" type="submit">
								{t("form.next")}
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
	const { t } = useTranslation("checkout");

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
						{t("payment.pay")} {checkoutQuery.data?.totalAmount}€
					</Button>
				</div>
			</form>
			<p>{errorMessage}</p>
		</>
	);
};
