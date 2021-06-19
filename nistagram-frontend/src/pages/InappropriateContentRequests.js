import React, { Component } from "react";
import ProfileVerificationRequestService from "../services/ProfileVerificationRequestService";
import { Button, Modal } from "react-bootstrap";

export default class InappropriateContentRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: [],
      isOpenInappropriateContentDeletingModal: false,
      isOpenDeactivateUserModal: false,
      isOpenInappropriateContentModal: false,
      imageSrc: "",
      open: false,
      message: "",
      snackbarType: "success",
      inappropriateContent: null,
    };
  }

  componentDidMount() {
    this.getAllProfileVerificationRequests();
  }

  getAllProfileVerificationRequests = () => {
    ProfileVerificationRequestService.getAllProfileVerificationRequests()
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({ requests: data });
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

  openInappropriateContentModal = (inappropriateContent) => {
    this.setState({
      isOpenInappropriateContentModal: true,
      inappropriateContent: inappropriateContent,
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

  deleteInappropriateContent = () => {
    this.closeInappropriateContentDeletingModal();
    // ProfileVerificationRequestService.acceptRequest(requestId)
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((data) => {
    //     this.getAllProfileVerificationRequests();
    //   });
  };

  deactivateUser = () => {
    this.closeDeactivateUserModal();
    // ProfileVerificationRequestService.rejectRequest(requestId)
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((data) => {
    //     this.getAllProfileVerificationRequests();
    //   });
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
          <div
            style={{
              marginLeft: "75px",
            }}
          ></div>
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

    const tableRows = this.state.requests.map((inappripriateContent, key) => {
      return (
        <tr id={key}>
          <td style={{ textAlign: "center" }}>
            {/* {inappripriateContent.sender.username} */}
          </td>
          <td style={{ textAlign: "center" }}>
            {/* {inappripriateContent.reportComment} */}
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
                    </div>
                  </div>
                );
              } else {
                //inappripriateContent.accepted = true;
                if (inappripriateContent.accepted) {
                  return (
                    <div>
                      {" "}
                      <b
                        class="text-success mr-4"
                        style={{ marginLeft: "25px" }}
                      >
                        {" "}
                        Accepted
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
                        {" "}
                        Rejected
                      </b>
                    </div>
                  );
                }
              }
            })()}
          </td>
        </tr>
      );
    });

    return (
      <div>
        {deleteInappropriateContentModal}
        {deactivateUserModal}
        {inappropriateContentDialog}
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
