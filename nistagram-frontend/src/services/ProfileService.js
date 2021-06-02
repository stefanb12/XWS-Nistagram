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

  sendFollowRequest(receiverId, senderId) {
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

  getFollowers(profileId) {
    return fetch(API_URL + "profile/" + profileId + "/followers");
  }

  getFollowing(profileId) {
    return fetch(API_URL + "profile/" + profileId + "/following");
  }
}

export default new ProfileService();
