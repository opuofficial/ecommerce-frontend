import React from "react";
import "./sidebar.css";
import { Button } from "antd";
import { Typography, Divider, Radio } from "antd";
import { Select, Checkbox } from "antd";
import { Space, Tag } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useProductsContext } from "../../hooks/useProductsContext";

import {
  sizesOptions,
  minPriceOptions,
  maxPriceOptions,
} from "../../filterAndSortOptions";

const { Title } = Typography;

function Sidebar({ hideSidebar }) {
  const {
    filterCategory,
    setFilterCategory,
    filterTags,
    setFilterTags,
    resetFilters,
    removeTag,
  } = useProductsContext();
  const { rating, price } = filterCategory;

  const handleRatingFilter = (e) => {
    setFilterCategory((prev) => ({
      ...prev,
      rating: e.target.value,
    }));

    setFilterTags((prev) => {
      if (!prev.includes("rating")) {
        return [...prev, "rating"];
      } else {
        return prev;
      }
    });
  };

  const handlePriceFilterChange = (amount, type) => {
    let updateFilterCategory = { ...filterCategory };
    let index = type == "min" ? 0 : 1;
    updateFilterCategory.price[index] = amount;
    setFilterCategory(updateFilterCategory);

    setFilterTags((prev) => {
      if (!prev.includes("price")) {
        return [...prev, "price"];
      } else {
        return prev;
      }
    });
  };

  const handleSizeFilter = (sizes) => {
    setFilterCategory((prev) => ({
      ...prev,
      size: sizes,
    }));

    setFilterTags((prev) => {
      if (!prev.includes("size")) {
        return [...prev, "size"];
      } else {
        return prev;
      }
    });
  };

  return (
    <aside className="sidebar">
      <div className="hide__sidebar__icon">
        <FontAwesomeIcon
          icon={faChevronLeft}
          onClick={hideSidebar}
          className="icon"
        />
      </div>
      <div className="filters">
        <Title level={4}>Filters</Title>

        {filterTags.length > 0 && (
          <Space size={[0, 8]} wrap>
            {filterTags.map((tag) => (
              <Tag closable onClose={() => removeTag(tag)} key={tag}>
                {tag}
              </Tag>
            ))}
          </Space>
        )}
      </div>
      <Divider />
      <div className="filter__by__price">
        <Title level={5}>Price</Title>
        <div className="price__input">
          <div>
            <Select
              style={{
                width: 120,
              }}
              options={minPriceOptions}
              value={price[0]}
              onChange={(value) => handlePriceFilterChange(value, "min")}
            />
            <div>Min</div>
          </div>

          <div>
            <Select
              style={{
                width: 120,
              }}
              options={maxPriceOptions}
              value={price[1]}
              onChange={(value) => handlePriceFilterChange(value, "max")}
            />
            <div>Max</div>
          </div>
        </div>
      </div>

      <Divider />
      <div className="filter__by__size">
        <Title level={5}>Size</Title>
        <Checkbox.Group
          options={sizesOptions}
          value={filterCategory.size}
          onChange={handleSizeFilter}
        />
      </div>
      <Divider />
      <div className="filter__by__rating">
        <Title level={5}>Rating</Title>

        <Radio.Group onChange={handleRatingFilter} value={rating}>
          <Radio value={3}>3 stars and up</Radio>
          <Radio value={4}>4 stars and up</Radio>
          <Radio value={5}>5 starts</Radio>
        </Radio.Group>
      </div>

      <Button
        type="primary"
        danger
        className="reset__filter__button"
        onClick={resetFilters}
      >
        Reset Filter
      </Button>
    </aside>
  );
}

export default Sidebar;
