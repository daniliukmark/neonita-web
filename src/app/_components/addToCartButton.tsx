"use client";
import { useContext } from "react";
import { cartContext, CartItem } from "../_context/cartContext";
import { Button } from "./ui/Button";

const AddToCartButton = ({
  itemId,
  price,
}: {
  itemId: string;
  price: number;
}) => {
  const { cart, addCartItem, removeCartItem, updateCartItem, clearCart } =
    useContext(cartContext);
  const cartItem: CartItem = { id: itemId, price: price, quantity: 1 };

  return (
    <Button
      className="rounded-full"
      onClick={() => {
        addCartItem(cartItem);
      }}
      size={"lg"}
    >
      Add to Cart
    </Button>
  );
};

export default AddToCartButton;
