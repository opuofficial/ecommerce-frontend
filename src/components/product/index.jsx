import React from "react";
import "./product.css";
import { Link } from "react-router-dom";
import { starRating } from "../../utils/starRating";

function Product({ product, productLayout }) {
  return (
    <div className={`product ${productLayout == "list" ? "list__view" : ""} `}>
      <Link to={`/product/${product.id}`}>
        <img src={product.images[0]} className="product__image" alt="" />
        <div className="product__body">
          <div className="product__title" title={product.title}>
            {product.title}
          </div>

          <div className="product__footer">
            <div className="product__price">&#8377;{product.price}</div>
            <div className="product__rating">
              {starRating(product.rating).map((star, i) => (
                <img key={i} src={star} />
              ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Product;
