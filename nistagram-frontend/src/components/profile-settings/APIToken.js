import React, { Component } from "react";
import Alert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";
import ListGroup from "react-bootstrap/ListGroup";
import AuthService from "../../services/AuthService";

class APIToken extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiToken: "",
      showSnackbar: false,
      snackBarMessage: "",
      snackBarSeverity: "",
    };
  }

  generateToken = () => {
    var resStatus;
    AuthService.generateToken(AuthService.getCurrentUser().username)
      .then((res) => {
        resStatus = res.status;
        return res.json();
      })
      .then((result) => {
        if (resStatus == 200) {
          this.setState({ apiToken: result.token });
        } else {
          this.handleClickSnackBar("Generatin API token error", "error");
        }
        return result;
      });
  };

  handleClickSnackBar = (message, type) => {
    this.setState({
      snackBarMessage: message,
      snackBarSeverity: type,
      showSnackbar: true,
    });
  };

  handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ showSnackbar: false });
  };

  render() {
    return (
      <div
        className="card"
        style={{ float: "right", marginRight: "20%", width: "50%" }}
      >
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={this.state.showSnackbar}
          autoHideDuration={3000}
          onClose={this.handleCloseSnackBar}
        >
          <Alert severity={this.state.snackBarSeverity}>
            {this.state.snackBarMessage}
          </Alert>
        </Snackbar>
        <div className="card-header">
          <h5 className="card-title">API token</h5>
        </div>
        <div className="card-body">
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h5>Campaign API token</h5>
              <p>
                <b>{this.state.apiToken}</b>
              </p>
              <p style={{ fontSize: "14px" }}>
                You can use Campaign API token for sending commercials from
                another application on your Nistragram profile to promote your
                products.
              </p>
            </ListGroup.Item>
          </ListGroup>
          <br />
          <button
            className="btn btn-primary"
            style={{ marginLeft: "40%" }}
            onClick={this.generateToken}
          >
            Generate token
          </button>
        </div>
      </div>
    );
  }
}

export default APIToken;
