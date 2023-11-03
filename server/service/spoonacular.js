const dotenv = require("dotenv");
dotenv.config();

const SPOONACULAR_API_ENDPOINT = "https://api.spoonacular.com/";

const apiKey = process.env.SPOONACULAR_API_KEY;

const fetchRicipes = async ({
  diet = [],
  cuisine = [],
  intolerances = [],
  offset = 0,
  number = 10,
}) => {
  const dietString = diet.toString();
  const cuisineString = cuisine.toString();
  const intolerancesString = intolerances.toString();
  const parameters = `apiKey=${apiKey}&diet=${dietString}&cuisine=${cuisineString}&intolerances=${intolerancesString}&offset=${offset}&number=${number}`;
  const response = await fetch(
    `${SPOONACULAR_API_ENDPOINT}/recipes/complexSearch?${parameters}`,
    { method: "GET" }
  );
  return await response.json();
};

const fetchIngredients = async ({ recipeId }) => {
  const parameters = `apiKey=${apiKey}`;
  const response = await fetch(
    `${SPOONACULAR_API_ENDPOINT}/recipes/${recipeId}/ingredientWidget.json?${parameters}`,
    { method: "GET" }
  );
  return await response.json();
};

const fetchInstructions = async ({ recipeId }) => {
  const parameters = `apiKey=${apiKey}`;
  const response = await fetch(
    `${SPOONACULAR_API_ENDPOINT}/recipes/${recipeId}/analyzedInstructions?${parameters}`,
    { method: "GET" }
  );
  return await response.json();
};

const fetchNutritionalInfo = async ({ recipeId }) => {
  const parameters = `apiKey=${apiKey}`;
  const response = await fetch(
    `${SPOONACULAR_API_ENDPOINT}/recipes/${recipeId}/nutritionWidget.json?${parameters}`,
    { method: "GET" }
  );
  return await response.json();
};

module.exports = {
  fetchRicipes,
  fetchIngredients,
  fetchInstructions,
  fetchNutritionalInfo,
};
