import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import AddCircle from "@material-ui/icons/AddCircle"
import "../../assets/styles/stories.css";
import { Modal, Button } from "react-bootstrap";
import { Checkbox, FormControlLabel, Slider, Snackbar } from "@material-ui/core";
import StoryService from "../../services/StoryService";
import AuthService from "../../services/AuthService";
import { Alert } from "@material-ui/lab";

export default class Stories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddStoryDialogOpen : false,
      isShowStoryDialogOpen : false,
      storyImages : [],
      closeFriendsOnly : false,
      storyAddedSnackbarShown : false,
      allProfileStories : [],
      currentStoryImage: null,
      currentStoryPublisher: '',
      currentTimeout: null,
      timeCounter: 0
    }
  }

componentWillMount() {
    this.timeCounter = 0;
    StoryService.getAllStories()
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({
          allProfileStories : data
        })
      })
  }

  handleStoryAdding = () => {
    this.setState({
      isAddStoryDialogOpen : true
    });
  }

  handleCloseFriendsCheck = (e) => {
    let val = e.target.checked ? true : false;
    this.setState({
      closeFriendsOnly : val
    });
  }

  closeAddStoryModal = () => {
    this.setState({
      isAddStoryDialogOpen : false
    });
  }

  closeShowStoryDialog = () => {
    this.setState({
      isShowStoryDialogOpen : false
    });
    clearTimeout(this.currentTimeout);
    this.setState({
      timeCounter : 0
    })
  }

  addImages = () => {
    let publisher = AuthService.getCurrentUser();
    StoryService.addImagesToStory(this.state.storyImages, this.state.closeFriendsOnly, publisher)
    .then((res) => {
      if (res.status === 200) {
        this.clearImages();
        this.closeAddStoryModal();
        this.setState({
          closeFriendsOnly : false
        });
        this.setState({
          storyAddedSnackbarShown : true
        });
      }
    })
  }

  clearImages = () => {
    this.setState({
      storyImages : []
    });
  }

  handlerFile = (e) => {
    let allfiles = [];
    for (let i = 0; i < e.target.files.length; i++) {
      allfiles.push(e.target.files[i]);
    }
    if (allfiles.length > 0) {
      this.setState((state) => ({
        storyImages: allfiles
      }));
    }
    e.preventDefault();
  };

  handleCloseSnackBar = (event, reason) => {
    this.setState({
      storyAddedSnackbarShown : false
    });
    
  };

  showNextStory = (profileStories, storyNumber) => {
    clearInterval(this.currentTimeout);
    if (storyNumber + 1 < profileStories.stories.length) {
      this.showImage(profileStories, storyNumber + 1);
      return;
    }

    let nextProfleStories = this.findNextProfileStories(profileStories);
    
    if (nextProfleStories !== null) {
      this.showImage(nextProfleStories, 0);
      return;
    }
    
    this.closeShowStoryDialog();
    this.setState({
      timeCounter : 0
    })
  }

  findNextProfileStories = (profileStories) => {
    let i = 0;
    while (profileStories.originalId !== this.state.allProfileStories[i].originalId) {
      i++;
    }
    if (i + 1 < this.state.allProfileStories.length) {
      console.log(this.state.allProfileStories.length)
      return this.state.allProfileStories[i+1];
    } else {
      return null;
    }
  }

  showImage = (profileStories, storyNumber) => {
    this.setState({
      currentStoryImage : profileStories.stories[storyNumber].imageSrc,
      isShowStoryDialogOpen : true
    })
    this.currentStoryPublisher = profileStories.username;
    this.currentTimeout = window.setInterval(() => {
      this.setState({
        timeCounter : this.state.timeCounter + 1
      })
      if (this.state.timeCounter >= 90) {
        this.setState({
          timeCounter : 0
        })
        this.showNextStory(profileStories, storyNumber);
      }
     }, 30);
  }

  render() {
    var renderStories = this.state.allProfileStories.map((profileStories, key) => {
      return (
        <div class="col-md-2" key={key}>
                <div class="team text-center rounded p-4 py-1">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
                    class="img-fluid avatar avatar-medium shadow rounded-pill"
                    alt=""
                    onClick = {() => {this.showImage(profileStories, 0)}}
                    style = {{
                      border : "2px solid red"
                    }}
                  />
                  <div class="content mt-2">
                    <h4 class="title mb-0">{profileStories.username}</h4>
                  </div>
                </div>
        </div>
      )
    })

    var showStoryModalDialog = (
      <Modal
        show={this.state.isShowStoryDialogOpen}
        onHide={this.closeShowStoryDialog}
        contentClassName="story-modal"
        centered>
        <Modal.Header
          closeButton>
          <Modal.Title>
            {this.currentStoryPublisher}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
           display: "flex",
           justifyContent: "center",
           alignItems: "center"
          }}>
          <div>
            <img
              style={{
                float: "left",
                maxWidth: "400px",
                maxHeight: "700px",
              }}
              src={this.state.currentStoryImage}
              class="img-thumbnail"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Slider value={this.state.timeCounter} step={1} max={89}></Slider>
        </Modal.Footer>
      </Modal>
    )

    var addStoryModalDialog = (
      <Modal 
        show={this.state.isAddStoryDialogOpen}
        onHide={this.closeAddStoryModal}
        centered>
        <Modal.Header 
          closeButton
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Modal.Title 
            style={{
              marginLeft: "165px"
            }}>Add story</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <div >
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.closeFriendsOnly}
                onChange={this.handleCloseFriendsCheck}
                inputProps={{ 'aria-label': 'Visible for close friends only' }}
                style={{ marginLeft: "110px" }}
              />
            }
          label="Visible for close friends only"/> 
          <input
            accept="image/*"
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
    )

    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          open={this.storyAddedSnackbarShown}
          autoHideDuration={3000}
          onClose={this.handleCloseSnackBar}
          >
            <Alert severity="sucess">
              Story added successfully!
            </Alert>
        </Snackbar>
        {addStoryModalDialog}
        {showStoryModalDialog}
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
                  <AddCircle onClick={this.handleStoryAdding} color="primary" style={{ fontSize: 95 }}/>
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

