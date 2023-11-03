import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipes: JSON.parse(localStorage.getItem("recipes")) || [],
  preferences: JSON.parse(localStorage.getItem("preferences")) || [],
  savedRecipes: [],
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
      const { recipes } = action.payload;
      state.savedRecipes = recipes;
    },
    setSaveRecipe: (state, action) => {
      const { recipe } = action.payload;
      state.savedRecipes.push(recipe);
    },
    setDeleteSavedRecipe: (state, action) => {
      const { recipe } = action.payload;
      state.savedRecipes = state.savedRecipes.filter(({ id }) => recipe.id);
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
