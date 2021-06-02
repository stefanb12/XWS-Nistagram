import React, { Component } from "react";
import noPostsYet from "../../assets/images/no_posts_yet.jpg";
import moment from "moment";
import AuthService from "../../services/AuthService";
import { Link, withRouter } from "react-router-dom";

class PostCard extends Component {
  constructor(props) {
    super(props);
    this.dropdownRef = React.createRef();
    this.state = {
      isDislike: false,
      isLike: false,
      isSaved: false,
      isActive: false,
      newComment: "",
      currentUser: null,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    this.setState({
      currentUser: AuthService.getCurrentUser(),
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

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  postNewComment = () => {};

  render() {
    const isDislike = this.state.isDislike;
    const isLike = this.state.isLike;
    const isSaved = this.state.isSaved;
    const dropdownRef = this.dropdownRef;
    const isActive = this.state.isActive;
    const posts = this.props.sendPosts;

    return (
      <div>
        {(() => {
          if (Array.isArray(posts) && posts.length) {
            return (
              <div>
                {posts.map((post, key) => {
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
                                    {post.publisher.username}{" "}
                                    <small>
                                      {moment(
                                        moment(post.publishingDate).format(
                                          "YYYY-MM-DD HH:mm:ss"
                                        )
                                      ).fromNow()}
                                    </small>
                                  </p>
                                  <p>
                                    <small>
                                      {(() => {
                                        if (post.location.address === "") {
                                          return (
                                            <div>
                                              {post.location.city},{" "}
                                              {post.location.country}{" "}
                                            </div>
                                          );
                                        } else {
                                          return (
                                            <div>
                                              {post.location.address},{" "}
                                              {post.location.city},{" "}
                                              {post.location.country}{" "}
                                            </div>
                                          );
                                        }
                                      })()}
                                    </small>
                                  </p>
                                </div>
                                {(() => {
                                  if (this.state.currentUser !== null) {
                                    return (
                                      <div>
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
                                              <circle
                                                cx="12"
                                                cy="12"
                                                r="1"
                                              ></circle>
                                              <circle
                                                cx="19"
                                                cy="12"
                                                r="1"
                                              ></circle>
                                              <circle
                                                cx="5"
                                                cy="12"
                                                r="1"
                                              ></circle>
                                            </svg>
                                          </button>
                                          <nav
                                            className={`menu ${
                                              isActive ? "active" : "inactive"
                                            }`}
                                          >
                                            <ul>
                                              <li>
                                                <Link
                                                  to="/user/profile"
                                                  params={{
                                                    profileId:
                                                      post.publisher.id,
                                                  }}
                                                >
                                                  View profile
                                                </Link>
                                              </li>
                                              <li>
                                                <a href="/user/home">Report</a>
                                              </li>
                                            </ul>
                                          </nav>
                                        </div>
                                      </div>
                                    );
                                  }
                                })()}

                                <div class="timeline-item-post">
                                  <img
                                    class="img-thumbnail"
                                    src={post.imagesSrc[0]}
                                    alt=""
                                  />
                                  {(() => {
                                    if (
                                      post.description !== null &&
                                      Array.isArray(post.tags)
                                    ) {
                                      let tags = "";
                                      {
                                        post.tags.map((tag, key) => {
                                          tags += "#" + tag;
                                        });
                                      }

                                      return (
                                        <div>
                                          <p style={{ marginTop: "20px" }}>
                                            <i>Description: </i>
                                            {post.description}
                                          </p>
                                          <p style={{ marginTop: "20px" }}>
                                            <i>Tags: </i>
                                            {tags}
                                          </p>
                                        </div>
                                      );
                                    } else if (
                                      post.description !== null &&
                                      !Array.isArray(post.tags)
                                    ) {
                                      return (
                                        <div>
                                          <p style={{ marginTop: "20px" }}>
                                            <i>Description: </i>
                                            {post.description}
                                          </p>
                                        </div>
                                      );
                                    } else if (
                                      post.description === null &&
                                      Array.isArray(post.tags)
                                    ) {
                                      let tags = "";
                                      {
                                        post.tags.map((tag, key) => {
                                          tags += "#" + tag;
                                        });
                                      }

                                      return (
                                        <div>
                                          <p style={{ marginTop: "20px" }}>
                                            <i>Tags: </i>
                                            {tags}
                                          </p>
                                        </div>
                                      );
                                    }
                                  })()}

                                  <div class="timeline-options">
                                    <a href="#">
                                      <i
                                        class={
                                          isLike
                                            ? "fa fa-heart"
                                            : "fa fa-heart-o"
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
                                    {(() => {
                                      if (this.state.currentUser !== null) {
                                        return (
                                          <div>
                                            <a
                                              href="#"
                                              style={{ float: "right" }}
                                            >
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
                                        );
                                      }
                                    })()}
                                  </div>
                                  <div class="comments">
                                    {(() => {
                                      if (
                                        Array.isArray(post.comments) ||
                                        post.comments !== null
                                      ) {
                                        return (
                                          <div>
                                            {post.comments.map(
                                              (comment, key) => {
                                                return (
                                                  <div key={key}>
                                                    <div class="timeline-comment">
                                                      <div class="timeline-comment-header">
                                                        <img
                                                          src="https://bootdey.com/img/Content/avatar/avatar7.png"
                                                          alt=""
                                                        />
                                                        <p>
                                                          {
                                                            comment.publisher
                                                              .username
                                                          }
                                                          <small
                                                            style={{
                                                              marginLeft:
                                                                "10px",
                                                            }}
                                                          >
                                                            {moment(
                                                              moment(
                                                                comment.date
                                                              ).format(
                                                                "YYYY-MM-DD HH:mm:ss"
                                                              )
                                                            ).fromNow()}
                                                          </small>
                                                        </p>
                                                      </div>
                                                      <p class="timeline-comment-text">
                                                        {comment.text}
                                                      </p>
                                                    </div>
                                                  </div>
                                                );
                                              }
                                            )}
                                          </div>
                                        );
                                      } else {
                                        return (
                                          <div>
                                            There are currently no comments...
                                          </div>
                                        );
                                      }
                                    })()}
                                  </div>
                                  {(() => {
                                    if (this.state.currentUser !== null) {
                                      return (
                                        <div>
                                          <textarea
                                            name="newComment"
                                            type="text"
                                            checked={this.state.newComment}
                                            onChange={this.handleInputChange}
                                            value={this.state.newComment}
                                            class="form-control"
                                            placeholder="Enter new comment"
                                            rows="2"
                                            style={{
                                              marginTop: "20px",
                                            }}
                                          />
                                          <button
                                            class="btn btn-outline-success float-right"
                                            onClick={this.postNewComment}
                                            style={{
                                              marginTop: "20px",
                                            }}
                                          >
                                            Post a comment
                                          </button>
                                        </div>
                                      );
                                    }
                                  })()}
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
          } else {
            return (
              <div>
                <div class="profile-timeline">
                  <ul class="list-unstyled">
                    <li class="timeline-item">
                      <div class="card card-white grid-margin">
                        <div class="card-body">
                          <div class="timeline-item-header"></div>

                          <div class="timeline-item-post">
                            <img
                              class="img-thumbnail"
                              src={noPostsYet}
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            );
          }
        })()}
      </div>
    );
  }
}

export default withRouter(PostCard);
