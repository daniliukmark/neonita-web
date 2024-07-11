"use client";
import ProductCard from "@/app/_components/ProductCard";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
	Dispatch,
	memo,
	SetStateAction,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";
import { api } from "@/utils/api";
import { useTranslation } from "react-i18next";

enum SortingOptions {
	NONE = "none",
	ASC = "asc",
	DESC = "desc",
	NEW = "new",
	TRENDING = "trend",
}

const OptionBar = memo(
	({
		setSortOptions,
		lang,
	}: {
		setSortOptions: Dispatch<SetStateAction<SortingOptions>>;
		lang: string;
	}) => {
		const { t } = useTranslation("shop-page");
		const router = useRouter();
		const pathname = usePathname();
		const searchParams = useSearchParams();

		useEffect(() => {
			const value = searchParams.get("sort_by");
			if (value === "trending") setSortOptions(SortingOptions.TRENDING);
			if (value === "new") setSortOptions(SortingOptions.NEW);
			if (value === "price_asc") setSortOptions(SortingOptions.ASC);
			if (value === "price_desc") setSortOptions(SortingOptions.DESC);
			if (value === "none") setSortOptions(SortingOptions.NONE);
		}, [searchParams, setSortOptions]);

		const createQueryString = useCallback(
			(
				name: string,
				value: "trending" | "new" | "price_asc" | "price_desc" | "none",
			) => {
				if (value === "trending") setSortOptions(SortingOptions.TRENDING);
				if (value === "new") setSortOptions(SortingOptions.NEW);
				if (value === "price_asc") setSortOptions(SortingOptions.ASC);
				if (value === "price_desc") setSortOptions(SortingOptions.DESC);
				if (value === "none") setSortOptions(SortingOptions.NONE);

				const params = new URLSearchParams(searchParams);
				params.set(name, value);

				return params.toString();
			},
			[searchParams, setSortOptions],
		);

		return (
			<div>
				<h2 className="text-stone-500"> {t("sort-params.title")}</h2>
				<div className="flex flex-row lg:flex-col flex-wrap sm:gap-2">
					<span
						onMouseDown={() =>
							router.push(
								`${pathname}?${createQueryString("sort_by", "price_asc")}`,
							)
						}
						className="mr-4 text-stone-100 hover:underline cursor-pointer"
					>
						{t("sort-params.price-asc")}
					</span>
					<span
						onMouseDown={() =>
							router.push(
								`${pathname}?${createQueryString("sort_by", "price_desc")}`,
							)
						}
						className="mr-4 text-stone-100m hover:underline cursor-pointer"
					>
						{t("sort-params.price-desc")}
					</span>
					<span
						onMouseDown={() =>
							router.push(`${pathname}?${createQueryString("sort_by", "none")}`)
						}
						className="mr-4 text-stone-100m hover:underline cursor-pointer"
					>
						{t("sort-params.none")}
					</span>
				</div>
			</div>
		);
	},
);
OptionBar.displayName = "OptionBar";

export default function ShopPage(p: { params: { lang: string } }) {
	const [sortOptions, setSortOptions] = useState<SortingOptions>(
		SortingOptions.NONE,
	);

	const neonSignItems = api.product.getProducts.useQuery();

	const sortedProducts = useMemo(() => {
		if (!neonSignItems.data) return null;
		const result = Array.from(neonSignItems?.data);
		switch (sortOptions) {
			case SortingOptions.ASC:
				result.sort((a, b) => Number(a.price) - Number(b.price));
				break;
			case SortingOptions.DESC:
				result.sort((a, b) => Number(b.price) - Number(a.price));
				break;
			default:
				break;
		}
		return result;
	}, [neonSignItems.data, sortOptions]);

	return (
		<main className="flex flex-col justify-between items-center px-4 sm:px-8 pt-24">
			<div className="flex lg:flex-row flex-col gap-4 w-full lg:max-w-screen-lg 2xl:max-w-screen-xl">
				<div className="top-24 static lg:sticky mr-auto lg:basis-48">
					<OptionBar lang={p.params.lang} setSortOptions={setSortOptions} />
				</div>
				<div className="flex flex-wrap flex-1 justify-evenly gap-4 scroll-smooth">
					{sortedProducts?.map((item, i) => {
						return (
							<div
								key={item.name}
								className="2xl:flex-grow-1 flex-1 border-2 bg-stone-950 border-solid rounded-xl h-96 overflow-hidden basis-[21rem]"
							>
								<ProductCard
									imageAspectRatio={1 / 1}
									size="sm"
									image={`/product_images/${item.image}`}
									title={item.name}
									price={Number(item.price)}
									currency="€"
									id={String(item.id)}
									lang={p.params.lang}
								/>
							</div>
						);
					})}
				</div>
			</div>
		</main>
	);
}
