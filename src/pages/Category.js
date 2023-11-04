import React from "react";

import List from "../components/List";
import items from "../data/items.json";
import categories from "../data/categories.json";
import { useLoaderData } from "react-router-dom";
import { redirect } from "react-router-dom";

export async function loader({ params }) {
  return params?.category
    ? items[params.category]
    : redirect(categories.items[0].slug);
}

const Category = () => {
  const data = useLoaderData();
  return <List items={data || []} />;
};

export default Category;
