import React, { Component } from "react";
import "../../assets/styles/posts.css";
import { Button, Modal } from "react-bootstrap";
import UploadImage from "./UploadImage";

export default class Posts extends Component {
  constructor(props) {
    super(props);
    this.dropdownRef = React.createRef();
    this.state = {
      isDislike: false,
      isLike: false,
      isSaved: false,
      isActive: false,
      isOpenImagesInfoModal: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
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

  openImagesModal = () => this.setState({ isOpenImagesInfoModal: true });

  closeImagesModal = () => this.setState({ isOpenImagesInfoModal: false });

  parentFunction = (data_from_child) => {
    console.log(data_from_child);
  };

  render() {
    const isDislike = this.state.isDislike;
    const isLike = this.state.isLike;
    const isSaved = this.state.isSaved;
    const dropdownRef = this.dropdownRef;
    const isActive = this.state.isActive;

    const imagesModalDialog = (
      <Modal
        show={this.state.isOpenImagesInfoModal}
        onHide={this.closeImagesModal}
        style={{ marginTop: "120px", minHeight: "560px", overflow: "hidden" }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ marginLeft: "20px" }}>
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
            <UploadImage />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.closeImagesModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );

    return (
      <div>
        {imagesModalDialog}
        <div class="container">
          <div class="no-page-title">
            <div id="main-wrapper">
              <div class="row">
                <div class="col-lg-7 col-xl-8">
                  <div class="card card-white grid-margin">
                    <div class="card-body">
                      <div class="post">
                        <textarea
                          class="form-control"
                          placeholder="Add a description for post"
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
                          <button class="btn btn-outline-primary float-right">
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
