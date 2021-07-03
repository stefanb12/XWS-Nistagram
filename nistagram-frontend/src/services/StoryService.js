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
    formData.append("isCommercial", false);


    const requestOptions = {
      method: "POST",
      headers: { Authorization: "Bearer " + AuthService.getUserToken() },
      body: formData,
    };

    return fetch(API_URL + "story", requestOptions);
  }

  addStoryCampaign(commercialImages, isForCloseFriendsOnly, publisher) {
    const formData = new FormData();

    for (var i = 0; i < commercialImages.length; i++) {
      formData.append(
        "commercials[" + i + "].websiteLink",
        commercialImages[i].websiteLink
      );
      formData.append(
        "commercials[" + i + "].imageName",
        commercialImages[i].imageName
      );
    }

    formData.append("publisher[id]", publisher.id);
    formData.append("publisher[username]", publisher.username);

    formData.append("forCloseFriends", isForCloseFriendsOnly);
    formData.append("isCommercial", true);

    const requestOptions = {
      method: "POST",
      headers: { Authorization: "Bearer " + AuthService.getUserToken() },
      body: formData,
    };

    return fetch(API_URL + "story", requestOptions);
  }

  addStoryHighlight(name, publisherId, storiesIds) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + AuthService.getUserToken(),
      },
      body: JSON.stringify({ name, publisherId, storiesIds }),
    };

    return fetch(API_URL + "story/highlight", requestOptions);
  }

  deleteStory(storyId) {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + AuthService.getUserToken(),
      },
    };

    return fetch(API_URL + "story/delete/" + storyId, requestOptions);
  }

  getStoryHighlightsForProfile(profileId) {
    const requestOptions = {
      method: "GET",
      headers: { Authorization: "Bearer " + AuthService.getUserToken() },
    };

    return fetch(
      API_URL + "story/highlight/profile/" + profileId,
      requestOptions
    );
  }

  getActiveStoriesForProfile(profileId) {
    const requestOptions = {
      method: "GET",
      headers: { Authorization: "Bearer " + AuthService.getUserToken() },
    };

    return fetch(API_URL + "story/active/profile/" + profileId, requestOptions);
  }

  getStoriesForProfile(profileId) {
    const requestOptions = {
      method: "GET",
      headers: { Authorization: "Bearer " + AuthService.getUserToken() },
    };

    return fetch(API_URL + "story/profile/" + profileId, requestOptions);
  }

  getAllStories() {
    let profile = AuthService.getCurrentUser();
    const requestOptions = {
      method: "GET",
      headers: { Authorization: "Bearer " + AuthService.getUserToken() },
    };

    return fetch(
      API_URL + "story/getAllProfileStories/" + profile.id,
      requestOptions
    );
  }

  getById(storyId) {
    const requestOptions = {
      method: "GET",
      headers: { Authorization: "Bearer " + AuthService.getUserToken() },
    };

    return fetch(API_URL + "story/" + storyId, requestOptions);
  }
}

export default new StoryService();
