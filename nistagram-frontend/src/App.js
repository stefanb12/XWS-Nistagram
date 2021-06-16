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
import NotFound from "./pages/NotFound";
import { PrivateRoute } from "./helpers/PrivateRoute";
import AdminLayout from "./components/AdminLayout";

function App() {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="/app" />
        <Route path="/app" component={MainLayout} />
        <PrivateRoute path="/user" component={UserLayout} />
        <PrivateRoute path="/admin" component={AdminLayout} />
        <Route path="/*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
