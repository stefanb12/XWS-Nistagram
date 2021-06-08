import React, { Component } from "react";
import "../assets/styles/profile.css";
import { Link, withRouter } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { AddCircle, BookmarkBorder, LockOutlined } from "@material-ui/icons";
import "../assets/styles/posts.css";
import AuthService from "../services/AuthService";
import ProfileService from "../services/ProfileService";
import FollowRequestService from "../services/FollowRequestService";
import NotificationService from "../services/NotificationService";
import {
  Checkbox,
  FormControlLabel,
  Slider,
  Snackbar,
  Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import PostService from "../services/PostService";
import PostCard from "../components/home-page/PostCard";
import StoryService from "../services/StoryService";
import moment from "moment";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.dropdownRef = React.createRef();
    this.state = {
      loggedUser: { following: [], followers: [] },
      userProfile: { following: [], followers: [] },
      userProfileId:
        this.props.location.state !== undefined
          ? this.props.location.state.profileId
          : this.doesLoggedUserExist(),
      isOpenFollowersModal: false,
      isOpenFollowingModal: false,
      isPostsButtonActive: true,
      isSavedButtonActive: false,
      isHighlightDialogOpen: false,
      isActive: false,
      doesFollowRequestExist: false,
      followers: [],
      following: [],
      userProfilePosts: [],
      userProfileFavoritePosts: [],
      snackBarOpen: false,
      snackBarMessage: "",
      snackBarType: "",
      doesUserProfileStoriesExists: false,
      userProfileStories: [],
      doesActiveStoriesExists: false,
      activeStories: [],
      currentStoryImage: "",
      currentStoryPublishingDate: null,
      isShowStoryDialogOpen: false,
      currentStoryNumber: 0,
      timeCounter: 0,
      currentTimeout: null,
      numberOfStoriesForCurrentProfile: 0,
      currentProfileStories: null,
      checkedItems: [],
      highlightName: "",
      userProfileStoryHighlights: [],
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  static componentWillReceiveProps(props) {
    return {
      userProfileId: props.location.state.profileId,
    };
  }

  handleInputChange(event) {
    this.setState({
      highlightName: event.target.value,
    });
  }

  doesLoggedUserExist = () => {
    if (AuthService.getCurrentUser()) {
      return AuthService.getCurrentUser().id;
    } else {
      return 1;
    }
  };

  handleClickSnackBar = (message, type) => {
    this.setState({
      snackBarMessage: message,
      snackBarType: type,
      snackBarOpen: true,
    });
  };

  handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ snackBarOpen: false });
  };

  handleHighlightAdding = () => {
    this.setState({
      isHighlightDialogOpen: true,
    });
  };

  closeAddHighlightModal = () => {
    this.setState({
      isHighlightDialogOpen: false,
    });
  };

  openFollowersModal = () => {
    if (!AuthService.getCurrentUser()) {
      this.handleClickSnackBar("You have to login first", "error");
    } else {
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
        this.handleClickSnackBar(
          "Follow this account to see their followers",
          "info"
        );
      } else {
        this.setState({ isOpenFollowersModal: true });
      }
    }
  };
  closeFollowersModal = () => this.setState({ isOpenFollowersModal: false });
  openFollowingModal = () => {
    if (!AuthService.getCurrentUser()) {
      this.handleClickSnackBar("You have to login first", "error");
    } else {
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
        this.handleClickSnackBar(
          "Follow this account to see their following",
          "info"
        );
      } else {
        this.setState({ isOpenFollowingModal: true });
      }
    }
  };
  closeFollowingModal = () => this.setState({ isOpenFollowingModal: false });

  async componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);

    let loggedUser = await AuthService.getCurrentUser();
    if (loggedUser) {
      await ProfileService.getUser(loggedUser.id)
        .then((res) => res.json())
        .then((result) => {
          this.setState({
            loggedUser: result,
          });
        });

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

    this.getFollowersAndFollowing();

    await ProfileService.getUser(this.state.userProfileId)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          userProfile: result,
        });
      });

    await PostService.getPostsForProfile(this.state.userProfileId)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          userProfilePosts: result,
        });
      });

    this.handleStoriesForProfile();
    this.handleStoryHighlightsForProfile();

    let resStatus = 0;
    await StoryService.getActiveStoriesForProfile(this.state.userProfileId)
      .then((res) => {
        resStatus = res.status;
        return res.json();
      })
      .then((result) => {
        if (resStatus === 200) {
          this.setState({
            activeStories: result,
            doesActiveStoriesExists: true,
          });
        } else if (resStatus === 204) {
          this.setState({
            doesActiveStoriesExists: false,
          });
        }
      });
  }

  handleStoriesForProfile = () => {
    let status = 0;
    StoryService.getStoriesForProfile(this.state.userProfileId)
      .then((res) => {
        status = res.status;
        return res.json();
      })
      .then((result) => {
        if (status === 200) {
          this.setState({
            userProfileStories: result,
            doesUserProfileStoriesExists: true,
          });
        } else if (status === 204) {
          this.setState({
            doesUserProfileStoriesExists: false,
          });
        }
      });
  };

  handleStoryHighlightsForProfile = () => {
    let status = 0;
    StoryService.getStoryHighlightsForProfile(this.state.userProfileId)
      .then((res) => {
        status = res.status;
        return res.json();
      })
      .then((result) => {
        if (status === 200) {
          this.setState({
            userProfileStoryHighlights: result,
          });
        } else if (status === 204) {
          console.log("nothing");
        }
      });
  };

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
    PostService.getPostsForProfile(this.state.userProfileId)
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

  handleFollow = (followerId, followingId) => {
    ProfileService.follow(followerId, followingId)
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        NotificationService.sendFollowNotification(followingId, followerId, "");
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
          ""
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

  handleActiveStoriesClick = () => {
    if (!AuthService.getCurrentUser()) {
      this.handleClickSnackBar("You have to login first", "error");
    } else {
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
        this.handleClickSnackBar(
          "Follow this account to see their stories",
          "info"
        );
      } else {
        this.showStory(this.state.activeStories, 0);
      }
    }
  };

  handleStoriesClick = () => {
    if (this.state.doesUserProfileStoriesExists === true) {
      this.showStory(this.state.userProfileStories, 0);
    } else {
      this.handleClickSnackBar("You don't have any story yet", "info");
    }
  };

  handleStoryHighlightShow = (storyHighlight) => {
    if (AuthService.getCurrentUser()) {
      this.showStory(storyHighlight, 0);
    } else {
      this.handleClickSnackBar("You have to login first", "error");
    }
  };

  showStory = (stories, storyNumber) => {
    this.setState({
      currentStoryImage: stories[storyNumber].imageSrc,
      currentStoryPublishingDate: stories[storyNumber].publishingDate,
      isShowStoryDialogOpen: true,
      currentStoryNumber: storyNumber,
      numberOfStoriesForCurrentProfile: stories.length,
      currentProfileStories: stories,
    });
    this.currentStoryPublisher = this.state.userProfile.username;
    this.currentTimeout = window.setInterval(() => {
      this.setState({
        timeCounter: this.state.timeCounter + 1,
      });
      if (this.state.timeCounter >= 180) {
        this.setState({
          timeCounter: 0,
        });
        this.showNextStory(stories, storyNumber);
      }
    }, 30);
  };

  resetClockAndCounter = () => {
    this.setState({
      timeCounter: 0,
    });
    clearInterval(this.currentTimeout);
  };

  closeShowStoryDialog = () => {
    this.setState({
      isShowStoryDialogOpen: false,
    });
    clearTimeout(this.currentTimeout);
    this.setState({
      timeCounter: 0,
    });
  };

  showPreviousStory = (profileStories, storyNumber) => {
    this.resetClockAndCounter();

    if (storyNumber > -1) {
      this.showStory(profileStories, storyNumber);
      return;
    }

    this.showStory(profileStories, 0);
  };

  showNextStory = (profileStories, storyNumber) => {
    this.resetClockAndCounter();

    if (storyNumber + 1 < profileStories.length) {
      this.showStory(profileStories, storyNumber + 1);
      return;
    }

    this.closeShowStoryDialog();
  };

  checkIfStoryIsChecked = (storyId) => {
    for (let id of this.state.checkedItems) {
      if (id === storyId) {
        return true;
      }
    }
    return false;
  };

  handleAddHighlight = () => {
    if (
      this.state.highlightName !== "" &&
      this.state.checkedItems.length !== 0
    ) {
      StoryService.addStoryHighlight(
        this.state.highlightName,
        this.state.loggedUser.id,
        this.state.checkedItems
      )
        .then((res) => {
          return res.json();
        })
        .then(() => {
          this.handleStoryHighlightsForProfile();
          this.closeAddHighlightModal();
        });
    } else {
      this.handleClickSnackBar(
        "You must select stories and enter highlight name",
        "error"
      );
    }
  };

  render() {
    let loggedUser = this.state.loggedUser;
    let userProfile = this.state.userProfile;
    let doesFollowRequestExist = this.state.doesFollowRequestExist;
    const dropdownRef = this.dropdownRef;
    const isActive = this.state.isActive;

    var showStoryModalDialog = (
      <Modal
        show={this.state.isShowStoryDialogOpen}
        onHide={this.closeShowStoryDialog}
        contentClassName="story-modal"
        id="myModal"
        centered
        style={{ marginTop: "25px" }}
      >
        <Modal.Header closeButton>
          <img
            src={this.state.userProfile.imageSrc}
            class="img-fluid avatar avatar-medium shadow rounded-pill"
            alt=""
            style={{
              width: "40px",
              height: "40px",
            }}
          />
          <Modal.Title
            style={{
              marginLeft: "15px",
              marginTop: "3px",
            }}
          >
            {this.state.userProfile.username}
          </Modal.Title>
          <small
            style={{
              marginLeft: "13px",
              marginTop: "13px",
            }}
          >
            {moment(
              moment(this.state.currentStoryPublishingDate).format(
                "YYYY-MM-DD HH:mm:ss"
              )
            ).fromNow()}
          </small>
        </Modal.Header>
        <Modal.Body
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <img
              style={{
                float: "left",
                maxWidth: "300px",
                maxHeight: "380px",
              }}
              src={this.state.currentStoryImage}
              class="img-thumbnail"
            />
          </div>
        </Modal.Body>
        <Modal.Footer
          style={{
            float: "left",
            alignContent: "left",
            alignItems: "left",
          }}
        >
          <Typography
            style={{
              float: "left",
            }}
          >
            {this.state.currentStoryNumber + 1} of{" "}
            {this.state.numberOfStoriesForCurrentProfile}
          </Typography>
          <Slider value={this.state.timeCounter} step={1} max={179}></Slider>
          <Button
            color="primary"
            onClick={() => {
              this.showPreviousStory(
                this.state.currentProfileStories,
                this.state.currentStoryNumber - 1
              );
            }}
          >
            Previous
          </Button>
          <Button
            color="primary"
            onClick={() => {
              this.showNextStory(
                this.state.currentProfileStories,
                this.state.currentStoryNumber
              );
            }}
          >
            Next
          </Button>
        </Modal.Footer>
      </Modal>
    );

    let storiesForAddHighlightModalDialog = this.state.userProfileStories.map(
      (story) => {
        return (
          <FormControlLabel
            control={
              <Checkbox
                key={story.id}
                checked={this.checkIfStoryIsChecked(story.id)}
                onChange={(event) => {
                  let list = this.state.checkedItems;
                  if (event.target.checked) {
                    list.push(story.id);
                  } else {
                    list.splice(list.indexOf(story.id), 1);
                  }
                  this.setState({
                    checkedItems: list,
                  });
                }}
              >
                {" "}
              </Checkbox>
            }
            label={
              <>
                <img
                  src={story.imageSrc}
                  className="profile-img"
                  width="400px"
                  height="auto"
                />
              </>
            }
          />
        );
      }
    );

    var addStoryModalDialog = (
      <Modal
        show={this.state.isHighlightDialogOpen}
        onHide={this.closeAddHighlightModal}
        centered
        style={{ marginTop: "25px" }}
      >
        <Modal.Header
          closeButton
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Modal.Title
            style={{
              marginLeft: "165px",
            }}
          >
            Add highlight
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <div className="form-group">
              <label>Highlight name</label>
              <input
                name="highlightName"
                type="text"
                value={this.state.highlightName}
                onChange={this.handleInputChange}
                className="form-control"
                id="inputName"
                placeholder="Name"
              />
            </div>
            <div
              style={{
                overflow: "auto",
                height: "350px",
              }}
            >
              {storiesForAddHighlightModalDialog}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={() => {
              this.handleAddHighlight();
            }}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    );

    let isInFollowing = loggedUser.following.some((followingProfile) => {
      if (followingProfile.followingId == this.state.userProfileId) return true;
    });

    let isInFollowers = loggedUser.followers.some((followerProfile) => {
      if (followerProfile.followerId == this.state.userProfileId) return true;
    });

    let storyHighlightsListItems = this.state.userProfileStoryHighlights.map(
      (storyHighlight) => {
        return (
          <li
            onClick={() =>
              this.handleStoryHighlightShow(storyHighlight.stories)
            }
          >
            <div class="left">
              <img src={storyHighlight.stories[0].imageSrc} alt="" />
            </div>
            <div class="right">
              <h3>{storyHighlight.name}</h3>
            </div>
          </li>
        );
      }
    );

    let profileBody = (
      <div>
        {showStoryModalDialog}
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
                      {(() => {
                        if (AuthService.getCurrentUser()) {
                          if (
                            AuthService.getCurrentUser().id ===
                            this.state.userProfileId
                          ) {
                            return (
                              <li
                                onClick={() => {
                                  this.handleHighlightAdding();
                                }}
                              >
                                <div
                                  class="left"
                                  style={{ marginLeft: "-3px" }}
                                >
                                  <AddCircle
                                    color="primary"
                                    style={{ fontSize: 50 }}
                                  />
                                </div>
                                <div class="right">
                                  <h3 style={{ marginLeft: "12px" }}>
                                    Add highlight
                                  </h3>
                                </div>
                              </li>
                            );
                          }
                        }
                      })()}
                      {storyHighlightsListItems}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    let savedButton = <div id="savedButton"></div>;
    let storiesButton;
    let followButton;
    if (!AuthService.getCurrentUser()) {
      savedButton = <div id="savedButton"></div>;
      followButton = <div></div>;
      if (userProfile.isPrivate) {
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
      }
    } else if (loggedUser.id === this.state.userProfileId) {
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
      storiesButton = (
        <div>
          <li
            class="header-link-item ml-3 pl-3 border-left d-flex align-items-center"
            onClick={() => this.handleStoriesClick()}
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
              class="feather feather-image mr-1 icon-md"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
            <a class="pt-1px d-none d-md-block" href="#">
              Stories {this.state.userProfileStories.length}
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
        {addStoryModalDialog}
        <Snackbar
          open={this.state.snackBarOpen}
          autoHideDuration={2000}
          onClose={this.handleCloseSnackBar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={this.handleCloseSnackBar}
            severity={this.state.snackBarType}
          >
            {this.state.snackBarMessage}
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
                      src={follower.imageSrc}
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
                      src={followingProfile.imageSrc}
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
                        {(() => {
                          if (this.state.doesActiveStoriesExists === true) {
                            return (
                              <img
                                class="profile-pic"
                                src={userProfile.imageSrc}
                                alt="profile"
                                style={{
                                  border: "2px solid red",
                                }}
                                onClick={() => {
                                  this.handleActiveStoriesClick();
                                }}
                              />
                            );
                          } else {
                            return (
                              <img
                                class="profile-pic"
                                src={userProfile.imageSrc}
                                alt="profile"
                              />
                            );
                          }
                        })()}
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
                          onClick={() => this.handlePostsButton()}
                        >
                          Posts{" "}
                          <span class="text-muted tx-12">
                            {this.state.userProfilePosts.length}
                          </span>
                        </Link>
                      </li>
                      {storiesButton}
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
