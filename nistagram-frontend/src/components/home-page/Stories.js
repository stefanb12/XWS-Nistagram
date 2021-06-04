import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import AddCircle from "@material-ui/icons/AddCircle"
import "../../assets/styles/stories.css";
import { Modal, Button } from "react-bootstrap";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import StoryService from "../../services/StoryService";
import AuthService from "../../services/AuthService";

export default class Stories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddStoryDialogOpen : false,
      storyImages : [],
      closeFriendsOnly : false
    }
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

  addImages = () => {
    let publisher = AuthService.getCurrentUser();
    StoryService.addImagesToStory(this.state.storyImages, this.state.closeFriendsOnly, publisher)
    .then((res) => {
      
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

  render() {
    const { classes } = this.props;

    console.log(classes)

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
        {addStoryModalDialog}
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
              <div class="col-md-2">
                <div class="team text-center rounded p-4 py-1">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
                    class="img-fluid avatar avatar-medium shadow rounded-pill"
                    alt=""
                  />
                  <div class="content mt-2">
                    <h4 class="title mb-0">Lisa Martin</h4>
                  </div>
                </div>
              </div>
              <div class="col-md-2">
                <div class="team text-center rounded p-4 py-1">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
                    class="img-fluid avatar avatar-medium shadow rounded-pill"
                    alt=""
                  />
                  <div class="content mt-2">
                    <h4 class="title mb-0">Lisa Martin</h4>
                  </div>
                </div>
              </div>
              <div class="col-md-2">
                <div class="team text-center rounded p-4 py-1">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
                    class="img-fluid avatar avatar-medium shadow rounded-pill"
                    alt=""
                  />
                  <div class="content mt-2">
                    <h4 class="title mb-0">Lisa Martin</h4>
                  </div>
                </div>
              </div>
              <div class="col-md-2">
                <div class="team text-center rounded p-4 py-1">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
                    class="img-fluid avatar avatar-medium shadow rounded-pill"
                    alt=""
                  />
                  <div class="content mt-2">
                    <h4 class="title mb-0">Lisa Martin</h4>
                  </div>
                </div>
              </div>
              <div class="col-md-2">
                <div class="team text-center rounded p-4 py-1">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
                    class="img-fluid avatar avatar-medium shadow rounded-pill"
                    alt=""
                  />
                  <div class="content mt-2">
                    <h4 class="title mb-0">Lisa Martin</h4>
                  </div>
                </div>
              </div>

              <div class="col-md-2">
                <div class="team text-center rounded p-4 py-1">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
                    class="img-fluid avatar avatar-medium shadow rounded-pill"
                    alt=""
                  />
                  <div class="content mt-2">
                    <h4 class="title mb-0">Lisa Martin</h4>
                  </div>
                </div>
              </div>
              <div class="col-md-2">
                <div class="team text-center rounded p-4 py-1">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
                    class="img-fluid avatar avatar-medium shadow rounded-pill"
                    alt=""
                  />
                  <div class="content mt-2">
                    <h4 class="title mb-0">Lisa Martin</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
      </div>
    );
  }
}

