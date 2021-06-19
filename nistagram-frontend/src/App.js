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
import AdminLayout from "./components/AdminLayout";
import AgentLayout from "./components/AgentLayout";
import { UserRoute } from "./helpers/UserRoute";
import { AgentRoute } from "./helpers/AgentRoute";
import { AdminRoute } from "./helpers/AdminRoute";

function App() {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="/app" />
        <Route path="/app" component={MainLayout} />
        <UserRoute path="/user" component={UserLayout} />
        <AgentRoute path="/agent" component={AgentLayout} />
        <AdminRoute path="/admin" component={AdminLayout} />
        <Route path="/*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
