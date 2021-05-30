const API_URL = "http://localhost:55988/api/";

class ProfileService {
    getUser(id) {
      return fetch(API_URL + "profile/" + id);
    }

    getUserForUpdating(id) {
        return fetch(API_URL + "profile/" + id + "/profileForUpdating");
    }

    updateProfile(id, username, biography, website, fullName, email, mobilePhone, dateOfBirth, gender) {
        const requestOptions = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({id, username, biography, website, fullName, email, mobilePhone, dateOfBirth, gender}),
        };
        return fetch(API_URL + "profile/update", requestOptions);
    }

  }
  
  export default new ProfileService();