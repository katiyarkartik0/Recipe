import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import RecipeDetails from "components/RecipeDetails/RecipeDetails";

import { selectRecipes } from "helpers/selector";
import UnauthorizedPage from "pages/unauthorizedPage/UnauthorizedPage";

const RecipeDetailPage = () => {
  const { recipeId } = useParams();

  const { recipes: { results = [] } = {} } = useSelector(selectRecipes);

  let recipe;
  for (const result of results) {
    if (result.id === Number(recipeId)) {
      recipe = result;
      break;
    }
  }
  if (recipe) {
    const { id, image, title, imageType } = recipe;
    return (
      <RecipeDetails
        id={id}
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
