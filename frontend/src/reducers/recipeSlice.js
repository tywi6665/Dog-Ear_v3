import { createSlice } from "@reduxjs/toolkit";

export const recipeSlice = createSlice({
  name: "catalog",
  initialState: {
    recipe: {},
  },
  reducers: {
    getRecipe: (state, action) => {
      state.recipe = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getRecipe } = recipeSlice.actions;

export default recipeSlice.reducer;
