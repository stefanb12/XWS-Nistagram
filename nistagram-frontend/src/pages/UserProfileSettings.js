import React, { Component } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import "../assets/styles/profileSettings.css";
import UserAccount from "./UserAccount";
import UserPassword from "./UserPassword";

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
