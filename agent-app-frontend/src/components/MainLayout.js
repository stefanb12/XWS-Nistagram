import React from "react";
import MainNavbar from "./MainNavbar";
import { Switch, Route, Redirect } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import Login from "../pages/Login";

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
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route exact path="/products">
                <NotFound />
                sadasd
              </Route>
              <Route path="/">
                <NotFound />
              </Route>
              <Route path="/404">
                <NotFound />
              </Route>
              <Redirect to="/404" />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}
