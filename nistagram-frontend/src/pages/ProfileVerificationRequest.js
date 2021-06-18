import React, { Component } from "react";
import ProfileVerificationRequestService from "../services/ProfileVerificationRequestService";
import { Button, Modal } from "react-bootstrap";

export default class ProfileVerificationRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: [],
      isOpenImageModal: false,
      imageSrc: "",
      open: false,
      message: "",
      snackbarType: "success",
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

  openImageModal = (imageSrc) => {
    this.setState({
      isOpenImageModal: true,
      imageSrc: imageSrc,
    });
  };

  closeImageModal = () => this.setState({ isOpenImageModal: false });

  acceptRequest = (requestId) => {
    ProfileVerificationRequestService.acceptRequest(requestId)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.getAllProfileVerificationRequests();
      });
  };

  rejectRequest = (requestId) => {
    ProfileVerificationRequestService.rejectRequest(requestId)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.getAllProfileVerificationRequests();
      });
  };

  render() {
    const imageModal = (
      <Modal
        show={this.state.isOpenImageModal}
        onHide={this.closeImageModal}
        style={{
          marginTop: "120px",
          minHeight: "560px",
          overflow: "hidden",
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ marginLeft: "55px" }}>
            Image from official document
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              overflow: "auto",
              minHeight: "250px",
            }}
          >
            <img
              src={this.state.imageSrc}
              alt=""
              width="450px"
              class="rounded-sm ml-n2"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.closeImageModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );

    const tableRows = this.state.requests.map((request, key) => {
      return (
        <tr id={key}>
          <td style={{ textAlign: "center" }}>{request.username}</td>
          <td style={{ textAlign: "center" }}>{request.firstName}</td>
          <td style={{ textAlign: "center" }}>{request.lastName}</td>
          <td style={{ textAlign: "center" }}>{request.categoryName}</td>
          <td style={{ textAlign: "center" }}>
            <button
              type="button"
              onClick={() => {
                this.openImageModal(request.imageSrc);
              }}
              class="btn btn-outline-primary btn-sm"
              style={{
                width: "120px",
                fontSize: "17px",
              }}
            >
              Show image
            </button>
          </td>
          <td style={{ textAlign: "center" }}>
            {(() => {
              //request.processed = true;
              if (!request.processed) {
                return (
                  <div>
                    <div class="action" style={{ marginLeft: "25px" }}>
                      <a
                        href="javascript:void(0)"
                        onClick={() => {
                          this.acceptRequest(request.id);
                        }}
                        class="text-success mr-4"
                        data-toggle="tooltip"
                        data-placement="top"
                        title=""
                        data-original-title="Edit"
                      >
                        <i class="fa fa-check"></i>
                      </a>
                      <a
                        href="javascript:void(0)"
                        onClick={() => {
                          this.rejectRequest(request.id);
                        }}
                        class="text-danger mr-4"
                        data-toggle="tooltip"
                        data-placement="top"
                        title=""
                        data-original-title="Close"
                      >
                        <i class="fa fa-times"></i>
                      </a>
                    </div>
                  </div>
                );
              } else {
                //request.accepted = true;
                if (request.accepted) {
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
        {imageModal}
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
                        Profile verification requests
                      </h4>
                    </div>
                    <table class="table project-table table-centered table-nowrap fixed_header">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            style={{ minWidth: "90px", textAlign: "center" }}
                          >
                            Username
                          </th>
                          <th
                            scope="col"
                            style={{ minWidth: "90px", textAlign: "center" }}
                          >
                            First name
                          </th>
                          <th
                            scope="col"
                            style={{ minWidth: "90px", textAlign: "center" }}
                          >
                            Last name
                          </th>
                          <th scope="col" style={{ textAlign: "center" }}>
                            Category
                          </th>
                          <th
                            scope="col"
                            style={{ minWidth: "150px", textAlign: "center" }}
                          >
                            Image from official document
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
