import { ENDPOINT } from "constants";

export const getRecipes = async ({ accessToken, preferences }) =>
  await fetch(`${ENDPOINT}/api/recipe/recipes`, {
    method: "POST",
    headers: {
      authorization: `OAT ${accessToken}`,
      headers: { "Content-Type": "application/json" },
    },
    body: JSON.stringify(preferences),
  });

export const getSavedRecipes = async ({ accessToken }) =>
  await fetch(`${ENDPOINT}/api/recipe/savedRecipes`, {
    method: "GET",
    headers: { authorization: `OAT ${accessToken}` },
  });
