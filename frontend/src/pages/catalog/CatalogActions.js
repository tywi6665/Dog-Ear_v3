import axios from "axios";
import {
  getRecipes,
  addRecipe,
  getSearchOptions,
} from "../../reducers/catalogSlice";

export const get_Recipes = (dispatch, displayMessage) => {
  axios
    .get("/api/v1/recipes/")
    .then((res) => {
      dispatch(getRecipes(res.data));
      get_SearchOptions(res.data, dispatch);
    })
    .catch((error) => {
      displayMessage(Object.values(error.response.data)[0], "error"); // raise message error
    });
};

export const add_Recipe = (recipe, dispatch, displayMessage) => {
  console.log(recipe);
  axios
    .post("/api/v1/recipes/", recipe)
    .then((res) => {
      dispatch(addRecipe(res.data));
      displayMessage("Recipe successfully added", "success");
    })
    .catch((error) => {
      displayMessage(Object.values(error.response.data)[0], "error"); // raise message error
    });
};

export const get_SearchOptions = (recipes, dispatch) => {
  let arr = {
    tags: [],
    allOptions: [],
  };
  recipes.forEach((recipe) => {
    let tags = recipe.tags;
    let cleanedTitle = recipe.title.trim();
    tags.forEach((tag) => {
      if (tag.length) {
        let cleanedTag = tag.toLowerCase().trim();
        if (!arr.tags.includes(cleanedTag)) {
          arr.tags.push(cleanedTag);
        }
        if (!arr.allOptions.includes(cleanedTag)) {
          arr.allOptions.push(cleanedTag);
        }
      }
    });
    if (!arr.allOptions.includes(cleanedTitle)) {
      arr.allOptions.push(cleanedTitle);
    }
  });
  let options = arr.tags.map((option) => {
    if (option.length) {
      // const firstLetter = option[0].toUpperCase();
      option = option.split(" ").map(function (word) {
        return word.replace(word[0], word[0].toUpperCase());
      });
      return {
        title: option[0],
        key: option[0],
        value: option[0],
      };
    }
  });
  arr.tags = options;
  arr.allOptions.sort();
  dispatch(getSearchOptions(arr));
};
