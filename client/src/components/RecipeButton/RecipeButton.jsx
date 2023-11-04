import { useDispatch, useSelector } from "react-redux";
import { setDeleteSavedRecipe, setSaveRecipe } from "store/slices/recipes";
import { setToast } from "store/slices/toast";

import { deleteRecipe, saveRecipe } from "api/recipe";

import Button from "components/Button/Button";

import { selectAccessToken, selectSavedRecipes } from "helpers/selector";

import "./RecipeButton.css";

const RecipeButton = ({ recipeId, title, imageUrl, imageType }) => {
  const savedRecipes = useSelector(selectSavedRecipes);
  const accessToken = useSelector(selectAccessToken);
  const dispatch = useDispatch();
  let isRecipeSaved = savedRecipes.some(
    ({ spoonacularRecipeId }) => Number(spoonacularRecipeId) === recipeId
  );
  const toggleSave = async () => {
    try {
      if (!isRecipeSaved) {
        const recipeInfo = {
          spoonacularRecipeId: recipeId,
          title,
          image: imageUrl,
          imageType,
        };
        const { msg } = await saveRecipe({ recipeInfo, accessToken });

        dispatch(
          setSaveRecipe({
            recipe: { spoonacularRecipeId: recipeId, title, image: imageUrl, imageType },
          })
        );
        dispatch(setToast({ status: "success", displayMessage: msg }));
      } else {
        const { msg } = await deleteRecipe({ recipeId });
        dispatch(setDeleteSavedRecipe({ recipeId }));
        dispatch(setToast({ status: "success", displayMessage: msg }));
      }
      isRecipeSaved = savedRecipes.some(
        ({ spoonacularRecipeId }) => Number(spoonacularRecipeId) === recipeId
      );
    } catch (error) {
      dispatch(
        setToast({ status: "failure", displayMessage: JSON.stringify(error) })
      );
    }
  };

  return (
    <>
      <Button
        text={isRecipeSaved ? "UNSAVE" : "SAVE"}
        onClickEvent={toggleSave}
      />
    </>
  );
};

export default RecipeButton;
