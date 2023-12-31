import React from "react";
import { flushSync } from "react-dom";

import items from "../data/items.json";
import categories from "../data/categories.json";
import {
  Link,
  useLoaderData,
  unstable_useViewTransitionState,
} from "react-router-dom";

import "./details.css";

export async function loader({ params }) {
  document.documentElement.className = "details";
  const item = items[params.category].find(({ slug }) =>
    params.slug.includes(slug)
  );
  if (!item) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return item;
}

const Details = () => {
  const [isImageTransition, setIsImageTransition] = React.useState(false);
  const [isFullImage, setIsFullImage] = React.useState(false);
  const data = useLoaderData();
  const { id, category, title, author } = data;
  const categoryUrl = `/${category}`;

  const isTransitioning = unstable_useViewTransitionState(categoryUrl);

  const itemCategory = categories.items.find(({ id }) => id === category);

  const toggleImageState = () => setIsFullImage((state) => !state);

  const handleZoom = async () => {
    if (document.startViewTransition) {
      setIsImageTransition(true);
      const transition = document.startViewTransition(() => {
        flushSync(toggleImageState);
      });

      await transition.finished;
      setIsImageTransition(false);
    } else {
      toggleImageState();
    }
  };

  return (
    <>
      <section className="item">
        <aside>
          <Link className="item__link" to={-1}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="item__icon"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            Back
          </Link>
        </aside>
        <article className="item__layout">
          <div>
            <button onClick={handleZoom} className="item__toggle">
              <img
                style={{
                  viewTransitionName:
                    isTransitioning || isImageTransition ? "item-image" : "",
                }}
                className={
                  isFullImage
                    ? "item__image item__image--active"
                    : "item__image"
                }
                src={`/assets/${category}/${id}-min.jpg`}
                alt=""
              />
            </button>
          </div>

          <div>
            <h2 className="item__title">{title}</h2>
            <p className="item__author">Created by {author}</p>
            <div className="item__description">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                tellus orci, maximus a tempus ac, elementum non quam. Sed et
                erat finibus, convallis tortor sit amet, tempus ipsum. Cras eget
                accumsan libero. Proin et odio a felis pulvinar lacinia vitae in
                libero. Sed eget mi sed erat accumsan dignissim. Interdum et
                malesuada fames ac ante ipsum primis in faucibus. Nullam purus
                turpis, ullamcorper eget vestibulum id, ornare sed nisi.
              </p>

              <p>
                Sed imperdiet erat vel pharetra aliquet. Nam posuere convallis
                arcu at sagittis. Mauris ligula tortor, tristique sed nibh et,
                bibendum cursus tortor. Suspendisse purus nisi, fringilla in
                rhoncus id, commodo in mauris. Fusce suscipit rutrum venenatis.
                Ut maximus varius velit vitae tristique. Sed facilisis erat
                libero, non aliquam dui tincidunt nec. Nulla ornare placerat
                velit eu faucibus.
              </p>
            </div>
            <hr className="item__divider" />
            <small className="item__footer">
              Found in{" "}
              <Link
                className="item__link"
                unstable_viewTransition
                to={itemCategory.slug}
              >
                {itemCategory.title}
              </Link>
            </small>
          </div>
        </article>
      </section>
      <aside
        className={
          isFullImage ? "item__overlay item__overlay--active" : "item__overlay"
        }
      />
    </>
  );
};

export default Details;
