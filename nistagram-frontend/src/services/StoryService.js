import AuthService from "./AuthService";

const API_URL = "http://localhost:58809/gateway/";

class StoryService {
  addImagesToStory(imageFiles, isForCloseFriendsOnly, publisher) {
    const formData = new FormData();

    for (var i = 0; i < imageFiles.length; i++) {
      formData.append("imageFiles", imageFiles[i]);
      formData.append("publisher[id]", publisher.id);
      formData.append("publisher[username]", publisher.username);
    }

    formData.append("forCloseFriends", isForCloseFriendsOnly);

    const requestOptions = {
      method: "POST",
      headers: { "Authorization" : "Bearer " + AuthService.getUserToken() },
      body: formData,
    };

    return fetch(API_URL + "story", requestOptions);
  }

  addStoryHighlight(name, publisherId, storiesIds) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json",
                 "Authorization" : "Bearer " + AuthService.getUserToken() },
      body: JSON.stringify({ name, publisherId, storiesIds }),
    };

    return fetch(API_URL + "story/highlight", requestOptions);
  }

  getStoryHighlightsForProfile(profileId) {
    const requestOptions = {
      method: "GET",
      headers: { "Authorization" : "Bearer " + AuthService.getUserToken() }
    };
    
    return fetch(API_URL + "story/highlight/profile/" + profileId, requestOptions);
  }

  getActiveStoriesForProfile(profileId) {
    const requestOptions = {
      method: "GET",
      headers: { "Authorization" : "Bearer " + AuthService.getUserToken() }
    };

    return fetch(API_URL + "story/active/profile/" + profileId, requestOptions);
  }

  getStoriesForProfile(profileId) {
    const requestOptions = {
      method: "GET",
      headers: { "Authorization" : "Bearer " + AuthService.getUserToken() }
    };

    return fetch(API_URL + "story/profile/" + profileId, requestOptions);
  }

  getAllStories() {
    let profile = AuthService.getCurrentUser();
    const requestOptions = {
      method: "GET",
      headers: { "Authorization" : "Bearer " + AuthService.getUserToken() }
    };

    return fetch(API_URL + "story/getAllProfileStories/" + profile.id, requestOptions);
  }
}

export default new StoryService();
