import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setDeleteSavedRecipe, setSaveRecipe } from "store/slices/recipes";
import { setToast } from "store/slices/toast";

import { deleteRecipe, saveRecipe } from "api/recipe";

import Button from "components/Button/Button";

import { selectAccessToken, selectSavedRecipes } from "helpers/selector";

import { Loader } from "utils/Loader/Loader";

import "./RecipeButton.css";

const RecipeButton = ({ recipeId, title, imageUrl, imageType }) => {
  const { recipeId: isRecipeDetailPage } = useParams(); //if we can catch recipeId from parameters it is a product detail page

  const navigate = useNavigate();

  const savedRecipes = useSelector(selectSavedRecipes);
  const accessToken = useSelector(selectAccessToken);
  const dispatch = useDispatch();

  const [isRecipeSaved, setIsRecipeSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsRecipeSaved(
      savedRecipes.some(
        ({ spoonacularRecipeId }) =>
          Number(spoonacularRecipeId) === Number(recipeId)
      )
    );
  }, [savedRecipes]);

  const toggleSave = async () => {
    setIsLoading(true);
    try {
      if (!isRecipeSaved) {
        const recipeInfo = {
          spoonacularRecipeId: recipeId,
          title,
          image: imageUrl,
          imageType,
        };
        const response = await saveRecipe({ recipeInfo, accessToken });
        if (response.ok) {
          const { msg } = await response.json();
          dispatch(setSaveRecipe({ recipe: recipeInfo }));
          const updatedSavedRecipe = [...savedRecipes, recipeInfo];
          localStorage.setItem(
            "savedRecipes",
            JSON.stringify(updatedSavedRecipe)
          );
          dispatch(setToast({ status: "success", displayMessage: msg }));
          setIsRecipeSaved(true);
        } else {
          const { msg } = await response.json();
          dispatch(setToast({ status: "failure", displayMessage: msg }));
        }
      } else {
        const response = await deleteRecipe({ recipeId, accessToken });
        if (response.ok) {
          const { msg } = await response.json();
          dispatch(setDeleteSavedRecipe({ recipeId }));
          const updatedSavedRecipe = savedRecipes.filter(
            ({ spoonacularRecipeId }) =>
              Number(spoonacularRecipeId) !== Number(recipeId)
          );
          localStorage.setItem(
            "savedRecipes",
            JSON.stringify(updatedSavedRecipe)
          );
          dispatch(setToast({ status: "success", displayMessage: msg }));
          setIsRecipeSaved(false);
        } else {
          const { msg } = await response.json();
          dispatch(setToast({ status: "failure", displayMessage: msg }));
        }
      }
    } catch (error) {
      dispatch(
        setToast({ status: "failure", displayMessage: JSON.stringify(error) })
      );
    }
    setIsLoading(false);
    if (isRecipeDetailPage) {
      navigate("/home");
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <Button
          className="common-button item-render-button"
          text={isRecipeSaved ? "UNSAVE" : "SAVE"}
          onClickEvent={toggleSave}
        />
      )}
    </>
  );
};

export default RecipeButton;
