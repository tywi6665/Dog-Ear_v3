import axios from "axios";
import {
  createUserSubmitted,
  createUserError,
  createUserSuccess,
} from "../../reducers/signupSlice";

export const signupNewUser = (userData, dispatch, displayMessage) => {
  dispatch(createUserSubmitted());
  axios
    .post("api/v1/users/", userData)
    .then((res) => {
      console.log(res);
      displayMessage(
        `Account for ${userData.username} created successfully. Please login.`,
        "success"
      );
      dispatch(createUserSuccess());
    })
    .catch((error) => {
      if (error.response) {
        console.log("here");
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(Object.values(error.response.data));
        Object.values(error.response.data)[0].forEach((error) =>
          displayMessage(error, "error")
        );
        dispatch(createUserError(error.response.data));
      } else if (error.message) {
        // the error message is available,
        displayMessage(JSON.stringify(error.message), "error");
      } else {
        // strange error, just show it
        displayMessage(JSON.stringify(error), "error");
      }
    });
};
