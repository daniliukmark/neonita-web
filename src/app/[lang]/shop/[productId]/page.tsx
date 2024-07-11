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
import { api } from "@/utils/api";
import { useMemo } from "react";

const MainImage = ({ neonSign }: { neonSign: any }) => {
	return (
		<div className="absolute inset-4 rounded-lg overflow-hidden">
			<div className="-left-1/2 absolute w-full h-full">
				<AspectRatio
					className="opacity-70 blur-xl mix-blend-lighten"
					ratio={1 / 2}
				>
					<Image
						src={neonSign != null ? "/product_images/" + neonSign.image : ""}
						sizes="(max-width: 768px) 1vw, (max-width: 1200px) 1vw, 1vw"
						alt="Blured product photo"
						fill
						unoptimized
						placeholder="blur"
						blurDataURL={
							neonSign != null ? "/product_images/" + neonSign.image : ""
						}
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
						src={neonSign != null ? "/product_images/" + neonSign.image : ""}
						sizes="(max-width: 768px) 1vw, (max-width: 1200px) 1vw, 1vw"
						alt="Blured product photo"
						fill
						unoptimized
						placeholder="blur"
						blurDataURL={
							neonSign != null ? "/product_images/" + neonSign.image : ""
						}
						quality={1}
					/>
				</AspectRatio>
			</div>
			<Image
				src={neonSign != null ? "/product_images/" + neonSign.image : ""}
				alt="Blured product photo"
				unoptimized
				fill
				placeholder="blur"
				blurDataURL={
					neonSign != null ? "/product_images/" + neonSign.image : ""
				}
				sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
				className="m-auto max-w-max h-full max-h-full mix-blend-normal object-cover"
			/>
		</div>
	);
};

export default async function ProductPage({
	params,
}: {
	params: { productId: string };
}) {
	const neonSigns = await serverClient.product.getProducts();
	const neonSign = neonSigns.find(
		(product) => params.productId === product.id.toString(),
	);
	if (!neonSign) return <></>;

	return (
		<main className="flex flex-col justify-between items-center pt-24">
			{neonSign === null ? (
				<h1>Loading...</h1>
			) : (
				<div className="flex sm:flex-row flex-col gap-8 px-4 lg:px-0 w-full lg:max-w-screen-lg 2xl:max-w-screen-xl">
					<div className="flex flex-col basis-3/5">
						<div className="relative border-2 bg-stone-900 mb-4 p-4 border-solid rounded-xl w-full h-96 sm:h-[32rem] overflow-hidden">
							<MainImage neonSign={neonSign} />
						</div>
						<div className="sm:hidden mb-8 px-4 rounded-xl h-fit">
							<div>
								<h1 className="pb-2 font-semibold text-4xl">
									{neonSign?.name}
								</h1>
								<h2 className="pb-2 font-light text-xl">
									{`${neonSign?.price.toFixed(2)}$`}
								</h2>
								<p className="pb-8 font-light text-stone-300">
									Lorem ipsum dolor sit amet consectetur, adipisicing elit.
									Deserunt vero sunt dolore, vel a assumenda fuga sit inventore
									voluptate incidunt quaerat. Dolor aut, quasi tempore id qui
									labore unde rerum!
								</p>
							</div>
							<div className="flex flex-row justify-end gap-4">
								<div className="flex flex-row">
									<div className="flex items-center content-center gap-2 align-middle">
										<div className="inline-block bg-green-400 rounded-full w-2 h-2" />
										<span className="inline-block">
											{neonSign?.inStock == true ? "In Stock" : "On Demand"}
										</span>
									</div>
								</div>
								<AddToCartButton
									itemId={`${neonSign.id}`}
									price={parseFloat(neonSign.price.toFixed(2))}
								/>
							</div>
						</div>
						<div className="mb-8 p-4 rounded-xl w-full text-lg">
							<Accordion type="single" collapsible className="w-full">
								<AccordionItem value="item-1">
									<AccordionTrigger>Is it accessible?</AccordionTrigger>
									<AccordionContent>
										Yes. It adheres to the WAI-ARIA design pattern.
									</AccordionContent>
								</AccordionItem>
								<AccordionItem value="item-2">
									<AccordionTrigger>Is it styled?</AccordionTrigger>
									<AccordionContent>
										Yes. It comes with default styles that matches the other
										components&apos; aesthetic.
									</AccordionContent>
								</AccordionItem>
								<AccordionItem value="item-3">
									<AccordionTrigger>Is it animated?</AccordionTrigger>
									<AccordionContent>
										Yes. It&apos;s animated by default, but you can disable it
										if you prefer.
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
							<p className="pb-12 font-light text-stone-300">
								Lorem ipsum dolor sit amet consectetur, adipisicing elit.
								Deserunt vero sunt dolore, vel a assumenda fuga sit inventore
								voluptate incidunt quaerat. Dolor aut, quasi tempore id qui
								labore unde rerum!
							</p>
						</div>
						<div className="flex flex-col items-end gap-4">
							<div className="flex lg:flex-row flex-col justify-end gap-4">
								<div className="flex flex-row">
									<div className="flex items-center content-center gap-2 align-middle">
										<div className="inline-block bg-green-400 rounded-full w-2 h-2" />
										<span className="inline-block">
											{neonSign?.inStock == true ? "In Stock" : "On Demand"}
										</span>
									</div>
								</div>
								<AddToCartButton
									itemId={`${neonSign.id}`}
									price={parseFloat(neonSign.price.toFixed(2))}
								/>
							</div>
						</div>
					</div>
				</div>
			)}
		</main>
	);
}
