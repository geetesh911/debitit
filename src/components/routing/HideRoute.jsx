import React from "react";
import { Route, Redirect } from "react-router-dom";

export const HideRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        document.cookie && document.cookie.split("=")[1].length > 0 ? (
          <Redirect to="/accounts" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};
