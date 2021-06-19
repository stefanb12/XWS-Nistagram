import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthService from "../services/AuthService";

export const AdminRoute = ({ component: Component, roles, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const currentUser = AuthService.getCurrentUser();
      const userRole = localStorage.getItem("userRole");

      if (!currentUser) {
        return (
          <Redirect
            to={{ pathname: "/app/login", state: { from: props.location } }}
          />
        );
      }

      if (userRole !== "Admin") {
        return (
          // User, Agent
          <Redirect
            to={{
              pathname: "/user",
              state: { from: props.location },
            }}
          />
        );
      }

      // authorised so return component
      return <Component {...props} />;
    }}
  />
);
