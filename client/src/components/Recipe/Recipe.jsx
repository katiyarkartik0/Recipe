import React from "react";

import "./Recipe.css";
import RecipeButton from "components/RecipeButton/RecipeButton";
import { useNavigate } from "react-router-dom";

const Recipe = ({ id: recipeId, imageUrl, title, imageType }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recipes/${recipeId}`);
  };
  return (
    <div className="card">
      <div onClick={handleClick}>
        <img src={imageUrl} alt={title} className="card-image" />
        <h3 className="card-title">{title}</h3>
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
