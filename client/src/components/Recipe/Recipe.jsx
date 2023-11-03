import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToast } from "store/slices/toast";

import Button from "components/Button/Button";
import { saveRecipe } from "api/recipe";

import { selectSavedRecipes } from "helpers/selector";

import "./Recipe.css";

const defaultFunction = () => {};

const Recipe = ({
  id: recipeId,
  imageUrl,
  title,
  imageType,
  onClickEvent = defaultFunction,
}) => {
  const savedRecipes = useSelector(selectSavedRecipes);
  const dispatch = useDispatch();
  const isRecipeSaved = savedRecipes.some(({ id }) => id === recipeId);

  const toggleSave = async () => {
    try {
      if (isRecipeSaved) {
        const { msg } = await saveRecipe({
          spoonacularRecipeId: recipeId,
          title,
          image: imageUrl,
          imageType,
        });
        // dispatch(saveRecipeState())
        dispatch(setToast({ status: "success", displayMessage: msg }));
      }
    } catch (error) {}
  };

  return (
    <div className="card">
      <div onClick={onClickEvent}>
        <img src={imageUrl} alt={title} className="card-image" />
        <h3 className="card-title">{title}</h3>
      </div>
      <Button text={"SAVE"} />
    </div>
  );
};

export default Recipe;
