import React from "react";
import { Link, useLocation } from "react-router-dom";
import categories from "../data/categories.json";
import { useInView } from "react-intersection-observer";

import "./nav.css";

const NavLink = ({ slug, title, id }) => {
  const { pathname } = useLocation();
  const { ref, inView } = useInView({
    threshold: 1,
  });

  const isMatch = slug === "/" ? pathname === "/" : pathname.includes(slug);

  return (
    <li key={id}>
      <Link
        ref={ref}
        className={isMatch ? "nav__link nav__link--current" : "nav__link"}
        to={slug}
        unstable_viewTransition
      >
        {title}
      </Link>
      {isMatch && (
        <hr
          style={{
            viewTransitionName: inView ? "marker" : "",
          }}
          className="nav__marker"
        />
      )}
    </li>
  );
};

const Nav = () => {
  return (
    <nav className={"nav"}>
      <ul className="nav__list">
        {categories.items.map((item) => (
          <NavLink {...item} />
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
