import React from "react";
import "./notFound.css";
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <div className="not__found">
        <h2 className="notfound__heading">404 Page Not Found</h2>
        <Link to="/">
          <Button size="large">
            <FontAwesomeIcon icon={faHouse} className="home__icon" />
            Back to Home
          </Button>
        </Link>
      </div>
    </>
  );
}

export default NotFound;
