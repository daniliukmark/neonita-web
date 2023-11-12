import { useContext } from "react";
import { cartContext } from "../_context/cartContext";
import { Button } from "./ui/Button";
import Link from "next/link";
import { ShoppingCartItem } from "./Navbar";

export default function CheckoutForm() {
  const { cart } = useContext(cartContext);

  return (
    <>
      {!cart.cartItems.length ? (
        <p className="font-light">
          Add products of your choice to cart and they will show up here.{" "}
          <Link
            href="/shop"
            className="text-blue-600 underline visited::text-indigo-600 hover:text-blue-500"
          >
            Go to Shop.
          </Link>
        </p>
      ) : (
        <>
          <div className="h-full  max-h-[28rem] overflow-scroll scrollbar rounded-xl">
            {cart.cartItems.map((item, index) => {
              return (
                <ShoppingCartItem
                  className="h-32 mb-4 sm:h-48"
                  key={index}
                  id={Number(item.id)}
                  quantity={item.quantity}
                />
              );
            })}
          </div>
          <div className="flex flex-row items-start justify-between px-4 py-4">
            <span className="text-base">Total: {cart.total.toFixed(2)}$</span>
            <Button variant={"default"} size={"sm"} className="rounded-full">
              Proceed Payment -&gt;
            </Button>
          </div>
        </>
      )}
    </>
  );
}
