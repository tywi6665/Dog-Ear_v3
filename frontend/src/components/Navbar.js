import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Layout, Typography, Button } from "antd";
import { logout } from "../pages/login/LoginActions";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Title, Text } = Typography;
  const { Header } = Layout;

  const isAuthenticated = useSelector((state) => state.login.isAuthenticated);
  const user = useSelector((state) => state.login.user);

  return (
    <Header
      id="header"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        backgroundColor: "#fff",
        padding: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div>
        <Title
          style={{
            margin: "5px",
          }}
        >
          Dog-Ear
        </Title>
      </div>
      <div className="dog-image">
        {isAuthenticated ? (
          <>
            <Text strong italic>
              Welcome {user.username}
            </Text>
            <Button type="link" onClick={() => logout(navigate, dispatch)}>
              Log Out
            </Button>
          </>
        ) : null}
        <img src="./static/graphics/dog.png" alt="Woof woof" />
      </div>
    </Header>
  );
};

export default Navbar;
