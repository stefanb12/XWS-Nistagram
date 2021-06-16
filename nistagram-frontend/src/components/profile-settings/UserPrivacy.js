import React, { Component } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { Checkbox } from "@material-ui/core";
import NotificationsOffIcon from "@material-ui/icons/NotificationsOff";
import BlockIcon from "@material-ui/icons/Block";
import { Modal } from "react-bootstrap";
import ProfileService from "../../services/ProfileService";
import AuthService from "../../services/AuthService";

class UserPrivacy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenMuteProfilesModalOpen: false,
      isOpenBlockProfilesModalOpen: false,
      following: [],
    };
  }

  openMuteProfilesModal = () => {
    ProfileService.getFollowing(AuthService.getCurrentUser().id)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          following: result,
        });
      });
    this.setState({
      isOpenMuteProfilesModalOpen: true,
    });
  };

  closeMuteProfilesModal = () => {
    this.setState({
      isOpenMuteProfilesModalOpen: false,
    });
  };

  openBlockProfilesModal = () => {
    ProfileService.getFollowing(AuthService.getCurrentUser().id)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          following: result,
        });
      });
    this.setState({
      isOpenBlockProfilesModalOpen: true,
    });
  };

  closeBlockProfilesModal = () => {
    this.setState({
      isOpenBlockProfilesModalOpen: false,
    });
  };

  render() {
    var muteProfilesModal = (
      <Modal
        show={this.state.isOpenMuteProfilesModalOpen}
        onHide={this.closeMuteProfilesModal}
        style={{ marginTop: "120px", maxHeight: "500px", overflow: "hidden" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Mute profiles</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ overflow: "auto", maxHeight: "300px" }}>
            {this.state.following.map((profile) => {
              return (
                <div class="list-group-item d-flex align-items-center">
                  <img
                    src={profile.imageSrc}
                    alt=""
                    width="50px"
                    class="rounded-sm ml-n2"
                  />
                  <div class="flex-fill pl-3 pr-3">
                    <div>
                      <a href="#" class="text-dark font-weight-600">
                        {profile.username}
                      </a>
                    </div>
                    {/* <div class="text-muted fs-13px">{follower.fullName}</div> */}
                  </div>
                  {
                    <a
                      href="javascript:void(0)"
                      class="btn btn-outline-dark"
                      style={{ width: "24%" }}
                    >
                      <NotificationsOffIcon style={{ marginRight: "2%" }} />
                      Mute
                    </a>
                  }
                </div>
              );
            })}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.closeMuteProfilesModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );

    var blockProfilesModal = (
      <Modal
        show={this.state.isOpenBlockProfilesModalOpen}
        onHide={this.closeBlockProfilesModal}
        style={{ marginTop: "120px", maxHeight: "500px", overflow: "hidden" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Block profiles</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ overflow: "auto", maxHeight: "300px" }}>
            {this.state.following.map((profile) => {
              return (
                <div class="list-group-item d-flex align-items-center">
                  <img
                    src={profile.imageSrc}
                    alt=""
                    width="50px"
                    class="rounded-sm ml-n2"
                  />
                  <div class="flex-fill pl-3 pr-3">
                    <div>
                      <a href="#" class="text-dark font-weight-600">
                        {profile.username}
                      </a>
                    </div>
                    {/* <div class="text-muted fs-13px">{follower.fullName}</div> */}
                  </div>
                  {
                    <a
                      href="javascript:void(0)"
                      class="btn btn-outline-danger"
                      style={{ width: "24%" }}
                    >
                      <BlockIcon style={{ marginRight: "3%" }} />
                      Block
                    </a>
                  }
                </div>
              );
            })}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.closeBlockProfilesModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );

    return (
      <div>
        {muteProfilesModal}
        {blockProfilesModal}
        <div
          className="card"
          style={{ float: "right", marginRight: "20%", width: "50%" }}
        >
          <div className="card-header">
            <h5 className="card-title">Privacy and Security</h5>
          </div>
          <div className="card-body">
            <form>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h5>Account privacy</h5>
                  <Checkbox
                    style={{ marginLeft: "-2%" }}
                    color="primary"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                  <label>Private account</label>
                  <br />
                  <p style={{ fontSize: "14px" }}>
                    When your account is private, only people you approve can
                    see your photos and videos on Instagram. Your existing
                    followers won't be affected.
                  </p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h5>Messages Settings</h5>
                  <Checkbox
                    style={{ marginLeft: "-2%" }}
                    color="primary"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                  <label>Receive All Messages</label>
                  <br />
                  <p style={{ fontSize: "14px" }}>
                    Do you want to receive messages from profiles you don't
                    follow?
                  </p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h5>Tags Settings</h5>
                  <Checkbox
                    style={{ marginLeft: "-2%" }}
                    color="primary"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                  <label>Allow tagging</label>
                  <br />
                  <p style={{ fontSize: "14px" }}>
                    Do other profiles can tag you on their posts, stories and
                    comments?
                  </p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h5>Muted profiles</h5>
                  <Button
                    variant="dark"
                    style={{
                      width: "25%",
                      marginTop: "2%",
                      marginBottom: "2%",
                    }}
                    onClick={this.openMuteProfilesModal}
                  >
                    <NotificationsOffIcon style={{ marginRight: "2%" }} />
                    Mute profiles
                  </Button>
                  <p style={{ fontSize: "14px" }}>
                    You will be able to access muted profiles, but content
                    posted by these profiles won't be shown to you.
                  </p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h5>Blocked profiles</h5>
                  <Button
                    variant="danger"
                    style={{
                      width: "25%",
                      marginTop: "2%",
                      marginBottom: "2%",
                    }}
                    onClick={this.openBlockProfilesModal}
                  >
                    <BlockIcon style={{ marginRight: "2%" }} />
                    Block profiles
                  </Button>
                  <p style={{ fontSize: "14px", marginBottom: "4%" }}>
                    When you block profile you won't be able to have any type
                    interaction with it.
                  </p>
                </ListGroup.Item>
              </ListGroup>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ marginLeft: "3%" }}
              >
                Save changes
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default UserPrivacy;
