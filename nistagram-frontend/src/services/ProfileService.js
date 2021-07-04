import AuthService from "./AuthService";

const API_URL = "http://localhost:58809/gateway/";

class ProfileService {
  getUser(id) {
    const requestOptions = {
      method: "GET",
      headers: { Authorization: "Bearer " + AuthService.getUserToken() },
    };

    return fetch(API_URL + "profile/" + id, requestOptions);
  }

  getUserForUpdating(id) {
    const requestOptions = {
      method: "GET",
      headers: { Authorization: "Bearer " + AuthService.getUserToken() },
    };

    return fetch(
      API_URL + "profile/" + id + "/profileForUpdating",
      requestOptions
    );
  }

  updateProfile(
    id,
    username,
    biography,
    website,
    fullName,
    email,
    mobilePhone,
    dateOfBirth,
    gender,
    profileImage
  ) {
    const formData = new FormData();

    console.log(profileImage);

    formData.append("id", id);
    formData.append("username", username);
    formData.append("biography", biography);
    formData.append("website", website);
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("mobilePhone", mobilePhone);
    formData.append("dateOfBirth", dateOfBirth);
    formData.append("gender", gender);
    formData.append("imageFile", profileImage);

    const requestOptions = {
      method: "PUT",
      headers: { Authorization: "Bearer " + AuthService.getUserToken() },
      body: formData,
    };

    return fetch(API_URL + "profile/update", requestOptions);
  }

  follow(followerId, followingId) {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + AuthService.getUserToken(),
      },
    };

    return fetch(
      API_URL + "profile/" + followerId + "/follow/" + followingId,
      requestOptions
    );
  }

  unfollow(followerId, followingId) {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + AuthService.getUserToken(),
      },
    };

    return fetch(
      API_URL + "profile/" + followerId + "/unfollow/" + followingId,
      requestOptions
    );
  }

  getFollowers(profileId) {
    const requestOptions = {
      method: "GET",
      headers: { Authorization: "Bearer " + AuthService.getUserToken() },
    };

    return fetch(
      API_URL + "profile/" + profileId + "/followers",
      requestOptions
    );
  }

  getFollowing(profileId) {
    const requestOptions = {
      method: "GET",
      headers: { Authorization: "Bearer " + AuthService.getUserToken() },
    };

    return fetch(
      API_URL + "profile/" + profileId + "/following",
      requestOptions
    );
  }

  getFollowingInfluencers(profileId) {
    const requestOptions = {
      method: "GET",
      headers: { Authorization: "Bearer " + AuthService.getUserToken() },
    };

    return fetch(
      API_URL + "profile/" + profileId + "/followingInfluencers",
      requestOptions
    );
  }

  getAllUsers() {
    const requestOptions = {
      method: "GET",
    };

    return fetch(API_URL + "profile/getAll", requestOptions);
  }

  getAllWithoutBlocked(id) {
    const requestOptions = {
      method: "GET",
    };

    return fetch(
      API_URL + "profile/getAllWithoutBlocked/" + id,
      requestOptions
    );
  }

  getMuted(profileId) {
    const requestOptions = {
      method: "GET",
      headers: { Authorization: "Bearer " + AuthService.getUserToken() },
    };

    return fetch(API_URL + "profile/" + profileId + "/muted", requestOptions);
  }

  mute(profileId, muteId) {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + AuthService.getUserToken(),
      },
    };

    return fetch(
      API_URL + "profile/" + profileId + "/mute/" + muteId,
      requestOptions
    );
  }

  unmute(profileId, muteId) {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + AuthService.getUserToken(),
      },
    };

    return fetch(
      API_URL + "profile/" + profileId + "/unmute/" + muteId,
      requestOptions
    );
  }

  getBlocked(profileId) {
    const requestOptions = {
      method: "GET",
      headers: { Authorization: "Bearer " + AuthService.getUserToken() },
    };

    return fetch(API_URL + "profile/" + profileId + "/blocked", requestOptions);
  }

  block(profileId, blockId) {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + AuthService.getUserToken(),
      },
    };

    return fetch(
      API_URL + "profile/" + profileId + "/block/" + blockId,
      requestOptions
    );
  }

  unblock(profileId, blockId) {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + AuthService.getUserToken(),
      },
    };

    return fetch(
      API_URL + "profile/" + profileId + "/unblock/" + blockId,
      requestOptions
    );
  }

  deactivate(profileId) {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + AuthService.getUserToken(),
      },
    };

    return fetch(API_URL + "profile/deactivate/" + profileId, requestOptions);
  }

  getCloseFriends(profileId) {
    const requestOptions = {
      method: "GET",
      headers: { Authorization: "Bearer " + AuthService.getUserToken() },
    };

    return fetch(
      API_URL + "profile/" + profileId + "/closeFriends",
      requestOptions
    );
  }

  addCloseFriend(profileId, closeFriendId) {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + AuthService.getUserToken(),
      },
    };

    return fetch(
      API_URL + "profile/" + profileId + "/addCloseFriends/" + closeFriendId,
      requestOptions
    );
  }

  removeCloseFriends(profileId, closeFriendId) {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + AuthService.getUserToken(),
      },
    };

    return fetch(
      API_URL + "profile/" + profileId + "/removeCloseFriends/" + closeFriendId,
      requestOptions
    );
  }

  getNotificationProfiles(profileId) {
    const requestOptions = {
      method: "GET",
      headers: { Authorization: "Bearer " + AuthService.getUserToken() },
    };

    return fetch(
      API_URL + "profile/" + profileId + "/notificationProfiles",
      requestOptions
    );
  }

  addNotificationProfile(profileId, notificationProfileId) {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + AuthService.getUserToken(),
      },
    };

    return fetch(
      API_URL +
        "profile/" +
        profileId +
        "/addNotificationProfile/" +
        notificationProfileId,
      requestOptions
    );
  }

  removeNotificationProfile(profileId, notificationProfileId) {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + AuthService.getUserToken(),
      },
    };

    return fetch(
      API_URL +
        "profile/" +
        profileId +
        "/removeNotificationProfile/" +
        notificationProfileId,
      requestOptions
    );
  }

  getProfilePrivacy(id) {
    const requestOptions = {
      method: "GET",
      headers: { Authorization: "Bearer " + AuthService.getUserToken() },
    };

    return fetch(
      API_URL + "profile/" + id + "/getProfilePrivacy",
      requestOptions
    );
  }

  updateProfilePrivacy(id, isPrivate, receiveAllMessages, tagAllowed) {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + AuthService.getUserToken(),
      },
      body: JSON.stringify({ id, isPrivate, receiveAllMessages, tagAllowed }),
    };

    return fetch(API_URL + "profile/updateProfilePrivacy", requestOptions);
  }
}

export default new ProfileService();
