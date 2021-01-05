import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../../App";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const userC = useContext(UserContext);
  const [userStatus] = userC;

  return (
    <Route
      {...rest}
      render={(props) =>
        Object.keys(userStatus).length > 0 ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default PrivateRoute;
