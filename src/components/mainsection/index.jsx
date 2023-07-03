import React, { useState } from "react";
import ProductsSearchSort from "../searchSort";
import Products from "../products";

function MainSection({ showSidebar }) {
  const [productLayout, setProductLayout] = useState("grid");

  const viewMode = {
    productLayout,
    setProductLayout,
  };

  return (
    <div className="main__section">
      <ProductsSearchSort showSidebar={showSidebar} viewMode={viewMode} />
      <Products viewMode={viewMode} />
    </div>
  );
}

export default MainSection;
