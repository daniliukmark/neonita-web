"use client";
import { useContext } from "react";
import { cartContext, CartItem } from "../_context/cartContext";
import { Button } from "./ui/Button";
import { useTranslation } from "react-i18next";

const AddToCartButton = ({
	lang,
	itemId,
	price,
}: {
	itemId: string;
	price: number;
	lang: string;
}) => {
	const { cart, addCartItem, removeCartItem, updateCartItem, clearCart } =
		useContext(cartContext);
	const cartItem: CartItem = { id: itemId, price: price, quantity: 1 };
	const { t } = useTranslation("product-page");

	return (
		<Button
			className="rounded-full"
			onClick={() => {
				addCartItem(cartItem);
			}}
			size={"lg"}
		>
			{t("button")}
		</Button>
	);
};

export default AddToCartButton;
