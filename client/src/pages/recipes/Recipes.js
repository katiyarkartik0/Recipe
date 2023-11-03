import { useSelector } from "react-redux";

import Recipe from "components/Recipe/Recipe";

import { getRecipes } from "helpers/selector";

const Recipes = () => {
  const {
    recipes: { results = [] },
  } = useSelector(getRecipes);
  return (
    <>
      {results.map(({ image, title }) => {
        return <Recipe imageUrl={image} title={title} />;
      })}
    </>
  );
};

export default Recipes;
