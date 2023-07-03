import { useContext } from "react";
import { ProductContext } from "../context/productsContextProvider";

export const useProductsContext = () => {
  return useContext(ProductContext);
};
