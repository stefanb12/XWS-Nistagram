import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NotFound from "../pages/NotFound";
import AdminNavbar from "./AdminNavbar";
import ProfileVerificationRequest from "../pages/ProfileVerificationRequest";
import InappropriateContentRequests from "../pages/InappropriateContentRequests";
import AgentRequests from "../pages/AgentRequests";

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
              <Route path="/admin/profileVerificationRequests">
                <ProfileVerificationRequest />
              </Route>
              <Route path="/admin/inappropriateContentRequests">
                <InappropriateContentRequests />
              </Route>
              <Route path="/admin/agentRequests">
                <AgentRequests />
              </Route>
              <Route path="/admin/*">
                <NotFound />
              </Route>
              <Route path="/admin">
                <Redirect to="/admin/profileVerificationRequests" />
              </Route>
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
