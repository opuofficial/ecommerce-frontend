export const sizes = {
  XS: "XS",
  S: "S",
  M: "M",
  L: "L",
  XL: "XL",
  XXL: "XXL",
};

export const sortBy = {
  RELEVANCE: "relevance",
  RECENT: "recent",
  RATING: "rating",
  PRICE_ASC: "price_asc",
  PRICE_DESC: "price_desc",
};

export const minPrice = {
  "₹0": "0",
  "₹300": "300",
  "₹500": "500",
  "₹700": "700",
  "₹1000": "1000",
};

export const maxPrice = {
  "₹1500": "1500",
  "₹3000": "3000",
  "₹5000": "5000",
  "₹5000+": "5000+",
};

export const sizesOptions = Object.entries(sizes).map(([value, label]) => ({
  label,
  value,
}));

export const minPriceOptions = Object.entries(minPrice).map(
  ([label, value]) => ({
    label,
    value,
  })
);

export const maxPriceOptions = Object.entries(maxPrice).map(
  ([label, value]) => ({
    label,
    value,
  })
);
