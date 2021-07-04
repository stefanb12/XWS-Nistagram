import React from "react";
import MainNavbar from "./MainNavbar";
import { Switch, Route, Redirect } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Products from "./Products";
import ShoppingCart from "./ShoppingCart";
import UserNavbar from "./UserNavbar";
import SingleProduct from "./SingleProduct";

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

export default function UserLayout({ routes }) {
  return (
    <div style={MainLayoutRoot}>
      <UserNavbar />
      <div style={MainLayoutWrapper}>
        <div style={MainLayoutContainer}>
          <div style={MainLayoutContent}>
            <Switch>
              <Route path="/user/products">
                <Products />
              </Route>
              <Route path="/user/shoppingCart">
                <ShoppingCart />
              </Route>
              <Route path="/user/singleProduct/:id">
                <SingleProduct />
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
