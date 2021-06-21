import React, { Component } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { Checkbox } from "@material-ui/core";
import NotificationsOffIcon from "@material-ui/icons/NotificationsOff";
import BlockIcon from "@material-ui/icons/Block";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import { Modal } from "react-bootstrap";
import ProfileService from "../../services/ProfileService";
import AuthService from "../../services/AuthService";

class UserPrivacy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountPrivacy: null,
      messagesSettings: null,
      tagsSettings: null,
      isOpenMuteProfilesModalOpen: false,
      isOpenBlockProfilesModalOpen: false,
      isOpenCloseFriendsModalOpen: false,
      isOpenNotificationProfilesModalOpen: false,
      following: [],
      mutedProfiles: [],
      blockedProfiles: [],
      closeFriends: [],
      notificationProfiles: [],
    };
  }

  componentDidMount() {
    ProfileService.getProfilePrivacy(AuthService.getCurrentUser().id)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          accountPrivacy: result.isPrivate,
          messagesSettings: result.receiveAllMessages,
          tagsSettings: result.tagAllowed,
        });
      });
  }

  privacyOnChange = (event) => {
    this.setState({ accountPrivacy: event.target.checked });
  };

  messageSettingsOnChange = (event) => {
    this.setState({ messagesSettings: event.target.checked });
  };

  tagsSettingsOnChange = (event) => {
    this.setState({ tagsSettings: event.target.checked });
  };

  openMuteProfilesModal = () => {
    ProfileService.getFollowing(AuthService.getCurrentUser().id)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          following: result,
        });
      });

    ProfileService.getMuted(AuthService.getCurrentUser().id)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          mutedProfiles: result,
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

  isProfileMuted = (username) => {
    for (let i = 0; i < this.state.mutedProfiles.length; i++) {
      if (this.state.mutedProfiles[i].username == username) return true;
    }
    return false;
  };

  muteProfile = async (muteId) => {
    await ProfileService.mute(AuthService.getCurrentUser().id, muteId).then(
      (res) => res.json()
    );

    await ProfileService.getMuted(AuthService.getCurrentUser().id)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          mutedProfiles: result,
        });
      });
  };

  unmuteProfile = async (unmuteId) => {
    await ProfileService.unmute(AuthService.getCurrentUser().id, unmuteId).then(
      (res) => res.json()
    );

    await ProfileService.getMuted(AuthService.getCurrentUser().id)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          mutedProfiles: result,
        });
      });
  };

  openBlockProfilesModal = () => {
    ProfileService.getAllUsers()
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          following: result,
        });
      });

    ProfileService.getBlocked(AuthService.getCurrentUser().id)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          blockedProfiles: result,
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

  isProfileBlocked = (username) => {
    for (let i = 0; i < this.state.blockedProfiles.length; i++) {
      if (this.state.blockedProfiles[i].username == username) return true;
    }
    return false;
  };

  blockProfile = async (blockId) => {
    await ProfileService.block(AuthService.getCurrentUser().id, blockId).then(
      (res) => res.json()
    );

    await ProfileService.getBlocked(AuthService.getCurrentUser().id)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          blockedProfiles: result,
        });
      });
  };

  unblockProfile = async (unblockId) => {
    await ProfileService.unblock(
      AuthService.getCurrentUser().id,
      unblockId
    ).then((res) => res.json());

    await ProfileService.getBlocked(AuthService.getCurrentUser().id)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          blockedProfiles: result,
        });
      });
  };

  openCloseFriendsModal = async () => {
    await ProfileService.getFollowing(AuthService.getCurrentUser().id)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          following: result,
        });
      });

    await ProfileService.getCloseFriends(AuthService.getCurrentUser().id)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          closeFriends: result,
        });
      });

    this.setState({
      isOpenCloseFriendsModalOpen: true,
    });
  };

  closeCloseFriendsModal = () => {
    this.setState({
      isOpenCloseFriendsModalOpen: false,
    });
  };

  isFriendClose = (username) => {
    for (let i = 0; i < this.state.closeFriends.length; i++) {
      if (this.state.closeFriends[i].username == username) return true;
    }
    return false;
  };

  addCloseFriend = async (closeFriendId) => {
    await ProfileService.addCloseFriend(
      AuthService.getCurrentUser().id,
      closeFriendId
    ).then((res) => res.json());

    await ProfileService.getCloseFriends(AuthService.getCurrentUser().id)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          closeFriends: result,
        });
      });
  };

  removeCloseFriend = async (closeFriendId) => {
    await ProfileService.removeCloseFriends(
      AuthService.getCurrentUser().id,
      closeFriendId
    ).then((res) => res.json());

    await ProfileService.getCloseFriends(AuthService.getCurrentUser().id)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          closeFriends: result,
        });
      });
  };

  openNotificationProfilesModal = async () => {
    await ProfileService.getFollowing(AuthService.getCurrentUser().id)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          following: result,
        });
      });

    await ProfileService.getNotificationProfiles(
      AuthService.getCurrentUser().id
    )
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          notificationProfiles: result,
        });
      });

    this.setState({
      isOpenNotificationProfilesModalOpen: true,
    });
  };

  closeNotificationProfilesModal = () => {
    this.setState({
      isOpenNotificationProfilesModalOpen: false,
    });
  };

  isNotificationProfiles = (username) => {
    for (let i = 0; i < this.state.notificationProfiles.length; i++) {
      if (this.state.notificationProfiles[i].username == username) return true;
    }
    return false;
  };

  addNotificationProfile = async (notificationProfileId) => {
    await ProfileService.addNotificationProfile(
      AuthService.getCurrentUser().id,
      notificationProfileId
    ).then((res) => res.json());

    await ProfileService.getNotificationProfiles(
      AuthService.getCurrentUser().id
    )
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          notificationProfiles: result,
        });
      });
  };

  removeNotificationProfile = async (notificationProfileId) => {
    await ProfileService.removeNotificationProfile(
      AuthService.getCurrentUser().id,
      notificationProfileId
    ).then((res) => res.json());

    await ProfileService.getNotificationProfiles(
      AuthService.getCurrentUser().id
    )
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          notificationProfiles: result,
        });
      });
  };

  saveProfilePrivacy = async () => {
    await ProfileService.updateProfilePrivacy(
      AuthService.getCurrentUser().id,
      this.state.accountPrivacy,
      this.state.messagesSettings,
      this.state.tagsSettings
    )
      .then((res) => res.json())
      .then((result) => {});

    await ProfileService.getProfilePrivacy(AuthService.getCurrentUser().id)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          accountPrivacy: result.isPrivate,
          messagesSettings: result.receiveAllMessages,
          tagsSettings: result.tagAllowed,
        });
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
                  {this.isProfileMuted(profile.username) ? (
                    <a
                      href="javascript:void(0)"
                      class="btn btn-dark"
                      style={{ width: "26%" }}
                      onClick={() => this.unmuteProfile(profile.id)}
                    >
                      <NotificationsOffIcon style={{ marginRight: "2%" }} />
                      Unmute
                    </a>
                  ) : (
                    <a
                      href="javascript:void(0)"
                      class="btn btn-outline-dark"
                      style={{ width: "26%" }}
                      onClick={() => this.muteProfile(profile.id)}
                    >
                      <NotificationsOffIcon style={{ marginRight: "2%" }} />
                      Mute
                    </a>
                  )}
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
              if (
                profile.userRole !== 2 &&
                profile.id !== AuthService.getCurrentUser().id
              ) {
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
                    {this.isProfileBlocked(profile.username) ? (
                      <a
                        href="javascript:void(0)"
                        class="btn btn-danger"
                        style={{ width: "28%" }}
                        onClick={() => this.unblockProfile(profile.id)}
                      >
                        <BlockIcon style={{ marginRight: "3%" }} />
                        Unblock
                      </a>
                    ) : (
                      <a
                        href="javascript:void(0)"
                        class="btn btn-outline-danger"
                        style={{ width: "28%" }}
                        onClick={() => this.blockProfile(profile.id)}
                      >
                        <BlockIcon style={{ marginRight: "3%" }} />
                        Block
                      </a>
                    )}
                  </div>
                );
              }
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

    var closeFriendsModal = (
      <Modal
        show={this.state.isOpenCloseFriendsModalOpen}
        onHide={this.closeCloseFriendsModal}
        style={{ marginTop: "120px", maxHeight: "500px", overflow: "hidden" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Close profiles</Modal.Title>
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
                  {this.isFriendClose(profile.username) ? (
                    <a
                      href="javascript:void(0)"
                      class="btn btn-success"
                      style={{ width: "26%" }}
                      onClick={() => this.removeCloseFriend(profile.id)}
                    >
                      <RemoveCircleOutlineIcon style={{ marginRight: "3%" }} />
                      Remove
                    </a>
                  ) : (
                    <a
                      href="javascript:void(0)"
                      class="btn btn-outline-success"
                      style={{ width: "26%" }}
                      onClick={() => this.addCloseFriend(profile.id)}
                    >
                      <AddCircleOutline style={{ marginRight: "3%" }} />
                      Add
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.closeCloseFriendsModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );

    var notificationProfilesModal = (
      <Modal
        show={this.state.isOpenNotificationProfilesModalOpen}
        onHide={this.closeNotificationProfilesModal}
        style={{ marginTop: "120px", maxHeight: "500px", overflow: "hidden" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Notification profiles</Modal.Title>
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
                  {this.isNotificationProfiles(profile.username) ? (
                    <a
                      href="javascript:void(0)"
                      class="btn btn-info"
                      style={{ width: "26%" }}
                      onClick={() => this.removeNotificationProfile(profile.id)}
                    >
                      <RemoveCircleOutlineIcon style={{ marginRight: "3%" }} />
                      Remove
                    </a>
                  ) : (
                    <a
                      href="javascript:void(0)"
                      class="btn btn-outline-info"
                      style={{ width: "26%" }}
                      onClick={() => this.addNotificationProfile(profile.id)}
                    >
                      <AddCircleOutline style={{ marginRight: "3%" }} />
                      Add
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={this.closeNotificationProfilesModal}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );

    return (
      <div>
        {muteProfilesModal}
        {blockProfilesModal}
        {closeFriendsModal}
        {notificationProfilesModal}
        <div
          className="card"
          style={{ float: "right", marginRight: "20%", width: "50%" }}
        >
          <div className="card-header">
            <h5 className="card-title">Privacy and Security</h5>
          </div>
          <div className="card-body">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h5>Account privacy</h5>
                <Checkbox
                  checked={this.state.accountPrivacy}
                  style={{ marginLeft: "-2%" }}
                  color="primary"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                  onChange={this.privacyOnChange}
                />
                <label>Private account</label>
                <br />
                <p style={{ fontSize: "14px" }}>
                  When your account is private, only people you approve can see
                  your photos and videos on Instagram. Your existing followers
                  won't be affected.
                </p>
              </ListGroup.Item>
              <ListGroup.Item>
                <h5>Messages Settings</h5>
                <Checkbox
                  checked={this.state.messagesSettings}
                  style={{ marginLeft: "-2%" }}
                  color="primary"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                  onChange={this.messageSettingsOnChange}
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
                  checked={this.state.tagsSettings}
                  style={{ marginLeft: "-2%" }}
                  color="primary"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                  onChange={this.tagsSettingsOnChange}
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
                    width: "34%",
                    marginTop: "2%",
                    marginBottom: "2%",
                  }}
                  onClick={this.openMuteProfilesModal}
                >
                  <NotificationsOffIcon style={{ marginRight: "2%" }} />
                  Mute profiles
                </Button>
                <p style={{ fontSize: "14px" }}>
                  You will be able to access muted profiles, but content posted
                  by these profiles won't be shown to you.
                </p>
              </ListGroup.Item>
              <ListGroup.Item>
                <h5>Blocked profiles</h5>
                <Button
                  variant="danger"
                  style={{
                    width: "34%",
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
              <ListGroup.Item>
                <h5>Close friends</h5>
                <Button
                  variant="success"
                  style={{
                    width: "34%",
                    marginTop: "2%",
                    marginBottom: "2%",
                  }}
                  onClick={this.openCloseFriendsModal}
                >
                  <AddCircleOutline style={{ marginRight: "2%" }} />
                  Add close friends
                </Button>
                <p style={{ fontSize: "14px", marginBottom: "4%" }}>
                  You can set story to be visible only for close friends.
                </p>
              </ListGroup.Item>
              <ListGroup.Item>
                <h5>Notification profiles</h5>
                <Button
                  variant="info"
                  style={{
                    width: "34%",
                    marginTop: "2%",
                    marginBottom: "2%",
                  }}
                  onClick={this.openNotificationProfilesModal}
                >
                  <AddCircleOutline style={{ marginRight: "2%" }} />
                  Notification profiles
                </Button>
                <p style={{ fontSize: "14px", marginBottom: "4%" }}>
                  You will receive notification when someone from this list adds
                  post, story, comment or send you a message.
                </p>
              </ListGroup.Item>
            </ListGroup>
            <button
              className="btn btn-primary"
              style={{ marginLeft: "42%" }}
              onClick={this.saveProfilePrivacy}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default UserPrivacy;
