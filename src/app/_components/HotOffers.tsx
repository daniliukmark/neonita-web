import { FC } from "react";
import ProductCard from "./ProductCard";
import { getProducts } from "@/utils/products";

const HotOffers: FC = async () => {
	const products = await getProducts();
	const randomIndexes = Array.from({ length: 3 }, () =>
		Math.round(Math.random() * (products.length - 1)),
	);
	const randomProducts = randomIndexes.map((index) => products[index]);

	return (
		<>
			<div className="flex gap-5 px-4 w-full lg:max-w-screen-lg 2xl:max-w-screen-xl sm:h-[40rem]">
				{/* Core Offer or Most Popular Product */}
				<div className="flex-auto border-2 bg-black border-solid rounded-2xl h-full overflow-hidden basis-2/3">
					<ProductCard
						imageAspectRatio={1 / 1}
						size="2xl"
						image={`/product_images/${randomProducts[0].image}`}
						title={randomProducts[0].name}
						price={Number(randomProducts[0].price)}
						id={`${randomProducts[0].id}`}
						className="block w-full h-96 sm:h-full"
					/>
				</div>
				<div className="md:flex flex-col flex-auto gap-5 hidden h-full basis-1/3">
					{/* Compilation of other products*/}
					<div className="border-2 bg-black border-solid rounded-2xl overflow-hidden basis-1/2">
						<ProductCard
							imageAspectRatio={1 / 1}
							size="sm"
							image={`/product_images/${randomProducts[1].image}`}
							title={randomProducts[1].name}
							price={Number(randomProducts[1].price)}
							id={`${randomProducts[1].id}`}
							className="block w-full"
						/>
					</div>
					<div className="border-2 bg-black border-solid rounded-2xl overflow-hidden basis-1/2">
						<ProductCard
							imageAspectRatio={1 / 1}
							size="sm"
							image={`/product_images/${randomProducts[2].image}`}
							title={randomProducts[2].name}
							price={Number(randomProducts[2].price)}
							id={`${randomProducts[2].id}`}
						/>
					</div>
				</div>
			</div>
			<div className="px-4 w-full">
				<div className="border-2 sm:hidden mt-4 border-solid rounded-2xl overflow-hidden">
					<ProductCard
						imageAspectRatio={1 / 1}
						size="2xl"
						image={`/product_images/${randomProducts[1].image}`}
						title={randomProducts[1].name}
						price={Number(randomProducts[1].price)}
						id={`${randomProducts[1].id}`}
						className="block w-full h-96"
					/>
				</div>
			</div>
			<div className="px-4 w-full">
				<div className="border-2 sm:hidden mt-4 border-solid rounded-2xl overflow-hidden">
					<ProductCard
						imageAspectRatio={1 / 1}
						size="2xl"
						image={`/product_images/${randomProducts[2].image}`}
						title={randomProducts[2].name}
						price={Number(randomProducts[2].price)}
						id={`${randomProducts[2].id}`}
						className="block w-full h-96"
					/>
				</div>
			</div>
		</>
	);
};

export default HotOffers;
