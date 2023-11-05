import { useSelector } from "react-redux";

import Recipe from "components/Recipe/Recipe";

import { selectRecipes } from "helpers/selector";

import "./Recipes.css";

const Recipes = () => {
  const { recipes: { results = [] } = {} } = useSelector(selectRecipes);

  return (
    <>
      <h3 className="item-page-heading">
        Based on your preferences, we have...
      </h3>
      <div className="items">
        {results.map(({ id, image, title, imageType }) => {
          return (
            <Recipe
              key={id}
              imageType={imageType}
              id={id}
              imageUrl={image}
              title={title}
              className="item-box"
            />
          );
        })}
      </div>
    </>
  );
};

export default Recipes;
