import React from "react";

import "./Recipe.css";

const defaultFunction = () => {};

const Recipe = ({ imageUrl, title, onClickEvent = defaultFunction }) => {
  return (
    <div className="card" onClick={onClickEvent}>
      <img src={imageUrl} alt={title} className="card-image" />
      <h3 className="card-title">{title}</h3>
    </div>
  );
};

export default Recipe;
