import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { set_CurrentUser, set_Token } from "./pages/login/LoginActions";
import { isEmpty } from "./utils/";
import { Layout } from "antd";
import Navbar from "./components/Navbar";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // check localStorage
    if (!isEmpty(localStorage.getItem("token"))) {
      console.log(localStorage.getItem("token"));
      set_Token(localStorage.getItem("token"), dispatch);
    }
    if (!isEmpty(localStorage.getItem("user"))) {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log(user);
      set_CurrentUser(user, "/catalog", navigate, dispatch);
    }
  }, []);

  return (
    <Layout className="App">
      <Navbar />
      <Outlet />
    </Layout>
  );
};

export default App;
