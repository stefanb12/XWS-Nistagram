import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import { PhotoCamera } from "@material-ui/icons";
import ProfileVerificationRequestService from "../../services/ProfileVerificationRequestService";
import Alert from "@material-ui/lab/Alert";
import {Snackbar} from "@material-ui/core";

class VerifyProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName : '',
      lastName : '',
      userCategory : '0',
      profilePicture : null,
      showSnackbar : false,
      snackBarMessage : '',
      snackBarSeverity : 'success'
    };

    this.handleFirstNameInputChange = this.handleFirstNameInputChange.bind(this);
    this.handleLastNameInputChange = this.handleLastNameInputChange.bind(this);
    this.handleCategoryInputChange = this.handleCategoryInputChange.bind(this);
  }
  

  handleFirstNameInputChange(event) {
    this.setState({
      firstName: event.target.value
    });
  }

  handleLastNameInputChange(event) {
    this.setState({
      lastName: event.target.value
    });
  }

  handleCategoryInputChange(event) {
    this.setState({
      userCategory: event.target.value
    });
  }

  handlerFile = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      this.setState({
        profilePicture: img
      });
    }
    e.preventDefault();
  };

  sendVerificationRequest = () => {
    ProfileVerificationRequestService.sendVerificationRequest(this.state.firstName, this.state.lastName, 
      this.state.userCategory, this.state.profilePicture)
      .then((res) => {
        if (res.status == 200) {
          this.setState({
            showSnackbar : true,
            snackBarMessage : 'Request sent successfully!',
            snackBarSeverity : 'success',
            firstName : '',
            lastName : '',
            profilePicture : null
          })
        } else {
          this.setState({
            showSnackbar : true,
            snackBarMessage : 'Verification request for your profile already exists!',
            snackBarSeverity : 'error'
          })
        }
      });
  }

  handleClose = (event, reason) => {
    this.setState({
      showSnackbar : false
    })
  };

  checkIfParametersAreValid = () => {
    return !(this.state.firstName != '' && this.state.lastName != '' && this.state.profilePicture != null);
  } 

  render() {
    const { classes } = this.props;

    let firstNameValidation;
    if (this.state.firstName == "") {
      firstNameValidation = (
        <label style={{ color: "red" }}>Enter your first name</label>
      );
    }

    let lastNameValidation;
    if (this.state.lastName == "") {
      lastNameValidation = (
        <label style={{ color: "red" }}>Enter your last name</label>
      );
    }

    return (
      <div
        className="card"
        style={{ float: "right", marginRight: "20%", width: "50%" }}
      >
        <div className="card-header">
          <h5 className="card-title">Verify Profile</h5>
        </div>
        <div className="card-body">
            <div className="form-group">
              <label>First name</label>
              <input
                name="firstName"
                type="text"
                value={this.state.firstName}
                onChange={this.handleFirstNameInputChange}
                className="form-control"
                id="inputFirstName"
                placeholder="First name"
              />
              {firstNameValidation}
            </div>
            <div className="form-group">
              <label>Last name</label>
              <input
                name="lastName"
                type="text"
                value={this.state.lastName}
                onChange={this.handleLastNameInputChange}
                className="form-control"
                id="inputLastName"
                placeholder="Last name"
              />
              {lastNameValidation}
            </div>
            <div className="form-group">
              <label>Category</label>
              <select
                name="userCategory"
                value={this.state.userCategory}
                className="form-control"
                onChange={this.handleCategoryInputChange}
                >
                  <option value="1">Influencer</option>
                  <option value="2">Sports</option>
                  <option value="3">Media/News</option>
                  <option value="4">Business</option>
                  <option value="5">Brand</option>
                  <option value="6">Organization</option>
              </select>
            </div>
            <div className="form-group">
              <input
                accept="image/*"
                id="icon-button-file"
                hidden
                type="file"
                onChange={this.handlerFile.bind(this)}
              />
              <label
                htmlFor="icon-button-file"
              >
                Select image from official document:
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCamera />
                </IconButton>
              </label>
            </div>
            <div style={{
                  width: "300px",
                  height: "140px",
                  //border: "1px solid gray",
                  alignContent: "center",
                  alignItems: "center"
                }}>
              {
                this.state.profilePicture ? <img
                style={{
                  maxWidth: "150px",
                  maxHeight: "110px",
                  //marginTop: "15px",
                  //marginLeft: "50px"
                }}
                src={URL.createObjectURL(this.state.profilePicture)}
                alt={this.state.profilePicture.name}
                class="img-thumbnail"
              /> :
              <br/>
              }
            </div>
            
            <br/>
            <button
              className="btn btn-primary"
              disabled={this.checkIfParametersAreValid()}
              onClick={() => this.sendVerificationRequest()}
            >
              Send verification request
            </button>
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={this.state.showSnackbar}
          autoHideDuration={3000}
          onClose={this.handleClose}
        >
          <Alert severity={this.state.snackBarSeverity}>{this.state.snackBarMessage}</Alert>
        </Snackbar>
      </div>
    );
  }
}

export default VerifyProfile;
