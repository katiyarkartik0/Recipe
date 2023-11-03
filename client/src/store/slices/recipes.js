import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipes: JSON.parse(localStorage.getItem("recipes")) || [],
};

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setRcipes: (state, action) => {
      const { recipes } = action.payload;
      state.recipes = recipes;
    },
  },
});

export const { setRcipes } = recipesSlice.actions;
export default recipesSlice.reducer;
