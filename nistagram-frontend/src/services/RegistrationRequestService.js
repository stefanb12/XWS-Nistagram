import AuthService from "./AuthService";

const API_URL = "http://localhost:58809/gateway/registrationRequest/";

class RegistrationRequestService {
    getAllRegistrationRequests() {
        const requestOptions = {
            method: "GET",
            headers: { "Authorization" : "Bearer " + AuthService.getUserToken() }
          };
      
          return fetch(API_URL + "getAll", requestOptions);
    }

    acceptRequest(requestId) {
        const requestOptions = {
            method: "PUT",
            headers: { "Authorization" : "Bearer " + AuthService.getUserToken() }
          };

          return fetch(API_URL + "acceptRequest/" + requestId, requestOptions);
    }

    rejectRequest(requestId) {
        const requestOptions = {
            method: "PUT",
            headers: { "Authorization" : "Bearer " + AuthService.getUserToken() }
          };

          return fetch(API_URL + "rejectRequest/" + requestId, requestOptions);
    }
}
export default new RegistrationRequestService();