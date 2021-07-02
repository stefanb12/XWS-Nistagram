import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthService from "../services/AuthService";

export const UserRoute = ({ component: Component, roles, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const currentUser = AuthService.getCurrentUser();
      const userRole = localStorage.getItem("userRole");

      if (!currentUser) {
        // not logged in so redirect to login page with the return url
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

      // // check if route is restricted by role
      // if (roles && roles.indexOf(userRole) === -1) {
      //   // role not authorised so redirect to home page
      //   return <Redirect to={{ pathname: "/" }} />;
      // }

      // authorised so return component
      return <Component {...props} />;
    }}
  />
);
