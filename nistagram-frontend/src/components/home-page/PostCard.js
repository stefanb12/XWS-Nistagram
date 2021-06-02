import React, { Component } from "react";
import PostService from "../../services/PostService";

export default class PostCard extends Component {
  constructor(props) {
    super(props);
    this.dropdownRef = React.createRef();
    this.state = {
      isDislike: false,
      isLike: false,
      isSaved: false,
      isActive: false,
      publicPosts: [],
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);

    PostService.getPublicPosts()
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          publicPosts: result,
        });
      });
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
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

  render() {
    const isDislike = this.state.isDislike;
    const isLike = this.state.isLike;
    const isSaved = this.state.isSaved;
    const dropdownRef = this.dropdownRef;
    const isActive = this.state.isActive;

    return (
      <div>
        {this.state.publicPosts.map((post, key) => {
          return (
            <div key={key}>
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
                            Elavita veritatis et quasi architecto beatae vitae
                            dicta sunt explicabo. Nemo enim ipsam voluptatem
                            quia voluptas sit aspernatur aut odit aut fugit, sed
                            quia consequuntur.
                          </p>
                          <div class="timeline-options">
                            <a href="#">
                              <i
                                class={isLike ? "fa fa-heart" : "fa fa-heart-o"}
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
                                Xullamco laboris nisi ut aliquip ex ea commodo
                                consequat.
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
                                Xullamco laboris nisi ut aliquip ex ea commodo
                                consequat.
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
                                Xullamco laboris nisi ut aliquip ex ea commodo
                                consequat.
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
          );
        })}
      </div>
    );
  }
}
