import React, { Component } from "react";
import ProfileService from "../../services/ProfileService";
import Alert from "@material-ui/lab/Alert";
import { Button, Snackbar, withStyles } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { PhotoCamera } from "@material-ui/icons";
import AuthService from "../../services/AuthService";

const styles = (theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
});

class UserAccount extends Component {
  //state = {};

  constructor(props) {
    super(props);

    this.state = {
      profileForUpdating: {},
      username: "",
      biography: "",
      website: "",
      fullname: "",
      email: "",
      phoneNumber: "",
      dateOfBirth: "",
      gender: 15,
      open: false,
      snackBarMessage: "",
      snackBarSeverity: "",
      profileImage: "https://bootdey.com/img/Content/avatar/avatar7.png",
      imageForSending: null,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    //this.handlerFile = this.handlerFile.bind(this);
  }

  componentDidMount() {
    let publisher = AuthService.getCurrentUser();
    ProfileService.getUserForUpdating(publisher.id)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setProfile(result);
          this.setState({
            profileForUpdating: result,
            dateOfBirth: this.formattedDate(result.dateOfBirth),
          });
        },
        (error) => {
          console.log(error);
        }
      );
    //this.state.dateOfBirth = this.formattedDate(this.state.profileForUpdating.dateOfBirth);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleOptionChange(changeEvent) {
    this.setState({
      gender: changeEvent.target.value,
    });
  }

  handleSubmit(event) {
    console.log("username: " + this.state.username);
    console.log("biography: " + this.state.biography);
    event.preventDefault();
  }

  setProfile(profile) {
    this.state.username = profile.username;
    this.state.biography = profile.biography;
    this.state.website = profile.website;
    this.state.fullname = profile.fullName;
    this.state.email = profile.email;
    this.state.phoneNumber = profile.mobilePhone;
    this.state.dateOfBirth = profile.dateOfBirth;
    this.state.gender = profile.gender;
    if (profile.imageSrc != "") {
      this.state.profileImage = profile.imageSrc;
    } else {
      this.state.profileImage =
        "https://bootdey.com/img/Content/avatar/avatar7.png";
    }
  }

  formattedDate(date) {
    var d = new Date(date);
    let month = String(d.getMonth() + 1);
    let day = String(d.getDate());
    const year = String(d.getFullYear());

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return year + "-" + month + "-" + day;
    //console.log(formattedDate)
    //return `${year}-${month}-${day}`;
  }

  updateProfile() {
    let publisher = AuthService.getCurrentUser();
    if (
      this.state.username == "" ||
      this.state.biography == "" ||
      this.state.biography == "" ||
      this.state.fullname == "" ||
      this.state.email == "" ||
      this.state.phoneNumber == "" ||
      this.state.dateOfBirth == ""
    ) {
      this.setState({
        open: true,
        snackBarMessage: "Enter values in all inputs!",
        snackBarSeverity: "error",
      });
    } else {
      this.setState({
        open: true,
        snackBarMessage: "Profile updated!",
        snackBarSeverity: "success",
      });
      ProfileService.updateProfile(
        publisher.id,
        this.state.username,
        this.state.biography,
        this.state.website,
        this.state.fullname,
        this.state.email,
        this.state.phoneNumber,
        this.state.dateOfBirth,
        this.state.gender,
        this.state.imageForSending
      )
        .then((res) => res.json())
        .then(
          (result) => {},
          (error) => {
            console.log(error);
          }
        );
    }
  }

  inputValidated() {
    if (
      this.state.username == "" ||
      this.state.biography == "" ||
      this.state.biography == "" ||
      this.state.fullname == "" ||
      this.state.email == "" ||
      this.state.phoneNumber == "" ||
      this.state.dateOfBirth == ""
    ) {
      this.state.showAlert = false;
    }
    this.state.showAlert = true;
  }

  handlerFile = (e) => {
    //this.state.profileImage = e.target.value
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      this.setState({
        profileImage: URL.createObjectURL(img),
        imageForSending: img,
      });
    }
    e.preventDefault();
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({
      open: false,
    });
  };

  render() {
    const { classes } = this.props;

    let usernameValidation;
    if (this.state.username == "") {
      usernameValidation = (
        <label style={{ color: "red" }}>Enter your username</label>
      );
    }
    let biographyValidation;
    if (this.state.biography == "") {
      biographyValidation = (
        <label style={{ color: "red" }}>Enter your biography</label>
      );
    }
    let websiteValidation;
    if (this.state.website == "") {
      websiteValidation = (
        <label style={{ color: "red" }}>Enter your website</label>
      );
    }
    let fullnameValidation;
    if (this.state.fullname == "") {
      fullnameValidation = (
        <label style={{ color: "red" }}>Enter your full name</label>
      );
    }
    let emailValidation;
    if (this.state.email == "") {
      emailValidation = (
        <label style={{ color: "red" }}>Enter your email</label>
      );
    }
    let phoneNumberValidation;
    if (this.state.phoneNumber == "") {
      phoneNumberValidation = (
        <label style={{ color: "red" }}>Enter your phone number</label>
      );
    }
    let dateOfBirthValidation;
    if (this.state.dateOfBirth == "") {
      dateOfBirthValidation = (
        <label style={{ color: "red" }}>Enter your date of birth</label>
      );
    }

    let alert;
    if (this.state.showAlert == true) {
      alert = <Alert variant="primary">This is a alertlike.</Alert>;
    }

    let image = this.state.profileImage;

    return (
      <div
        className="tab-pane fade show active"
        id="account"
        role="tabpanel"
        style={{ float: "right", marginRight: "20%", width: "50%" }}
      >
        <div className="card">
          <div className="card-header">
            <h5 className="card-title mb-0">Public info</h5>
          </div>
          <div className="card-body">
            <form>
              <div className="row">
                <div className="col-md-8">
                  <div className="form-group">
                    <label>Username</label>
                    <input
                      name="username"
                      type="text"
                      value={this.state.username}
                      onChange={this.handleInputChange}
                      className="form-control"
                      id="inputUsername"
                      placeholder="Username"
                    />
                    {usernameValidation}
                  </div>
                  <div className="form-group">
                    <label>Biography</label>
                    <textarea
                      name="biography"
                      value={this.state.biography}
                      onChange={this.handleInputChange}
                      rows="2"
                      className="form-control"
                      id="inputBio"
                      placeholder="Tell something about yourself"
                    ></textarea>
                    {biographyValidation}
                  </div>
                  <div className="form-group">
                    <label>Website</label>
                    <input
                      name="website"
                      type="text"
                      value={this.state.website}
                      onChange={this.handleInputChange}
                      className="form-control"
                      id="inputUsername"
                      placeholder="Username"
                    />
                    {websiteValidation}
                  </div>
                </div>
                <div className="col-md-4">
                  <div className={classes.root}>
                    <img
                      alt="Andrew Jones"
                      src={this.state.profileImage}
                      className="rounded-circle img-responsive mt-2"
                      width="128"
                      height="128"
                    />
                    <div className="mt-2">{this.state.fullname}</div>
                    <input
                      accept="image/*"
                      id="icon-button-file"
                      className={classes.input}
                      type="file"
                      onChange={this.handlerFile.bind(this)}
                    />
                    <label
                      htmlFor="icon-button-file"
                      style={{ marginLeft: "10%" }}
                    >
                      Choose images:
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                      >
                        <PhotoCamera />
                      </IconButton>
                    </label>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h5 className="card-title mb-0">Private info</h5>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label>Full name</label>
              <input
                name="fullname"
                type="text"
                value={this.state.fullname}
                onChange={this.handleInputChange}
                className="form-control"
                id="inputFirstName"
                placeholder="Full name"
              />
              {fullnameValidation}
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                name="email"
                type="email"
                value={this.state.email}
                onChange={this.handleInputChange}
                className="form-control"
                id="inputEmail4"
                placeholder="Email"
              />
              {emailValidation}
            </div>
            <div className="form-group">
              <label>Phone number</label>
              <input
                name="phoneNumber"
                type="text"
                value={this.state.phoneNumber}
                onChange={this.handleInputChange}
                className="form-control"
                id="inputAddress"
                placeholder="Phone number"
              />
              {phoneNumberValidation}
            </div>
            <div className="form-group">
              <label>Date of birth</label>
              <input
                name="dateOfBirth"
                type="date"
                value={this.state.dateOfBirth}
                onChange={this.handleInputChange}
                className="form-control"
                id="inputAddress"
                placeholder="Date of birth"
              />
              {dateOfBirthValidation}
            </div>
            <div style={{ marginBottom: "1%" }}>
              <h6>Gender</h6>
              <label>Male</label>
              <input
                name="gender"
                checked={this.state.gender == 0}
                type="radio"
                value={0}
                onChange={this.handleOptionChange}
                id="inputAddress"
                placeholder="Date of birth"
                style={{ marginLeft: "1%" }}
              />
              <label style={{ marginLeft: "3%" }}>Female</label>
              <input
                name="gender"
                checked={this.state.gender == 1}
                type="radio"
                value={1}
                onChange={this.handleOptionChange}
                id="inputAddress"
                placeholder="Date of birth"
                style={{ marginLeft: "1%" }}
              />
            </div>
            <button
              className="btn btn-primary"
              onClick={() => this.updateProfile()}
            >
              Save changes
            </button>
            <Snackbar
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              open={this.state.open}
              autoHideDuration={2000}
              onClose={this.handleClose}
            >
              <Alert
                onClose={this.handleClose}
                severity={this.state.snackBarSeverity}
              >
                {this.state.snackBarMessage}
              </Alert>
            </Snackbar>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(UserAccount);
