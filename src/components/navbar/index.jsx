import React from "react";
import "./navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Badge } from "antd";
import { Link } from "react-router-dom";
import { useCartContext } from "../../hooks/useCartContext";

function Navbar() {
  const { cartItems } = useCartContext();

  return (
    <nav>
      <div className="navbar__container container">
        <div className="brand">
          <Link to="/">KurtiCulture</Link>
        </div>

        <div className="cart__icon">
          <Link to="/cart">
            <Badge count={cartItems.length} color="#1677ff">
              <FontAwesomeIcon icon={faCartShopping} className="icon" />
            </Badge>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
