import { createSlice } from "@reduxjs/toolkit";

export const catalogSlice = createSlice({
  name: "catalog",
  initialState: {
    recipes: [],
    searchOptions: [],
  },
  reducers: {
    getRecipes: (state, action) => {
      state.recipes = action.payload;
    },
    addRecipe: (state, action) => {
      state.recipes = [...state.recipes, action.payload];
    },
    getSearchOptions: (state, action) => {
      state.searchOptions = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getRecipes, addRecipe, getSearchOptions } = catalogSlice.actions;

export default catalogSlice.reducer;
