import React from "react";
import UserNavbar from "./UserNavbar";
import { Switch, Route } from "react-router-dom";
import UserProfile from "../pages/UserProfile";
import UserProfileSettings from "../pages/UserProfileSettings";
import UserHomePage from "../pages/UserHomePage";

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
              {/* {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))} */}
              <Route path="/user/profile">
                <UserProfile />
              </Route>
              <Route path="/user/home">
                <UserHomePage />
              </Route>
              <Route path="/user/settings">
                <UserProfileSettings />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}
