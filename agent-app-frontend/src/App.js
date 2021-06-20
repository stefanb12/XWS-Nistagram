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


function App() {
  return (
    <Router>
      <Switch>
        {/* <Redirect exact from="/" to="/app" /> */}
        <Route path="/" component={MainLayout} />
        <Route path="/*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
