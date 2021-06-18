import AuthService from "./AuthService";

const API_URL = "http://localhost:58809/gateway/";

class PostService {
  insert(imageFiles, address, city, country, tags, description, publisher) {
    const formData = new FormData();

    for (var i = 0; i < imageFiles.length; i++) {
      formData.append("imageFiles", imageFiles[i]);
    }

    formData.append("description", description);
    tags.forEach((item) => {
      formData.append("tags", item);
    });
    formData.append("location[address]", address);
    formData.append("location[city]", city);
    formData.append("location[country]", country);
    formData.append("publisher[id]", publisher.id);
    formData.append("publisher[username]", publisher.username);
    formData.append("publisher[imageName]", publisher.imageName);
    console.log(publisher);

    const requestOptions = {
      method: "POST",
       headers: { "Authorization" : "Bearer " + AuthService.getUserToken() },
      body: formData,
    };

    return fetch(API_URL + "post", requestOptions);
  }

  insertNewComment(postId, text, publisher) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json",
                 "Authorization" : "Bearer " + AuthService.getUserToken() },
      body: JSON.stringify({ postId, text, publisher }),
    };

    return fetch(API_URL + "post/newComment", requestOptions);
  }

  likePost(postId, publisher) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json",
                 "Authorization" : "Bearer " + AuthService.getUserToken() },
      body: JSON.stringify({ postId, publisher }),
    };

    return fetch(API_URL + "post/like", requestOptions);
  }

  dislikePost(postId, publisher) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json",
                 "Authorization" : "Bearer " + AuthService.getUserToken() },
      body: JSON.stringify({ postId, publisher }),
    };

    return fetch(API_URL + "post/dislike", requestOptions);
  }

  savePostAsFavorite(postId, publisher) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json",
                 "Authorization" : "Bearer " + AuthService.getUserToken() },
      body: JSON.stringify({ postId, publisher }),
    };

    return fetch(API_URL + "post/favorite", requestOptions);
  }

  getPostsForProfile(profileId) {
    const requestOptions = {
      method: "GET",
      headers: { "Authorization" : "Bearer " + AuthService.getUserToken() }
    };

    return fetch(API_URL + "post/profile/" + profileId, requestOptions);
  }

  getFavoritePosts(profileId) {
    const requestOptions = {
      method: "GET",
      headers: { "Authorization" : "Bearer " + AuthService.getUserToken() }
    };
    
    return fetch(API_URL + "post/favorites/" + profileId, requestOptions);
  }

  getLikedAndDislikedPosts(profileId) {
    const requestOptions = {
      method: "GET",
      headers: { "Authorization" : "Bearer " + AuthService.getUserToken() }
    };

    return fetch(API_URL + "post/likedAndDislikedPosts/" + profileId, requestOptions);
  }

  getPostsFromFollowedProfiles(profileId) {
    const requestOptions = {
      method: "GET",
      headers: { "Authorization" : "Bearer " + AuthService.getUserToken() }
    };

    return fetch(API_URL + "post/postsFromFollowedProfiles/" + profileId, requestOptions);
  }

  getPublicPosts(profileId) {
    const requestOptions = {
      method: "GET"
    };

    return fetch(API_URL + "post/public/" + profileId, requestOptions);
  }

  getAllPosts() {
    const requestOptions = {
      method: "GET"
    };

    return fetch(API_URL + "post", requestOptions);
  }

  getSearchedPosts(searchParam) {
    const requestOptions = {
      method: "GET",
      headers: { "Authorization" : "Bearer " + AuthService.getUserToken() }
    };

    return fetch(API_URL + "post/search/" + searchParam, requestOptions);
  }
}

export default new PostService();
