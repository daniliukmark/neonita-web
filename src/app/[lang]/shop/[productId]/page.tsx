import { serverClient } from "@/app/_trpc/serverClient";
import Image from "next/image";
import { AspectRatio } from "@/app/_components/ui/aspect-ratio";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/app/_components/ui/accordion";
import AddToCartButton from "@/app/_components/addToCartButton";
import { Product } from "@/app/_context/productContext";
import { useTranslation } from "@/app/i18n";

const MainImage = ({ p }: { p: Product }) => {
	return (
		<div className="absolute inset-4 rounded-lg overflow-hidden">
			<div className="-left-1/2 absolute w-full h-full">
				<AspectRatio
					className="opacity-70 blur-xl mix-blend-lighten"
					ratio={1 / 2}
				>
					<Image
						src={`/product_images/${p.image}`}
						sizes="(max-width: 768px) 1vw, (max-width: 1200px) 1vw, 1vw"
						alt="Blured product photo"
						fill
						unoptimized
						placeholder="blur"
						blurDataURL={`/product_images/${p.image}`}
						quality={1}
					/>
				</AspectRatio>
			</div>
			<div className="-right-1/2 absolute w-full h-full">
				<AspectRatio
					className="opacity-70 blur-xl mix-blend-lighten"
					ratio={1 / 2}
				>
					<Image
						src={`/product_images/${p.image}`}
						sizes="(max-width: 768px) 1vw, (max-width: 1200px) 1vw, 1vw"
						alt="Blured product photo"
						fill
						unoptimized
						placeholder="blur"
						blurDataURL={`/product_images/${p.image}`}
						quality={1}
					/>
				</AspectRatio>
			</div>
			<Image
				src={`/product_images/${p.image}`}
				alt="Blured product photo"
				unoptimized
				fill
				placeholder="blur"
				blurDataURL={`/product_images/${p.image}`}
				sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
				className="m-auto max-w-max h-full max-h-full mix-blend-normal object-cover"
			/>
		</div>
	);
};

export default async function ProductPage({
	params,
}: {
	params: { lang: string; productId: string };
}) {
	const { t } = await useTranslation(params.lang, "product-page", {});
	const neonSigns = await serverClient.product.getProducts();
	const neonSign = neonSigns.find(
		(product) => params.productId === product.id.toString(),
	);

	if (!neonSign) return <>not found</>;

	return (
		<main className="flex flex-col justify-between items-center pt-24">
			<div className="flex sm:flex-row flex-col gap-8 px-4 lg:px-0 w-full lg:max-w-screen-lg 2xl:max-w-screen-xl">
				<div className="flex flex-col basis-3/5">
					<div className="relative border-2 bg-stone-900 mb-4 p-4 border-solid rounded-xl w-full h-96 sm:h-[32rem] overflow-hidden">
						<MainImage p={neonSign} />
					</div>
					<div className="sm:hidden mb-8 px-4 rounded-xl h-fit">
						<div>
							<h1 className="pb-2 font-semibold text-4xl">{neonSign?.name}</h1>
							<h2 className="pb-2 font-light text-xl">
								{`${neonSign?.price.toFixed(2)}€`}
							</h2>
							<p className="pb-8 font-light text-stone-300">{t("desc")}</p>
						</div>
						<div className="flex flex-row justify-end gap-4">
							<div className="flex flex-row">
								<div className="flex items-center content-center gap-2 align-middle">
									<div className="inline-block bg-green-400 rounded-full w-2 h-2" />
									<span className="inline-block">
										{neonSign?.inStock ? "In Stock" : "On Demand"}
									</span>
								</div>
							</div>
							<AddToCartButton
								lang={params.lang}
								itemId={`${neonSign.id}`}
								price={parseFloat(neonSign.price.toFixed(2))}
							/>
						</div>
					</div>
					<div className="mb-8 p-4 rounded-xl w-full text-lg">
						<Accordion type="single" collapsible className="w-full">
							<AccordionItem value="item-1">
								<AccordionTrigger>{t("faq.q1")}</AccordionTrigger>
								<AccordionContent className="text-light text-stone-300">
									<div dangerouslySetInnerHTML={{ __html: t("faq.a1") }} />
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-2">
								<AccordionTrigger>{t("faq.q2")}</AccordionTrigger>
								<AccordionContent className="text-light text-stone-300">
									{t("faq.a2")}
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-3">
								<AccordionTrigger>{t("faq.q3")}</AccordionTrigger>
								<AccordionContent className="text-light text-stone-300">
									{t("faq.a3")}
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</div>
				</div>
				<div className="top-24 sticky sm:flex flex-col hidden p-4 rounded-xl h-[32rem] basis-2/5">
					<div>
						<h1 className="pb-2 font-semibold text-4xl">{neonSign?.name}</h1>
						<h2 className="pb-2 font-light text-xl">
							{`${neonSign?.price.toFixed(2)}€`}
						</h2>
						<p className="pb-12 font-light text-stone-300">{t("desc")}</p>
					</div>
					<div className="flex flex-col items-end gap-4">
						<div className="flex lg:flex-row flex-col justify-end gap-4">
							<div className="flex flex-row">
								<div className="flex items-center content-center gap-2 align-middle">
									<div className="inline-block bg-green-400 rounded-full w-2 h-2" />
									<span className="inline-block">
										{neonSign?.inStock ? t("in-stock") : t("on-demand")}
									</span>
								</div>
							</div>
							<AddToCartButton
								lang={params.lang}
								itemId={`${neonSign.id}`}
								price={parseFloat(neonSign.price.toFixed(2))}
							/>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
