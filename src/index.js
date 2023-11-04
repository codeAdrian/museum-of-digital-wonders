import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./reset.css";
import "./index.css";
import "./view-transitions.css";
import Category, { loader as categoryLoader } from "./pages/Category";
import Details, { loader as detailsLoader } from "./pages/Details";
import Layout from "./components/Layout";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Category />,
        loader: categoryLoader,
      },
      {
        path: "/:category",
        element: <Category />,
        loader: categoryLoader,
      },
      {
        path: "/:category/product/:slug",
        element: <Details />,
        loader: detailsLoader,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
