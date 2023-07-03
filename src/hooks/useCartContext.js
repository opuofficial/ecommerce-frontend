import { useContext } from "react";
import { CartContext } from "../context/cartContextProvider";

export const useCartContext = () => {
  return useContext(CartContext);
};
