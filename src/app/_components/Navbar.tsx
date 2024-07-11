"use client";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/Button";
import { Icons } from "@/app/_components/Icons";
import { useContext, useMemo, useState } from "react";
import { Compass, Menu, Trash2 } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
} from "./ui/dropdown-menu";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "./ui/sheet";
import { usePathname } from "next/navigation";
import { cartContext } from "../_context/cartContext";
import { trpc } from "@/app/_trpc/client";
import Image from "next/image";
import { AspectRatio } from "./ui/aspect-ratio";
import { cn } from "@/utils/utils";
import { useTranslation } from "../i18n/client";

interface LanguageParams {
	lang: string;
}

const navigationLinks: { name: string; href: string }[] = [
	{
		name: "home-page",
		href: "/",
	},
	{
		name: "shop-page",
		href: "/shop",
	},
	{
		name: "faq-page",
		href: "/faq",
	},
	{
		name: "contacts-page",
		href: "/contact",
	},
];
const MobileNavigationMenu = ({ lang }: LanguageParams) => {
	const pathname = usePathname();
	const { t } = useTranslation(lang, "components", {});
	return (
		<Sheet>
			<SheetTrigger>
				<Button variant={"ghost"} size={"icon"} asChild>
					<Menu className="w-8 h-8" />
				</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>
						<Compass className="w-8 h-8" />
					</SheetTitle>
				</SheetHeader>
				<div className="flex flex-col items-center w-full">
					{navigationLinks.map((navigationLink, i) => {
						return (
							<Link
								className="flex flex-col justify-around gap-5 h-20 text-3xl"
								href={`/${lang}/${navigationLink.href}`}
								key={navigationLink.name}
							>
								<SheetClose asChild>
									<span
										className={cn(
											"text-stone-300",
											pathname === `/${lang}${navigationLink.href}` &&
												"text-stone-100 font-semibold",
										)}
									>
										{t(`navbar.${navigationLink.name}-link`)}
									</span>
								</SheetClose>
							</Link>
						);
					})}
				</div>
			</SheetContent>
		</Sheet>
	);
};

const LanguageMenu = ({ lang }: LanguageParams) => {
	const [menuLang, setMenuLang] = useState(lang);
	const { t } = useTranslation(lang, "components", {});
	const pathname = usePathname();
	const redirectedPathName = (locale: string) => {
		if (!pathname) return "/";
		const segments = pathname.split("/");
		segments[1] = locale;
		return segments.join("/");
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Button variant={"ghost"} size={"icon"} asChild>
					<Icons.changeLanguage />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-36 text">
				<DropdownMenuRadioGroup value={lang} onValueChange={setMenuLang}>
					<Link href={redirectedPathName("en")}>
						<DropdownMenuRadioItem value="en">
							🇬🇧 {t("navbar.lang-menu.en")}
						</DropdownMenuRadioItem>
					</Link>
					<Link href={redirectedPathName("lt")}>
						<DropdownMenuRadioItem value="lt">
							🇱🇹 {t("navbar.lang-menu.lt")}
						</DropdownMenuRadioItem>
					</Link>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
export const ShoppingCartItem = ({
	id,
	quantity,
	className,
}: {
	id: number;
	quantity: number;
	className?: string;
}) => {
	const products = trpc.product.getProducts.useQuery();
	const neonSign = useMemo(
		() => products.data?.find((item) => item.id === id),
		[id, products.data],
	);
	const { updateCartItem, removeCartItem } = useContext(cartContext);
	return neonSign ? (
		<div
			className={cn(
				"flex h-32 gap-4 p-4 border-2 border-solid rounded-lg bg-stone-900 ",
				className,
			)}
		>
			<div className="relative rounded-sm overflow-hidden basis-5/12">
				<div className="left-0 absolute w-full h-full">
					<AspectRatio
						className="opacity-70 blur-md mix-blend-lighten"
						ratio={1 / 1}
					>
						<Image
							src={`/product_images/${neonSign.image}`}
							sizes="(max-width: 768px) 1vw, (max-width: 1200px) 1vw, 1vw"
							alt="Blured product photo"
							fill
							unoptimized
							placeholder="blur"
							blurDataURL={`/product_images/${neonSign.image}`}
							quality={1}
						/>
					</AspectRatio>
				</div>
				<div className="right-0 absolute w-full h-full">
					<AspectRatio
						className="opacity-70 blur-md mix-blend-lighten"
						ratio={1 / 1}
					>
						<Image
							src={`/product_images/${neonSign.image}`}
							sizes="(max-width: 768px) 1vw, (max-width: 1200px) 1vw, 1vw"
							alt="Blured product photo"
							fill
							unoptimized
							placeholder="blur"
							blurDataURL={`/product_images/${neonSign.image}`}
							quality={1}
						/>
					</AspectRatio>
				</div>
				<Image
					src={`/product_images/${neonSign.image}`}
					fill
					unoptimized
					alt={`/product_images/${neonSign.name}`}
					className="m-auto max-w-max h-full max-h-full mix-blend-normal object-cover"
				/>
			</div>
			<div className="relative flex flex-col flex-1 justify-between p-1 font-semibold text-start text-stone-100 basis-5/12">
				<div>
					<h1 className="line-clamp-1 font-semibold">{neonSign.name}</h1>
					<h2 className="font-light text-stone-300">
						{Number(neonSign.price).toFixed(2)}$
					</h2>
				</div>
				<div className="flex justify-between items-center gap-2">
					<Trash2
						onClick={() => {
							removeCartItem(`${id}`);
						}}
						className="bg-stone-900 hover:bg-stone-500 p-2 rounded-full w-8 h-8 text-stone-500 hover:text-stone-300 duration-300"
					/>
					<div className="flex items-center gap-2 select-none">
						<span
							onMouseDown={() => {
								updateCartItem(
									{
										id: `${id}`,
										price: Number(neonSign.price),
										quantity: 1,
									},
									"increment",
								);
							}}
							className="bg-stone-900 hover:bg-stone-500 px-2 rounded-full font-light text-lg text-stone-500 hover:text-stone-300 duration-300"
						>
							+
						</span>
						<span className="">{quantity}</span>
						<span
							onMouseDown={() => {
								updateCartItem(
									{
										id: `${id}`,
										price: Number(neonSign.price),
										quantity: -1,
									},
									"increment",
								);
							}}
							className="bg-stone-900 hover:bg-stone-500 px-2.5 rounded-full font-light text-lg text-stone-500 hover:text-stone-300 duration-300"
						>
							-
						</span>
					</div>
				</div>
			</div>
		</div>
	) : (
		<h1>Loading...</h1>
	);
};

const ShoppingCartMenu = ({ lang }: LanguageParams) => {
	const { cart, isCartMenuOpen, setIsCartMenuOpen } = useContext(cartContext);
	const { t } = useTranslation(lang, "components", {});
	const neonSigns = cart.cartItems.map((item) => {
		return (
			<ShoppingCartItem
				key={item.id}
				id={Number(item.id)}
				quantity={item.quantity}
				className="text-sm"
			/>
		);
	});
	return (
		<Sheet open={isCartMenuOpen} onOpenChange={setIsCartMenuOpen}>
			<SheetTrigger>
				<Button variant={"ghost"} size={"icon"} asChild>
					<Icons.cart />
				</Button>
			</SheetTrigger>
			<SheetContent className="w-5/6">
				<SheetHeader>
					<SheetTitle>{t("navbar.cart.title")} </SheetTitle>
				</SheetHeader>
				<div className="mt-2 text-light">
					{cart.itemsIds.length === 0 ? (
						<span className="text-right font-light text-stone-300">
							{t("navbar.cart.CTA")}
						</span>
					) : (
						<>
							<div>
								{neonSigns.length > 3 ? (
									<>
										<div className="flex flex-col gap-4">
											{neonSigns[0]} {neonSigns[1]} {neonSigns[2]}
										</div>
										<Link
											href={`/${lang}/shop/checkout`}
											className="font-semibold text-center text-stone-100 hover:underline duration-300"
											onClick={() => setIsCartMenuOpen(false)}
										>
											<div className="relative mx-4 my-2 text-lg leading-none">
												...
											</div>
										</Link>
									</>
								) : (
									<div className="flex flex-col gap-4">{neonSigns}</div>
								)}
							</div>
							<div className="flex justify-between items-center mt-3">
								<h1 className="flex-1 px-2 text-base text-start text-stone-100">
									{t("navbar.cart.total")}
									<span className="font-semibold">{cart.total.toFixed(2)}</span>
									&#x20AC;
								</h1>
								<Link
									href="/shop/checkout"
									onClick={() => setIsCartMenuOpen(false)}
									className={cn(
										buttonVariants({ variant: "ghost" }),
										" rounded-full h-min  max-w-12 basis-auto ",
									)}
								>
									{`${t("navbar.cart.to-checkout")} `}&#8594;
								</Link>
							</div>
						</>
					)}
				</div>
			</SheetContent>
		</Sheet>
	);
};

const Navbar = ({ lang }: LanguageParams) => {
	const { t } = useTranslation(lang, "components", {});
	return (
		<div className="top-0 z-10 fixed backdrop-blur-sm mx-auto w-full h-16">
			<div className="top-0 z-20 absolute bg-gradient-to-b from-black to-transparent w-full h-20" />
			<div className="z-30 flex justify-between items-center gap-5 w-full lg:max-w-screen-lg 2xl:max-w-screen-xl h-full container">
				<div className="z-30 py-4 h-full">
					<Link href={`/${lang}/`}>
						<Icons.logoXl className="sm:block hidden w-32 h-full invert" />
					</Link>
					<Link href={`/${lang}/`}>
						<Icons.logoSm className="block sm:hidden w-8 h-full invert" />
					</Link>
				</div>
				<ul className="z-30 sm:flex justify-self-center gap-4 hidden">
					{navigationLinks.map((navigationLink, i) => (
						<Link
							className={buttonVariants({ variant: "ghost" })}
							href={`/${lang}/${navigationLink.href}`}
							key={navigationLink.href}
						>
							{t(`navbar.${navigationLink.name}-link`)}
						</Link>
					))}
				</ul>
				<ul className="z-30 flex justify-end items-center gap-8">
					<div className="w-6 h-6 cursor-pointer">
						<LanguageMenu lang={lang} />
					</div>
					<div className="w-6 h-6 cursor-pointer">
						<ShoppingCartMenu lang={lang} />
					</div>
					<div className="z-30 sm:hidden w-8 h-8 cursor-pointer">
						<MobileNavigationMenu lang={lang} />
					</div>
				</ul>
			</div>
		</div>
	);
};

export default Navbar;
