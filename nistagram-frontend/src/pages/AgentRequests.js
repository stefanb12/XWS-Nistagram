import React, { Component } from "react";
import ProfileVerificationRequestService from "../services/ProfileVerificationRequestService";
import { Modal } from "react-bootstrap";
import Register from "./Register.js";
import RegistrationRequestService from "../services/RegistrationRequestService";
import * as Yup from "yup";
import { Formik } from "formik";
import AuthService from "../services/AuthService";
import { Alert } from "@material-ui/lab";
import {
  Box,
  Button, 
  Checkbox,
  Container,
  FormControlLabel,
  FormHelperText,
  Link,
  TextField,
  Typography,
  RadioGroup,
  Radio,
  Snackbar,
} from "@material-ui/core";

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
    this.getAllRegistrationRequests();
  }

  handleRegistration = async (
    fullName,
    username,
    email,
    password,
    gender,
    websiteLink
  ) => {
    let resStatus = false;
    let isAgent = true;
    await AuthService.registerUser(
      fullName,
      username,
      email,
      password,
      gender,
      isAgent,
      websiteLink
    ).then((result) => {
      if (result.status === 201) {
        this.setState({
          message : "Registration successful!",
          snackbarType: "success",
          open: true,
          isOpenNewAgentModal: false
        })
        this.getAllRegistrationRequests();
        resStatus = true;
      } else if (result.status === 400) {
        this.setState({
          message : "Profile with entered username already exists!",
          snackbarType: "error",
          open: true
        })
        resStatus = false;
      }
    });
    return resStatus;
  };

  getAllRegistrationRequests = () => {
    RegistrationRequestService.getAllRegistrationRequests()
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
    RegistrationRequestService.acceptRequest(requestId)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.getAllRegistrationRequests();
      });
  };

  rejectRequest = (requestId) => {
    RegistrationRequestService.rejectRequest(requestId)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.getAllRegistrationRequests();
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
  
  handleClose = (event, reason) => {
    this.setState({
      open: false
    })
  };

  render() {
    const newAgentModalDialog = (
      <Modal
        show={this.state.isOpenNewAgentModal}
        onHide={this.closeNewAgentModal}
        size="lg"
        style={{ height: "850px", overflow: "hidden", marginTop: "50px" }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ marginLeft: "315px", color: "#74767a" }}>
            New agent
          </Modal.Title>
        </Modal.Header> 
        <Modal.Body
          style={{
            overflowX: "hidden",
            overflowY: "auto",
            height: "560px",
          }}
        >
          <div
          // style={{
          //   marginLeft: "25px",
          // }}
          >
              <Container maxWidth="sm">
            <Formik
              initialValues={{
                username: "",
                email: "",
                fullName: "",
                password: "",
                gender: "male",
                websiteLink: ""
              }}
              validationSchema={Yup.object().shape({
                username: Yup.string().max(255).required("Username is required"),
                email: Yup.string()
                  .email("Must be a valid email")
                  .max(255)
                  .required("Email is required"),
                fullName: Yup.string()
                  .max(255)
                  .required("First name is required"),
                password: Yup.string().max(255).required("Password is required"),
                websiteLink: Yup.string().max(255).required("Website link is required")
              })}
              onSubmit={async (values) => {
                let res = await this.handleRegistration(
                  values.fullName,
                  values.username,
                  values.email,
                  values.password,
                  values.gender,
                  values.websiteLink
                );
                if (res) {
                  values.username = "";
                  values.email = "";
                  values.fullName = "";
                  values.password = "";
                  values.gender = "male";
                  values.websiteLink = "";
                }
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values,
              }) => (
                <form onSubmit={handleSubmit}>
                  <TextField
                    error={Boolean(touched.fullName && errors.fullName)}
                    fullWidth
                    helperText={touched.fullName && errors.fullName}
                    label="Full name"
                    margin="normal"
                    name="fullName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.fullName}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    label="Email Address"
                    margin="normal"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="email"
                    value={values.email}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.username && errors.username)}
                    fullWidth
                    helperText={touched.username && errors.username}
                    label="Username"
                    margin="normal"
                    name="username"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.username}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                    helperText={touched.password && errors.password}
                    label="Password"
                    margin="normal"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.password}
                    variant="outlined"
                  />
                  <RadioGroup
                    label="Password"
                    name="gender"
                    onChange={handleChange}
                    value={values.gender}
                    row
                  >
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                  </RadioGroup>
                  <TextField
                    error={Boolean(touched.websiteLink && errors.websiteLink)}
                    fullWidth
                    //disabled={!values.isAgent}
                    helperText={touched.websiteLink && errors.websiteLink}
                    label="Website link"
                    margin="normal"
                    name="websiteLink"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.websiteLink}
                    variant="outlined"
                  />
                  <Box sx={{ py: 2 }}>
                    <Button
                      color="primary"
                      //disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Register
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </Container>
          </div>
        </Modal.Body>
        

      </Modal>
    );

    const tableRows = this.state.requests.map((request, key) => {
      return (
        <tr id={key}>
          <td style={{ textAlign: "center" }}>{request.agent.username}</td>
          <td style={{ textAlign: "center" }}>{request.agent.fullName}</td>
          <td style={{ textAlign: "center" }}>{request.agent.email}</td>
          <td style={{ textAlign: "center" }}>{request.agent.website}</td>
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
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={this.state.open}
          autoHideDuration={3000}
          onClose={this.handleClose}
        >
          <Alert severity={this.state.snackbarType}>{this.state.message}</Alert>
        </Snackbar>
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
