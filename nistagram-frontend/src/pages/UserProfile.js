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

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.dropdownRef = React.createRef();
    this.state = {
      loggedUser: { following: [], followers: [] },
      userProfile: {},
      //userProfileId: this.props.location.state.profileId,
      userProfileId: 3,
      isOpenFollowersModal: false,
      isOpenFollowingModal: false,
      isDislike: false,
      isLike: false,
      isSaved: false,
      isActive: false,
      doesFollowRequestExist: false,
      followers: [],
      following: [],
    };
    this.handleClick = this.handleClick.bind(this);
  }

  openFollowersModal = () => this.setState({ isOpenFollowersModal: true });
  closeFollowersModal = () => this.setState({ isOpenFollowersModal: false });
  openFollowingModal = () => this.setState({ isOpenFollowingModal: true });
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

    this.getFollowersAndFollowing();

    if (this.state.userProfile.isPrivate == true) {
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

  render() {
    let loggedUser = this.state.loggedUser;
    let userProfile = this.state.userProfile;
    let doesFollowRequestExist = this.state.doesFollowRequestExist;
    const userProfileId = this.state.userProfileId;
    const isDislike = this.state.isDislike;
    const isLike = this.state.isLike;
    const isSaved = this.state.isSaved;
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
                              Vikash smith <span>posted a status</span>
                            </p>
                            <small>3 hours ago</small>
                          </div>

                          <div
                            class="dropdown"
                            ref={dropdownRef}
                            style={{ marginTop: "-10.8%" }}
                          >
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
                              <ul>
                                <li>
                                  <a href="/user/home">Report</a>
                                </li>
                                <li>
                                  <a href="/user/home">Save</a>
                                </li>
                                <li>
                                  <a href="/user/home">View profile</a>
                                </li>
                                <li>
                                  <a href="/user/home">Unfollow</a>
                                </li>
                              </ul>
                            </nav>
                          </div>

                          <div class="timeline-item-post">
                            <img
                              class="img-thumbnail"
                              src="https://bootdey.com/img/Content/avatar/avatar6.png"
                              alt=""
                            />

                            <p style={{ marginTop: "20px" }}>
                              Elavita veritatis et quasi architecto beatae vitae
                              dicta sunt explicabo. Nemo enim ipsam voluptatem
                              quia voluptas sit aspernatur aut odit aut fugit,
                              sed quia consequuntur.
                            </p>
                            <div class="timeline-options">
                              <a href="#">
                                <i
                                  class={
                                    isLike ? "fa fa-heart" : "fa fa-heart-o"
                                  }
                                  style={{
                                    fontSize: "20px",
                                  }}
                                ></i>
                                <span /> Like (15)
                              </a>
                              <a href="#">
                                <i
                                  class={
                                    isDislike
                                      ? "fa fa-thumbs-down"
                                      : "fa fa-thumbs-o-down"
                                  }
                                  style={{
                                    fontSize: "20px",
                                    paddingLeft: "20px",
                                  }}
                                ></i>
                                <span /> Dislike (6)
                              </a>
                              <a href="#">
                                <i
                                  class="fa fa-comment-o"
                                  style={{
                                    fontSize: "20px",
                                    paddingLeft: "20px",
                                  }}
                                ></i>
                                <span /> Comment (4)
                              </a>
                              <a href="#" style={{ float: "right" }}>
                                <i
                                  class={
                                    isSaved
                                      ? "fa fa-bookmark"
                                      : "fa fa-bookmark-o"
                                  }
                                  style={{
                                    fontSize: "20px",
                                    marginTop: "4px",
                                  }}
                                ></i>
                              </a>
                            </div>
                            <div class="comments">
                              <div class="timeline-comment">
                                <div class="timeline-comment-header">
                                  <img
                                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
                                    alt=""
                                  />
                                  <p>
                                    Jamara Karle <small>1 hour ago</small>
                                  </p>
                                </div>
                                <p class="timeline-comment-text">
                                  Xullamco laboris nisi ut aliquip ex ea commodo
                                  consequat.
                                </p>
                              </div>
                              <div class="timeline-comment">
                                <div class="timeline-comment-header">
                                  <img
                                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
                                    alt=""
                                  />
                                  <p>
                                    Jamara Karle <small>1 hour ago</small>
                                  </p>
                                </div>
                                <p class="timeline-comment-text">
                                  Xullamco laboris nisi ut aliquip ex ea commodo
                                  consequat.
                                </p>
                              </div>
                              <div class="timeline-comment">
                                <div class="timeline-comment-header">
                                  <img
                                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
                                    alt=""
                                  />
                                  <p>
                                    Jamara Karle <small>1 hour ago</small>
                                  </p>
                                </div>
                                <p class="timeline-comment-text">
                                  Xullamco laboris nisi ut aliquip ex ea commodo
                                  consequat.
                                </p>
                              </div>
                              <div class="timeline-comment">
                                <div class="timeline-comment-header">
                                  <img
                                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
                                    alt=""
                                  />
                                  <p>
                                    Lois Anderson <small>3 hours ago</small>
                                  </p>
                                </div>
                                <p class="timeline-comment-text">
                                  Coluptate velit esse cillum dolore eu fugiat
                                  nulla pariatur. Excepteur sint occaecat
                                  cupidatat non proident, sunt in culpa qui
                                  officia.
                                </p>
                              </div>
                            </div>
                            <textarea
                              class="form-control"
                              placeholder="Replay"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
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
                      <li>
                        <div class="left">
                          <img
                            src="https://bootdey.com/img/Content/avatar/avatar4.png"
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
          <li class="header-link-item ml-3 pl-3 border-left d-flex align-items-center">
            <BookmarkBorder />
            <a class="pt-1px d-none d-md-block" href="#">
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
                      {/* <div class="text-muted fs-13px">North Raundspic</div> */}
                    </div>
                    <a href="#" class="btn btn-outline-primary">
                      Follow
                    </a>
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
                      {/* <div class="text-muted fs-13px">North Raundspic</div> */}
                    </div>
                    <a href="#" class="btn btn-outline-primary">
                      Unfollow
                    </a>
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
                      <li class="header-link-item d-flex align-items-center active">
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
