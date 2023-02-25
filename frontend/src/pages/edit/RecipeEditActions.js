import axios from "axios";

export const update_Recipe = (id, recipe, navigate, displayMessage) => {
  axios
    .put(`/api/v1/recipes/${id}/`, recipe)
    .then((res) => {
      navigate(`/catalog/recipe/${id}`);
    })
    .catch((error) => {
      displayMessage(Object.values(error.response.data)[0], "error"); // raise message error
    });
};
