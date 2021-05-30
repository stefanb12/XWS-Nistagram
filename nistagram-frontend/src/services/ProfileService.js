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
    gender
  ) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        username,
        biography,
        website,
        fullName,
        email,
        mobilePhone,
        dateOfBirth,
        gender,
      }),
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

  followRequest(receiverId, senderId) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ receiverId, senderId }),
    };

    return fetch(API_URL + "profile/followRequest", requestOptions);
  }

  deleteFollowRequest(receiverId, senderId) {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ receiverId, senderId }),
    };

    return fetch(API_URL + "profile/followRequest", requestOptions);
  }

  getFollowRequest(receiverId, senderId) {
    return fetch(
      API_URL + "profile/followRequest/" + receiverId + "/" + senderId
    );
  }
}

export default new ProfileService();
