import ENDPOINT from "../constants";

export const getRecipes = async ({ accessToken, preferences }) =>
  await fetch(`${ENDPOINT}/api/recipe/recipes`, {
    method: "POST",
    headers: {
      authorization: `OAT ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(preferences),
  });

export const getSavedRecipes = async ({ accessToken }) =>
  await fetch(`${ENDPOINT}/api/recipe/savedRecipes`, {
    method: "GET",
    headers: { authorization: `OAT ${accessToken}` },
  });

export const getIngredients = async ({ accessToken, recipeId }) =>
  await fetch(`${ENDPOINT}/api/recipe/ingredients?recipeId=${recipeId}`, {
    method: "GET",
    headers: { authorization: `OAT ${accessToken}` },
  });

export const getInstructions = async ({ accessToken, recipeId }) =>
  await fetch(`${ENDPOINT}/api/recipe/instructions?recipeId=${recipeId}`, {
    method: "GET",
    headers: { authorization: `OAT ${accessToken}` },
  });

export const getNutritionalInfo = async ({ accessToken, recipeId }) =>
  await fetch(`${ENDPOINT}/api/recipe/nutritionalInfo?recipeId=${recipeId}`, {
    method: "GET",
    headers: { authorization: `OAT ${accessToken}` },
  });

export const saveRecipe = async ({ recipeInfo, accessToken }) => {
  return await fetch(`${ENDPOINT}/api/recipe/save`, {
    method: "POST",
    headers: {
      authorization: `OAT ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipeInfo),
  });
};

export const deleteRecipe = async ({ recipeId, accessToken }) =>
  await fetch(`${ENDPOINT}/api/recipe/delete?recipeId=${recipeId}`, {
    method: "DELETE",
    headers: {
      authorization: `OAT ${accessToken}`,
    },
  });
