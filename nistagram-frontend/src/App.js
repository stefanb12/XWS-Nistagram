import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import MainLayout from "./components/MainLayout";
import UserLayout from "./components/UserLayout";

function App() {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="/app" />
        {/* {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))} */}
        <Route path="/app">
          <MainLayout />
        </Route>
        <Route path="/user">
          <UserLayout />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
