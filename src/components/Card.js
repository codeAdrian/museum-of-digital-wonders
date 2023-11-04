import React from "react";
import { Link, unstable_useViewTransitionState } from "react-router-dom";

import "./card.css";

const Card = ({ author, category, slug, id, title }) => {
  const url = `/${category}/product/${slug}`;
  const isTransitioning = unstable_useViewTransitionState(url);

  return (
    <li className="card">
      <Link unstable_viewTransition to={url} className="card__link">
        <figure className="card__figure">
          <img
            className="card__image"
            style={{
              viewTransitionName: isTransitioning ? "item-image" : "",
            }}
            src={`/assets/${category}/${id}-min.jpg`}
            alt=""
          />
          <figcaption className="card__caption">
            <h2 className="card__title">{title}</h2>
            <small className="card__subtitle">
              Created by <u>{author}</u>
            </small>
          </figcaption>
        </figure>
        <div className="card__deco" />
      </Link>
    </li>
  );
};

export default Card;
