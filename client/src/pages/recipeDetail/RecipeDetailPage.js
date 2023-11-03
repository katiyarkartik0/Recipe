import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import RecipeDetails from "components/RecipeDetails/RecipeDetails";

import { getRecipes } from "helpers/selector";

const RecipeDetailPage = () => {
  const { recipeId } = useParams();

  const {
    recipes: { results = [] },
  } = useSelector(getRecipes);

  let recipe = {};
  for (const result of results) {
    if (result.id === Number(recipeId)) {
      recipe = result;
      break;
    }
  }
  console.log(recipe);
  const { id, image, title } = recipe;
  return (
    <>
      <RecipeDetails imageUrl={image} title={title} />
    </>
  );
};

export default RecipeDetailPage;
