import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "antd/dist/reset.css";
import "./index.css";
import store from "./store/index";
import { Provider } from "react-redux";
import App from "./App";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Catalog from "./pages/catalog/Catalog";
import Recipe from "./pages/recipe/Recipe";
import RecipeEdit from "./pages/edit/RecipeEdit";
import ErrorPage from "./components/ErrorPage";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         path: "*",
//         element: <Navigate to="/catalog" replace />,
//       },
//       {
//         path: "/login",
//         element: <Login />,
//       },
//       {
//         path: "/signup",
//         element: <Signup />,
//       },
//       {
//         path: "/catalog",
//         element: <Catalog />,
//       },
//       {
//         path: "/catalog/recipe/:id",
//         element: <Recipe />,
//       },
//       {
//         path: "/catalog/recipe/:id/edit",
//         element: <RecipeEdit />,
//       },
//     ],
//   },
// ]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
