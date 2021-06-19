import React, { Component } from "react";
import noPostsYet from "../../assets/images/no_posts_yet.jpg";
import moment from "moment";
import AuthService from "../../services/AuthService";
import { Link, withRouter } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import PostService from "../../services/PostService";
import { Button, Carousel, Modal } from "react-bootstrap";
import NotificationService from "../../services/NotificationService";
import ReactPlayer from "react-player";
import "../../assets/styles/postCard.css";
import InappropriateContentService from "../../services/InappropriateContentService";

class PostCard extends Component {
  constructor(props) {
    super(props);
    this.dropdownRef = React.createRef();
    this.state = {
      isSaved: false,
      isActive: false,
      reportComment: "",
      reportPostId: 0,
      newComment: "",
      currentUser: null,
      open: false,
      posts: [],
      message: "",
      type: "error",
      isOpenLikesModal: false,
      likes: [],
      isOpenDislikesModal: false,
      dislikes: [],
      isOpenReportModal: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
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

  openReportModal = (postId) => {
    this.setState({
      isOpenReportModal: true,
      reportPostId: postId,
    });
  };

  closeReportModal = () =>
    this.setState({
      isOpenReportModal: false,
      reportComment: "",
      reportPostId: 0,
    });

  reportPost = () => {
    this.setState({
      isActive: false,
    });
    let resStatus;
    InappropriateContentService.insertInappropriateContent(
      this.state.reportComment,
      true,
      AuthService.getCurrentUser().id,
      this.state.reportPostId,
      ""
    )
      .then((res) => {
        resStatus = res.status;
        return res.json();
      })
      .then((result) => {
        if (resStatus == 200) {
          this.closeReportModal();
          this.handleClickSnackBar("You sent report for post", "success");
        } else if (resStatus == 400) {
          this.closeReportModal();
          this.handleClickSnackBar("You have already sent report", "error");
        }
      });
  };

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  postNewComment = (post) => {
    let text = document.getElementById("newComment" + post.id).value;
    let resStatus = 0;
    if (text !== "") {
      PostService.insertNewComment(post.id, text, this.state.currentUser)
        .then((res) => {
          resStatus = res.status;
          return res.json();
        })
        .then((result) => {
          if (resStatus === 200) {
            const index = this.state.posts.findIndex((p) => p.id === post.id);
            const updatedPosts = [...this.state.posts];
            updatedPosts[index] = result;
            this.updatePost(updatedPosts);
            NotificationService.sendCommentNotification(
              post.publisher.id,
              this.state.currentUser.id,
              post.id
            );
          }
          return result;
        });
      document.getElementById("newComment" + post.id).value = "";
    } else {
      this.handleClickSnackBar("You have to enter a comment!", "error");
    }
  };

  updatePost = (updatedPosts) => {
    this.props.updatePost(updatedPosts);
  };

  likePost = (post) => {
    if (
      this.state.currentUser != null &&
      localStorage.getItem("userRole") !== "Admin"
    ) {
      if (
        document.getElementById("like" + post.id).className === "fa fa-heart"
      ) {
        document.getElementById("like" + post.id).className = "fa fa-heart-o";
      } else {
        document.getElementById("like" + post.id).className = "fa fa-heart";
        document.getElementById("dislike" + post.id).className =
          "fa fa-thumbs-o-down";
      }

      let resStatus = 0;

      PostService.likePost(post.id, this.state.currentUser)
        .then((res) => {
          resStatus = res.status;
          return res.json();
        })
        .then((result) => {
          if (resStatus === 200) {
            const index = this.state.posts.findIndex((p) => p.id === post.id);
            const updatedPosts = [...this.state.posts];
            updatedPosts[index] = result;
            this.updatePost(updatedPosts);
            NotificationService.sendLikeNotification(
              post.publisher.id,
              this.state.currentUser.id,
              post.id
            );
          }
        });
    } else {
      if (localStorage.getItem("userRole") !== "Admin") {
        this.handleClickSnackBar("You have to login first", "error");
      }
    }
  };

  dislikePost = (post) => {
    if (
      this.state.currentUser != null &&
      localStorage.getItem("userRole") !== "Admin"
    ) {
      if (
        document.getElementById("dislike" + post.id).className ===
        "fa fa-thumbs-down"
      ) {
        document.getElementById("dislike" + post.id).className =
          "fa fa-thumbs-o-down";
      } else {
        document.getElementById("dislike" + post.id).className =
          "fa fa-thumbs-down";
        document.getElementById("like" + post.id).className = "fa fa-heart-o";
      }

      let resStatus = 0;

      PostService.dislikePost(post.id, this.state.currentUser)
        .then((res) => {
          resStatus = res.status;
          return res.json();
        })
        .then((result) => {
          if (resStatus === 200) {
            const index = this.state.posts.findIndex((p) => p.id === post.id);
            const updatedPosts = [...this.state.posts];
            updatedPosts[index] = result;
            this.updatePost(updatedPosts);
            NotificationService.sendDislikeNotification(
              post.publisher.id,
              this.state.currentUser.id,
              post.id
            );
          }
        });
    } else {
      if (localStorage.getItem("userRole") !== "Admin") {
        this.handleClickSnackBar("You have to login first", "error");
      }
    }
  };

  savePost = (postId) => {
    if (
      this.state.currentUser != null &&
      localStorage.getItem("userRole") !== "Admin"
    ) {
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
      this.handleClickSnackBar("You have to login first", "error");
    }
  };

  handleClickSnackBar = (message, type) => {
    this.setState({
      open: true,
      message: message,
      type: type,
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

  openLikesModal = () => {
    this.setState({
      isOpenLikesModal: true,
    });
  };

  closeLikesModal = () => this.setState({ isOpenLikesModal: false });

  showLikesForPost = (postLikes) => {
    if (this.state.currentUser !== null) {
      if (postLikes.length !== 0) {
        this.setState({
          isOpenLikesModal: true,
          likes: postLikes,
        });
      } else {
        this.handleClickSnackBar("There are currently no likes!", "error");
      }
    } else {
      this.handleClickSnackBar("You have to login first", "error");
    }
  };

  openDislikesModal = () => {
    this.setState({
      isOpenDislikesModal: true,
    });
  };

  closeDislikesModal = () => this.setState({ isOpenDislikesModal: false });

  showDislikesForPost = (postDislikes) => {
    if (this.state.currentUser !== null) {
      if (postDislikes.length !== 0) {
        this.setState({
          isOpenDislikesModal: true,
          dislikes: postDislikes,
        });
      } else {
        this.handleClickSnackBar("There are currently no dislikes!", "error");
      }
    } else {
      this.handleClickSnackBar("You have to login first", "error");
    }
  };

  render() {
    const dropdownRef = this.dropdownRef;
    const isActive = this.state.isActive;
    const posts = this.state.posts;

    let reportCommentValidation;
    if (this.state.reportComment == "") {
      reportCommentValidation = (
        <label style={{ color: "red", marginTop: "1px" }}>
          Enter report comment
        </label>
      );
    }

    const likesModalDialog = (
      <Modal
        show={this.state.isOpenLikesModal}
        onHide={this.closeLikesModal}
        style={{ marginTop: "120px", minHeight: "560px", overflow: "hidden" }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ marginLeft: "190px" }}>Likes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ overflow: "auto", maxHeight: "300px" }}>
            {this.state.likes.map((like) => {
              return (
                <div class="list-group-item d-flex align-items-center">
                  <img
                    src={like.imageSrc}
                    alt=""
                    width="50px"
                    class="rounded-sm ml-n2"
                  />
                  <div class="flex-fill pl-3 pr-3">
                    <div>
                      <a href="#" class="text-dark font-weight-600">
                        {like.username}
                      </a>
                    </div>
                    {/* <div class="text-muted fs-13px">North Raundspic</div> */}
                  </div>
                  {/* <a href="#" class="btn btn-outline-primary">
                    Follow
                  </a> */}
                </div>
              );
            })}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.closeLikesModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );

    const dislikesModalDialog = (
      <Modal
        show={this.state.isOpenDislikesModal}
        onHide={this.closeDislikesModal}
        style={{ marginTop: "120px", minHeight: "560px", overflow: "hidden" }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ marginLeft: "175px" }}>Dislikes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ overflow: "auto", maxHeight: "300px" }}>
            {this.state.dislikes.map((dislike) => {
              return (
                <div class="list-group-item d-flex align-items-center">
                  <img
                    src={dislike.imageSrc}
                    alt=""
                    width="50px"
                    class="rounded-sm ml-n2"
                  />
                  <div class="flex-fill pl-3 pr-3">
                    <div>
                      <a href="#" class="text-dark font-weight-600">
                        {dislike.username}
                      </a>
                    </div>
                    {/* <div class="text-muted fs-13px">North Raundspic</div> */}
                  </div>
                  {/* <a href="#" class="btn btn-outline-primary">
                    Follow
                  </a> */}
                </div>
              );
            })}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.closeDislikesModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );

    const reportModalDialog = (
      <Modal
        show={this.state.isOpenReportModal}
        onHide={this.closeReportModal}
        style={{ marginTop: "155px", minHeight: "200px", overflow: "hidden" }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ marginLeft: "95px" }}>
            Inappropriate content
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              overflow: "hidden",
              height: "150px",
            }}
          >
            <form>
              <div className="form-group">
                <label style={{ marginLeft: "5px" }}>
                  <b>Report comment</b>
                </label>
                <textarea
                  name="reportComment"
                  type="text"
                  checked={this.state.reportComment}
                  onChange={this.handleInputChange}
                  rows="3"
                  className="form-control"
                  placeholder="Enter report comment"
                  value={this.state.reportComment}
                ></textarea>
                {reportCommentValidation}
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={this.closeReportModal}>
            Cancel
          </Button>
          <Button
            variant="success"
            onClick={this.reportPost}
            disabled={this.state.reportComment === ""}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    );

    const snackbar = (
      <Snackbar
        open={this.state.open}
        autoHideDuration={2500}
        onClose={this.handleCloseSnackBar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={this.handleCloseSnackBar} severity={this.state.type}>
          {this.state.message}
        </Alert>
      </Snackbar>
    );

    const noPostsYetCard = (
      <div class="profile-timeline">
        <ul class="list-unstyled">
          <li class="timeline-item">
            <div class="card card-white grid-margin">
              <div class="card-body">
                <div class="timeline-item-header"></div>

                <div class="timeline-item-post">
                  <img class="img-thumbnail" src={noPostsYet} alt="" />
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    );

    return (
      <div>
        {snackbar}
        {likesModalDialog}
        {dislikesModalDialog}
        {reportModalDialog}
        {(() => {
          if (Array.isArray(posts)) {
            if (posts.length > 0) {
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
                                    <img src={post.publisher.imageSrc} alt="" />
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
                                          if (
                                            (post.location.address === "" ||
                                              post.location.address == null) &&
                                            post.location.city != null &&
                                            post.location.country != null
                                          ) {
                                            return (
                                              <div>
                                                {post.location.city},{" "}
                                                {post.location.country}{" "}
                                              </div>
                                            );
                                          } else if (
                                            (post.location.address !== "" ||
                                              post.location.address != null) &&
                                            post.location.city != null &&
                                            post.location.country != null
                                          ) {
                                            return (
                                              <div>
                                                {post.location.address},{" "}
                                                {post.location.city},{" "}
                                                {post.location.country}{" "}
                                              </div>
                                            );
                                          } else {
                                            return <div></div>;
                                          }
                                        })()}
                                      </small>
                                    </p>
                                  </div>

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
                                        <circle cx="12" cy="12" r="1"></circle>
                                        <circle cx="19" cy="12" r="1"></circle>
                                        <circle cx="5" cy="12" r="1"></circle>
                                      </svg>
                                    </button>
                                    <nav
                                      className={`menu ${
                                        isActive ? "active" : "inactive"
                                      }`}
                                    >
                                      {(() => {
                                        if (
                                          this.state.currentUser !== null &&
                                          localStorage.getItem("userRole") !==
                                            "Admin"
                                        ) {
                                          return (
                                            <div>
                                              <ul>
                                                <li>
                                                  <Link
                                                    to={{
                                                      pathname: "/user/profile",
                                                      state: {
                                                        profileId:
                                                          post.publisher.id,
                                                      },
                                                    }}
                                                  >
                                                    View profile
                                                  </Link>
                                                </li>
                                                <li>
                                                  <a
                                                    href="javascript:void(0)"
                                                    onClick={() =>
                                                      this.openReportModal(
                                                        post.id
                                                      )
                                                    }
                                                  >
                                                    Report
                                                  </a>
                                                </li>
                                              </ul>
                                            </div>
                                          );
                                        } else {
                                          return (
                                            <div>
                                              <ul>
                                                <li>
                                                  <Link
                                                    to={{
                                                      pathname: "/app/profile",
                                                      state: {
                                                        profileId:
                                                          post.publisher.id,
                                                      },
                                                    }}
                                                  >
                                                    View profile
                                                  </Link>
                                                </li>
                                              </ul>
                                            </div>
                                          );
                                        }
                                      })()}
                                    </nav>
                                  </div>

                                  <div class="timeline-item-post">
                                    {(() => {
                                      if (post.imagesSrc.length > 1) {
                                        return (
                                          <Carousel
                                            interval={null}
                                            nextIcon={
                                              <span
                                                aria-hidden="true"
                                                class="carousel-control-next-icon"
                                              />
                                            }
                                          >
                                            {(() => {
                                              return post.imagesSrc.map(
                                                (fileUrl, key) => {
                                                  if (
                                                    fileUrl.endsWith(".mp4")
                                                  ) {
                                                    return (
                                                      <Carousel.Item>
                                                        <ReactPlayer
                                                          className="d-block w-100"
                                                          url={fileUrl}
                                                          controls={true}
                                                        />
                                                      </Carousel.Item>
                                                    );
                                                  } else {
                                                    return (
                                                      <Carousel.Item>
                                                        <img
                                                          className="d-block w-100"
                                                          src={fileUrl}
                                                          alt="First slide"
                                                        />
                                                      </Carousel.Item>
                                                    );
                                                  }
                                                }
                                              );
                                            })()}
                                          </Carousel>
                                        );
                                      } else {
                                        if (
                                          post.imagesSrc[0].endsWith(".mp4")
                                        ) {
                                          return (
                                            <ReactPlayer
                                              className="d-block w-100"
                                              url={post.imagesSrc[0]}
                                              controls={true}
                                            />
                                          );
                                        } else {
                                          return (
                                            <img
                                              className="d-block w-100"
                                              src={post.imagesSrc[0]}
                                              alt="First slide"
                                            />
                                          );
                                        }
                                      }
                                    })()}

                                    {(() => {
                                      if (
                                        post.description !== null &&
                                        Array.isArray(post.tags) &&
                                        post.tags.length > 0
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
                                        Array.isArray(post.tags) &&
                                        post.tags.length === 0
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
                                        Array.isArray(post.tags) &&
                                        post.tags.length > 0
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
                                        if (post.likes.length > 0) {
                                          var classForLike = "fa fa-heart-o";
                                          if (this.state.currentUser != null) {
                                            var index = post.likes.findIndex(
                                              (p) =>
                                                p.id ==
                                                this.state.currentUser.id
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
                                                  this.likePost(post);
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
                                                href="javascript:void(0)"
                                                onClick={() => {
                                                  this.showLikesForPost(
                                                    post.likes
                                                  );
                                                }}
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
                                                  this.likePost(post);
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
                                                href="javascript:void(0)"
                                                onClick={() => {
                                                  this.handleClickSnackBar(
                                                    "There are currently no likes!",
                                                    "error"
                                                  );
                                                }}
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
                                        if (post.dislikes.length > 0) {
                                          var classForDislike =
                                            "fa fa-thumbs-o-down";

                                          if (this.state.currentUser != null) {
                                            var index = post.dislikes.findIndex(
                                              (p) =>
                                                p.id ==
                                                this.state.currentUser.id
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
                                                  this.dislikePost(post);
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
                                                href="javascript:void(0)"
                                                onClick={() => {
                                                  this.showDislikesForPost(
                                                    post.dislikes
                                                  );
                                                }}
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
                                                  this.dislikePost(post);
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
                                                href="javascript:void(0)"
                                                onClick={() => {
                                                  this.handleClickSnackBar(
                                                    "There are currently no dislikes!",
                                                    "error"
                                                  );
                                                }}
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
                                        if (post.comments.length > 0) {
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
                                        if (
                                          this.state.currentUser !== null &&
                                          localStorage.getItem("userRole") !==
                                            "Admin"
                                        ) {
                                          var classForFavorite =
                                            "fa fa-bookmark-o";

                                          if (post.favorites != null) {
                                            var index =
                                              post.favorites.findIndex(
                                                (p) =>
                                                  p.id ==
                                                  this.state.currentUser.id
                                              );
                                            if (index !== -1) {
                                              classForFavorite =
                                                "fa fa-bookmark";
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
                                          Array.isArray(post.comments) &&
                                          post.comments.length > 0
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
                                                              comment.publisher
                                                                .imageSrc
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
                                      if (
                                        this.state.currentUser !== null &&
                                        localStorage.getItem("userRole") !==
                                          "Admin"
                                      ) {
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
                                                this.postNewComment(post);
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
              return <div>{noPostsYetCard}</div>;
            }
          } else {
            return <div>{noPostsYetCard}</div>;
          }
        })()}
      </div>
    );
  }
}

export default withRouter(PostCard);
