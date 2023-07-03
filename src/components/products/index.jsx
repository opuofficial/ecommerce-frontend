import React, { useEffect, useState } from "react";
import "./products.css";
import Product from "../product";
import { Col, Pagination, Row } from "antd";
import { useProductsContext } from "../../hooks/useProductsContext";

function Products({ viewMode }) {
  const { products, filterCategory } = useProductsContext();
  const { productLayout } = viewMode;

  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = products.slice(startIndex, endIndex);

  const startProductCount = startIndex + 1;
  const endProductCount =
    currentPageData.length < itemsPerPage
      ? currentPageData.length + startIndex
      : endIndex;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filterCategory]);

  return (
    <>
      <div className="products__count">
        {currentPageData.length == 0 ? (
          <p>No result found</p>
        ) : (
          <p>
            (Showing {startProductCount} – {endProductCount} products of{" "}
            {products.length} products)
          </p>
        )}
      </div>

      <div className="products__container">
        <Row gutter={[15, 15]}>
          {currentPageData.map((product) => (
            <Col
              xl={productLayout == "grid" ? 6 : undefined}
              lg={productLayout == "grid" ? 8 : undefined}
              md={productLayout == "grid" ? 8 : undefined}
              sm={productLayout == "grid" ? 12 : undefined}
              xs={24}
              key={product.id}
            >
              <Product product={product} productLayout={productLayout} />
            </Col>
          ))}
        </Row>
      </div>

      {currentPageData.length > 0 && (
        <div className="pagination">
          <Pagination
            current={currentPage}
            pageSize={itemsPerPage}
            total={products.length}
            onChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
}

export default Products;
