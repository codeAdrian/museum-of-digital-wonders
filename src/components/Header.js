import React from "react";
import "./header.css";
import { Link } from "react-router-dom";
import Nav from "./Nav";

import categories from "../data/categories.json";

const Header = () => {
  return (
    <header className="header">
      <h1 className="title">
        <Link unstable_viewTransition to={categories.items[0].slug}>
          Museum Of Digital Wonders
        </Link>
      </h1>
      <p className="subtitle">
        Daily dose of design, branding and product gems.
      </p>
      <Nav />
    </header>
  );
};

export default Header;
