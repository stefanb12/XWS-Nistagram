import React, { Component } from "react";
import "../assets/styles/profile.css";
import { Link, withRouter } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import {
  BookmarkBorder,
  ContactlessOutlined,
  LockOutlined,
} from "@material-ui/icons";
import "../assets/styles/posts.css";
import AuthService from "../services/AuthService";
import ProfileService from "../services/ProfileService";
import FollowRequestService from "../services/FollowRequestService";
import NotificationService from "../services/NotificationService";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import PostService from "../services/PostService";
import PostCard from "../components/home-page/PostCard";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.dropdownRef = React.createRef();
    this.state = {
      loggedUser: { following: [], followers: [] },
      userProfile: {},
      //userProfileId: this.props.location.state.profileId,
      userProfileId: 1,
      isOpenFollowersModal: false,
      isOpenFollowingModal: false,
      isPostsButtonActive: true,
      isSavedButtonActive: false,
      isActive: false,
      doesFollowRequestExist: false,
      followers: [],
      following: [],
      userProfilePosts: [],
      userProfileFavoritePosts: [],
      followingSnackBarOpen: false,
      followersSnackBarOpen: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClickFollowingSnackBar = () => {
    this.setState({ followingSnackBarOpen: true });
  };

  handleCloseFollowingSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ followingSnackBarOpen: false });
  };

  handleClickFollowersSnackBar = () => {
    this.setState({ followersSnackBarOpen: true });
  };

  handleCloseFollowersSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ followersSnackBarOpen: false });
  };

  openFollowersModal = () => {
    let isInFollowing = this.state.loggedUser.following.some(
      (followingProfile) => {
        if (followingProfile.followingId == this.state.userProfileId)
          return true;
      }
    );
    if (
      this.state.userProfile.isPrivate === true &&
      isInFollowing === false &&
      this.state.loggedUser.id !== this.state.userProfileId
    ) {
      this.handleClickFollowersSnackBar();
    } else {
      this.setState({ isOpenFollowersModal: true });
    }
  };
  closeFollowersModal = () => this.setState({ isOpenFollowersModal: false });
  openFollowingModal = () => {
    let isInFollowing = this.state.loggedUser.following.some(
      (followingProfile) => {
        if (followingProfile.followingId == this.state.userProfileId)
          return true;
      }
    );
    if (
      this.state.userProfile.isPrivate === true &&
      isInFollowing === false &&
      this.state.loggedUser.id !== this.state.userProfileId
    ) {
      this.handleClickFollowingSnackBar();
    } else {
      this.setState({ isOpenFollowingModal: true });
    }
  };
  closeFollowingModal = () => this.setState({ isOpenFollowingModal: false });

  async componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);

    let loggedUser = await AuthService.getCurrentUser();
    await ProfileService.getUser(loggedUser.id)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          loggedUser: result,
        });
      });

    await ProfileService.getUser(this.state.userProfileId)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          userProfile: result,
        });
      });

    await PostService.getPostsForProfile(this.state.loggedUser.id)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          userProfilePosts: result,
        });
      });

    this.getFollowersAndFollowing();

    if (this.state.userProfile.isPrivate === true) {
      let resStatus = 0;
      FollowRequestService.getFollowRequest(
        this.state.userProfileId,
        this.state.loggedUser.id
      )
        .then((res) => {
          resStatus = res.status;
          return res.json();
        })
        .then((result) => {
          if (resStatus == 200) {
            this.setState({
              doesFollowRequestExist: true,
            });
          }
        });
    }
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
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

  handleClick() {
    this.setState((state) => ({
      isActive: !this.state.isActive,
    }));
  }

  handleSavedButton() {
    if (
      document.getElementById("savedButton").className ===
      "header-link-item ml-3 pl-3 border-left d-flex align-items-center"
    ) {
      document.getElementById("savedButton").className =
        "header-link-item ml-3 pl-3 border-left d-flex align-items-center active";
      document.getElementById("postsButton").className =
        "header-link-item d-flex align-items-center";
    }
    PostService.getFavoritePosts(this.state.loggedUser.id)
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        this.setState({
          isSavedButtonActive: true,
          isPostsButtonActive: false,
          userProfileFavoritePosts: result,
        });
      });
  }

  handlePostsButton() {
    if (
      document.getElementById("postsButton").className ===
      "header-link-item d-flex align-items-center"
    ) {
      document.getElementById("postsButton").className =
        "header-link-item d-flex align-items-center active";
      document.getElementById("savedButton").className =
        "header-link-item ml-3 pl-3 border-left d-flex align-items-center";
    }
    PostService.getPostsForProfile(this.state.loggedUser.id)
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        this.setState({
          isPostsButtonActive: true,
          isSavedButtonActive: false,
          userProfilePosts: result,
        });
      });
  }

  getFollowersAndFollowing = () => {
    ProfileService.getFollowers(this.state.userProfileId)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          followers: result,
        });
      });

    ProfileService.getFollowing(this.state.userProfileId)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          following: result,
        });
      });
  };

  handleFollow = (followerId, followingId) => {
    ProfileService.follow(followerId, followingId)
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        NotificationService.sendFollowNotification(followingId, followerId, 0);
        this.getFollowersAndFollowing();
        this.setState({
          loggedUser: result.follower,
          userProfile: result.profile,
        });
      });
  };

  handleUnfollow = (followerId, followingId) => {
    ProfileService.unfollow(followerId, followingId)
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        this.getFollowersAndFollowing();
        this.setState({
          loggedUser: result.follower,
          userProfile: result.profile,
        });
      });
  };

  handleFollowRequest = (followerId, followingId) => {
    FollowRequestService.sendFollowRequest(followerId, followingId)
      .then((res) => {
        return res.json();
      })
      .then(() => {
        NotificationService.sendFollowRequestNotification(
          followerId,
          followingId,
          0
        );
        this.setState({
          doesFollowRequestExist: true,
        });
      });
  };

  handleDeleteFollowRequest = (followerId, followingId) => {
    FollowRequestService.deleteFollowRequest(followerId, followingId)
      .then(() => {})
      .then(() => {
        NotificationService.deleteFollowRequestNotification(
          followerId,
          followingId
        );
        this.setState({
          doesFollowRequestExist: false,
        });
      });
  };

  updatePosts = async (updatedPosts) => {
    await this.setState({
      userProfilePosts: updatedPosts,
      userProfileFavoritePosts: updatedPosts,
    });
    if (
      document.getElementById("savedButton").className ===
      "header-link-item ml-3 pl-3 border-left d-flex align-items-center active"
    ) {
      this.handleSavedButton();
    }
  };

  render() {
    let loggedUser = this.state.loggedUser;
    let userProfile = this.state.userProfile;
    let doesFollowRequestExist = this.state.doesFollowRequestExist;
    const userProfileId = this.state.userProfileId;
    const dropdownRef = this.dropdownRef;
    const isActive = this.state.isActive;

    let isInFollowing = loggedUser.following.some((followingProfile) => {
      if (followingProfile.followingId == userProfileId) return true;
    });

    let isInFollowers = loggedUser.followers.some((followerProfile) => {
      if (followerProfile.followerId == userProfileId) return true;
    });

    let profileBody = (
      <div>
        <div class="row profile-body">
          <div class="d-none d-md-block col-md-4 col-xl-3 left-wrapper">
            <div class="card rounded">
              <div class="card-body">
                <div class="mt-3">
                  <label class="tx-11 font-weight-bold mb-0">Full name:</label>
                  <p class="text-muted">{userProfile.fullName}</p>
                </div>
                <div class="d-flex align-items-center justify-content-between mb-2">
                  <h6 class="card-title mb-0">Biography</h6>
                </div>
                <p>{userProfile.biography}</p>
                <div class="mt-3">
                  <label class="tx-11 font-weight-bold mb-0">Website:</label>
                  <p class="text-muted">{userProfile.website}</p>
                </div>
                <div class="mt-3">
                  <label class="tx-11 font-weight-bold mb-0">Email:</label>
                  <p class="text-muted">{userProfile.email}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-8 col-xl-6 middle-wrapper">
            <div class="row">
              <div class="col-md-12 grid-margin">
                {(() => {
                  if (this.state.isPostsButtonActive === true) {
                    return (
                      <PostCard
                        sendPosts={this.state.userProfilePosts}
                        updatePost={this.updatePosts.bind(this)}
                      />
                    );
                  } else {
                    return (
                      <PostCard
                        sendPosts={this.state.userProfileFavoritePosts}
                        updatePost={this.updatePosts.bind(this)}
                      />
                    );
                  }
                })()}
              </div>
            </div>
          </div>
          <div class="d-none d-xl-block col-xl-3 right-wrapper">
            <div class="row">
              <div class="col-md-12 grid-margin">
                <div class="card social-timeline-card">
                  <div class="card-body">
                    <h5 class="card-title">Highlights</h5>
                    <ul class="friend-list">
                      <li>
                        <div class="left">
                          <img
                            src="https://bootdey.com/img/Content/avatar/avatar1.png"
                            alt=""
                          />
                        </div>
                        <div class="right">
                          <h3>John Doe</h3>
                          <p>10 Friends</p>
                        </div>
                      </li>
                      <li>
                        <div class="left">
                          <img
                            src="https://bootdey.com/img/Content/avatar/avatar2.png"
                            alt=""
                          />
                        </div>
                        <div class="right">
                          <h3>John Doe</h3>
                          <p>10 Friends</p>
                        </div>
                      </li>
                      <li>
                        <div class="left">
                          <img
                            src="https://bootdey.com/img/Content/avatar/avatar3.png"
                            alt=""
                          />
                        </div>
                        <div class="right">
                          <h3>John Doe</h3>
                          <p>10 Friends</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    let savedButton;
    let followButton;
    if (loggedUser.id === userProfileId) {
      // It is my profile
      followButton = (
        <div class="d-none d-md-block">
          <Link
            class="btn btn-primary btn-icon-text btn-edit-profile"
            to="/user/settings"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-edit btn-icon-prepend"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>{" "}
            Edit profile
          </Link>
        </div>
      );
      savedButton = (
        <div>
          <li
            id="savedButton"
            class="header-link-item ml-3 pl-3 border-left d-flex align-items-center"
          >
            <BookmarkBorder />
            <a
              class="pt-1px d-none d-md-block"
              href="javascript:void(0)"
              onClick={() => this.handleSavedButton()}
            >
              Saved
            </a>
          </li>
        </div>
      );
    } else if (
      // Already follow this profile
      isInFollowing
    ) {
      followButton = (
        <div>
          <Button
            variant="primary"
            onClick={() => this.handleUnfollow(loggedUser.id, userProfile.id)}
          >
            Unfollow
          </Button>
        </div>
      );
    } else if (
      // This profile follow me, but i dont follow back
      isInFollowers &&
      !isInFollowing
    ) {
      if (userProfile.isPrivate === true) {
        if (doesFollowRequestExist === true) {
          followButton = (
            <div>
              <Button
                variant="primary"
                onClick={() =>
                  this.handleDeleteFollowRequest(userProfile.id, loggedUser.id)
                }
              >
                Cancel request
              </Button>
            </div>
          );
        } else {
          followButton = (
            <div>
              <Button
                variant="primary"
                onClick={() =>
                  this.handleFollowRequest(userProfile.id, loggedUser.id)
                }
              >
                Follow Back
              </Button>
            </div>
          );
        }
        profileBody = (
          <div>
            <div class="row profile-body">
              <div class="d-none d-md-block col-md-4 col-xl-12 ">
                <div class="card rounded">
                  <div class="card-body">
                    <div
                      class="d-flex align-items-center mb-2"
                      style={{ marginLeft: "40%" }}
                    >
                      <LockOutlined />
                      <h6 class="card-title mb-0" style={{ marginLeft: "1%" }}>
                        This account is private!
                      </h6>
                    </div>
                    <p style={{ marginLeft: "33%" }}>
                      Follow this account to see their photos and videos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        followButton = (
          <div>
            <Button
              variant="primary"
              onClick={() => this.handleFollow(loggedUser.id, userProfile.id)}
            >
              Follow Back
            </Button>
          </div>
        );
      }
    } else {
      if (userProfile.isPrivate === true) {
        // Profile is private
        if (doesFollowRequestExist === true) {
          followButton = (
            <div>
              <Button
                variant="primary"
                onClick={() =>
                  this.handleDeleteFollowRequest(userProfile.id, loggedUser.id)
                }
              >
                Cancel request
              </Button>
            </div>
          );
        } else {
          followButton = (
            <div>
              <Button
                variant="primary"
                onClick={() =>
                  this.handleFollowRequest(userProfile.id, loggedUser.id)
                }
              >
                Follow
              </Button>
            </div>
          );
        }
        profileBody = (
          <div>
            <div class="row profile-body">
              <div class="d-none d-md-block col-md-4 col-xl-12 ">
                <div class="card rounded">
                  <div class="card-body">
                    <div
                      class="d-flex align-items-center mb-2"
                      style={{ marginLeft: "40%" }}
                    >
                      <LockOutlined />
                      <h6 class="card-title mb-0" style={{ marginLeft: "1%" }}>
                        This account is private!
                      </h6>
                    </div>
                    <p style={{ marginLeft: "33%" }}>
                      Follow this account to see their photos and videos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        // Profile is public
        followButton = (
          <div>
            <Button
              variant="primary"
              onClick={() => this.handleFollow(loggedUser.id, userProfile.id)}
            >
              Follow
            </Button>
          </div>
        );
      }
    }
    return (
      <div>
        <Snackbar
          open={this.state.followersSnackBarOpen}
          autoHideDuration={2000}
          onClose={this.handleCloseFollowersSnackBar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={this.handleCloseFollowersSnackBar} severity="error">
            Follow this account to see their followers
          </Alert>
        </Snackbar>
        <Snackbar
          open={this.state.followingSnackBarOpen}
          autoHideDuration={2000}
          onClose={this.handleCloseFollowingSnackBar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={this.handleCloseFollowingSnackBar} severity="error">
            Follow this account to see their following
          </Alert>
        </Snackbar>
        <Modal
          show={this.state.isOpenFollowersModal}
          onHide={this.closeFollowersModal}
          style={{ marginTop: "120px", maxHeight: "500px", overflow: "hidden" }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Followers</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{ overflow: "auto", maxHeight: "300px" }}>
              {this.state.followers.map((follower) => {
                return (
                  <div class="list-group-item d-flex align-items-center">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar1.png"
                      alt=""
                      width="50px"
                      class="rounded-sm ml-n2"
                    />
                    <div class="flex-fill pl-3 pr-3">
                      <div>
                        <a href="#" class="text-dark font-weight-600">
                          {follower.username}
                        </a>
                      </div>
                      {/* <div class="text-muted fs-13px">{follower.fullName}</div> */}
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
            <Button variant="secondary" onClick={this.closeFollowersModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={this.state.isOpenFollowingModal}
          onHide={this.closeFollowingModal}
          style={{ marginTop: "120px", maxHeight: "500px", overflow: "hidden" }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Following</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{ overflow: "auto", maxHeight: "300px" }}>
              {this.state.following.map((followingProfile) => {
                return (
                  <div class="list-group-item d-flex align-items-center">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar1.png"
                      alt=""
                      width="50px"
                      class="rounded-sm ml-n2"
                    />
                    <div class="flex-fill pl-3 pr-3">
                      <div>
                        <a href="#" class="text-dark font-weight-600">
                          {followingProfile.username}
                        </a>
                      </div>
                      {/* <div class="text-muted fs-13px">
                        {followingProfile.fullName}
                      </div> */}
                    </div>
                    {/* <a href="#" class="btn btn-outline-primary">
                      Unfollow
                    </a> */}
                  </div>
                );
              })}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeFollowingModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <div class="container">
          <div class="profile-page tx-13">
            <div class="row">
              <div class="col-12 grid-margin">
                <div class="profile-header">
                  <div class="cover">
                    <div class="gray-shade"></div>
                    <figure>
                      <img
                        src="https://bootdey.com/img/Content/bg1.jpg"
                        class="img-fluid"
                        alt="profile cover"
                      />
                    </figure>
                    <div class="cover-body d-flex justify-content-between align-items-center">
                      <div>
                        <img
                          class="profile-pic"
                          src="https://bootdey.com/img/Content/avatar/avatar6.png"
                          alt="profile"
                        />
                        <span class="profile-name">{userProfile.username}</span>
                      </div>
                      {followButton}
                    </div>
                  </div>
                  <div class="header-links">
                    <ul class="links d-flex align-items-center mt-3 mt-md-0">
                      <li
                        id="postsButton"
                        class="header-link-item d-flex align-items-center active"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="feather feather-columns mr-1 icon-md"
                        >
                          <path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18"></path>
                        </svg>
                        <Link
                          class="pt-1px d-none d-md-block"
                          to="/user/profile"
                          onClick={() => this.handlePostsButton()}
                        >
                          Posts <span class="text-muted tx-12">12</span>
                        </Link>
                      </li>
                      <li class="header-link-item ml-3 pl-3 border-left d-flex align-items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="feather feather-image mr-1 icon-md"
                        >
                          <rect
                            x="3"
                            y="3"
                            width="18"
                            height="18"
                            rx="2"
                            ry="2"
                          ></rect>
                          <circle cx="8.5" cy="8.5" r="1.5"></circle>
                          <polyline points="21 15 16 10 5 21"></polyline>
                        </svg>
                        <a class="pt-1px d-none d-md-block" href="#">
                          Stories
                        </a>
                      </li>
                      <li class="header-link-item ml-3 pl-3 border-left d-flex align-items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="feather feather-user mr-1 icon-md"
                        >
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        <Link
                          class="pt-1px d-none d-md-block"
                          onClick={this.openFollowersModal}
                        >
                          Followers{" "}
                          <span class="text-muted tx-12">
                            {this.state.followers.length}
                          </span>
                        </Link>
                      </li>
                      <li class="header-link-item ml-3 pl-3 border-left d-flex align-items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="feather feather-users mr-1 icon-md"
                        >
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                          <circle cx="9" cy="7" r="4"></circle>
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                        <Link
                          class="pt-1px d-none d-md-block"
                          onClick={this.openFollowingModal}
                        >
                          Following{" "}
                          <span class="text-muted tx-12">
                            {this.state.following.length}
                          </span>
                        </Link>
                      </li>
                      {savedButton}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {profileBody}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(UserProfile);
