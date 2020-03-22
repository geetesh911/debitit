import React from "react";
import { Route, Redirect } from "react-router-dom";

export const HideRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem("token") ? (
          <Redirect to="/accounts" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};
