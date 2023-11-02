const express = require("express");
const recipeRoutes = express.Router();
const bodyParser = require("body-parser");
const {
  getRecipes,
  getIngredients,
  saveRecipe,
  deleteRecipe,
  getNutritionalInfo,
  getInstructions,
  getSavedRecipes,
} = require("../controllers/recipe");

recipeRoutes.use(bodyParser.urlencoded({ extended: false }));
recipeRoutes.use(bodyParser.json());

recipeRoutes.get("/recipes", getRecipes);
recipeRoutes.get("/ingredients", getIngredients);
recipeRoutes.get("/nutritionalInfo", getNutritionalInfo);
recipeRoutes.get("/instructions",getInstructions)
recipeRoutes.post("/save", saveRecipe);
recipeRoutes.get("/savedRecipes",getSavedRecipes)
recipeRoutes.delete("/delete", deleteRecipe);

module.exports = { recipeRoutes };
