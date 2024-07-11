import CheckoutForm from "@/app/_components/CheckoutForm";

export default async function CheckoutPage(p: { params: { lang: string } }) {
	return (
		<main className="flex flex-col justify-between items-center px-4 lg:px-0 pt-24 w-full">
			<div className="gap-4 w-full max-w-2xl h-full">
				<CheckoutForm lang={p.params.lang} />
			</div>
		</main>
	);
}
