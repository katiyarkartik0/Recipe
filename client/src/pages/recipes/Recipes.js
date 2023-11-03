import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Recipe from "components/Recipe/Recipe";

import { getRecipes } from "helpers/selector";

const Recipes = () => {
  const {
    recipes: { results = [] },
  } = useSelector(getRecipes);

  const navigate = useNavigate();

  console.log(results);
  const handleClick = ({ id }) => {
    navigate(`/recipes/${id}`);
  };
  return (
    <>
      {results.map(({ id, image, title }) => {
        return (
          <Recipe
            imageUrl={image}
            title={title}
            onClickEvent={() => handleClick({ id })}
          />
        );
      })}
    </>
  );
};

export default Recipes;
