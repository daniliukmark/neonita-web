"use client";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/Button";
import { Icons } from "@/app/_components/Icons";
import { useContext, useState } from "react";
import { Compass, Menu } from "lucide-react";
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
  return neonSign.data ? (
    <div className="flex flex-col gap-2 mb-4">
      <h1>{neonSign.data.name}</h1>
      <h2>
        {Number(neonSign.data.price)} {quantity}
      </h2>
      <h2>total: {quantity * Number(neonSign.data.price)}</h2>
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
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Shoping Cart</SheetTitle>
          <SheetDescription>
            <div>
              {cart.itemsIds.length === 0 ? (
                <span>
                  Add products of your choice to cart and they will show up
                  here. Go and try it!
                </span>
              ) : (
                neonSigns
              )}
              <h1>{cart.total}</h1>
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
