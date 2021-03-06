import React, { Component } from "react";
import "../../assets/styles/posts.css";
import { Button, Modal } from "react-bootstrap";
import UploadImages from "./UploadImages";
import AlgoliaPlaces from "algolia-places-react";
import PostService from "../../services/PostService";
import AuthService from "../../services/AuthService";
import PostCard from "./PostCard";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import NotificationService from "../../services/NotificationService";
import CampaignService from "../../services/CampaignService";

export default class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenImagesModal: false,
      isOpenLocationAndTagsModal: false,
      imageFiles: [],
      currentChosenImageFiles: [],
      location: "Enter location",
      currentLocation: "",
      address: "",
      city: "",
      country: "",
      currentAddress: "",
      currentCity: "",
      currentCountry: "",
      tags: "",
      currentEnteredTags: "",
      description: "",
      posts: [],
      openSnackError: false,
      openSnackSuccess: false,
      messageError: "",
      messageSuccess: "",
      postsResult: [],
      allCampaings: [],
      counter: 0,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    const script = document.createElement("script");
    script.async = true;
    script.src = "../helpers/cyrillicToLatin.min.js";
  }

  async componentWillMount() {
    await this.getPostsWithCampaigns();
  }

  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getPostsWithCampaigns = async () => {
    await CampaignService.getSingleCampaignsForProfile(
      AuthService.getCurrentUser().id
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let campaings = data;
        this.setState({ allCampaings: campaings });
        CampaignService.getRepeatableCampaignsForProfile(
          AuthService.getCurrentUser().id
        )
          .then((res) => {
            return res.json();
          })
          .then((result) => {
            campaings.push.apply(campaings, result);
            let newCounterValue = this.getRndInteger(0, campaings.length - 1);
            this.setState(
              {
                allCampaings: campaings,
                counter: newCounterValue,
              },
              () => {
                // Push campaign post to list
                if (this.state.allCampaings.length > 0) {
                  var step = 0;
                  while (step < 4) {
                    if (this.state.allCampaings[this.state.counter].isPost) {
                      PostService.getById(
                        this.state.allCampaings[this.state.counter].postId
                      )
                        .then((res) => {
                          return res.json();
                        })
                        .then((data) => {
                          var newList = [];
                          newList = this.state.postsResult;
                          newList.push(data[0]);
                          this.setState({
                            postsResult: newList,
                          });
                        });
                      break;
                    }

                    let newCountValue = this.getRndInteger(
                      0,
                      this.state.allCampaings.length - 1
                    );
                    let counterStep = 0;
                    while (counterStep < 5) {
                      if (newCountValue === this.state.counter) {
                        newCountValue = this.getRndInteger(
                          0,
                          this.state.allCampaings.length - 1
                        );
                      } else {
                        this.setState({
                          counter: newCountValue,
                        });
                        break;
                      }
                      counterStep += 1;
                    }
                    step += 1;
                  }
                }
              }
            );
          });
      });

    await PostService.getPostsFromFollowedProfiles(
      AuthService.getCurrentUser().id
    )
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        if (result.length > 0) {
          var newResult = [];
          newResult = this.state.postsResult;
          newResult.push.apply(newResult, result);
          this.setState({
            postsResult: newResult,
          });
        }
      });

    await this.setState({
      posts: this.state.postsResult,
    });
  };

  toLatinConvert(string) {
    var cyrillic =
      "??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??".split(
        "_"
      );
    var latin =
      "A_B_V_G_D_??_E_??_??_Z_I_J_J_K_L_Lj_M_N_Nj_O_P_R_S_T_??_U_F_H_C_??_D??_??_??_??_Y_??_??_??_??_a_b_v_g_d_??_e_??_??_z_i_j_j_k_l_lj_m_n_nj_o_p_r_s_t_??_u_f_h_c_??_d??_??_??_??_y_??_??_??_??".split(
        "_"
      );

    return string
      .split("")
      .map(function (char) {
        var index = cyrillic.indexOf(char);
        if (!~index) return char;
        return latin[index];
      })
      .join("");
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  openImagesModal = () => {
    this.setState({
      isOpenImagesModal: true,
    });
  };

  closeImagesModal = () => this.setState({ isOpenImagesModal: false });

  openLocationAndTagsModal = () => {
    this.setState({
      isOpenLocationAndTagsModal: true,
    });

    if (this.state.tags === "") {
      this.setState({
        currentEnteredTags: "",
      });
    }
  };

  closeLocationAndTagsModal = () =>
    this.setState({ isOpenLocationAndTagsModal: false });

  addImages = () => {
    this.setState({
      imageFiles: this.state.currentChosenImageFiles,
    });
    this.closeImagesModal();
  };

  cancelImages = () => {
    this.setState({
      imageFiles: [],
    });
    this.closeImagesModal();
  };

  getUploadedImages = (images) => {
    this.setState({
      currentChosenImageFiles: images,
    });
  };

  addLocationAndTags = () => {
    this.setState({
      tags: this.state.currentEnteredTags,
      address: this.toLatinConvert(this.state.currentAddress),
      city: this.toLatinConvert(this.state.currentCity),
      country: this.toLatinConvert(this.state.currentCountry),
      location: this.toLatinConvert(this.state.currentLocation),
    });
    this.closeLocationAndTagsModal();
  };

  cancelLocationAndTags = () => {
    this.setState({
      tags: "",
      address: "",
      city: "",
      country: "",
      location: "Enter location",
    });
    this.closeLocationAndTagsModal();
  };

  addPost = async () => {
    if (this.state.imageFiles.length == 0) {
      this.handleClickSnackBarError("You have to choose image first!");
    } else {
      let tagsList = [];
      for (var tag of this.state.tags.split("#")) {
        if (tag.length !== 0) {
          tagsList.push(tag.split(" ").join(""));
        }
      }

      let publisher = AuthService.getCurrentUser();
      let resStatus = 0;

      PostService.insert(
        this.state.imageFiles,
        this.state.address,
        this.state.city,
        this.state.country,
        tagsList,
        this.state.description,
        publisher
      )
        .then((res) => {
          resStatus = res.status;
          return res.json();
        })
        .then((result) => {
          if (resStatus === 200) {
            this.handleClickSnackBarSuccess("Post is successfully published!");
            this.getPostsWithCampaigns();
            NotificationService.sendPostNotification(
              1,
              AuthService.getCurrentUser().id
            );
          }
          return result;
        });

      this.setState({
        imageFiles: [],
        location: "Enter location",
        tags: "",
        description: "",
      });
    }
  };

  updatePosts = async (updatedPosts) => {
    await this.setState({
      posts: updatedPosts,
    });
  };

  handleClickSnackBarError = (message) => {
    this.setState({
      openSnackError: true,
      messageError: message,
    });
  };

  handleClickSnackBarSuccess = (message) => {
    this.setState({
      openSnackSuccess: true,
      messageSuccess: message,
    });
  };

  handleCloseSnackBarError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({
      openSnackError: false,
    });
  };

  handleCloseSnackBarSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({
      openSnackSuccess: false,
    });
  };

  render() {
    const imagesModalDialog = (
      <Modal
        show={this.state.isOpenImagesModal}
        onHide={this.closeImagesModal}
        style={{ marginTop: "120px", minHeight: "560px", overflow: "hidden" }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ marginLeft: "38px" }}>
            Single or multiple file selection
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              overflow: "auto",
              height: "350px",
            }}
          >
            <UploadImages
              uploadedImages={this.getUploadedImages.bind(this)}
              valueFromParent={this.state.imageFiles}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={this.cancelImages}>
            Cancel
          </Button>
          <Button variant="success" onClick={this.addImages}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    );

    const tagsAndLocationModalDialog = (
      <Modal
        show={this.state.isOpenLocationAndTagsModal}
        onHide={this.closeLocationAndTagsModal}
        style={{ marginTop: "120px", minHeight: "560px", overflow: "hidden" }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ marginLeft: "70px" }}>
            Location and tags entering
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              overflow: "auto",
              height: "350px",
            }}
          >
            <form>
              <div className="form-group">
                <label style={{ marginLeft: "40%" }}>
                  <b>Location</b>
                </label>
                <AlgoliaPlaces
                  placeholder={this.state.location}
                  options={{
                    appId: "plQ4P1ZY8JUZ",
                    apiKey: "bc14d56a6d158cbec4cdf98c18aced26",
                    language: "en",
                    type: ["city", "address"],
                  }}
                  onChange={({ suggestion }) => {
                    if (suggestion.city === undefined) {
                      suggestion.city = suggestion.name;
                      suggestion.name = "";
                    }

                    this.setState({
                      currentAddress: suggestion.name,
                      currentCity: suggestion.city,
                      currentCountry: suggestion.country,
                      currentLocation: suggestion.value,
                    });
                  }}
                  onClear={() => {
                    this.setState({
                      address: "",
                      city: "",
                      country: "",
                      location: "Enter location",
                    });
                  }}
                />
              </div>
              <br />
              <label style={{ marginLeft: "43%" }}>
                <b>Tags</b>
              </label>
              <textarea
                name="currentEnteredTags"
                type="text"
                checked={this.state.currentEnteredTags}
                onChange={this.handleInputChange}
                rows="4"
                className="form-control"
                placeholder="Enter tags - each tag must begin with # (e.g. #cat#dog)"
                value={this.state.currentEnteredTags}
              ></textarea>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={this.cancelLocationAndTags}>
            Cancel
          </Button>
          <Button variant="success" onClick={this.addLocationAndTags}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    );

    const snackbarError = (
      <Snackbar
        open={this.state.openSnackError}
        autoHideDuration={2500}
        onClose={this.handleCloseSnackBarError}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={this.handleCloseSnackBarError} severity="error">
          {this.state.messageError}
        </Alert>
      </Snackbar>
    );

    const snackbarSuccess = (
      <Snackbar
        open={this.state.openSnackSuccess}
        autoHideDuration={2500}
        onClose={this.handleCloseSnackBarSuccess}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={this.handleCloseSnackBarSuccess} severity="success">
          {this.state.messageSuccess}
        </Alert>
      </Snackbar>
    );

    return (
      <div>
        {imagesModalDialog}
        {tagsAndLocationModalDialog}
        {snackbarError}
        {snackbarSuccess}
        <div class="container">
          <div class="no-page-title">
            <div id="main-wrapper">
              <div class="row">
                <div class="col-lg-7 col-xl-8">
                  <div class="card card-white grid-margin">
                    <div class="card-body">
                      <div class="post">
                        <textarea
                          name="description"
                          type="text"
                          checked={this.state.description}
                          onChange={this.handleInputChange}
                          className="form-control"
                          value={this.state.description}
                          class="form-control"
                          placeholder="Enter description for post"
                          rows="4"
                          style={{ marginLeft: "15px", maxWidth: "625px" }}
                        ></textarea>
                        <div class="post-options">
                          <button
                            class="btn btn-outline-primary float-left"
                            onClick={this.openImagesModal}
                          >
                            <i class="fa fa-camera"></i>
                            <span style={{ marginLeft: "10px" }}>
                              Add files
                            </span>
                          </button>
                          <button
                            class="btn btn-outline-primary"
                            style={{
                              marginLeft: "20px",
                            }}
                            onClick={this.openLocationAndTagsModal}
                          >
                            <i class="fa fa-info"></i>
                            <span style={{ marginLeft: "10px" }}>
                              Add more info
                            </span>
                          </button>
                          <button
                            class="btn btn-outline-success float-right"
                            onClick={this.addPost}
                          >
                            Post
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <PostCard
                    sendPosts={this.state.posts}
                    updatePost={this.updatePosts.bind(this)}
                  />
                </div>
                <div class="col-lg-12 col-xl-4">
                  <div class="card card-white grid-margin">
                    <div class="card-heading clearfix">
                      <h4 class="card-title">Suggestions For You</h4>
                    </div>
                    <ul class="friend-list">
                      <li>
                        <div class="left">
                          <img
                            src="https://bootdey.com/img/Content/avatar/avatar1.png"
                            alt=""
                          />
                        </div>
                        <div class="right">
                          <h3>joca_joca</h3>
                          <p>9 Friends</p>
                        </div>
                        <div class="right">
                          <button
                            type="button"
                            class="btn btn-link"
                            style={{ marginLeft: "80%" }}
                          >
                            Follow
                          </button>
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
                          <h3>marko_m</h3>
                          <p>11 Friends</p>
                        </div>
                        <div class="right">
                          <button
                            type="button"
                            class="btn btn-link"
                            style={{ marginLeft: "80%" }}
                          >
                            Follow
                          </button>
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
                          <h3>jelenaa_n</h3>
                          <p>15 Friends</p>
                        </div>
                        <div class="right">
                          <button
                            type="button"
                            class="btn btn-link"
                            style={{ marginLeft: "80%" }}
                          >
                            Follow
                          </button>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div class="page-footer">
              <p>Copyright ?? 2021.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
