const API_URL = "http://localhost:58809/gateway/";

class FollowRequestService {
  sendFollowRequest(receiverId, senderId) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ receiverId, senderId }),
    };

    return fetch(API_URL + "followRequest", requestOptions);
  }

  deleteFollowRequest(receiverId, senderId) {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ receiverId, senderId }),
    };

    return fetch(API_URL + "followRequest", requestOptions);
  }

  getFollowRequest(receiverId, senderId) {
    return fetch(API_URL + "followRequest/" + receiverId + "/" + senderId);
  }
}

export default new FollowRequestService();
