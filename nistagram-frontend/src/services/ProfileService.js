const API_URL = "http://localhost:58809/gateway/";

class ProfileService {
  getUser(id) {
    return fetch(API_URL + "profile/" + id);
  }

  getUserForUpdating(id) {
    return fetch(API_URL + "profile/" + id + "/profileForUpdating");
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
      body: formData,
    };

    return fetch(API_URL + "profile/update", requestOptions);
  }

  follow(followerId, followingId) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };

    return fetch(
      API_URL + "profile/" + followerId + "/follow/" + followingId,
      requestOptions
    );
  }

  unfollow(followerId, followingId) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };

    return fetch(
      API_URL + "profile/" + followerId + "/unfollow/" + followingId,
      requestOptions
    );
  }

  getFollowers(profileId) {
    return fetch(API_URL + "profile/" + profileId + "/followers");
  }

  getFollowing(profileId) {
    return fetch(API_URL + "profile/" + profileId + "/following");
  }

  getAllUsers() {
    return fetch(API_URL + "profile/getAll");
  }

  getMuted(profileId) {
    return fetch(API_URL + "profile/" + profileId + "/muted");
  }

  mute(profileId, muteId) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };

    return fetch(
      API_URL + "profile/" + profileId + "/mute/" + muteId,
      requestOptions
    );
  }

  unmute(profileId, muteId) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };

    return fetch(
      API_URL + "profile/" + profileId + "/unmute/" + muteId,
      requestOptions
    );
  }

  getBlocked(profileId) {
    return fetch(API_URL + "profile/" + profileId + "/blocked");
  }

  block(profileId, blockId) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };

    return fetch(
      API_URL + "profile/" + profileId + "/block/" + blockId,
      requestOptions
    );
  }

  unblock(profileId, blockId) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };

    return fetch(
      API_URL + "profile/" + profileId + "/unblock/" + blockId,
      requestOptions
    );
  }

  getCloseFriends(profileId) {
    return fetch(API_URL + "profile/" + profileId + "/closeFriends");
  }

  addCloseFriend(profileId, closeFriendId) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };

    return fetch(
      API_URL + "profile/" + profileId + "/addCloseFriends/" + closeFriendId,
      requestOptions
    );
  }

  removeCloseFriends(profileId, closeFriendId) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };

    return fetch(
      API_URL + "profile/" + profileId + "/removeCloseFriends/" + closeFriendId,
      requestOptions
    );
  }

  getProfilePrivacy(id) {
    return fetch(API_URL + "profile/" + id + "/getProfilePrivacy");
  }

  updateProfilePrivacy(id, isPrivate, receiveAllMessages, tagAllowed) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, isPrivate, receiveAllMessages, tagAllowed }),
    };

    return fetch(API_URL + "profile/updateProfilePrivacy", requestOptions);
  }
}

export default new ProfileService();
