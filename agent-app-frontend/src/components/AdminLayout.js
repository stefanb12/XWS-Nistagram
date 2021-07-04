import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import AdminProducts from "../pages/AdminProducts";
import NotFound from "../pages/NotFound";

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

export default function AdminLayout({ routes }) {
  return (
    <div style={MainLayoutRoot}>
      <AdminNavbar />
      <div style={MainLayoutWrapper}>
        <div style={MainLayoutContainer}>
          <div style={MainLayoutContent}>
            <Switch>
              <Route path="/admin/products">
                <AdminProducts />
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
