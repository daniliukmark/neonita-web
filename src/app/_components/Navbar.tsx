"use client";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/Button";
import { Icons } from "@/app/_components/Icons";
import { useContext, useState } from "react";
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
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { usePathname } from "next/navigation";
import { cartContext } from "../_context/cartContext";
import { trpc } from "@/app/_trpc/client";
import Image from "next/image";
import { AspectRatio } from "./ui/aspect-ratio";
import { truncateString } from "@/utils/utils";

const navigationLinks: { name: string; href: string }[] = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Shop",
    href: "/shop",
  },
  {
    name: "FAQ",
    href: "/faq",
  },
  {
    name: "Contacts",
    href: "/contact",
  },
];
const MobileNavigationMenu = () => {
  const pathname = usePathname();
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
          <SheetDescription>
            {navigationLinks.map((navigationLink, i) => (
              <Link
                className="flex flex-col justify-around h-20 gap-5 text-3xl"
                href={navigationLink.href}
                key={i}
              >
                <SheetClose asChild>
                  <span
                    className={`${
                      pathname == navigationLink.href && "text-stone-100"
                    }`}
                  >
                    {navigationLink.name}
                  </span>
                </SheetClose>
              </Link>
            ))}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
const LanguageMenu = ({
  preferredLanguage,
  setPreferredLanguage,
}: {
  preferredLanguage: any;
  setPreferredLanguage: any;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant={"ghost"} size={"icon"} asChild>
          <Icons.changeLanguage />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="text w-36">
        <DropdownMenuRadioGroup
          value={preferredLanguage}
          onValueChange={setPreferredLanguage}
        >
          <DropdownMenuRadioItem value="en">🇬🇧 English</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="lt">
            🇱🇹 Lithuanian
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
const ShoppingCartItem = ({
  id,
  quantity,
}: {
  id: number;
  quantity: number;
}) => {
  const neonSign = trpc.neonSign.getById.useQuery({
    itemId: id,
  });
  const { updateCartItem, removeCartItem } = useContext(cartContext);
  return neonSign.data ? (
    <div className="flex h-40 gap-4 p-4 mb-4 border-2 border-solid rounded-lg bg-stone-900 max-h-32">
      <div className="relative overflow-hidden rounded-sm basis-5/12">
        <div className="absolute left-0 w-full h-full">
          <AspectRatio
            className="opacity-70 mix-blend-lighten blur-md"
            ratio={1 / 1}
          >
            <Image
              src={neonSign.data.image}
              sizes="(max-width: 768px) 1vw, (max-width: 1200px) 1vw, 1vw"
              alt="Blured product photo"
              fill
              unoptimized
              placeholder="blur"
              blurDataURL={neonSign.data.image}
              quality={1}
            />
          </AspectRatio>
        </div>
        <div className="absolute right-0 w-full h-full">
          <AspectRatio
            className="opacity-70 mix-blend-lighten blur-md"
            ratio={1 / 1}
          >
            <Image
              src={neonSign.data.image}
              sizes="(max-width: 768px) 1vw, (max-width: 1200px) 1vw, 1vw"
              alt="Blured product photo"
              fill
              unoptimized
              placeholder="blur"
              blurDataURL={neonSign.data.image}
              quality={1}
            />
          </AspectRatio>
        </div>
        <Image
          src={neonSign.data.image}
          fill
          unoptimized
          alt={neonSign.data.name}
          className="object-cover h-full max-h-full m-auto mix-blend-normal max-w-max "
        />
      </div>
      <div className="relative flex flex-col justify-between flex-1 p-1 font-semibold text-start text-stone-100 basis-5/12">
        <div>
          <h1 className="font-semibold ">
            {truncateString(neonSign.data.name, 16)}
          </h1>
          <h2 className="font-light text-stone-300">
            {Number(neonSign.data.price).toFixed(2)}$
          </h2>
        </div>
        <div className="flex items-center justify-between gap-2">
          <Trash2
            onClick={() => {
              removeCartItem(`${id}`);
            }}
            className="w-8 h-8 p-2 duration-300 rounded-full text-stone-500 hover:text-stone-300 bg-stone-900 hover:bg-stone-500"
          />
          <div className="flex items-center gap-2">
            <span
              onClick={() => {
                updateCartItem(
                  {
                    id: `${id}`,
                    price: Number(neonSign.data?.price),
                    quantity: 1,
                  },
                  "increment"
                );
              }}
              className="px-2 text-lg font-light duration-300 rounded-full text-stone-500 hover:text-stone-300 bg-stone-900 hover:bg-stone-500"
            >
              +
            </span>
            <span>{quantity}</span>
            <span
              onClick={() => {
                updateCartItem(
                  {
                    id: `${id}`,
                    price: Number(neonSign.data?.price),
                    quantity: -1,
                  },
                  "increment"
                );
              }}
              className="px-2.5 text-lg text-stone-500 hover:text-stone-300 font-light duration-300 rounded-full bg-stone-900 hover:bg-stone-500"
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

const ShoppingCartMenu = () => {
  const { cart, isCartMenuOpen, setIsCartMenuOpen } = useContext(cartContext);

  const neonSigns = cart.cartItems.map((item) => {
    return (
      <ShoppingCartItem
        key={item.id}
        id={Number(item.id)}
        quantity={item.quantity}
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
          <SheetTitle>Shoping Cart</SheetTitle>
          <SheetDescription>
            <div className="mt-2">
              {cart.itemsIds.length === 0 ? (
                <span>
                  Add products of your choice to cart and they will show up
                  here. Go and try it!
                </span>
              ) : (
                <>
                  <div>
                    {neonSigns.length > 3 ? (
                      <>
                        {neonSigns[0]} {neonSigns[1]} {neonSigns[2]}
                        <Link
                          href={"/shop/checkout"}
                          className="font-semibold text-center duration-300 text-stone-100 hover:underline"
                          onClick={() => setIsCartMenuOpen(false)}
                        >
                          <div className="relative mx-4 my-4 leading-none">
                            View more
                            <br />
                            ...
                          </div>
                        </Link>
                      </>
                    ) : (
                      neonSigns
                    )}
                  </div>
                  <h1 className="w-full text-base text-stone-100 text-end">
                    Total:{" "}
                    <span className="font-semibold">
                      {cart.total.toFixed(2)}
                    </span>
                    $
                  </h1>
                </>
              )}
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
const Navbar = ({}) => {
  const [preferredLanguage, setPreferredLanguage] = useState<string>("en");
  return (
    <div className="fixed top-0 z-10 w-full h-16 mx-auto backdrop-blur-sm">
      <div className="absolute top-0 z-20 w-full h-20 bg-gradient-to-b from-black to-transparent" />
      <div className="container z-30 flex items-center justify-between w-full h-full gap-5 lg:max-w-screen-lg 2xl:max-w-screen-xl">
        <div className="z-30 h-full py-4">
          <Link href="/">
            <Icons.logoXl className="hidden w-32 h-full sm:block invert" />
          </Link>
          <Link href="/">
            <Icons.logoSm className="block w-8 h-full sm:hidden invert" />
          </Link>
        </div>
        <ul className="z-30 hidden gap-4 justify-self-center sm:flex">
          {navigationLinks.map((navigationLink, i) => (
            <Link
              className={buttonVariants({ variant: "ghost" })}
              href={navigationLink.href}
              key={i}
            >
              {navigationLink.name}
            </Link>
          ))}
        </ul>
        <ul className="z-30 flex items-center justify-end gap-8">
          <div className="w-6 h-6 cursor-pointer">
            <LanguageMenu
              preferredLanguage={preferredLanguage}
              setPreferredLanguage={setPreferredLanguage}
            />
          </div>
          <div className="w-6 h-6 cursor-pointer">
            <ShoppingCartMenu />
          </div>
          <div className="z-30 w-8 h-8 cursor-pointer sm:hidden">
            <MobileNavigationMenu />
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
