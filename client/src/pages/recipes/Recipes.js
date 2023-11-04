import { useSelector } from "react-redux";

import Recipe from "components/Recipe/Recipe";

import { selectRecipes } from "helpers/selector";

const Recipes = () => {
  const { recipes: { results = [] } = {} } = useSelector(selectRecipes);

  return (
    <>
      <h3>Based on your preferences, we have...</h3>
      {results.map(({ id, image, title, imageType }) => {
        return (
          <Recipe
            key={id}
            imageType={imageType}
            id={id}
            imageUrl={image}
            title={title}
          />
        );
      })}
    </>
  );
};

export default Recipes;
