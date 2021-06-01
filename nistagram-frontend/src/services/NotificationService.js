const API_URL = "http://localhost:58809/gateway/";

class NotificationService {
  sendFollowRequestNotification(receiverId, senderId, postId) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ receiverId, senderId, postId }),
    };

    return fetch(API_URL + "notification/followRequest", requestOptions);
  }

  deleteFollowRequestNotification(receiverId, senderId) {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ receiverId, senderId }),
    };

    return fetch(API_URL + "notification/followRequest", requestOptions);
  }
}

export default new NotificationService();
