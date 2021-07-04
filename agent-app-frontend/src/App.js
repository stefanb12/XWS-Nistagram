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
import "bootstrap/dist/css/bootstrap.min.css";
import UserLayout from "./components/UserLayout";
import { UserRoute } from "./helpers/UserRoute";
import { AdminRoute } from "./helpers/AdminRoute";
import AdminLayout from "./components/AdminLayout";

function App() {
  return (
    <Router>
      <Switch>
        {/* <Redirect exact from="/" to="/app" /> */}
        <Redirect exact from="/" to="/app/products" />
        <Route path="/app" component={MainLayout} />
        <UserRoute path="/user" component={UserLayout} />
        <AdminRoute path="/admin" component={AdminLayout} />
        <Route path="/*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
