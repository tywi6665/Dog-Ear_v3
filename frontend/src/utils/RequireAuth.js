import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export default function requireAuth(Component) {
  const AuthenticatedComponent = () => {
    const navigate = useNavigate();
    let location = useLocation();
    const isAuthenticated = useSelector((state) => state.login.isAuthenticated);

    useEffect(() => {
      checkAuth();
    }, []);

    const checkAuth = () => {
      if (!isAuthenticated) {
        console.log(location);
        // read the current location
        const redirectAfterLogin = location.pathname;
        // go to login and pass current location in next parameter
        navigate(`/login?next=${redirectAfterLogin}`);
      }
    };

    return <div>{isAuthenticated === true ? <Component /> : null}</div>;
  };

  return AuthenticatedComponent;
}
