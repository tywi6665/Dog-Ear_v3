import axios from "axios";

export const isEmpty = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

export const titleCase = (str) => {
  if (str) {
    return str
      .toLowerCase()
      .split(" ")
      .map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  } else {
    return "";
  }
};

export const titleCaseArr = (arr) => {
  return arr.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
};

export const setAxiosAuthToken = (token) => {
  if (typeof token !== "undefined" && token) {
    // Apply for every request
    axios.defaults.headers.common["Authorization"] = "Token " + token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};
