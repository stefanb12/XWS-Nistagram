import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NotFound from "../pages/NotFound";
import AdminNavbar from "./AdminNavbar";
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

export default function AdminLayout({ routes }) {
  return (
    <div style={MainLayoutRoot}>
      <AdminNavbar />
      <div style={MainLayoutWrapper}>
        <div style={MainLayoutContainer}>
          <div style={MainLayoutContent}>
            <Switch>
              <Route path="/admin/requestsForProfileVerification">
                {/* <UserProfileSettings /> */}
              </Route>
              <Route path="/admin/requestsForInappropriateContent">
                {/* <UserSearchResultPage /> */}
              </Route>
              <Route path="/admin/requestsForAgent">
                <NotFound />
              </Route>
              <Route path="/admin/*">
                <NotFound />
              </Route>
              <Route path="/admin">{/* <UserProfileSettings /> */}</Route>
              <Route path="/admin/404">
                <NotFound />
              </Route>
              <Redirect to="/admin/404" />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}
