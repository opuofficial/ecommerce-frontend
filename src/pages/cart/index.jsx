import React from "react";
import { Button, Col, Divider, Row } from "antd";
import "./cart.css";
import CartItem from "../../components/cartItem";
import emptyCart from "../../assets/empty-cart.png";

import { useCartContext } from "../../hooks/useCartContext";
import { Link } from "react-router-dom";
import { formatAmount } from "../../utils/formatAmount";

function CartCalculationItem({ title, amount }) {
  return (
    <div className="cart__calculation__item">
      <div className="title">{title}</div>
      <div className="amount">₹{formatAmount(amount)}</div>
    </div>
  );
}

function Cart() {
  const { cartItems } = useCartContext();

  const subTotal = cartItems.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

  const tax = (subTotal * 5) / 100;
  const shippingCost = 50;

  const cartTotal = subTotal + tax + shippingCost;

  return (
    <div className="cart__section">
      <div className="container">
        <h2 className="cart__title">Shopping Cart</h2>

        <div className="cart__container">
          {cartItems.length == 0 && (
            <div className="empty__cart">
              <img src={emptyCart} alt="" />
              <Link to="/">
                <Button>Return to shop</Button>
              </Link>
            </div>
          )}

          <Row gutter={[20, 20]}>
            <Col md={{ span: 16 }}>
              <div className="cart__products">
                {cartItems.map((product) => (
                  <CartItem key={product.id} product={product} />
                ))}
              </div>
            </Col>
            {cartItems.length > 0 && (
              <Col md={{ span: 8 }} xs={{ span: 24 }}>
                <div className="cart__calculation">
                  <CartCalculationItem title="Subtotal" amount={subTotal} />
                  <Divider />
                  <CartCalculationItem title="Tax (5%)" amount={tax} />
                  <Divider />
                  <CartCalculationItem title="Shipping" amount={shippingCost} />
                  <Divider />
                  <CartCalculationItem title="Total" amount={cartTotal} />

                  <Button type="primary" size="large" block>
                    Proceed to Checkout
                  </Button>
                </div>
              </Col>
            )}
          </Row>
        </div>
      </div>
    </div>
  );
}

export default Cart;
