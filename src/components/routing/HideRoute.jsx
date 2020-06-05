import React from "react";
import { Route, Redirect } from "react-router-dom";

export const HideRoute = ({ component: Component, ...rest }) => {
  let cookies = document.cookie.split(";");
  let cookie = "";
  cookies.forEach((c) => {
    if (c.includes("token")) {
      cookie = c;
      return;
    }
  });
  return (
    <Route
      {...rest}
      render={(props) =>
        (cookie && cookie.split("=")[1].length > 0) || !cookie ? (
          <Redirect to="/accounts" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};
