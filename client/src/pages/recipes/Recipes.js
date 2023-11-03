import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Recipe from "components/Recipe/Recipe";

import { selectRecipes } from "helpers/selector";

const Recipes = () => {
  const { recipes: { results = [] } = {} } = useSelector(selectRecipes);

  const navigate = useNavigate();

  console.log(results);
  const handleClick = ({ id }) => {
    navigate(`/recipes/${id}`);
  };
  return (
    <>
      <h3>Based on your preferences, we have...</h3>
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
