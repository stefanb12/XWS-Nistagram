import React, { Component } from "react";
import PostCard from "../components/home-page/PostCard";
import AuthService from "../services/AuthService";
import PostService from "../services/PostService";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      publicPosts: [],
    };
  }

  async componentWillMount() {
    var loggedUser = AuthService.getCurrentUser();
    var id = 0;
    if (loggedUser !== null) {
      id = loggedUser.id;
    }

    await PostService.getPublicPosts(id)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          publicPosts: result,
        });
      });
  }

  updatePosts = async (updatedPosts) => {
    await this.setState({
      publicPosts: updatedPosts,
    });
  };

  render() {
    return (
      <div>
        <div class="container">
          <div class="no-page-title" style={{ marginLeft: "200px" }}>
            <div id="main-wrapper">
              <div class="row">
                <div class="col-lg-9 col-xl-20">
                  <PostCard
                    sendPosts={this.state.publicPosts}
                    updatePost={this.updatePosts.bind(this)}
                  />
                </div>
              </div>
            </div>

            <div class="page-footer">
              <p>Copyright © 2021.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
