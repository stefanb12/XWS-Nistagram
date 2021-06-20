import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import InappropriateContentService from "../services/InappropriateContentService";
import PostService from "../services/PostService";
import PostCard from "../components/home-page/PostCard";
import moment from "moment";
import StoryService from "../services/StoryService";
import ProfileService from "../services/ProfileService";

export default class InappropriateContentRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inappropriateContents: [],
      isOpenInappropriateContentDeletingModal: false,
      isOpenDeactivateUserModal: false,
      isOpenInappropriateContentModal: false,
      isOpenRejectRequestModal: false,
      imageSrc: "",
      open: false,
      message: "",
      snackbarType: "success",
      posts: [],
      story: null,
      inappropriateContent: null,
    };
  }

  componentDidMount() {
    this.getAllInappropriateRequests();
  }

  getAllInappropriateRequests = () => {
    InappropriateContentService.getAll()
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({ inappropriateContents: data });
      });
  };

  openInappropriateContentDeletingModal = (inappropriateContent) => {
    this.setState({
      isOpenInappropriateContentDeletingModal: true,
      inappropriateContent: inappropriateContent,
    });
  };

  closeInappropriateContentDeletingModal = () =>
    this.setState({
      isOpenInappropriateContentDeletingModal: false,
      inappropriateContent: null,
    });

  openInappropriateContentModal = async (inappropriateContent) => {
    if (inappropriateContent.isPost) {
      await PostService.getById(inappropriateContent.postId)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          this.setState({
            posts: data,
            inappropriateContent: inappropriateContent,
          });
        });
    } else {
      await StoryService.getById(inappropriateContent.storyId)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          this.setState({
            story: data,
            inappropriateContent: inappropriateContent,
          });
        });
    }

    this.setState({
      isOpenInappropriateContentModal: true,
    });
  };

  closeInappropriateContentModal = () =>
    this.setState({
      isOpenInappropriateContentModal: false,
      inappropriateContent: null,
    });

  openDeactivateUserModal = (inappropriateContent) => {
    this.setState({
      isOpenDeactivateUserModal: true,
      inappropriateContent: inappropriateContent,
    });
  };

  closeDeactivateUserModal = () =>
    this.setState({
      isOpenDeactivateUserModal: false,
      inappropriateContent: null,
    });

  openRejectRequestModal = (inappropriateContent) => {
    this.setState({
      isOpenRejectRequestModal: true,
      inappropriateContent: inappropriateContent,
    });
  };

  closeRejectRequestModal = () =>
    this.setState({
      isOpenRejectRequestModal: false,
      inappropriateContent: null,
    });

  deleteInappropriateContent = async () => {
    this.closeInappropriateContentDeletingModal();
    let inappropriateContentId = this.state.inappropriateContent.id;

    if (this.state.inappropriateContent.isPost) {
      await PostService.deletePost(this.state.inappropriateContent.postId)
        .then((res) => {
          return res.json();
        })
        .then(async (data) => {
          await InappropriateContentService.deleteInappropriateContent(
            inappropriateContentId
          )
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              const index = this.state.inappropriateContents.findIndex(
                (p) => p.id === inappropriateContentId
              );
              const updatedInappropriateContents = [
                ...this.state.inappropriateContents,
              ];
              updatedInappropriateContents[index] = data;
              this.setState({
                inappropriateContents: updatedInappropriateContents,
              });
            });
        });
    } else {
      await StoryService.deleteStory(this.state.inappropriateContent.storyId)
        .then((res) => {
          return res.json();
        })
        .then(async (data) => {
          await InappropriateContentService.deleteInappropriateContent(
            inappropriateContentId
          )
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              const index = this.state.inappropriateContents.findIndex(
                (p) => p.id === inappropriateContentId
              );
              const updatedInappropriateContents = [
                ...this.state.inappropriateContents,
              ];
              updatedInappropriateContents[index] = data;
              this.setState({
                inappropriateContents: updatedInappropriateContents,
              });
            });
        });
    }
  };

  deactivateUser = async () => {
    this.closeDeactivateUserModal();
    let inappropriateContentId = this.state.inappropriateContent.id;
    let publisherId = 0;

    if (this.state.inappropriateContent.isPost) {
      await PostService.getById(this.state.inappropriateContent.postId)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          publisherId = data[0].publisher.id;
          this.deactivateRequest(inappropriateContentId, publisherId);
        });
    } else {
      await StoryService.getById(this.state.inappropriateContent.storyId)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          publisherId = data[0].publisher.id;
          this.deactivateRequest(inappropriateContentId, publisherId);
        });
    }
  };

  deactivateRequest = async (inappropriateContentId, publisherId) => {
    await ProfileService.deactivate(publisherId)
      .then((res) => {
        return res.json();
      })
      .then(async (data) => {
        await InappropriateContentService.deactivateProfile(
          inappropriateContentId
        )
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            const index = this.state.inappropriateContents.findIndex(
              (p) => p.id === inappropriateContentId
            );
            const updatedInappropriateContents = [
              ...this.state.inappropriateContents,
            ];
            updatedInappropriateContents[index] = data;
            this.setState({
              inappropriateContents: updatedInappropriateContents,
            });
          });
      });
  };

  rejectRequest = async () => {
    this.closeRejectRequestModal();
    let inappropriateContentId = this.state.inappropriateContent.id;

    await InappropriateContentService.rejectRequest(inappropriateContentId)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const index = this.state.inappropriateContents.findIndex(
          (p) => p.id === inappropriateContentId
        );
        const updatedInappropriateContents = [
          ...this.state.inappropriateContents,
        ];
        updatedInappropriateContents[index] = data;
        this.setState({
          inappropriateContents: updatedInappropriateContents,
        });
      });
  };

  render() {
    const deleteInappropriateContentModal = (
      <Modal
        show={this.state.isOpenInappropriateContentDeletingModal}
        onHide={this.closeInappropriateContentDeletingModal}
        style={{
          marginTop: "200px",
          height: "300px",
          overflow: "hidden",
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ marginLeft: "55px" }}>
            Deleting inappropriate content
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              textAlign: "center",
            }}
          >
            {" "}
            Are you sure you want to delete inappropriate content?
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={this.deleteInappropriateContent}>
            Delete
          </Button>
          <Button
            variant="secondary"
            onClick={this.closeInappropriateContentDeletingModal}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );

    const deactivateUserModal = (
      <Modal
        show={this.state.isOpenDeactivateUserModal}
        onHide={this.closeDeactivateUserModal}
        style={{
          marginTop: "200px",
          height: "300px",
          overflow: "hidden",
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ marginLeft: "115px" }}>
            Deactivating profile
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              textAlign: "center",
            }}
          >
            Are you sure you want to deactivate profile?
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={this.deactivateUser}>
            Deactivate
          </Button>
          <Button variant="secondary" onClick={this.closeDeactivateUserModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );

    const rejectRequestModal = (
      <Modal
        show={this.state.isOpenRejectRequestModal}
        onHide={this.closeRejectRequestModal}
        style={{
          marginTop: "200px",
          height: "300px",
          overflow: "hidden",
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ marginLeft: "140px" }}>
            Rejecting request
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              textAlign: "center",
            }}
          >
            Are you sure you want to reject request?
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={this.rejectRequest}>
            Reject
          </Button>
          <Button variant="secondary" onClick={this.closeRejectRequestModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );

    const inappropriateContentDialog = (
      <Modal
        show={this.state.isOpenInappropriateContentModal}
        onHide={this.closeInappropriateContentModal}
        size="lg"
        style={{ height: "820px", overflow: "hidden", marginTop: "50px" }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ marginLeft: "260px", color: "#74767a" }}>
            Inappropriate content
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            overflowX: "hidden",
            overflowY: "auto",
            height: "510px",
          }}
        >
          <div>
            {(() => {
              if (this.state.inappropriateContent !== null) {
                if (this.state.inappropriateContent.isPost) {
                  return (
                    <div>
                      {" "}
                      <PostCard sendPosts={this.state.posts} />
                    </div>
                  );
                } else {
                  return (
                    <div>
                      <img
                        src={this.state.story.publisherImageSrc}
                        class="img-fluid avatar avatar-medium shadow rounded-pill"
                        alt=""
                        style={{
                          width: "40px",
                          height: "40px",
                          marginLeft: "75px",
                        }}
                      />
                      <b
                        style={{
                          marginLeft: "15px",
                          fontSize: "18px",
                        }}
                      >
                        {this.state.story.publisherUsername}
                      </b>
                      <small
                        style={{
                          marginLeft: "13px",
                        }}
                      >
                        {moment(
                          moment(this.state.story.publishingDate).format(
                            "YYYY-MM-DD HH:mm:ss"
                          )
                        ).fromNow()}
                      </small>
                      <br></br>
                      <img
                        style={{
                          width: "620px",
                          height: "auto",
                          marginTop: "20px",
                          marginLeft: "75px",
                        }}
                        src={this.state.story.imageSrc}
                        class="img-thumbnail"
                      />
                    </div>
                  );
                }
              }
            })()}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={this.closeInappropriateContentModal}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );

    const tableRows = this.state.inappropriateContents.map(
      (inappripriateContent, key) => {
        return (
          <tr id={key}>
            <td style={{ textAlign: "center" }}>
              {inappripriateContent.username}
            </td>
            <td style={{ textAlign: "center" }}>
              {inappripriateContent.reportComment}
            </td>
            <td style={{ textAlign: "center" }}>
              <button
                type="button"
                onClick={() => {
                  this.openInappropriateContentModal(inappripriateContent);
                }}
                class="btn btn-outline-primary btn-sm"
                style={{
                  width: "120px",
                  fontSize: "17px",
                }}
              >
                Show
              </button>
            </td>
            <td style={{ textAlign: "center" }}>
              {(() => {
                //inappripriateContent.processed = true;
                if (!inappripriateContent.processed) {
                  return (
                    <div>
                      <div class="action" style={{ marginLeft: "25px" }}>
                        <a
                          href="javascript:void(0)"
                          onClick={() => {
                            this.openInappropriateContentDeletingModal(
                              inappripriateContent
                            );
                          }}
                          class="text-danger mr-4"
                          data-toggle="tooltip"
                          data-placement="top"
                          title=""
                          data-original-title="Edit"
                          style={{ fontSize: "20px" }}
                        >
                          <i class="fa fa-trash" aria-hidden="true"></i>
                        </a>
                        <a
                          href="javascript:void(0)"
                          onClick={() => {
                            this.openDeactivateUserModal(inappripriateContent);
                          }}
                          class="text-danger mr-4"
                          data-toggle="tooltip"
                          data-placement="top"
                          title=""
                          data-original-title="Close"
                          style={{ fontSize: "20px" }}
                        >
                          <i class="fa fa-ban"></i>
                        </a>
                        <a
                          href="javascript:void(0)"
                          onClick={() => {
                            this.openRejectRequestModal(inappripriateContent);
                          }}
                          class="text-danger mr-4"
                          data-toggle="tooltip"
                          data-placement="top"
                          title=""
                          data-original-title="Close"
                          style={{ fontSize: "20px" }}
                        >
                          <i class="fa fa-times" aria-hidden="true"></i>
                        </a>
                      </div>
                    </div>
                  );
                } else {
                  if (
                    inappripriateContent.actionTaken ===
                    "InappropriateContentDeleted"
                  ) {
                    return (
                      <div>
                        {" "}
                        <b
                          class="text-success mr-4"
                          style={{ marginLeft: "25px" }}
                        >
                          Inappropriate content - deleted
                        </b>
                      </div>
                    );
                  } else if (
                    inappripriateContent.actionTaken === "ProfileDeactivated"
                  ) {
                    return (
                      <div>
                        <b
                          class=" text-danger mr-4"
                          style={{ marginLeft: "25px" }}
                        >
                          Profile - deactivated
                        </b>
                      </div>
                    );
                  } else {
                    return (
                      <div>
                        <b
                          class=" text-danger mr-4"
                          style={{ marginLeft: "25px" }}
                        >
                          Request rejected
                        </b>
                      </div>
                    );
                  }
                }
              })()}
            </td>
          </tr>
        );
      }
    );

    return (
      <div>
        {deleteInappropriateContentModal}
        {deactivateUserModal}
        {inappropriateContentDialog}
        {rejectRequestModal}
        <div class="container" style={{ maxWidth: "90%", marginTop: "20px" }}>
          <div class="row">
            <div class="col-lg-12">
              <div class="card">
                <div class="card-body">
                  <div class="table-responsive project-list">
                    <div class="graph-star-rating-footer text-center ">
                      <h4
                        style={{
                          textAlign: "center",
                          color: "#74767a",
                          paddingBottom: "20px",
                        }}
                      >
                        Inappropriate content requests
                      </h4>
                    </div>
                    <table class="table project-table table-centered table-nowrap fixed_header">
                      <thead>
                        <tr>
                          <th scope="col" style={{ textAlign: "center" }}>
                            Sender username
                          </th>
                          <th scope="col" style={{ textAlign: "center" }}>
                            Sender comment
                          </th>
                          <th
                            scope="col"
                            style={{ minWidth: "120px", textAlign: "center" }}
                          >
                            Inappripriate content
                          </th>
                          <th scope="col" style={{ textAlign: "center" }}>
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>{tableRows}</tbody>
                    </table>
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
