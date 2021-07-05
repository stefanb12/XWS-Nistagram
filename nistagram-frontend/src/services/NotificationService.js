import AuthService from "./AuthService";

const API_URL = "http://localhost:58809/gateway/";

class NotificationService {
  sendLikeNotification(receiverId, senderId, postId) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + AuthService.getUserToken(),
      },
      body: JSON.stringify({ receiverId, senderId, postId }),
    };

    return fetch(API_URL + "notification/like", requestOptions);
  }

  sendDislikeNotification(receiverId, senderId, postId) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + AuthService.getUserToken(),
      },
      body: JSON.stringify({ receiverId, senderId, postId }),
    };

    return fetch(API_URL + "notification/dislike", requestOptions);
  }

  sendCommentNotification(receiverId, senderId, postId) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + AuthService.getUserToken(),
      },
      body: JSON.stringify({ receiverId, senderId, postId }),
    };

    return fetch(API_URL + "notification/comment", requestOptions);
  }

  sendFollowNotification(receiverId, senderId, postId) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + AuthService.getUserToken(),
      },
      body: JSON.stringify({ receiverId, senderId, postId }),
    };

    return fetch(API_URL + "notification/follow", requestOptions);
  }

  sendFollowRequestNotification(receiverId, senderId, postId) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + AuthService.getUserToken(),
      },
      body: JSON.stringify({ receiverId, senderId, postId }),
    };

    return fetch(API_URL + "notification/followRequest", requestOptions);
  }

  deleteFollowRequestNotification(receiverId, senderId) {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + AuthService.getUserToken(),
      },
      body: JSON.stringify({ receiverId, senderId }),
    };

    return fetch(API_URL + "notification/followRequest", requestOptions);
  }

  sendCampaignRequestNotification(receiverId, senderId, campaignId) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + AuthService.getUserToken(),
      },
      body: JSON.stringify({ receiverId, senderId, campaignId }),
    };

    return fetch(API_URL + "notification/campaignRequest", requestOptions);
  }

  deleteCampaignRequestNotification(receiverId, senderId) {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + AuthService.getUserToken(),
      },
      body: JSON.stringify({ receiverId, senderId }),
    };

    return fetch(API_URL + "notification/campaignRequest", requestOptions);
  }

  sendPostNotification(receiverId, senderId) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + AuthService.getUserToken(),
      },
      body: JSON.stringify({ receiverId, senderId }),
    };

    return fetch(API_URL + "notification/post", requestOptions);
  }

  sendStoryNotification(receiverId, senderId) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + AuthService.getUserToken(),
      },
      body: JSON.stringify({ receiverId, senderId }),
    };

    return fetch(API_URL + "notification/story", requestOptions);
  }

  updateSeenNotifications(profileId) {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + AuthService.getUserToken(),
      },
    };

    return fetch(API_URL + "notification/seen/" + profileId, requestOptions);
  }

  getNotificationForProfile(profileId) {
    const requestOptions = {
      method: "GET",
      headers: { Authorization: "Bearer " + AuthService.getUserToken() },
    };

    return fetch(API_URL + "notification/profile/" + profileId, requestOptions);
  }
}

export default new NotificationService();
