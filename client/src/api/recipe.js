import { ENDPOINT } from "constants";

export const getSavedRecipes = async ({ accessToken }) =>
  await fetch(`${ENDPOINT}/api/recipe/savedRecipes`, {
    method: "GET",
    headers: { authorization: `OAT ${accessToken}` },
  });
