import React, { createContext, useMemo, useState } from "react";
import { products as data } from "../data";
import {
  sortBy,
  minPrice as min,
  maxPrice as max,
} from "../filterAndSortOptions";

export const ProductContext = createContext();

const minPrice = Object.values(min);
const maxPrice = Object.values(max);

const initialFilterValue = {
  rating: null,
  min: minPrice[0],
  max: maxPrice[maxPrice.length - 1],
  size: [],
};

function ProductsContextProvider({ children }) {
  const [productsData, setProductsData] = useState(data);
  const [filterCategory, setFilterCategory] = useState({
    searchText: "",
    sortBy: sortBy.RELEVANCE,
    rating: initialFilterValue.rating,
    price: [initialFilterValue.min, initialFilterValue.max],
    size: initialFilterValue.size,
  });

  const [filterTags, setFilterTags] = useState([]);

  const products = useMemo(() => {
    let filteredProducts = [];
    // filter by search text

    let searchQuery = filterCategory.searchText.trim();

    filteredProducts = productsData.filter((data) => {
      if (data.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return true;
      }
    });

    // filter by rating

    filteredProducts = filteredProducts.filter(
      (product) => product.rating >= filterCategory.rating
    );

    // filter by price

    let min = filterCategory.price[0];
    let max = filterCategory.price[1];

    min = parseInt(min);
    max = max.includes("+") ? Infinity : parseInt(max);

    filteredProducts = filteredProducts.filter((product) => {
      if (product.price >= min && product.price <= max) {
        return true;
      }
    });

    // filter by size

    if (filterCategory.size.length) {
      filteredProducts = filteredProducts.filter((product) => {
        return filterCategory.size.some((s) => product.size.includes(s));
      });
    }

    // sort by

    filteredProducts.sort((a, b) => {
      switch (filterCategory.sortBy) {
        case sortBy.PRICE_ASC:
          return a.price - b.price;
        case sortBy.PRICE_DESC:
          return b.price - a.price;
        case sortBy.RATING:
          return b.rating - a.rating;
        case sortBy.RECENT:
          return b.id - a.id;
        default:
          return 0;
      }
    });

    return filteredProducts;
  }, [filterCategory]);

  const resetFilters = () => {
    setFilterCategory((prev) => ({
      ...prev,
      rating: initialFilterValue.rating,
      price: [initialFilterValue.min, initialFilterValue.max],
      size: initialFilterValue.size,
    }));

    setFilterTags([]);
  };

  const removeTag = (tag) => {
    setFilterCategory((prev) => ({
      ...prev,
      [tag]:
        tag == "price"
          ? [initialFilterValue.min, initialFilterValue.max]
          : initialFilterValue[tag],
    }));

    setFilterTags((tags) => tags.filter((t) => t != tag));
  };

  const values = {
    filterCategory,
    setFilterCategory,
    products,
    filterTags,
    setFilterTags,
    resetFilters,
    removeTag,
  };

  return (
    <ProductContext.Provider value={values}>{children}</ProductContext.Provider>
  );
}

export default ProductsContextProvider;
