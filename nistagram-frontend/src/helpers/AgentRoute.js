import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthService from "../services/AuthService";

export const AgentRoute = ({ component: Component, roles, ...rest }) => (
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

      if (userRole === "Admin") {
        return (
          <Redirect
            to={{
              pathname: "/admin/profileVerificationRequests",
              state: { from: props.location },
            }}
          />
        );
      }

      if (userRole === "User") {
        return (
          <Redirect
            to={{ pathname: "/user", state: { from: props.location } }}
          />
        );
      }

      //   // check if route is restricted by role
      //   if (roles && roles.indexOf(currentUser.role) === -1) {
      //     // role not authorised so redirect to home page
      //     return <Redirect to={{ pathname: "/" }} />;
      //   }

      // authorised so return component
      return <Component {...props} />;
    }}
  />
);
