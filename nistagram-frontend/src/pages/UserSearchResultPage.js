import React, { Component } from "react";
import { Redirect, useHistory, withRouter } from "react-router-dom";
import PostCard from "../components/home-page/PostCard";
import PostService from "../services/PostService";
import hash from "../assets/images/hash.svg";
import { Button } from "@material-ui/core";
import { ArrowBack, ArrowRightSharp } from "@material-ui/icons";

class UserSearchResultPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        searchParam: this.props.location.state.searchParam,
        imageSrc: this.props.location.state.imageSrc,
        publicPosts: this.props.location.state.posts,
        searchedPosts: [],
        redirect: false
    };
  }

  static getDerivedStateFromProps(props) {
    return { 
        searchParam: props.location.state.searchParam,
        imageSrc: props.location.state.imageSrc,
        publicPosts: props.location.state.posts
    };
  }

  async componentWillMount() {
    await PostService.getSearchedPosts(this.state.searchParam)
    .then((res) => res.json())
    .then((result) => {
      this.setState({
        publicPosts: result,
      });
    });
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }  
  
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect goBack />
    }
  }

  updatePosts = async (updatedPosts) => {      
      this.props.history.push({
        pathname: "/user/search",
        state: {
          searchParam: this.state.searchParam,
          imageSrc: this.state.imageSrc,
          posts: updatedPosts,
        },
      });
  };

  render() {
    return (
      <div>
        <div class="container">
          <div class="no-page-title" style={{ marginLeft: "200px" }}>
            <div id="main-wrapper">
              <div class="row" style={{marginTop: "2%"}}>
                <h4>Search results for:  </h4>
                <img
                    src={this.state.imageSrc}
                    style={{marginLeft: "2%", marginTop: "20%"}}
                    className="rounded-circle img-responsive mt-2"
                    width="30"
                    height="30"
                />
                <h4>{this.state.searchParam}</h4>
                {this.renderRedirect()}
                <Button
                    variant="contained"
                    color="primary"
                    style ={{ marginLeft: "6%", borderRadius: "30px" }}
                    onClick = {this.setRedirect}
                    startIcon={<ArrowBack />}
                >Exit search</Button>

                <div class="col-lg-9 col-xl-20" style={{marginTop: "4%"}}>
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

export default withRouter(UserSearchResultPage);

