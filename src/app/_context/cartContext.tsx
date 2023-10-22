import { ReactNode, createContext, useEffect, useState } from "react";

type CartItem = {
  id: string;
  quantity: number;
  price: number;
};
type Cart = {
  cartItems: CartItem[];
  total: number;
};

export const cartContext = createContext<{
  cart: Cart;
  addCartItem: (item: CartItem) => void;
  removeCartItem: (id: string) => void;
  updateCartItem: (id: string, updatedItem: CartItem) => void;
  clearCart: () => void;
}>({
  cart: {
    cartItems: [],
    total: 0,
  },
  addCartItem: () => {},
  removeCartItem: () => {},
  updateCartItem: () => {},
  clearCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart>({ cartItems: [], total: 0 });
  const addCartItem = (newCartItem: CartItem) => {
    const updatedCart: Cart = { ...cart };
    updatedCart.cartItems.push(newCartItem);
    setCart(updatedCart);
    updateCartTotal();
  };
  const removeCartItem = (id: string) => {
    const updatedCartItems = cart.cartItems.filter((cartItem) => {
      cartItem.id != id;
    });
    const updatedCart: Cart = {
      ...cart,
      cartItems: updatedCartItems,
    };
    setCart(updatedCart);
    updateCartTotal();
  };
  const updateCartItem = (id: string, updatedCartItem: CartItem) => {
    const updatedCartItems = cart.cartItems.map((cartItem) => {
      if (cartItem.id === id) {
        return { ...cartItem, ...updatedCartItem };
      }
      return cartItem;
    });
    const updatedCart: Cart = {
      ...cart,
      cartItems: updatedCartItems,
    };
    setCart(updatedCart);
    updateCartTotal();
  };
  const clearCart = () => {
    const updatedCart: Cart = { cartItems: [], total: 0 };
    setCart(updatedCart);
  };
  const updateCartTotal = () => {
    const updatedCart: Cart = { ...cart };
    updatedCart.cartItems.forEach((cartItem) => {
      updatedCart.total += cartItem.price * cartItem.quantity;
    });
    setCart(updatedCart);
  };

  const storedCartItems = localStorage.getItem("cartItems");
  const initialCartItems: CartItem[] = storedCartItems
    ? JSON.parse(storedCartItems)
    : [];
  const initialCart: Cart = { cartItems: initialCartItems, total: 0 };
  setCart(initialCart);
  updateCartTotal();

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    const initialCartItems: CartItem[] = storedCartItems
      ? JSON.parse(storedCartItems)
      : [];
    const initialCart: Cart = { cartItems: initialCartItems, total: 0 };
    if (initialCart.cartItems.length > 0) {
      setCart(initialCart);
      updateCartTotal();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
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
