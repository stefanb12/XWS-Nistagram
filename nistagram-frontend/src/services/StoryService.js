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
            method : "POST",
            body : formData
        }

        return fetch(API_URL + "story", requestOptions);
    } 

    getAllStories() {
        return fetch(API_URL + "story/getAll");
    }
}

export default new StoryService(); 