import React from "react";
import UserNavbar from "./UserNavbar";
import { Switch, Route } from "react-router-dom";
import UserProfile from "../pages/UserProfile";

export default function UserLayout({ routes }) {
  return (
    <div>
      <UserNavbar />
      <Switch>
        {/* {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))} */}
        <Route path="/user/profile">
          <UserProfile />
        </Route>
      </Switch>
    </div>
  );
}
