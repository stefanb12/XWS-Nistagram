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
        };

        return fetch(API_URL + "profileVerificationRequest", requestOptions);
    }
}
export default new ProfileVerificationRequestService();
