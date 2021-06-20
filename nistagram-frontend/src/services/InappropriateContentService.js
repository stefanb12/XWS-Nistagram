import AuthService from "./AuthService";

const API_URL = "http://localhost:58809/gateway/";

class InappropriateContent {
  insertInappropriateContent(reportComment, isPost, senderId, postId, storyId) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + AuthService.getUserToken(),
      },
      body: JSON.stringify({
        reportComment,
        isPost,
        senderId,
        postId,
        storyId,
      }),
    };

    return fetch(API_URL + "inappropriateContent", requestOptions);
  }

  getAll() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + AuthService.getUserToken(),
      },
    };

    return fetch(API_URL + "inappropriateContent/getAll", requestOptions);
  }
}

export default new InappropriateContent();
