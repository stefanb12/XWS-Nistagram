import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import AddCircle from "@material-ui/icons/AddCircle";
import "../../assets/styles/stories.css";
import { Modal, Button } from "react-bootstrap";
import {
  Checkbox,
  FormControlLabel,
  Slider,
  Snackbar,
  Typography,
} from "@material-ui/core";
import StoryService from "../../services/StoryService";
import AuthService from "../../services/AuthService";
import { Alert } from "@material-ui/lab";
import moment from "moment";
import { withRouter } from "react-router-dom";
import ReactPlayer from "react-player";
import InappropriateContentService from "../../services/InappropriateContentService";

class Stories extends Component {
  constructor(props) {
    super(props);
    this.dropdownRef = React.createRef();
    this.state = {
      isActive: false,
      reportComment: "",
      reportStoryId: "",
      newComment: "",
      isAddStoryDialogOpen: false,
      isShowStoryDialogOpen: false,
      storyImages: [],
      closeFriendsOnly: false,
      storyAddedSnackbarShown: false,
      snackbarSeverity: "success",
      snackbarMessage: "",
      allProfileStories: [],
      currentStoryContent: "",
      currentStoryPublisher: "",
      currentStoryPublisherId: 1,
      currentStoryPublishingDate: null,
      currentTimeout: null,
      currentProfileStories: null,
      timeCounter: 0,
      timeCounterMultiplier: 1,
      currentStoryNumber: 0,
      numberOfStoriesForCurrentProfile: 0,
      currentProfileImage: null,
      forCloseFriends: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount() {
    this.timeCounter = 0;
    StoryService.getAllStories()
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({
          allProfileStories: data,
        });
      });
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

  handleStoryAdding = () => {
    this.setState({
      isAddStoryDialogOpen: true,
    });
  };

  handleCloseFriendsCheck = (e) => {
    let val = e.target.checked ? true : false;
    this.setState({
      closeFriendsOnly: val,
    });
  };

  closeAddStoryModal = () => {
    this.setState({
      isAddStoryDialogOpen: false,
    });
  };

  closeShowStoryDialog = () => {
    this.setState({
      isShowStoryDialogOpen: false,
      isActive: false,
    });
    clearTimeout(this.currentTimeout);
    this.setState({
      timeCounter: 0,
    });
  };

  addImages = () => {
    if (this.state.storyImages.length == 0) {
      this.setState({
        storyAddedSnackbarShown: true,
        snackbarMessage: "You must choose image first!",
        snackbarSeverity: "error",
      });
      return;
    }
    let publisher = AuthService.getCurrentUser();
    StoryService.addImagesToStory(
      this.state.storyImages,
      this.state.closeFriendsOnly,
      publisher
    ).then((res) => {
      if (res.status === 200) {
        this.clearImages();
        this.closeAddStoryModal();
        this.setState({
          closeFriendsOnly: false,
        });
        this.setState({
          storyAddedSnackbarShown: true,
          snackbarMessage: "Story added successfully!",
          snackbarSeverity: "success",
        });
        StoryService.getAllStories()
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            this.setState({
              allProfileStories: data,
            });
          });
      }
    });
  };

  clearImages = () => {
    this.setState({
      storyImages: [],
    });
  };

  handlerFile = (e) => {
    let allfiles = [];
    for (let i = 0; i < e.target.files.length; i++) {
      allfiles.push(e.target.files[i]);
    }
    if (allfiles.length > 0) {
      this.setState((state) => ({
        storyImages: allfiles,
      }));
    }
    e.preventDefault();
  };

  handleCloseSnackBar = (event, reason) => {
    this.setState({
      storyAddedSnackbarShown: false,
    });
  };

  resetClockAndCounter = () => {
    this.setState({
      timeCounter: 0,
    });
    clearInterval(this.currentTimeout);
  };

  showPreviousStory = (profileStories, storyNumber) => {
    this.resetClockAndCounter();

    if (storyNumber > -1) {
      this.showStory(profileStories, storyNumber);
      return;
    }

    let previousProfleStories = this.findPreviousProfileStories(profileStories);

    if (previousProfleStories !== null) {
      this.showStory(
        previousProfleStories,
        previousProfleStories.stories.length - 1
      );
      return;
    }

    this.showStory(this.state.currentProfileStories, 0);
  };

  showNextStory = (profileStories, storyNumber) => {
    this.resetClockAndCounter();

    if (storyNumber + 1 < profileStories.stories.length) {
      this.showStory(profileStories, storyNumber + 1);
      return;
    }

    let nextProfleStories = this.findNextProfileStories(profileStories);

    if (nextProfleStories !== null) {
      this.showStory(nextProfleStories, 0);
      return;
    }

    this.closeShowStoryDialog();
  };

  findPreviousProfileStories = (profileStories) => {
    let i = 0;
    while (
      profileStories.originalId !== this.state.allProfileStories[i].originalId
    ) {
      i++;
    }
    if (i - 1 >= 0) {
      return this.state.allProfileStories[i - 1];
    } else {
      return null;
    }
  };

  findNextProfileStories = (profileStories) => {
    let i = 0;
    while (
      profileStories.originalId !== this.state.allProfileStories[i].originalId
    ) {
      i++;
    }
    if (i + 1 < this.state.allProfileStories.length) {
      return this.state.allProfileStories[i + 1];
    } else {
      return null;
    }
  };

  showStory = (profileStories, storyNumber) => {
    this.setState({
      currentStoryContent: profileStories.stories[storyNumber].imageSrc,
      currentStoryPublishingDate:
        profileStories.stories[storyNumber].publishingDate,
      isShowStoryDialogOpen: true,
      currentStoryNumber: storyNumber,
      numberOfStoriesForCurrentProfile: profileStories.stories.length,
      currentProfileStories: profileStories,
      currentProfileImage: profileStories.imageSrc,
      forCloseFriends: profileStories.stories[storyNumber].forCloseFriends,
    });
    if (profileStories.stories[storyNumber].imageSrc.endsWith(".mp4")) {
      this.setState({
        timeCounterMultiplier: 3,
      });
    } else {
      this.setState({
        timeCounterMultiplier: 1,
      });
    }
    this.currentStoryPublisher = profileStories.username;
    this.setState({
      currentStoryPublisherId: profileStories.originalId,
    });

    this.currentTimeout = window.setInterval(() => {
      this.setState({
        timeCounter: this.state.timeCounter + 1,
      });
      if (this.state.timeCounter >= 180 * this.state.timeCounterMultiplier) {
        this.setState({
          timeCounter: 0,
        });
        this.showNextStory(profileStories, storyNumber);
      }
    }, 30);
  };

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  openReportModal = (storyId) => {
    this.closeShowStoryDialog();
    this.setState({
      isOpenReportModal: true,
      reportStoryId: storyId,
    });
  };

  closeReportModal = () =>
    this.setState({
      isOpenReportModal: false,
      reportComment: "",
      reportStoryId: "",
    });

  reportStory = () => {
    let resStatus;
    InappropriateContentService.insertInappropriateContent(
      this.state.reportComment,
      false,
      AuthService.getCurrentUser().id,
      1,
      this.state.reportStoryId
    )
      .then((res) => {
        resStatus = res.status;
        return res.json();
      })
      .then((result) => {
        if (resStatus == 200) {
          this.closeReportModal();
          this.setState({
            storyAddedSnackbarShown: true,
            snackbarMessage: "You sent report for story",
            snackbarSeverity: "success",
          });
        } else if (resStatus == 400) {
          this.closeReportModal();
          this.setState({
            storyAddedSnackbarShown: true,
            snackbarMessage: "You have already sent report",
            snackbarSeverity: "error",
          });
        }
      });
  };

  render() {
    const dropdownRef = this.dropdownRef;
    const isActive = this.state.isActive;

    let reportCommentValidation;
    if (this.state.reportComment == "") {
      reportCommentValidation = (
        <label style={{ color: "red", marginTop: "1px" }}>
          Enter report comment
        </label>
      );
    }

    var renderStories = this.state.allProfileStories.map(
      (profileStories, key) => {
        return (
          <div class="col-md-2" key={key}>
            <div class="team text-center rounded p-4 py-1">
              <img
                src={profileStories.imageSrc}
                class="img-fluid avatar avatar-medium shadow rounded-pill"
                alt=""
                onClick={() => {
                  this.showStory(profileStories, 0);
                }}
                style={{
                  width: "90px",
                  height: "90px",
                }}
              />
              <div class="content mt-2">
                <h4 class="title mb-0">{profileStories.username}</h4>
              </div>
            </div>
          </div>
        );
      }
    );

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
          {(() => {
            if (this.state.forCloseFriends) {
              return (
                <div>
                  <img
                    onClick={() => {
                      this.props.history.push({
                        pathname: "/user/profile",
                        state: {
                          profileId: this.state.currentStoryPublisherId,
                        },
                      });
                    }}
                    src={this.state.currentProfileImage}
                    class="img-fluid avatar avatar-medium shadow rounded-pill"
                    alt=""
                    style={{
                      width: "40px",
                      height: "40px",
                      border: "2px solid green",
                    }}
                  />
                </div>
              );
            } else {
              return (
                <div>
                  <img
                    onClick={() => {
                      this.props.history.push({
                        pathname: "/user/profile",
                        state: {
                          profileId: this.state.currentStoryPublisherId,
                        },
                      });
                    }}
                    src={this.state.currentProfileImage}
                    class="img-fluid avatar avatar-medium shadow rounded-pill"
                    alt=""
                    style={{
                      width: "40px",
                      height: "40px",
                    }}
                  />
                </div>
              );
            }
          })()}

          <Modal.Title
            onClick={() => {
              this.props.history.push({
                pathname: "/user/profile",
                state: {
                  profileId: this.state.currentStoryPublisherId,
                },
              });
            }}
            style={{
              marginLeft: "15px",
              marginTop: "3px",
            }}
          >
            {this.currentStoryPublisher}
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
          <div
            class="dropdown"
            ref={dropdownRef}
            style={{ marginLeft: "120px", marginTop: "5px" }}
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
                width="30"
                height="30"
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
            <nav className={`menu ${isActive ? "active" : "inactive"}`}>
              <div>
                <ul>
                  <li>
                    <a
                      href="javascript:void(0)"
                      onClick={() =>
                        this.openReportModal(
                          this.state.currentProfileStories.stories[
                            this.state.currentStoryNumber
                          ].id
                        )
                      }
                    >
                      Report
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </Modal.Header>
        <Modal.Body
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            {(() => {
              if (this.state.currentStoryContent.endsWith(".mp4")) {
                return (
                  <ReactPlayer
                    className="d-block w-100"
                    playing={true}
                    url={this.state.currentStoryContent}
                    controls={false}
                  />
                );
              } else {
                return (
                  <img
                    style={{
                      float: "left",
                      maxWidth: "320px",
                      maxHeight: "360px",
                    }}
                    src={this.state.currentStoryContent}
                    class="img-thumbnail"
                  />
                );
              }
            })()}
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
          <Slider
            value={this.state.timeCounter}
            step={1}
            max={180 * this.state.timeCounterMultiplier - 1}
          ></Slider>
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

    var addStoryModalDialog = (
      <Modal
        show={this.state.isAddStoryDialogOpen}
        onHide={this.closeAddStoryModal}
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
            Add story
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
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.closeFriendsOnly}
                  onChange={this.handleCloseFriendsCheck}
                  inputProps={{
                    "aria-label": "Visible for close friends only",
                  }}
                  style={{ marginLeft: "110px" }}
                />
              }
              label="Visible for close friends only"
            />
            <input
              accept="image/*,video/mp4"
              id="icon-button-file"
              type="file"
              multiple
              hidden
              onChange={this.handlerFile.bind(this)}
            />
            <label htmlFor="icon-button-file" style={{ marginLeft: "150px" }}>
              Choose images:
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>
            <div
              style={{
                overflow: "auto",
                height: "350px",
              }}
            >
              {this.state.storyImages.map((file, key) => {
                return (
                  <div key={key}>
                    <img
                      style={{
                        float: "left",
                        width: "300px",
                        height: "auto",
                        marginLeft: "70px",
                        marginBottom: "20px",
                      }}
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      class="img-thumbnail"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={this.clearImages}>
            Clear
          </Button>
          <Button variant="success" onClick={this.addImages}>
            Add
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
            onClick={this.reportStory}
            disabled={this.state.reportComment === ""}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    );

    var renderSnackbar = (
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={this.state.storyAddedSnackbarShown}
        autoHideDuration={3000}
        onClose={this.handleCloseSnackBar}
      >
        <Alert severity={this.state.snackbarSeverity}>
          {this.state.snackbarMessage}
        </Alert>
      </Snackbar>
    );

    return (
      <div>
        {renderSnackbar}
        {addStoryModalDialog}
        {showStoryModalDialog}
        {reportModalDialog}
        <div class="container">
          <div
            class="page-inner"
            style={{
              maxHeight: "200px",
              overflow: "auto",
              whiteSpace: "nowrap",
              backgroundColor: "white",
            }}
          >
            <div class="row">
              <div class="col-md-2">
                <div class="team text-center rounded p-4 py-1">
                  <AddCircle
                    onClick={this.handleStoryAdding}
                    color="primary"
                    style={{ fontSize: 95 }}
                  />
                  <div class="content mt-2">
                    <h4 class="title mb-0">Add story</h4>
                  </div>
                </div>
              </div>
              {renderStories}
            </div>
          </div>
        </div>
        <br />
      </div>
    );
  }
}

export default withRouter(Stories);
