import React, { useState } from "react";
import { createContext } from "react";

export const CartContext = createContext();

function CartContextProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const values = {
    cartItems,
    setCartItems,
  };

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
}

export default CartContextProvider;
