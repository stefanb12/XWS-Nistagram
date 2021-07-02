import React from "react";
import UserNavbar from "./UserNavbar";
import { Switch, Route, Redirect } from "react-router-dom";
import UserHomePage from "../pages/UserHomePage";
import NotFound from "../pages/NotFound";
import Campaigns from "../pages/Campaigns";

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

export default function AgentLayout({ routes }) {
  return (
    <div style={MainLayoutRoot}>
      <UserNavbar />
      <div style={MainLayoutWrapper}>
        <div style={MainLayoutContainer}>
          <div style={MainLayoutContent}>
            <Switch>
              <Route path="/agent/campaigns">
                <Campaigns />
              </Route>
              <Route path="/agent/*">
                <NotFound />
              </Route>
              <Route path="/agent">
                <UserHomePage />
              </Route>
              <Route path="/agent/404">
                <NotFound />
              </Route>
              <Redirect to="/agent/404" />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}
