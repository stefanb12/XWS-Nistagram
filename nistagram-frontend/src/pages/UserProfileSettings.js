import React, { Component } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "../assets/styles/profileSettings.css";
import UserAccount from "../components/profile-settings/UserAccount";
import UserPassword from "../components/profile-settings/UserPassword";
import UserPrivacy from "../components/profile-settings/UserPrivacy";
import VerifyProfile from "../components/profile-settings/VerifyProfile";

export default class UserProfileSettings extends Component {
  state = {
    contentActive: 0,
  };

  /*constructor(){
    super();
    this.activateLasers.bind(this);
  }*/

  activateLasers = (content) => {
    //console.log(content);
    //this.state.contentActive = 9;
    this.setState({ contentActive: content });
  };

  render() {
    let contentForShowing;
    if (this.state.contentActive === 0) {
      contentForShowing = <UserAccount />;
    } else if (this.state.contentActive === 1) {
      contentForShowing = <UserPassword />;
    } else if (this.state.contentActive === 2) {
      contentForShowing = <UserPrivacy />;
    } else if (this.state.contentActive === 3) {
      contentForShowing = <VerifyProfile />;
    }

    return (
      <div style={{ marginLeft: "10%" }}>
        <div style={{ float: "left", width: "29%" }}>
          <Card style={{ width: "100%" }}>
            <Card.Header>
              <h4>Profile Settings</h4>
            </Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Button
                  variant={this.state.contentActive === 0 ? "primary" : "light"}
                  style={{ width: "100%" }}
                  onClick={() => this.activateLasers(0)}
                >
                  Edit Profile
                </Button>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  variant={this.state.contentActive === 2 ? "primary" : "light"}
                  style={{ width: "100%" }}
                  onClick={() => this.activateLasers(2)}
                >
                  Privacy and Security
                </Button>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  variant={this.state.contentActive === 3 ? "primary" : "light"}
                  style={{ width: "100%" }}
                  onClick={() => this.activateLasers(3)}
                >
                  Verify Profile
                </Button>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  variant={this.state.contentActive === 1 ? "primary" : "light"}
                  style={{ width: "100%" }}
                  onClick={() => this.activateLasers(1)}
                >
                  Change Password
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </div>
        {contentForShowing}
      </div>
    );
  }
}
