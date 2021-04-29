import React, { Component } from "react";
import "../../assets/styles/posts.css";

export default class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDislike: false,
      isLike: false,
    };
  }

  render() {
    const isDislike = this.state.isDislike;
    const isLike = this.state.isLike;
    return (
      <div>
        <div class="container">
          <div class="page-inner no-page-title">
            <div id="main-wrapper">
              <div class="row">
                <div class="col-lg-7 col-xl-8">
                  <div class="card card-white grid-margin">
                    <div class="card-body">
                      <div class="post">
                        <textarea
                          class="form-control"
                          placeholder="Post"
                          rows="4"
                        ></textarea>
                        <div class="post-options">
                          <a href="#">
                            <i class="fa fa-camera"></i>
                          </a>
                          <a href="#">
                            <i class="fas fa-video"></i>
                          </a>
                          <a href="#">
                            <i class="fa fa-music"></i>
                          </a>
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
