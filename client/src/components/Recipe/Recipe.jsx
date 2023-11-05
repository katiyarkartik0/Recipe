import React from "react";

import "./Recipe.css";
import RecipeButton from "components/RecipeButton/RecipeButton";
import { useNavigate } from "react-router-dom";

const Recipe = ({ id: recipeId, imageUrl, title, imageType, className }) => {
  const classes = "card" + " " + className;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recipes/${recipeId}`);
  };
  return (
    <div className={classes}>
      <div onClick={handleClick} className="card-item-detail">
        <img src={imageUrl} alt={title} className="card-image" />
        <h3 className="card-title card-tag card-tag-blue">{title}</h3>
      </div>
      <RecipeButton
        recipeId={recipeId}
        imageUrl={imageUrl}
        title={title}
        imageType={imageType}
      />
    </div>
  );
};

export default Recipe;
