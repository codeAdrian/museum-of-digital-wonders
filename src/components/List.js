import React from "react";

import "./List.css";
import Card from "./Card";

const List = ({ items }) => {
  return (
    <ul className="grid">
      {items.map((data) => (
        <Card key={data.id} {...data} />
      ))}
    </ul>
  );
};

export default List;
