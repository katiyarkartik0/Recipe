import React from "react";

import "./Recipe.css";
// import RecipeButton from "components/RecipeButton/RecipeButton";

const defaultFunction = () => {};

const Recipe = ({
  id: recipeId,
  imageUrl,
  title,
  imageType,
  onClickEvent = defaultFunction,
}) => {
  return (
    <div className="card">
      <div onClick={onClickEvent}>
        <img src={imageUrl} alt={title} className="card-image" />
        <h3 className="card-title">{title}</h3>
      </div>
      {/* <RecipeButton
        recipeId={recipeId}
        imageUrl={imageUrl}
        title={title}
        imageType={imageType}
      /> */}
    </div>
  );
};

export default Recipe;
