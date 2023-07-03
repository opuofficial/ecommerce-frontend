import React, { useEffect, useMemo, useState } from "react";
import "./productDetails.css";
import { Col, Divider, Row, Button } from "antd";
import { starRating } from "../../utils/starRating";
import { useNavigate, useParams } from "react-router-dom";
import { products } from "../../data";
import { useCartContext } from "../../hooks/useCartContext";
import toast, { Toaster } from "react-hot-toast";
import { v4 as uuid } from "uuid";

function ProductDetails() {
  const { id: productID } = useParams();
  const [product, setProduct] = useState(null);
  const [previewImg, setPreviewImg] = useState("");
  const navigate = useNavigate();

  const { cartItems, setCartItems } = useCartContext();

  const notify = () =>
    toast("Added to cart", {
      icon: "🛒",
    });

  const alreadyInCart = useMemo(() => {
    if (!product) {
      return false;
    }

    return cartItems.some((cartProduct) => cartProduct.id == product.id);
  }, [cartItems, product]);

  useEffect(() => {
    const currentProduct = products.find((product) => product.id == productID);

    if (!currentProduct) {
      return navigate("/not-found");
    }

    setProduct(currentProduct);
    setPreviewImg(currentProduct.images[0]);
  }, [productID, navigate]);

  const changePreviewImg = (img) => {
    setPreviewImg(img);
  };

  const addToCart = () => {
    let newCartProduct = { ...product };
    newCartProduct.quantity = 1;
    setCartItems((prev) => [...prev, newCartProduct]);

    notify();
  };

  return (
    <div className="product__details">
      {product && (
        <div className="container">
          <Row>
            <Col sm={12}>
              <div className="product__image">
                <img src={previewImg} alt="" />
              </div>
            </Col>
            <Col sm={12}>
              <div className="product__info">
                <h3 className="title">{product.title}</h3>
                <div className="product__price">
                  <div className="amount">&#8377;{product.price}</div>
                  <div className="product__rating">
                    {starRating(product.rating).map((star, i) => (
                      <img key={i} src={star} />
                    ))}
                  </div>
                </div>

                <Divider />

                <div className="product__image__gallery">
                  {product.images.map((img) => (
                    <img
                      src={img}
                      alt=""
                      className={`${previewImg == img ? "active" : null}`}
                      key={uuid()}
                      onClick={() => changePreviewImg(img)}
                    />
                  ))}
                </div>
                <Divider />
                <div className="product__sizes">
                  <div className="title">Size</div>
                  {product.size.map((s) => (
                    <div className="size" key={s}>
                      {s}
                    </div>
                  ))}
                </div>

                <Button
                  size="large"
                  type="primary"
                  className="addtocart__button"
                  onClick={addToCart}
                  disabled={alreadyInCart}
                >
                  {alreadyInCart ? "Added to cart" : "Add to Cart"}
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      )}

      <Toaster />
    </div>
  );
}

export default ProductDetails;
