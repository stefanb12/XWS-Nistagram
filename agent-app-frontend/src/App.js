import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import MainLayout from "./components/MainLayout";
import NotFound from "./pages/NotFound";
import UserLayout from "./components/UserLayout";
import { UserRoute } from "./helpers/UserRoute";

function App() {
  return (
    <Router>
      <Switch>
        {/* <Redirect exact from="/" to="/app" /> */}
        <Redirect exact from="/" to="/app" />
        <Route path="/app" component={MainLayout} />
        <UserRoute path="/user" component={UserLayout} />
        <Route path="/*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
