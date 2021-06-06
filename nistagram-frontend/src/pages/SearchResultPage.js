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
        searchedPosts: [],
        redirect: false
    };
  }

  static getDerivedStateFromProps(props) {
    return { 
        searchParam: props.location.state.searchParam,
        imageSrc: props.location.state.imageSrc,
        searchedPosts: props.location.state.posts
    };
  }

  async componentDidMount() {
    console.log(this.state.searchedPosts);
    /*await PostService.getPublicPosts()
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          publicPosts: result,
        });
      });

      console.log(this.state.publicPosts);

      let temp = [];
      let tagFound = false;
      for(let i = 0; i < this.state.publicPosts.length; i++){
        if(this.state.publicPosts[i].tags != null){
          for(let j=0; j < this.state.publicPosts[i].tags.length; j++){
            if(this.state.publicPosts[i].tags[j] == this.state.searchParam){
              tagFound = true;
              break;
            }
          }
        }

        let location = "";
        if(this.state.publicPosts[i].location.address === "" || this.state.publicPosts[i].location.address === null){
          location = this.state.publicPosts[i].location.city + ", " + this.state.publicPosts[i].location.country;
        }else{
          location = this.state.publicPosts[i].location.address + ", " + this.state.publicPosts[i].location.city + ", " + this.state.publicPosts[i].location.country;
        }

        if(tagFound == true){
          tagFound = false;
          temp.push(this.state.publicPosts[i]);
        }

        if(this.state.searchParam == location){
          temp.push(this.state.publicPosts[i]);
        }
      }
      this.setState({
        searchedPosts: temp,
      });*/

      // await PostService.getSearchedPosts(this.state.searchParam)
      // .then((res) => res.json())
      // .then((result) => {
      //   console.log(result)
      //   this.setState({
      //     searchedPosts: result,
      //   });
      // });

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

  updatePosts = async () => {
    await PostService.getSearchedPosts(this.state.searchParam)
      .then((res) => res.json())
      .then((result) => {
        console.log(result)
        this.setState({
          searchedPosts: result,
        });
      });
  };

  async showResults(){
    await PostService.getSearchedPosts(this.state.searchParam)
      .then((res) => res.json())
      .then((result) => {
        console.log(result)
        this.setState({
          searchedPosts: result,
        });
      });
      return this.state.searchedPosts;
  }

  /*updatePosts = async (updatedPosts) => {
    console.log(updatedPosts)
    await this.setState({
      searchedPosts: updatedPosts,

    }, () => {
      console.log(this.state.searchedPosts);
    });
    
  };*/

  updatePosts = async (updatedPosts) => {
    await this.setState({
      searchedPosts: updatedPosts,
    });
  };

  render() {
    //console.log("RENDER", this.state.searchedPosts)
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
                    sendPosts={this.state.searchedPosts}
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

export default withRouter(SearchResultPage);

