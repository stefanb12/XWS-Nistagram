import React, { Component } from "react";
import { Redirect, useHistory, withRouter } from "react-router-dom";
import PostCard from "../components/home-page/PostCard";
import PostService from "../services/PostService";
import hash from "../assets/images/hash.svg";
import { Button } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";

class SearchResultPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        searchParam: this.props.location.state.searchParam,
        imageSrc: this.props.location.state.imageSrc,
        publicPosts: [],
        redirect: false
    };
  }

  static getDerivedStateFromProps(props) {
    return { 
        searchParam: props.location.state.searchParam,
        imageSrc: props.location.state.imageSrc,
    };
  }

  async componentWillMount() {
    console.log(this.state.searchParam);
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
                <div class="col-lg-9 col-xl-20">
                    
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

export default withRouter(SearchResultPage);

