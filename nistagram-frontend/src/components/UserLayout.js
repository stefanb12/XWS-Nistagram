import React from "react";
import UserNavbar from "./UserNavbar";
import { Switch, Route, Redirect } from "react-router-dom";
import UserProfile from "../pages/UserProfile";
import UserProfileSettings from "../pages/UserProfileSettings";
import UserHomePage from "../pages/UserHomePage";
import NotFound from "../pages/NotFound";
import UserSearchResultPage from "../pages/UserSearchResultPage";
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
  paddingTop: "5%",
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

export default function UserLayout({ routes }) {
  return (
    <div style={MainLayoutRoot}>
      <UserNavbar />
      <div style={MainLayoutWrapper}>
        <div style={MainLayoutContainer}>
          <div style={MainLayoutContent}>
            <Switch>
              <Route path="/user/profile">
                <UserProfile />
              </Route>
              <Route path="/user/settings">
                <UserProfileSettings />
              </Route>
              <Route path="/user/search">
                <UserSearchResultPage />
              </Route>
              <Route path="/user/explore">
                <HomePage />
              </Route>
              <Route path="/user/*">
                <NotFound />
              </Route>
              <Route path="/user">
                <UserHomePage />
              </Route>
              <Route path="/user/404">
                <NotFound />
              </Route>
              <Redirect to="/user/404" />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}
