import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product._id === product._id);
      if (existing) {
        // if already in cart, increment quantity
        return prev.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: Math.min(item.product.stock, item.quantity + 1) }
            : item
        );
      }
      // add new item
      return [...prev, { _id: Date.now().toString(), product, quantity: 1 }];
    });
  };

  const removeItem = (itemId) => {
    setCartItems((prev) => prev.filter((i) => i._id !== itemId));
  };

  const updateQuantity = (itemId, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === itemId
          ? { ...item, quantity: Math.max(1, Math.min(item.product.stock, item.quantity + delta)) }
          : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);