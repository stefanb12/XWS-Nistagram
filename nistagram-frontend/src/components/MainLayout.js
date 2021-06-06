import React from "react";
import MainNavbar from "./MainNavbar";
import { Switch, Route, Redirect } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import Login from "../pages/Login";
import HomePage from "../pages/HomePage";
import SearchResultPage from "../pages/SearchResultPage";
import UserProfile from "../pages/UserProfile";

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
              <Route path="/app/search">
                <SearchResultPage />
              </Route>
              <Route path="/app/profile">
                <UserProfile />
              </Route>
              <Route path="/app/*">
                <NotFound />
              </Route>
              <Route path="/app">
                <HomePage />
              </Route>
              <Route path="/app/404">
                <NotFound />
              </Route>
              <Redirect to="/app/404" />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}
