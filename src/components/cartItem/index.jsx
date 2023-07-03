import React, { useEffect, useState } from "react";
import "./cartItem.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Button } from "antd";
import { Col, Row } from "antd";
import { useCartContext } from "../../hooks/useCartContext";

function CartItem({ product }) {
  const { cartItems, setCartItems } = useCartContext();
  const [quantity, setQuantity] = useState(product.quantity);

  const incrementQuantity = () => {
    setQuantity((quantity) => quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity == 1) {
      return;
    }

    setQuantity((quantity) => quantity - 1);
  };

  useEffect(() => {
    let updateCart = cartItems.map((p) => {
      if (p.id == product.id) {
        p.quantity = quantity;
      }

      return p;
    });

    setCartItems(updateCart);
  }, [quantity]);

  const removeFromCart = () => {
    setCartItems((prev) => {
      return prev.filter((p) => p.id != product.id);
    });
  };

  return (
    <div className="cart__item">
      <Row gutter={15}>
        <Col span={4}>
          <div className="product__image">
            <img src={product.images[0]} alt="" />
          </div>
        </Col>
        <Col span={20}>
          <div className="cart__item__details">
            <div className="cart__item__details__header">
              <div className="product__title">{product.title}</div>
              <div className="product__price">₹{product.price}</div>
            </div>

            <div className="cart__item__details__footer">
              <div className="product__quantity__container">
                <Button
                  type="default"
                  size="small"
                  disabled={quantity == 1}
                  onClick={decrementQuantity}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </Button>
                <div className="product__quantity">{quantity}</div>
                <Button type="default" size="small" onClick={incrementQuantity}>
                  <FontAwesomeIcon icon={faPlus} />
                </Button>
              </div>
              <div>
                <Button type="primary" danger onClick={removeFromCart}>
                  Remove
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default CartItem;
