"use client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

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
  isCartMenuOpen: boolean;
  setIsCartMenuOpen: Dispatch<SetStateAction<boolean>>;
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
  isCartMenuOpen: false,
  setIsCartMenuOpen: () => {},
});

const defaultCart = {
  itemsIds: [],
  cartItems: [],
  total: 0,
};

const loadCartFromLocalStorage = () => {
  if (typeof localStorage !== "undefined") {
    const storedCart = localStorage.getItem("shoppingCart");
    return storedCart ? JSON.parse(storedCart) : defaultCart;
  } else {
    return defaultCart;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState(loadCartFromLocalStorage());
  const [isCartMenuOpen, setIsCartMenuOpen] = useState<boolean>(false);

  const addCartItem = (newCartItem: CartItem) => {
    const updatedCart: Cart = { ...cart };
    setIsCartMenuOpen(true);
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
    if (itemIndex > -1) {
      updatedCart.cartItems.splice(itemIndex, 1);
      updatedCart.itemsIds.splice(itemIndex, 1);
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
        if (updatedCart.cartItems[itemIndex].quantity < 1) {
          removeCartItem(cartItem.id);
        }
      }
    }
    if (mode === "set") {
      const itemIndex = updatedCart.itemsIds.findIndex((value) => {
        return value === cartItem.id;
      });
      if (itemIndex !== -1) {
        updatedCart.cartItems[itemIndex].quantity = cartItem.quantity;
        if (updatedCart.cartItems[itemIndex].quantity < 1) {
          removeCartItem(cartItem.id);
        }
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
    const storedCart = localStorage.getItem("shoppingCart");
    if (storedCart) {
      const initialCart: Cart = JSON.parse(storedCart);
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
        isCartMenuOpen: isCartMenuOpen,
        setIsCartMenuOpen: setIsCartMenuOpen,
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
