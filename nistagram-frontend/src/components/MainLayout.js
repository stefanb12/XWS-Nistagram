import React from "react";
import MainNavbar from "./MainNavbar";
import { Switch, Route } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import Login from "../pages/Login";
import HomePage from "../pages/HomePage";

const MainLayoutRoot = {
  height: "100%",
  width: "100%",
  overflow: "hidden",
};

const MainLayoutWrapper = {
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",
  paddingTop: "6%",
};

const MainLayoutContainer = {
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",
};

const MainLayoutContent = {
  flex: "1 1 auto",
  height: "100%",
  overflow: "auto",
};

export default function MainLayout({ routes }) {
  return (
    <div style={MainLayoutRoot}>
      <MainNavbar />
      <div style={MainLayoutWrapper}>
        <div style={MainLayoutContainer}>
          <div style={MainLayoutContent}>
            <Switch>
              {/* {routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
              ))} */}
              <Route path="/app/login">
                <Login />
              </Route>
              <Route path="/app/register">
                <Register />
              </Route>
              <Route path="/app/home">
                <HomePage />
              </Route>
              <Route path="/app/404">
                <NotFound />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}
