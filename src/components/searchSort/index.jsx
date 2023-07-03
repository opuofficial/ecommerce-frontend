import React from "react";
import { Input, Select } from "antd";
import "./searchSort.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faListUl,
  faTableCellsLarge,
} from "@fortawesome/free-solid-svg-icons";
import { useProductsContext } from "../../hooks/useProductsContext";

function ProductsSearchSort({ showSidebar, viewMode }) {
  const { filterCategory, setFilterCategory } = useProductsContext();

  const { productLayout, setProductLayout } = viewMode;

  const handleSearchInput = (e) => {
    setFilterCategory((prev) => ({
      ...prev,
      searchText: e.target.value,
    }));
  };

  const handleSortChange = (value) => {
    setFilterCategory((prev) => ({
      ...prev,
      sortBy: value,
    }));
  };

  return (
    <div className="products__search__sort">
      <div>
        <Input
          placeholder="Search Product"
          value={filterCategory.searchText}
          onChange={handleSearchInput}
        />
      </div>

      <div>
        <div className="filter__icon icon">
          <FontAwesomeIcon icon={faFilter} onClick={showSidebar} />
        </div>
        <div>
          <small style={{ marginRight: "5px" }}>Sort by :</small>
          <Select
            value={filterCategory.sortBy}
            options={[
              {
                label: "Relevance",
                value: "relevance",
              },
              {
                label: "Newest First",
                value: "recent",
              },
              {
                label: "Rating",
                value: "rating",
              },
              {
                label: "Price - Low to High",
                value: "price_asc",
              },
              {
                label: "Price - High to Low",
                value: "price_desc",
              },
            ]}
            onChange={handleSortChange}
          />
        </div>

        <div className="view__mode">
          <div className="grid__view">
            <FontAwesomeIcon
              icon={faTableCellsLarge}
              className={`icon ${productLayout == "grid" ? "active" : ""}`}
              onClick={() => setProductLayout("grid")}
            />
          </div>
          <div className="list__view">
            <FontAwesomeIcon
              icon={faListUl}
              className={`icon ${productLayout == "list" ? "active" : ""}`}
              onClick={() => setProductLayout("list")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsSearchSort;
