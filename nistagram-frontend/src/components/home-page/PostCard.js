import React, { Component } from "react";
import noPostsYet from "../../assets/images/no_posts_yet.jpg";
import moment from "moment";
import AuthService from "../../services/AuthService";
import { Link, withRouter } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import PostService from "../../services/PostService";

class PostCard extends Component {
  constructor(props) {
    super(props);
    this.dropdownRef = React.createRef();
    this.state = {
      isSaved: false,
      isActive: false,
      newComment: "",
      currentUser: null,
      open: false,
      posts: [],
      message: "",
    };
    this.handleClick = this.handleClick.bind(this);
  }

  static getDerivedStateFromProps(props) {
    return { posts: props.sendPosts };
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    this.setState({
      currentUser: AuthService.getCurrentUser(),
    });
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClick() {
    this.setState((state) => ({
      isActive: !this.state.isActive,
    }));
  }

  handleClickOutside = (event) => {
    if (
      this.dropdownRef.current &&
      !this.dropdownRef.current.contains(event.target)
    ) {
      this.setState({
        isActive: false,
      });
    }
  };

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  postNewComment = (postId) => {
    let text = document.getElementById("newComment" + postId).value;
    let resStatus = 0;
    if (text !== "") {
      PostService.insertNewComment(postId, text, this.state.currentUser)
        .then((res) => {
          resStatus = res.status;
          return res.json();
        })
        .then((result) => {
          if (resStatus === 200) {
            const index = this.state.posts.findIndex((p) => p.id === postId);
            const updatedPosts = [...this.state.posts];
            updatedPosts[index] = result;
            this.updatePost(updatedPosts);
          }
          return result;
        });
      document.getElementById("newComment" + postId).value = "";
    } else {
      this.handleClickSnackBar("You have to enter a comment!");
    }
  };

  updatePost = (updatedPosts) => {
    this.props.updatePost(updatedPosts);
  };

  likePost = (postId) => {
    if (this.state.currentUser != null) {
      if (
        document.getElementById("like" + postId).className === "fa fa-heart"
      ) {
        document.getElementById("like" + postId).className = "fa fa-heart-o";
      } else {
        document.getElementById("like" + postId).className = "fa fa-heart";
        document.getElementById("dislike" + postId).className =
          "fa fa-thumbs-o-down";
      }

      let resStatus = 0;

      PostService.likePost(postId, this.state.currentUser)
        .then((res) => {
          resStatus = res.status;
          return res.json();
        })
        .then((result) => {
          if (resStatus === 200) {
            const index = this.state.posts.findIndex((p) => p.id === postId);
            const updatedPosts = [...this.state.posts];
            updatedPosts[index] = result;
            this.updatePost(updatedPosts);
          }
        });
    } else {
      this.handleClickSnackBar("You have to login first!");
    }
  };

  dislikePost = (postId) => {
    if (this.state.currentUser != null) {
      if (
        document.getElementById("dislike" + postId).className ===
        "fa fa-thumbs-down"
      ) {
        document.getElementById("dislike" + postId).className =
          "fa fa-thumbs-o-down";
      } else {
        document.getElementById("dislike" + postId).className =
          "fa fa-thumbs-down";
        document.getElementById("like" + postId).className = "fa fa-heart-o";
      }

      let resStatus = 0;

      PostService.dislikePost(postId, this.state.currentUser)
        .then((res) => {
          resStatus = res.status;
          return res.json();
        })
        .then((result) => {
          if (resStatus === 200) {
            const index = this.state.posts.findIndex((p) => p.id === postId);
            const updatedPosts = [...this.state.posts];
            updatedPosts[index] = result;
            this.updatePost(updatedPosts);
          }
        });
    } else {
      this.handleClickSnackBar("You have to login first!");
    }
  };

  savePost = (postId) => {
    if (this.state.currentUser != null) {
      if (
        document.getElementById("save" + postId).className === "fa fa-bookmark"
      ) {
        document.getElementById("save" + postId).className = "fa fa-bookmark-o";
      } else {
        document.getElementById("save" + postId).className = "fa fa-bookmark";
      }

      let resStatus = 0;

      PostService.savePostAsFavorite(postId, this.state.currentUser)
        .then((res) => {
          resStatus = res.status;
          return res.json();
        })
        .then((result) => {
          if (resStatus === 200) {
            const index = this.state.posts.findIndex((p) => p.id === postId);
            const updatedPosts = [...this.state.posts];
            updatedPosts[index] = result;
            this.updatePost(updatedPosts);
          }
        });
    } else {
      this.handleClickSnackBar("You have to login first!");
    }
  };

  handleClickSnackBar = (message) => {
    this.setState({
      open: true,
      message: message,
    });
  };

  handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({
      open: false,
    });
  };

  render() {
    const isSaved = this.state.isSaved;
    const dropdownRef = this.dropdownRef;
    const isActive = this.state.isActive;
    const posts = this.state.posts;

    return (
      <div>
        <Snackbar
          open={this.state.open}
          autoHideDuration={2500}
          onClose={this.handleCloseSnackBar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={this.handleCloseSnackBar} severity="error">
            {this.state.message}
          </Alert>
        </Snackbar>
        {(() => {
          if (Array.isArray(posts)) {
            return (
              <div>
                {posts.map((post, key) => {
                  return (
                    <div key={key}>
                      <div class="profile-timeline">
                        <ul class="list-unstyled">
                          <li class="timeline-item">
                            <div class="card card-white grid-margin">
                              <div class="card-body">
                                <div class="timeline-item-header">
                                  <img
                                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
                                    alt=""
                                  />
                                  <p>
                                    {post.publisher.username}{" "}
                                    <small>
                                      {moment(
                                        moment(post.publishingDate).format(
                                          "YYYY-MM-DD HH:mm:ss"
                                        )
                                      ).fromNow()}
                                    </small>
                                  </p>
                                  <p>
                                    <small>
                                      {(() => {
                                        if (post.location.address === "") {
                                          return (
                                            <div>
                                              {post.location.city},{" "}
                                              {post.location.country}{" "}
                                            </div>
                                          );
                                        } else {
                                          return (
                                            <div>
                                              {post.location.address},{" "}
                                              {post.location.city},{" "}
                                              {post.location.country}{" "}
                                            </div>
                                          );
                                        }
                                      })()}
                                    </small>
                                  </p>
                                </div>
                                {(() => {
                                  if (this.state.currentUser !== null) {
                                    return (
                                      <div>
                                        <div class="dropdown" ref={dropdownRef}>
                                          <button
                                            class="btn p-0"
                                            type="button"
                                            id="dropdownMenuButton"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                            onClick={this.handleClick}
                                            className="menu-trigger"
                                          >
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="34"
                                              height="34"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              stroke="currentColor"
                                              stroke-width="2"
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                              class="feather feather-more-horizontal icon-lg pb-3px"
                                            >
                                              <circle
                                                cx="12"
                                                cy="12"
                                                r="1"
                                              ></circle>
                                              <circle
                                                cx="19"
                                                cy="12"
                                                r="1"
                                              ></circle>
                                              <circle
                                                cx="5"
                                                cy="12"
                                                r="1"
                                              ></circle>
                                            </svg>
                                          </button>
                                          <nav
                                            className={`menu ${
                                              isActive ? "active" : "inactive"
                                            }`}
                                          >
                                            <ul>
                                              <li>
                                                <Link
                                                  to="/user/profile"
                                                  params={{
                                                    profileId:
                                                      post.publisher.id,
                                                  }}
                                                >
                                                  View profile
                                                </Link>
                                              </li>
                                              <li>
                                                <a href="javascript:void(0)">
                                                  Report
                                                </a>
                                              </li>
                                            </ul>
                                          </nav>
                                        </div>
                                      </div>
                                    );
                                  }
                                })()}

                                <div class="timeline-item-post">
                                  <img
                                    class="img-thumbnail"
                                    src={post.imagesSrc[0]}
                                    alt=""
                                  />
                                  {(() => {
                                    if (
                                      post.description !== null &&
                                      Array.isArray(post.tags)
                                    ) {
                                      let tags = "";
                                      {
                                        post.tags.map((tag, key) => {
                                          tags += "#" + tag;
                                        });
                                      }

                                      return (
                                        <div>
                                          <p style={{ marginTop: "20px" }}>
                                            <i>Description: </i>
                                            {post.description}
                                          </p>
                                          <p style={{ marginTop: "20px" }}>
                                            <i>Tags: </i>
                                            {tags}
                                          </p>
                                        </div>
                                      );
                                    } else if (
                                      post.description !== null &&
                                      !Array.isArray(post.tags)
                                    ) {
                                      return (
                                        <div>
                                          <p style={{ marginTop: "20px" }}>
                                            <i>Description: </i>
                                            {post.description}
                                          </p>
                                        </div>
                                      );
                                    } else if (
                                      post.description === null &&
                                      Array.isArray(post.tags)
                                    ) {
                                      let tags = "";
                                      {
                                        post.tags.map((tag, key) => {
                                          tags += "#" + tag;
                                        });
                                      }

                                      return (
                                        <div>
                                          <p style={{ marginTop: "20px" }}>
                                            <i>Tags: </i>
                                            {tags}
                                          </p>
                                        </div>
                                      );
                                    }
                                  })()}

                                  <div class="timeline-options">
                                    {(() => {
                                      if (post.likes !== null) {
                                        var classForLike = "fa fa-heart-o";
                                        if (this.state.currentUser != null) {
                                          var index = post.likes.findIndex(
                                            (p) =>
                                              p.id == this.state.currentUser.id
                                          );
                                          if (index !== -1) {
                                            classForLike = "fa fa-heart";
                                          }
                                        }

                                        return (
                                          <div>
                                            <a
                                              href="javascript:void(0)"
                                              onClick={() => {
                                                this.likePost(post.id);
                                              }}
                                            >
                                              <i
                                                id={"like" + post.id}
                                                class={classForLike}
                                                style={{
                                                  fontSize: "20px",
                                                }}
                                              ></i>
                                            </a>
                                            <a
                                              href="#"
                                              style={{
                                                marginLeft: "-10px",
                                              }}
                                            >
                                              Like ({post.likes.length})
                                            </a>
                                          </div>
                                        );
                                      } else {
                                        return (
                                          <div>
                                            <a
                                              href="javascript:void(0)"
                                              onClick={() => {
                                                this.likePost(post.id);
                                              }}
                                            >
                                              <i
                                                id={"like" + post.id}
                                                class={"fa fa-heart-o"}
                                                style={{
                                                  fontSize: "20px",
                                                }}
                                              ></i>
                                            </a>
                                            <a
                                              href="#"
                                              style={{
                                                marginLeft: "-10px",
                                              }}
                                            >
                                              Like (0)
                                            </a>
                                          </div>
                                        );
                                      }
                                    })()}

                                    {(() => {
                                      if (post.dislikes !== null) {
                                        var classForDislike =
                                          "fa fa-thumbs-o-down";

                                        if (this.state.currentUser != null) {
                                          var index = post.dislikes.findIndex(
                                            (p) =>
                                              p.id == this.state.currentUser.id
                                          );
                                          if (index !== -1) {
                                            classForDislike =
                                              "fa fa-thumbs-down";
                                          }
                                        }

                                        return (
                                          <div>
                                            {" "}
                                            <a
                                              href="javascript:void(0)"
                                              onClick={() => {
                                                this.dislikePost(post.id);
                                              }}
                                            >
                                              <i
                                                id={"dislike" + post.id}
                                                class={classForDislike}
                                                style={{
                                                  fontSize: "20px",
                                                  paddingLeft: "20px",
                                                }}
                                              ></i>
                                            </a>
                                            <a
                                              href="#"
                                              style={{
                                                marginLeft: "-10px",
                                              }}
                                            >
                                              Dislike ({post.dislikes.length})
                                            </a>
                                          </div>
                                        );
                                      } else {
                                        return (
                                          <div>
                                            <a
                                              href="javascript:void(0)"
                                              onClick={() => {
                                                this.dislikePost(post.id);
                                              }}
                                            >
                                              <i
                                                id={"dislike" + post.id}
                                                class={"fa fa-thumbs-o-down"}
                                                style={{
                                                  fontSize: "20px",
                                                  paddingLeft: "20px",
                                                }}
                                              ></i>
                                            </a>
                                            <a
                                              href="#"
                                              style={{
                                                marginLeft: "-10px",
                                              }}
                                            >
                                              Dislike (0)
                                            </a>
                                          </div>
                                        );
                                      }
                                    })()}

                                    {(() => {
                                      if (post.comments !== null) {
                                        return (
                                          <div>
                                            <a>
                                              <i
                                                class="fa fa-comment-o"
                                                style={{
                                                  fontSize: "20px",
                                                  paddingLeft: "20px",
                                                }}
                                              ></i>
                                            </a>
                                            <a
                                              style={{
                                                marginLeft: "-10px",
                                              }}
                                            >
                                              Comment ({post.comments.length})
                                            </a>
                                          </div>
                                        );
                                      } else {
                                        return (
                                          <div>
                                            <a>
                                              <i
                                                class="fa fa-comment-o"
                                                style={{
                                                  fontSize: "20px",
                                                  paddingLeft: "20px",
                                                }}
                                              ></i>
                                            </a>
                                            <a
                                              style={{
                                                marginLeft: "-10px",
                                              }}
                                            >
                                              Comment (0)
                                            </a>
                                          </div>
                                        );
                                      }
                                    })()}

                                    {(() => {
                                      if (this.state.currentUser !== null) {
                                        var classForFavorite =
                                          "fa fa-bookmark-o";

                                        if (post.favorites != null) {
                                          var index = post.favorites.findIndex(
                                            (p) =>
                                              p.id == this.state.currentUser.id
                                          );
                                          if (index !== -1) {
                                            console.log("aaaaaaaaaaaaa");
                                            classForFavorite = "fa fa-bookmark";
                                          }
                                        }

                                        return (
                                          <div>
                                            <a
                                              href="javascript:void(0)"
                                              onClick={() => {
                                                this.savePost(post.id);
                                              }}
                                              style={{ float: "right" }}
                                            >
                                              <i
                                                id={"save" + post.id}
                                                class={classForFavorite}
                                                style={{
                                                  fontSize: "20px",
                                                  paddingLeft: "20px",
                                                }}
                                              ></i>
                                            </a>
                                          </div>
                                        );
                                      }
                                    })()}
                                  </div>
                                  <div class="comments">
                                    {(() => {
                                      if (
                                        Array.isArray(post.comments) ||
                                        post.comments !== null
                                      ) {
                                        return (
                                          <div>
                                            {post.comments.map(
                                              (comment, key) => {
                                                return (
                                                  <div key={key}>
                                                    <div class="timeline-comment">
                                                      <div class="timeline-comment-header">
                                                        <img
                                                          src={
                                                            "https://bootdey.com/img/Content/avatar/avatar7.png"
                                                          }
                                                          alt=""
                                                        />
                                                        <p>
                                                          {
                                                            comment.publisher
                                                              .username
                                                          }
                                                          <small
                                                            style={{
                                                              marginLeft:
                                                                "10px",
                                                            }}
                                                          >
                                                            {moment(
                                                              moment(
                                                                comment.date
                                                              ).format(
                                                                "YYYY-MM-DD HH:mm:ss"
                                                              )
                                                            ).fromNow()}
                                                          </small>
                                                        </p>
                                                      </div>
                                                      <p class="timeline-comment-text">
                                                        {comment.text}
                                                      </p>
                                                    </div>
                                                  </div>
                                                );
                                              }
                                            )}
                                          </div>
                                        );
                                      } else {
                                        return (
                                          <div>
                                            There are currently no comments...
                                          </div>
                                        );
                                      }
                                    })()}
                                  </div>
                                  {(() => {
                                    if (this.state.currentUser !== null) {
                                      return (
                                        <div>
                                          <textarea
                                            id={"newComment" + post.id}
                                            name={"newComment" + post.id}
                                            type="text"
                                            class="form-control"
                                            placeholder="Enter new comment"
                                            rows="2"
                                            style={{
                                              marginTop: "20px",
                                            }}
                                          />
                                          <button
                                            class="btn btn-outline-success float-right"
                                            onClick={() => {
                                              this.postNewComment(post.id);
                                            }}
                                            style={{
                                              marginTop: "20px",
                                            }}
                                          >
                                            Post a comment
                                          </button>
                                        </div>
                                      );
                                    }
                                  })()}
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          } else {
            return (
              <div>
                <div class="profile-timeline">
                  <ul class="list-unstyled">
                    <li class="timeline-item">
                      <div class="card card-white grid-margin">
                        <div class="card-body">
                          <div class="timeline-item-header"></div>

                          <div class="timeline-item-post">
                            <img
                              class="img-thumbnail"
                              src={noPostsYet}
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            );
          }
        })()}
      </div>
    );
  }
}

export default withRouter(PostCard);
