import React, { Component } from "react";
import "../assets/styles/profile.css";
import { Link, useHistory } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { BookmarkBorder } from "@material-ui/icons";
import "../assets/styles/posts.css";

export default class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.dropdownRef = React.createRef();
    this.state = {
      isOpenFollowersModal: false,
      isOpenFollowingModal: false,
      isDislike: false,
      isLike: false,
      isSaved: false,
      isActive: false,
      followers: [
        { username: "username1" },
        { username: "username2" },
        { username: "username3" },
      ],
    };
    this.handleClick = this.handleClick.bind(this);
  }

  openFollowersModal = () => this.setState({ isOpenFollowersModal: true });
  closeFollowersModal = () => this.setState({ isOpenFollowersModal: false });
  openFollowingModal = () => this.setState({ isOpenFollowingModal: true });
  closeFollowingModal = () => this.setState({ isOpenFollowingModal: false });

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

  render() {
    const isDislike = this.state.isDislike;
    const isLike = this.state.isLike;
    const isSaved = this.state.isSaved;
    const dropdownRef = this.dropdownRef;
    const isActive = this.state.isActive;
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
                      <div class="text-muted fs-13px">North Raundspic</div>
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
                      <div class="text-muted fs-13px">North Raundspic</div>
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
                        <span class="profile-name">username</span>
                      </div>
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
                          class="feather feather-user mr-1 icon-md"
                        >
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        <Link
                          class="pt-1px d-none d-md-block"
                          onClick={this.openFollowersModal}
                        >
                          Followers <span class="text-muted tx-12">2,765</span>
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
                          Following <span class="text-muted tx-12">1,765</span>
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
                        <BookmarkBorder />
                        <a class="pt-1px d-none d-md-block" href="#">
                          Saved
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="row profile-body">
              <div class="d-none d-md-block col-md-4 col-xl-3 left-wrapper">
                <div class="card rounded">
                  <div class="card-body">
                    <div class="d-flex align-items-center justify-content-between mb-2">
                      <h6 class="card-title mb-0">Bio</h6>
                    </div>
                    <p>I'm Amiah the Senior UI Designer at Vibrant.</p>
                    <div class="mt-3">
                      <label class="tx-11 font-weight-bold mb-0 text-uppercase">
                        Name:
                      </label>
                      <p class="text-muted">Petar Petrovic</p>
                    </div>
                    <div class="mt-3">
                      <label class="tx-11 font-weight-bold mb-0 text-uppercase">
                        Website:
                      </label>
                      <p class="text-muted">www.mysite.com</p>
                    </div>
                    <div class="mt-3">
                      <label class="tx-11 font-weight-bold mb-0 text-uppercase">
                        Email:
                      </label>
                      <p class="text-muted">name.surname@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-8 col-xl-6 middle-wrapper">
                <div class="row">
                  <div class="col-md-12 grid-margin">
                    {/* <div class="card rounded">
                      <div class="card-header">
                        <div class="d-flex align-items-center justify-content-between">
                          <div class="d-flex align-items-center">
                            <img
                              class="img-xs rounded-circle"
                              src="https://bootdey.com/img/Content/avatar/avatar6.png"
                              alt=""
                            />
                            <div class="ml-3">
                              <p>Mike Popescu</p>
                              <p class="tx-11 text-muted">1 min ago</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="card-body">
                        <p class="mb-3 tx-14">
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Accusamus minima delectus nemo unde quae
                          recusandae assumenda.
                        </p>
                        <img
                          class="img-fluid"
                          src="https://bootdey.com/img/Content/avatar/avatar6.png"
                          alt=""
                        />
                      </div>
                      <div class="card-footer">
                        <div class="d-flex post-actions">
                          <a
                            href="javascript:;"
                            class="d-flex align-items-center text-muted mr-4"
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
                              class="feather feather-heart icon-md"
                            >
                              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                            <p class="d-none d-md-block ml-2">Like</p>
                          </a>
                          <a
                            href="javascript:;"
                            class="d-flex align-items-center text-muted mr-4"
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
                              class="feather feather-message-square icon-md"
                            >
                              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                            </svg>
                            <p class="d-none d-md-block ml-2">Comment</p>
                          </a>
                          <a
                            href="javascript:;"
                            class="d-flex align-items-center text-muted"
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
                              class="feather feather-share icon-md"
                            >
                              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                              <polyline points="16 6 12 2 8 6"></polyline>
                              <line x1="12" y1="2" x2="12" y2="15"></line>
                            </svg>
                            <p class="d-none d-md-block ml-2">Share</p>
                          </a>
                        </div>
                      </div>
                    </div> */}
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
                                  Elavita veritatis et quasi architecto beatae
                                  vitae dicta sunt explicabo. Nemo enim ipsam
                                  voluptatem quia voluptas sit aspernatur aut
                                  odit aut fugit, sed quia consequuntur.
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
                                      Coluptate velit esse cillum dolore eu
                                      fugiat nulla pariatur. Excepteur sint
                                      occaecat cupidatat non proident, sunt in
                                      culpa qui officia.
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
        </div>
      </div>
    );
  }
}
