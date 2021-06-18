import AuthService from "./AuthService";

const API_URL = "http://localhost:58809/gateway/";

class ProfileVerificationRequestService {
  sendVerificationRequest(firstName, lastName, category, image) {
    const formData = new FormData();

    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("category", category);
    formData.append("imageFile", image);
    formData.append("profileId", AuthService.getCurrentUser().id);

    const requestOptions = {
      method: "POST",
      body: formData,
      headers: { "Authorization" : "Bearer " + AuthService.getUserToken() }
    };

    return fetch(API_URL + "profileVerificationRequest", requestOptions);
  }

  acceptRequest(requestId) {
    const requestOptions = {
      method: "PUT",
      headers: { "Authorization" : "Bearer " + AuthService.getUserToken() }
    };

    return fetch(
      API_URL + "profileVerificationRequest/accept/" + requestId,
      requestOptions
    );
  }

  rejectRequest(requestId) {
    const requestOptions = {
      method: "PUT",
      headers: { "Authorization" : "Bearer " + AuthService.getUserToken() }
    };

    return fetch(
      API_URL + "profileVerificationRequest/reject/" + requestId,
      requestOptions
    );
  }

  getAllProfileVerificationRequests() {
    const requestOptions = {
      method: "GET",
      headers: { "Authorization" : "Bearer " + AuthService.getUserToken() }
    };

    return fetch(API_URL + "profileVerificationRequest/getAll", requestOptions);
  }
}
export default new ProfileVerificationRequestService();
