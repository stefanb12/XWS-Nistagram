const API_URL = "http://localhost:58809/gateway/";

class NotificationService {
  sendLikeNotification(receiverId, senderId, postId) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ receiverId, senderId, postId }),
    };

    return fetch(API_URL + "notification/like", requestOptions);
  }

  sendDislikeNotification(receiverId, senderId, postId) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ receiverId, senderId, postId }),
    };

    return fetch(API_URL + "notification/dislike", requestOptions);
  }

  sendCommentNotification(receiverId, senderId, postId) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ receiverId, senderId, postId }),
    };

    return fetch(API_URL + "notification/comment", requestOptions);
  }

  sendFollowNotification(receiverId, senderId, postId) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ receiverId, senderId, postId }),
    };

    return fetch(API_URL + "notification/follow", requestOptions);
  }

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

  updateSeenNotifications(profileId) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };

    return fetch(API_URL + "notification/seen/" + profileId, requestOptions);
  }

  getNotificationForProfile(profileId) {
    return fetch(API_URL + "notification/profile/" + profileId);
  }
}

export default new NotificationService();
