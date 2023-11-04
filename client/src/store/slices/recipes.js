import { createSlice } from "@reduxjs/toolkit";

const recipes = localStorage.getItem("recipes")
  ? JSON.parse(localStorage.getItem("recipes"))
  : [];
const preferences = localStorage.getItem("preferences")
  ? JSON.parse(localStorage.getItem("preferences"))
  : [];
const savedRecipes = localStorage.getItem("savedRecipes")
  ? JSON.parse(localStorage.getItem("savedRecipes"))
  : [];
  
const initialState = {
  recipes,
  preferences,
  savedRecipes,
};

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setRecipes: (state, action) => {
      const { recipes } = action.payload;
      state.recipes = recipes;
    },
    setPreferences: (state, action) => {
      const { preferences } = action.payload;
      state.preferences = preferences;
    },
    setSavedRecipes: (state, action) => {
      const { savedRecipes } = action.payload;
      state.savedRecipes = savedRecipes;
    },
    setSaveRecipe: (state, action) => {
      const { recipe } = action.payload;
      state.savedRecipes.push(recipe);
    },
    setDeleteSavedRecipe: (state, action) => {
      const { recipeId } = action.payload;
      state.savedRecipes = state.savedRecipes.filter(({ id }) => recipeId);
    },
  },
});

export const {
  setRecipes,
  setPreferences,
  setSavedRecipes,
  setSaveRecipe,
  setDeleteSavedRecipe,
} = recipesSlice.actions;
export default recipesSlice.reducer;
