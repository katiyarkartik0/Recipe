import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import RecipeDetails from "components/RecipeDetails/RecipeDetails";

import UnauthorizedPage from "pages/unauthorizedPage/UnauthorizedPage";

import { selectRecipes, selectSavedRecipes } from "helpers/selector";

const RecipeDetailPage = () => {
  const { recipeId } = useParams();

  const { recipes: { results = [] } = {} } = useSelector(selectRecipes);
  const savedRecipes = useSelector(selectSavedRecipes);

  let recipe;
  for (const result of results) {
    if (result.id === Number(recipeId)) {
      recipe = result;
      break;
    }
  }

  if (!recipe) {
    for (const savedRecipe of savedRecipes) {
      if (Number(savedRecipe.spoonacularRecipeId) === Number(recipeId)) {
        recipe = savedRecipe;
        break;
      }
    }
  }

  if (recipe) {
    const { id, image, title, imageType, spoonacularRecipeId } = recipe;
    return (
      <RecipeDetails
        id={id || spoonacularRecipeId}
        imageUrl={image}
        title={title}
        imageType={imageType}
      />
    );
  } else {
    return (
      <UnauthorizedPage
        path="/home"
        displayMessage={
          "Recipe you are looking for is not available, please visit the homepage to check more"
        }
      />
    );
  }
};

export default RecipeDetailPage;
