"use client";
import { ReactNode, createContext, useEffect, useState } from "react";

export type CartItem = {
  id: string;
  quantity: number;
  price: number;
};

type Cart = {
  itemsIds: string[];
  cartItems: CartItem[];
  total: number;
};

export const cartContext = createContext<{
  cart: Cart;
  addCartItem: (item: CartItem) => void;
  removeCartItem: (id: string) => void;
  updateCartItem: (updatedItem: CartItem, mode: "increment" | "set") => void;
  clearCart: () => void;
}>({
  cart: {
    itemsIds: [],
    cartItems: [],
    total: 0,
  },
  addCartItem: () => {},
  removeCartItem: () => {},
  updateCartItem: () => {},
  clearCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart>({
    itemsIds: [],
    cartItems: [],
    total: 0,
  });

  const addCartItem = (newCartItem: CartItem) => {
    const updatedCart: Cart = { ...cart };
    if (updatedCart.itemsIds.includes(newCartItem.id)) {
      updateCartItem(newCartItem, "increment");
      return;
    }
    updatedCart.itemsIds.push(newCartItem.id);
    updatedCart.cartItems.push(newCartItem);
    updateCartTotal(updatedCart);
    setCart(updatedCart);
  };

  const removeCartItem = (id: string) => {
    const updatedCart: Cart = { ...cart };
    const itemIndex = updatedCart.itemsIds.findIndex((value) => {
      return value === id;
    });
    if (itemIndex !== -1) {
      updatedCart.cartItems.slice(itemIndex);
    }
    updateCartTotal(updatedCart);
    setCart(updatedCart);
  };
  const updateCartItem = (cartItem: CartItem, mode: "increment" | "set") => {
    const updatedCart: Cart = { ...cart };
    if (mode === "increment") {
      const itemIndex = updatedCart.itemsIds.findIndex((value) => {
        return value === cartItem.id;
      });
      if (itemIndex !== -1) {
        updatedCart.cartItems[itemIndex].quantity += cartItem.quantity;
      }
    }
    if (mode === "set") {
      const itemIndex = updatedCart.itemsIds.findIndex((value) => {
        return value === cartItem.id;
      });
      if (itemIndex !== -1) {
        updatedCart.cartItems[itemIndex].quantity = cartItem.quantity;
      }
    }
    updateCartTotal(updatedCart);
    setCart(updatedCart);
  };
  const clearCart = () => {
    const updatedCart: Cart = {
      itemsIds: [],
      cartItems: [],
      total: 0,
    };
    setCart(updatedCart);
  };

  const updateCartTotal = (updatedCart: Cart) => {
    updatedCart.total = 0;
    updatedCart.cartItems.forEach((cartItem, key) => {
      updatedCart.total += cartItem.price * cartItem.quantity;
    });
  };

  useEffect(() => {
    const storedCartItems = localStorage.getItem("shoppingCart");
    if (storedCartItems) {
      const initialCart: Cart = JSON.parse(storedCartItems);
      setCart(initialCart);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
  }, [cart]);

  return (
    <cartContext.Provider
      value={{
        cart: { ...cart },
        addCartItem: addCartItem,
        removeCartItem: removeCartItem,
        updateCartItem: updateCartItem,
        clearCart: clearCart,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};
