import React, { Component } from "react";
import ProfileVerificationRequestService from "../services/ProfileVerificationRequestService";
import { Button, Modal } from "react-bootstrap";
import Register from "./Register.js";

export default class AgentRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: [],
      isOpenImageModal: false,
      imageSrc: "",
      open: false,
      message: "",
      snackbarType: "success",
      isOpenNewAgentModal: false,
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

  openNewAgentModal = () => {
    this.setState({ isOpenNewAgentModal: true });
  };

  closeNewAgentModal = () =>
    this.setState({
      isOpenNewAgentModal: false,
      // setuj ostale podatke iz registracije na inicijalne vrednosti
    });

  registerAgent = () => {
    // registracija
    this.closeNewAgentModal();
  };

  render() {
    const newAgentModalDialog = (
      <Modal
        show={this.state.isOpenNewAgentModal}
        onHide={this.closeNewAgentModal}
        size="lg"
        style={{ height: "720px", overflow: "hidden", marginTop: "70px" }}
      >
        {/* <Modal.Header closeButton>
          <Modal.Title style={{ marginLeft: "315px", color: "#74767a" }}>
            New agent
          </Modal.Title>
        </Modal.Header> */}
        <Modal.Body
          style={{
            overflowX: "hidden",
            overflowY: "auto",
            height: "480px",
          }}
        >
          <div
          // style={{
          //   marginLeft: "25px",
          // }}
          >
            <Register />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.closeNewAgentModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );

    const tableRows = this.state.requests.map((request, key) => {
      return (
        <tr id={key}>
          <td style={{ textAlign: "center" }}>{request.username}</td>
          <td style={{ textAlign: "center" }}>{request.fullName}</td>
          <td style={{ textAlign: "center" }}>{request.email}</td>
          <td style={{ textAlign: "center" }}>{request.website}</td>
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
                        style={{ fontSize: "20px" }}
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
                        style={{ fontSize: "20px" }}
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
        {newAgentModalDialog}
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
                          marginLeft: "110px",
                          color: "#74767a",
                          paddingBottom: "20px",
                        }}
                      >
                        Agent requests
                        <button
                          type="button"
                          onClick={() => {
                            this.openNewAgentModal();
                          }}
                          class="btn btn-outline-primary btn-sm"
                          style={{
                            width: "120px",
                            fontSize: "17px",
                            float: "right",
                          }}
                        >
                          New agent
                        </button>
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
                            Full name
                          </th>
                          <th
                            scope="col"
                            style={{ minWidth: "90px", textAlign: "center" }}
                          >
                            Email address
                          </th>
                          <th
                            scope="col"
                            style={{ minWidth: "90px", textAlign: "center" }}
                          >
                            Website
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
