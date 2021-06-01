import React, { Component } from "react";
import "../../assets/styles/posts.css";
import { Button, Modal } from "react-bootstrap";
import UloadImages from "./UloadImages";
import AlgoliaPlaces from "algolia-places-react";
import PostService from "../../services/PostService";
import AuthService from "../../services/AuthService";

export default class Posts extends Component {
  constructor(props) {
    super(props);
    this.dropdownRef = React.createRef();
    this.state = {
      isDislike: false,
      isLike: false,
      isSaved: false,
      isActive: false,
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
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);

    const script = document.createElement("script");
    script.async = true;
    script.src = "../helpers/cyrillicToLatin.min.js";
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  toLatinConvert(string) {
    var cyrillic =
      "А_Б_В_Г_Д_Ђ_Е_Ё_Ж_З_И_Й_Ј_К_Л_Љ_М_Н_Њ_О_П_Р_С_Т_Ћ_У_Ф_Х_Ц_Ч_Џ_Ш_Щ_Ъ_Ы_Ь_Э_Ю_Я_а_б_в_г_д_ђ_е_ё_ж_з_и_й_ј_к_л_љ_м_н_њ_о_п_р_с_т_ћ_у_ф_х_ц_ч_џ_ш_щ_ъ_ы_ь_э_ю_я".split(
        "_"
      );
    var latin =
      "A_B_V_G_D_Đ_E_Ë_Ž_Z_I_J_J_K_L_Lj_M_N_Nj_O_P_R_S_T_Ć_U_F_H_C_Č_Dž_Š_Ŝ_ʺ_Y_ʹ_È_Û_Â_a_b_v_g_d_đ_e_ë_ž_z_i_j_j_k_l_lj_m_n_nj_o_p_r_s_t_ć_u_f_h_c_č_dž_š_ŝ_ʺ_y_ʹ_è_û_â".split(
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

  addPost = () => {
    console.log("Images:", this.state.imageFiles);
    console.log("Location:", this.state.location);
    console.log("Address:", this.state.address);
    console.log("City:", this.state.city);
    console.log("Country:", this.state.country);
    console.log("Tags:", this.state.tags);
    console.log("Description:", this.state.description);

    if (this.state.imageFiles.length == 0) {
      // Zabrani dodavanje posta
      // Napisi obavestenje da je slika obavezna za izbacivanje posta
    } else {
      let tagsList = [];
      for (var tag of this.state.tags.split("#")) {
        if (tag.length !== 0) {
          tagsList.push(tag.split(" ").join(""));
        }
      }
      console.log(tagsList);

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
            console.log(result);
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

  render() {
    const isDislike = this.state.isDislike;
    const isLike = this.state.isLike;
    const isSaved = this.state.isSaved;
    const dropdownRef = this.dropdownRef;
    const isActive = this.state.isActive;

    const imagesModalDialog = (
      <Modal
        show={this.state.isOpenImagesModal}
        onHide={this.closeImagesModal}
        style={{ marginTop: "120px", minHeight: "560px", overflow: "hidden" }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ marginLeft: "30px" }}>
            Single or multiple image selection
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              overflow: "auto",
              height: "350px",
            }}
          >
            <UloadImages
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

    return (
      <div>
        {imagesModalDialog}
        {tagsAndLocationModalDialog}
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
                              Add images
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
                                Elavita veritatis et quasi architecto beatae
                                vitae dicta sunt explicabo. Nemo enim ipsam
                                voluptatem quia voluptas sit aspernatur aut odit
                                aut fugit, sed quia consequuntur.
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
                                      paddingLeft: "20px",
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
                                    Xullamco laboris nisi ut aliquip ex ea
                                    commodo consequat.
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
                                    Xullamco laboris nisi ut aliquip ex ea
                                    commodo consequat.
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
                                    Xullamco laboris nisi ut aliquip ex ea
                                    commodo consequat.
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
                          <h3>John Doe</h3>
                          <p>10 Friends</p>
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
                            src="https://bootdey.com/img/Content/avatar/avatar1.png"
                            alt=""
                          />
                        </div>
                        <div class="right">
                          <h3>John Doe</h3>
                          <p>10 Friends</p>
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
                            src="https://bootdey.com/img/Content/avatar/avatar1.png"
                            alt=""
                          />
                        </div>
                        <div class="right">
                          <h3>John Doe</h3>
                          <p>10 Friends</p>
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
              <p>Copyright © 2021.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
