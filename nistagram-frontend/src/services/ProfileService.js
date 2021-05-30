const API_URL = "http://localhost:58809/gateway/";

class ProfileService {
  getUser(id) {
    return fetch(API_URL + "profile/" + id);
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
}

export default new ProfileService();
