import React from "react";

import "./Recipe.css";

const defaultFunction = () => {};

const Recipe = ({ imageUrl, title, onClickEvent = defaultFunction }) => {
  return (
    <div className="card" onClick={onClickEvent}>
      <img src={imageUrl} alt={title} className="card-image" />
      <h3 className="card-title">{title}</h3>
      <div className="button-container">
        <button className="card-button">Ingredients</button>
        <button className="card-button">Instructions</button>
        <button className="card-button">Nutrition</button>
        <button className="card-button">Save</button>
      </div>
    </div>
  );
};

export default Recipe;
