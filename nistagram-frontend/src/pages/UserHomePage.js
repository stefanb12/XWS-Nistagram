import React, { Component } from "react";
import Posts from "../components/home-page/Posts";
import Stories from "../components/home-page/Stories";

export default class UserHomePage extends Component {
  render() {
    return (
      <div>
        <Stories />
        <Posts />
      </div>
    );
  }
}
